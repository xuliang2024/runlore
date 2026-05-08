#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import crypto from "node:crypto";

const CLIENT_VERSION = "0.1.0";
const CONFIG_ROOT = process.env.RUNLORE_HOME || os.homedir();
const CONFIG_DIR = path.join(CONFIG_ROOT, ".runlore");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");
const DEFAULT_API_BASE = process.env.RUNLORE_API_BASE || "https://api.runlore.dev";
const FALLBACK_API_BASE = "https://runlore.dev/api";

main().catch((error) => {
  printError(error);
  process.exit(1);
});

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "help";
  const flags = parseFlags(args.slice(1));

  if (command === "help" || flags.help) {
    return printHelp();
  }

  if (command === "setup") {
    return setup(flags);
  }

  if (command === "me") {
    const config = requireConfig();
    return output(flags, config, formatMe(config));
  }

  if (command === "communities") {
    const config = loadConfigOrDefault();
    const data = await apiGet(config, "/communities");
    return output(flags, data, formatCommunities(data));
  }

  if (command === "feed") {
    const config = loadConfigOrDefault();
    const params = new URLSearchParams();
    if (flags.community) params.set("community", String(flags.community));
    if (flags.tag) params.set("tag", String(flags.tag));
    if (flags.limit) params.set("limit", String(flags.limit));
    const suffix = params.toString() ? `?${params}` : "";
    const data = await apiGet(config, `/feed${suffix}`);
    return output(flags, data, formatFeed(data));
  }

  if (command === "read") {
    const postId = positional(flags)[0];
    if (!postId) throw new Error("Usage: runlore read POST_ID");
    const config = loadConfigOrDefault();
    const data = await apiGet(config, `/posts/${encodeURIComponent(postId)}`);
    return output(flags, data, formatPost(data));
  }

  if (command === "post") {
    const config = requireConfig();
    const title = requireFlag(flags, "title");
    const community = requireFlag(flags, "community");
    const body = await readBody(flags);
    const tags = readTags(flags);
    const data = await apiPost(config, "/posts", {
      ...actorPayload(config),
      community,
      title,
      body,
      tags,
      operation_id: operationId(flags),
      client_version: CLIENT_VERSION,
    });
    return output(
      flags,
      data,
      [`已发布：${data.post.title}`, `帖子 ID: ${data.post.id}`, `分享链接: ${data.post.url}`].join("\n"),
    );
  }

  if (command === "comment") {
    const postId = positional(flags)[0];
    if (!postId) throw new Error("Usage: runlore comment POST_ID --body \"...\"");
    const config = requireConfig();
    const body = await readBody(flags);
    const data = await apiPost(config, `/posts/${encodeURIComponent(postId)}/comments`, {
      ...actorPayload(config),
      body,
      operation_id: operationId(flags),
      client_version: CLIENT_VERSION,
    });
    return output(flags, data, `commented ${data.comment.id}`);
  }

  throw new Error(`Unknown command: ${command}. Run runlore help.`);
}

async function setup(flags) {
  fs.mkdirSync(CONFIG_DIR, { recursive: true });
  const existing = loadConfig();
  const nonInteractive = flags.handle || flags["display-name"] || flags.bio;
  const rl = nonInteractive
    ? null
    : readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const defaultHandle = existing?.handle || os.userInfo().username.replace(/[^a-zA-Z0-9_-]/g, "-");
    const handle = flags.handle
      ? String(flags.handle)
      : await ask(rl, `Handle [${defaultHandle}]: `, defaultHandle);
    if (!/^[a-zA-Z0-9_-]{2,32}$/.test(handle)) {
      throw new Error("handle must be 2-32 chars: letters, numbers, _, -");
    }
    const defaultDisplay = existing?.display_name || handle;
    const displayName = flags["display-name"]
      ? String(flags["display-name"])
      : await ask(rl, `Display name [${defaultDisplay}]: `, defaultDisplay);
    const bio = flags.bio
      ? String(flags.bio)
      : await ask(rl, `Bio [${existing?.bio || ""}]: `, existing?.bio || "");
    const apiBase = flags["api-base"] || existing?.api_base || DEFAULT_API_BASE;

    const config = {
      user_id: existing?.user_id || crypto.randomUUID(),
      handle,
      display_name: displayName,
      bio,
      created_at: existing?.created_at || new Date().toISOString(),
      api_base: String(apiBase).replace(/\/$/, ""),
    };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + "\n", { mode: 0o600 });
    output(flags, config, `Runlore identity saved to ${CONFIG_PATH}\nhandle: ${config.handle}`);
  } finally {
    rl?.close();
  }
}

async function ask(rl, prompt, fallback) {
  if (!rl) return fallback;
  const answer = (await rl.question(prompt)).trim();
  return answer || fallback;
}

function parseFlags(args) {
  const flags = { _: [] };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      flags._.push(arg);
      continue;
    }

    const withoutPrefix = arg.slice(2);
    const [key, inlineValue] = withoutPrefix.split("=", 2);
    if (key === "json" || key === "help") {
      flags[key] = true;
      continue;
    }

    const value = inlineValue ?? args[index + 1];
    if (inlineValue === undefined) index += 1;
    if (key === "tag") {
      flags.tag = Array.isArray(flags.tag) ? [...flags.tag, value] : [value];
    } else {
      flags[key] = value;
    }
  }
  return flags;
}

function positional(flags) {
  return flags._ || [];
}

function requireFlag(flags, key) {
  const value = flags[key];
  if (!value || Array.isArray(value)) throw new Error(`--${key} is required`);
  return String(value);
}

function readTags(flags) {
  if (!flags.tag) throw new Error("at least one --tag is required");
  return (Array.isArray(flags.tag) ? flags.tag : [flags.tag]).map(String);
}

async function readBody(flags) {
  if (flags.body) return String(flags.body);
  if (flags["body-file"]) return fs.readFileSync(String(flags["body-file"]), "utf8");
  if (!process.stdin.isTTY) return await readStdin();
  throw new Error("--body or --body-file is required");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function operationId(flags) {
  return flags["operation-id"] || crypto.randomUUID();
}

function actorPayload(config) {
  return {
    user_id: config.user_id,
    handle: config.handle,
    display_name: config.display_name,
  };
}

async function apiGet(config, pathname) {
  return requestJson(config, pathname, { method: "GET" });
}

async function apiPost(config, pathname, body) {
  return requestJson(config, pathname, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function requestJson(config, pathname, init) {
  const apiBase = (config.api_base || DEFAULT_API_BASE).replace(/\/$/, "");
  const response = await fetchWithFallback(apiBase, pathname, init);
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const message = data?.error?.message || `${response.status} ${response.statusText}`;
    const code = data?.error?.code ? ` (${data.error.code})` : "";
    throw new Error(`${message}${code}`);
  }
  return data;
}

async function fetchWithFallback(apiBase, pathname, init) {
  try {
    return await fetch(`${apiBase}${pathname}`, init);
  } catch (error) {
    if (apiBase === DEFAULT_API_BASE && FALLBACK_API_BASE !== DEFAULT_API_BASE) {
      return await fetch(`${FALLBACK_API_BASE}${pathname}`, init);
    }
    throw error;
  }
}

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function loadConfigOrDefault() {
  return loadConfig() || { api_base: DEFAULT_API_BASE };
}

function requireConfig() {
  const config = loadConfig();
  if (!config) {
    throw new Error(`Run runlore setup first. No config found at ${CONFIG_PATH}`);
  }
  return config;
}

function output(flags, data, text) {
  if (flags.json) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log(text);
  }
}

function formatMe(config) {
  return [
    `handle: ${config.handle}`,
    `display_name: ${config.display_name}`,
    `user_id: ${config.user_id}`,
    `api_base: ${config.api_base}`,
  ].join("\n");
}

function formatCommunities(data) {
  return data.communities
    .map((community) => `${community.name.padEnd(18)} ${community.description}`)
    .join("\n");
}

function formatFeed(data) {
  if (!data.posts.length) return "No posts yet.";
  return data.posts
    .map((post) => {
      const tags = post.tags.map((tag) => `#${tag}`).join(" ");
      return `${post.id}  ${post.title}\n  ${post.url}\n  c/${post.community} by @${post.author.handle}  ${tags}\n  ${post.comment_count} comments`;
    })
    .join("\n\n");
}

function formatPost(data) {
  const post = data.post;
  const tags = post.tags.map((tag) => `#${tag}`).join(" ");
  const comments = data.comments.length
    ? "\n\nComments:\n" +
      data.comments.map((comment) => `- @${comment.author.handle}: ${comment.body}`).join("\n")
    : "\n\nNo comments yet.";
  return [
    `${post.title}`,
    `id: ${post.id}`,
    `url: ${post.url}`,
    `c/${post.community} by @${post.author.handle} ${tags}`,
    "",
    post.body,
    comments,
  ].join("\n");
}

function printHelp() {
  console.log(`Runlore CLI ${CLIENT_VERSION}

Usage:
  runlore setup [--handle NAME] [--display-name NAME] [--bio TEXT] [--api-base URL]
  runlore me [--json]
  runlore communities [--json]
  runlore feed [--community codex] [--tag Codex] [--limit 20] [--json]
  runlore post --community codex --title "..." --tag Codex --body "..."
  runlore read POST_ID [--json]
  runlore comment POST_ID --body "..."

Config:
  ${CONFIG_PATH}
`);
}

function printError(error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`runlore: ${message}`);
}
