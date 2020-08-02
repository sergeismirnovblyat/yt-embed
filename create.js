// ./src -> ./built.js -> ./bookmarklet.js

const fs = require('fs');
const built = fs.readFileSync('./built.js').toString();
const file = `javascript:${built}`;
fs.writeFileSync('./bookmarklet.js', file);