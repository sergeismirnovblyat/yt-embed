// ./src -> ./built.js -> ./bookmarklet.js

const fs = require('fs');
const built = fs.readFileSync('./built.js').toString();
const stuff = `(function() {${built}})()`;
const file = `javascript:${encodeURIComponent(stuff)}`;
fs.writeFileSync('./bookmarklet.js', file);
