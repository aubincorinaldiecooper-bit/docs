import fs from 'node:fs';
const source = fs.readFileSync(process.argv[2] || '', 'utf8');
const contract = JSON.parse(fs.readFileSync('openapi/panoptic.json', 'utf8'));
const routePattern = /@app\.(get|post|put|delete|patch)\(\s*"([^"]+)"/g;
const declared = new Set();
for (const match of source.matchAll(routePattern)) {
  declared.add(match[1].toUpperCase()+' '+match[2]);
}
const documented = new Set();
for (const [url, verbs] of Object.entries(contract.paths)) {
  for (const verb of Object.keys(verbs)) {
    if (['get','post','put','delete','patch'].includes(verb)) documented.add(verb.toUpperCase()+' '+url);
  }
}
const missing = [...declared].filter(x=>!documented.has(x));
const invented = [...documented].filter(x=>!declared.has(x));
if (missing.length || invented.length) {
  console.error({missingFromDocs:missing,notImplemented:invented});
  process.exitCode = 1;
} else {
  console.log('Panoptic HTTP route parity passed ('+documented.size+' operations).');
}
