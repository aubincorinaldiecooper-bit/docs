# GNSIS Developer Documentation

Standalone Fumadocs + Next.js application for `docs.gnsis.studio`, based on the [official Fumadocs Next.js example](https://github.com/fuma-nama/fumadocs/tree/dev/examples/next) (the source of the create-fumadocs-app template).

The existing Mintlify starter is preserved at the repository root for migration history. **Deploy the separate application from `/site`**, not the starter at the root. No changes to the GNSIS product or marketing frontend are needed to host docs.

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

Open http://localhost:3000/docs. Fumadocs creates the `.source` folder automatically; never edit it.

## Documentation source of truth

- `content/docs` holds onboarding and integration guides.
- `openapi/panoptic.json` is a **curated** snapshot of Panoptic's FastAPI HTTP routes; do not claim this is auto-exported from a running backend.
- `npm run docs:api` generates interactive reference pages into `content/docs/api-reference/endpoints` from the checked-in schema.
- GitHub Actions checks that each documented operation still exists in `GNSISBACKEND/runtime/gnsis_runtime/gnsis_runtime/visual/api.py`, and fails if new HTTP routes were added without documentation.
- The product MCP adapter lives in `GNSISBACKEND/sdks/python`; these docs do not replace it.
- LLM-readable routes: `/llms.txt`, `/llms-full.txt`, and Markdown versions of individual pages.

## Deploying through Coolify

Create a **new application** from GitHub repo `aubincorinaldiecooper-bit/docs` with root/base directory `/site`. Build with Dockerfile `site/Dockerfile` (or `Dockerfile` relative to `/site`), expose port `3000`, and assign custom domain `https://docs.gnsis.studio`. Validate `/docs`, `/llms.txt`, `/llms-full.txt` and an OpenAPI endpoint after deployment.

The separate deploy workflow triggers after the documentation CI workflow succeeds on `main`, or by manual dispatch. Required **repository secrets in this docs repo**:

- `COOLIFY_URL` — self-hosted Coolify base URL.
- `COOLIFY_API_TOKEN` — token with deploy access.
- `COOLIFY_DOCS_APPLICATION_UUID` — UUID of the dedicated docs app; not the frontend/backend UUID.

The workflow triggers only the specific docs UUID using `POST /api/v1/deploy`. Existing GNSIS services must not be redeployed or modified by these changes.

DNS for `docs.gnsis.studio` must resolve to the existing Coolify reverse proxy. Keep GitHub source links while the docs app is pending publication.
