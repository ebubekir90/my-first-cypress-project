const fs = require('fs');
for (const p of ['@badeball/cypress-cucumber-preprocessor','@cypress/webpack-preprocessor','webpack','ts-loader']) {
  try {
    const pj = JSON.parse(fs.readFileSync('node_modules/' + p + '/package.json','utf8'));
    console.log(p, pj.version, '| peerDeps:', JSON.stringify(pj.peerDependencies || {}));
  } catch(e){ console.log(p, 'ERR', e.message); }
}
