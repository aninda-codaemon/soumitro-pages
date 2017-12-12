const fs = require('fs');
const childProcess = require('child_process');

const lastIndex = process.argv.length - 1;
const root = process.argv[lastIndex];

const indexHtml = `${root}/index.html`;
const indexHtmlControl = `${root}/../Control/index.html`;
const indexHtmlPath = fs.existsSync(indexHtml) ? indexHtml : indexHtmlControl;

const gitInfo = {
  origin: childProcess.execSync('git remote -v').toString().split('\n')[1].trim(),
  branch: childProcess.execSync('git status').toString().split('\n')[0].trim(),
};

module.exports = {
  root,
  indexHtmlPath,
  gitInfo,
};
