# GNSIS Developer Documentation

This repository contains the **self-hosted developer documentation portal for GNSIS and Panoptic**. The production target is [docs.gnsis.studio](https://docs.gnsis.studio).

The documentation application is a standalone **Next.js + Fumadocs + MDX** app in `site/`. Fumadocs is the canonical docs system. **Do not reintroduce Mintlify, its CLI, `docs.json`, or Mintlify-specific MDX components.** The docs site is a separate deployment and must not redeploy or modify the GNSIS frontend/backend services.

## Start here

Requirements: Node.js 22+ and npm.

```bash
cd site
npm install
npm run dev
```

Open `http://localhost:3000/docs`.

Before submitting changes, run:

```bash
cd site
npm run test:docs
npm run build
npm run typecheck
```

The `predev` and `prebuild` hooks run `npm run docs:api` automatically. The generated Fumadocs `.source/` directory and generated API endpoint pages are build artifacts; do not edit them by hand.

## What this project owns

- Public developer documentation for Panoptic's HTTP API and integrations.
- Panoptic Python and TypeScript SDK guides.
- Panoptic MCP integration documentation.
- GNSIS 01 API documentation.
- Interactive API reference generated from the checked-in OpenAPI snapshot.
- Search, page-level Markdown views, Open Graph images, and LLM-readable documentation routes.
- Container build and dedicated Coolify deployment for `docs.gnsis.studio`.

This repository documents these products; it is not the GNSIS runtime, does not implement the product MCP adapter, and is not a replacement for backend API source code.

## Architecture and source of truth

| Path | Responsibility |
| --- | --- |
| `site/app/` | Next.js App Router: docs pages/layout, search, Markdown/LLM routes, and OG images |
| `site/components/` | Fumadocs MDX and interactive OpenAPI page components |
| `site/lib/source.ts` | Fumadocs content source and LLM document helpers |
| `site/lib/openapi.ts` | OpenAPI integration used to render interactive API reference pages |
| `site/lib/shared.ts` | Shared site metadata, GitHub source links, and URL helpers |
| `site/content/docs/` | Authored MDX documentation and navigation metadata |
| `site/openapi/panoptic.json` | Curated snapshot of Panoptic HTTP routes used to generate reference pages |
| `site/scripts/generate-api.mjs` | Generates API reference MDX from the checked-in OpenAPI snapshot |
| `site/scripts/validate-docs.mjs` | Validates documentation content and required metadata |
| `site/scripts/verify-api-routes.mjs` | Checks documented HTTP operations against backend route source |
| `.github/workflows/docs-ci.yml` | Documentation validation, API route parity, build, and typecheck |
| `.github/workflows/docs-deploy.yml` | Dedicated Coolify deployment trigger |

### API reference rules

- Treat `site/openapi/panoptic.json` as a **curated, checked-in snapshot**. Do not describe it as automatically exported from a running backend.
- Edit the OpenAPI snapshot and generator inputs, not generated endpoint MDX under `site/content/docs/api-reference/endpoints/`.
- Keep documented operations in parity with `GNSISBACKEND/runtime/gnsis_runtime/gnsis_runtime/visual/api.py`. CI should catch both documented operations that no longer exist and backend routes that lack documentation.
- When backend routes change, update the schema/docs deliberately and verify the CI parity check. Do not invent request fields, authentication behavior, status codes, or response examples.
- The MCP adapter itself remains in `GNSISBACKEND/sdks/python`; this docs repository describes its integration but does not replace it.

### LLM-readable output

The app exposes `/llms.txt`, `/llms-full.txt`, and Markdown representations of individual docs pages. When changing source configuration, page routing, or content generation, verify these outputs as well as the normal `/docs` pages.

## Content conventions for agents

1. Read the relevant existing MDX pages, `meta.json` navigation files, and scripts before changing content or navigation.
2. Use Fumadocs/MDX conventions supported by the installed dependencies. Never copy Mintlify components such as `<CardGroup>`, `<ParamField>`, or Mintlify frontmatter conventions without verifying compatibility.
3. Give every page the frontmatter fields expected by the validator—at minimum a clear title and description—and update the appropriate navigation metadata when adding, moving, or removing pages.
4. Prefer accurate, tested examples. Mark placeholders explicitly; never fabricate live endpoints, credentials, SDK behavior, benchmarks, or deployment state.
5. Keep product implementation separate from documentation. Make changes to this repository unless a task explicitly requires a coordinated change in a product repository.
6. Do not commit secrets, local environment files, generated output, or `node_modules`.
7. Keep changes focused. Do not silently change the production domain, Coolify application UUID, CI gates, or deployment behavior.

## CI and deployment

The CI workflow uses Node.js 22 and runs the docs validator, API route parity verification against the GNSIS backend source, production build, and TypeScript checks. A green local build does not prove the production site is deployed or DNS/TLS are healthy; check those separately.

The production image is built from `site/Dockerfile` with the application root set to `site/`, and listens on port `3000`. Coolify should use a **dedicated docs application** for this repository and domain. Do not reuse the frontend/backend application UUID.

The deployment workflow requires these repository secrets:

- `COOLIFY_URL` — base URL of the self-hosted Coolify instance.
- `COOLIFY_API_TOKEN` — token with permission to trigger deployments.
- `COOLIFY_DOCS_APPLICATION_UUID` — UUID of the docs application only.

The workflow triggers the docs UUID through Coolify's deploy API after CI succeeds on `main`, or through manual workflow dispatch. It must not trigger deployments for unrelated services. DNS for `docs.gnsis.studio` must point to the existing Coolify reverse proxy.

## Agent workflow

For any task:

1. Inspect the current source and relevant Git history before editing.
2. State the intended scope and files likely to change.
3. Make the smallest coherent change; preserve the existing Fumadocs architecture.
4. Run `npm run test:docs`, `npm run build`, and `npm run typecheck` from `site/` when the environment permits.
5. Review the diff for inaccurate claims, broken relative links, missing navigation metadata, generated files, secrets, and unrelated changes.
6. Report exactly what changed and which checks ran. Distinguish passed, failed, skipped, and not run.
7. Do not claim a push, deployment, or production verification succeeded unless the corresponding tool or check confirms it.

## Explicitly out of scope

BayAnalytics and BayStFirm are separate projects and must not be included, linked as components, or described as part of GNSIS/Panoptic in this repository. A possible future shared vision capability does not make those products part of this documentation project.
