# GNSIS Developer Documentation

This repository is the self-hosted developer portal for GNSIS and Panoptic.

The production documentation application lives under `site/` and is built with **Next.js + Fumadocs**.

## Local development

Requires Node.js 22+.

```bash
cd site
npm install
npm run dev
npm run test:docs
npm run build
npm run typecheck
```

Production target: **https://docs.gnsis.studio**

## Architecture

- Fumadocs + MDX for the developer portal
- OpenAPI-backed interactive Panoptic API reference
- Python and TypeScript SDK guides
- Panoptic MCP integration
- GNSIS 01 API documentation
- `llms.txt` and `llms-full.txt`
- Docker deployment through Coolify

This repository intentionally has **no Mintlify deployment**. Fumadocs is the canonical documentation system.

See `site/README.md` for deployment details.
