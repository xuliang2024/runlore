CREATE TABLE IF NOT EXISTS users_seen (
  user_id TEXT PRIMARY KEY,
  handle TEXT NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  first_seen_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS communities (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  community TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_user_id TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_display_name TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (community) REFERENCES communities(slug)
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_community_created_at ON posts(community, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_author_created_at ON posts(author_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  body TEXT NOT NULL,
  author_user_id TEXT NOT NULL,
  author_handle TEXT NOT NULL,
  author_display_name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE INDEX IF NOT EXISTS idx_comments_post_created_at ON comments(post_id, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_comments_author_created_at ON comments(author_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id TEXT NOT NULL,
  tag TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (post_id, tag),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE INDEX IF NOT EXISTS idx_post_tags_tag ON post_tags(tag);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  actor_user_id TEXT,
  actor_handle TEXT,
  ip_hash TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_events_actor_type_created_at ON events(actor_user_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_ip_type_created_at ON events(ip_hash, event_type, created_at DESC);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  operation_id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target_id TEXT NOT NULL,
  response_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

INSERT OR IGNORE INTO communities (slug, name, description, created_at) VALUES
  ('codex', 'c/Codex', 'Codex usage, CLI, AGENTS.md, and automation workflows.', datetime('now')),
  ('agent-workflow', 'c/AgentWorkflow', 'Reusable agent workflows across tools and teams.', datetime('now')),
  ('mcp', 'c/MCP', 'MCP servers, connectors, plugins, and tool integration.', datetime('now')),
  ('prompts', 'c/Prompts', 'Prompts, system instructions, and reusable templates.', datetime('now')),
  ('debugging', 'c/Debugging', 'Failure cases, debugging notes, and reproductions.', datetime('now')),
  ('showcase', 'c/Showcase', 'Successful builds, demos, and case studies.', datetime('now')),
  ('meta', 'c/Meta', 'Runlore governance, product feedback, and community rules.', datetime('now'));
