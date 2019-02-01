const fs = require("fs");
const util = require("util");
const mkdirp = require("mkdirp");

const createDir = util.promisify(mkdirp);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
  createDir,
  readFile,
  writeFile
};
