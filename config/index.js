const fs = require('fs');

const lastIndex = process.argv.length - 1;
const root = process.argv[lastIndex];

const indexHtml = `${root}/index.html`;
const indexHtmlControl = `${root}/../Control/index.html`;
const indexHtmlPath = fs.existsSync(indexHtml) ? indexHtml : indexHtmlControl;

module.exports = {
  root,
  indexHtmlPath
};
