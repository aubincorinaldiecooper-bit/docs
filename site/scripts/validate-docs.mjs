import fs from 'node:fs';
const read = p => fs.readFileSync(p, 'utf8');
const schema = JSON.parse(read('openapi/panoptic.json'));
if (!schema.openapi.startsWith('3.')) throw Error('Expected OpenAPI 3.x');
for (const [route, methods] of Object.entries(schema.paths)) {
  for (const [method, operation] of Object.entries(methods)) {
    if (!['get','post','put','delete','patch'].includes(method)) continue;
    if (!operation.operationId || !operation.responses) throw Error('Incomplete operation '+method+' '+route);
  }
}
const required = ['index','panoptic/quickstart','panoptic/mcp','panoptic/python','panoptic/typescript','gnsis-01/runs'].map(x=>'content/docs/'+x+'.mdx');
for (const file of required) if (!fs.existsSync(file)) throw Error('Missing page '+file);
const all = required.map(read).join('\n');
if (all.includes('sandbox.mintlify.com') || all.includes('OpenAPI Plant Store')) throw Error('Starter placeholders remain');
console.log('Documentation and OpenAPI validation passed ('+Object.keys(schema.paths).length+' API paths).');
