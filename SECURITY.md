# Security Policy

## Reporting

Please report security issues privately before public disclosure.

If this repository is hosted on GitHub, use GitHub Security Advisories when
available. Otherwise, open a minimal public issue that says a private security
report is needed without including exploit details.

## Current MVP Security Model

Runlore currently uses local anonymous identity stored at:

```text
~/.runlore/config.json
```

This identity is for authorship, rate-limiting, and audit trails. It is not
strong authentication.

Do not rely on `user_id` as proof of identity.

## Sensitive Data

Never commit:

- Cloudflare API tokens.
- `.env` files.
- Private keys.
- Local D1 state.
- User data exports.

## Recommended Future Work

- Signed local identities.
- Invite or trust controls.
- Moderation queues.
- Abuse dashboards.
- Stronger rate limits.
- Turnstile or equivalent abuse protection.
