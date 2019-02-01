#!/usr/bin/env node

const path = require("path");
const program = require("commander");

const { logger } = require("./logger");
const { createDir, readFile, writeFile } = require("./util");
const { ExtraMark } = require("../lib/extramark");

program
  .description("CLI for converting Markdown documents to HTML with ExtraMark")
  .usage("<input> [options]")
  .option("-i --input [path]", "path of the input .md file")
  .option("-o --output [path]", "path of the output .html file")
  .option("-c --css [css]", "path to the CSS file to use for formatting")
  .option("-t --title [title]", "title of the output document")
  .option("-q --quiet", "omit console output")
  .parse(process.argv);

const convert = async program => {
  const input = {
    file: program.input || program.args[0] || process.stdin.fd
  };

  const output = {
    file: program.output || process.stdout.fd,
    dir: program.output ? path.dirname(program.output) : ""
  };

  logger.enabled = !program.quiet && output.file !== process.stdout.fd;

  try {
    input.data = await readFile(input.file, "utf-8");
  } catch (_) {
    logger.error(`read`, `Could not find input file \`${input.file}\`.`);
    return;
  }

  try {
    output.data = `
<!doctype html>
<meta charset="utf-8">
<title>${program.title || `Markdown document`}</title>
${program.css ? `<link rel="stylesheet" href="${program.css}">` : ``}
${await ExtraMark.render(input.data)}
    `;
  } catch (_) {
    logger.error(`parse`, `Could not parse input data.`);
    return;
  }

  try {
    await createDir(output.dir);
  } catch (_) {
    logger.error(`create`, `Could not create output dir \`${output.dir}\`.`);
    return;
  }

  try {
    await writeFile(output.file, output.data);
    logger.success(`create`, output.file);
  } catch (_) {
    logger.error(`create`, `Could not write output file \`${output.file}\`.`);
  }
};

convert(program);
