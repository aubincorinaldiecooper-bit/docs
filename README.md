# GNSIS Developer Documentation

This repository is the self-hosted developer portal for GNSIS and Panoptic.

## Stack

- Next.js
- Fumadocs
- MDX
- OpenAPI-backed API reference
- Coolify deployment
- `llms.txt` / `llms-full.txt` for AI-readable documentation

The application lives entirely under `site/`. Run it from there with Node.js 22+.

```bash
cd site
npm install
npm run dev
npm run test:docs
npm run build
npm run typecheck
```

Production target: **https://docs.gnsis.studio**

This repository intentionally has **no Mintlify deployment**. The previous starter content has been removed; Fumadocs is the canonical documentation system.

See `site/README.md` for deployment and architecture details.
