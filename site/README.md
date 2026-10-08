# GNSIS Developer Documentation

Standalone Fumadocs + Next.js application for `docs.gnsis.studio`, based on the official Fumadocs Next.js example.

The application lives in `/site`; deploy this app, not a legacy Mintlify starter. Fumadocs is the canonical documentation system.

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

Open `http://localhost:3000/docs`. Fumadocs generates `.source`; do not edit generated files.

## Sources of truth

- `content/docs/`: onboarding and integration guides.
- `openapi/panoptic.json`: curated snapshot of Panoptic FastAPI HTTP routes; it is not automatically exported from a running backend.
- `npm run docs:api`: generates interactive API pages from the checked-in OpenAPI snapshot.
- CI compares documented operations against `GNSISBACKEND/runtime/gnsis_runtime/gnsis_runtime/visual/api.py`.
- The product MCP adapter remains in `GNSISBACKEND/sdks/python`; docs do not replace it.
- `/llms.txt`, `/llms-full.txt`, and Markdown page routes expose LLM-readable docs.

## Coolify deployment

Create a dedicated application for `aubincorinaldiecooper-bit/docs`, root directory `/site`, Dockerfile `site/Dockerfile`, port `3000`, domain `https://docs.gnsis.studio`. Validate `/docs`, `/llms.txt`, `/llms-full.txt`, and an API reference route after deployment.

Required repository secrets for the deployment workflow: `COOLIFY_URL`, `COOLIFY_API_TOKEN`, and `COOLIFY_DOCS_APPLICATION_UUID`. The UUID must identify the docs app, not the GNSIS frontend or backend. The workflow triggers only that application. DNS must resolve to the existing Coolify reverse proxy.
