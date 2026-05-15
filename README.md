# docs.iai.one

Static documentation system for the full IAI ecosystem.

This repository now ships a multi-page docs experience designed around the provided product spec:

- landing page for the full IAI system
- documentation for Flow, Mail, API, security, deployment, SDK, and ecosystem
- left sidebar navigation
- local search
- copy-to-clipboard buttons for code blocks
- mobile responsive dark UI
- Cloudflare Pages deployment from `apps/docs/public`

## Project Structure

```text
docs.iai.one
├── apps/docs/public
│   ├── index.html
│   ├── getting-started/index.html
│   ├── architecture/index.html
│   ├── app/index.html
│   ├── flow/index.html
│   ├── mail/index.html
│   ├── api/index.html
│   ├── security/index.html
│   ├── deployment/index.html
│   ├── sdk/index.html
│   ├── use-cases/index.html
│   ├── ecosystem/index.html
│   ├── faq/index.html
│   ├── changelog/index.html
│   ├── assets
│   │   ├── docs.css
│   │   ├── docs-config.js
│   │   ├── sidebar.js
│   │   ├── search.js
│   │   ├── app.js
│   │   ├── icon.svg
│   │   └── og-docs.svg
│   ├── _headers
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/check-links.mjs
└── package.json
```

## Local Development

```bash
npm install
npm run dev
```

The Pages output directory is defined in [wrangler.toml](/Users/tranhatam/Documents/New%20project/docs.iai.one/wrangler.toml) as `apps/docs/public`.

## Verification

```bash
npm run check:links
```

The link check script validates local HTML and asset links inside the docs output tree.

## Deploy

```bash
npm run deploy
```

For Cloudflare Pages, configure the project to publish:

- build command: none
- output directory: `apps/docs/public`
- project name: `docs-iai-one`

The deploy script pins the Cloudflare account with `CLOUDFLARE_ACCOUNT_ID` so Pages deploys go to the correct `docs-iai-one` project even when multiple Cloudflare accounts are available in the same Wrangler login.

## Related Surfaces To Keep In Sync

- [home.iai.one](https://home.iai.one)
- [app.iai.one](https://app.iai.one)
- [flow.iai.one](https://flow.iai.one)
- [mail.iai.one](https://mail.iai.one)
- [api.iai.one](https://api.iai.one)
