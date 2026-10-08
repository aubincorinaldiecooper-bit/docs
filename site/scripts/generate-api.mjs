import { generateFiles } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';
const openapi = createOpenAPI({ input: ['./openapi/panoptic.json'] });
await generateFiles({ input: openapi, output: './content/docs/api-reference/endpoints', includeDescription: true, per: 'operation', meta: true, addGeneratedComment: true });
