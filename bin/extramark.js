#!/usr/bin/env node

import { error, log } from "node:console";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { argv, exit, stdin, stdout } from "node:process";
import { styleText } from "node:util";

import { program } from "commander";
import { html } from "common-tags";

import { render } from "../src/index.js";

program
  .description("CLI for converting Markdown documents to HTML with ExtraMark")
  .usage("<input> [options]")
  .option("-o --output [path]", "path of the output .html file")
  .option("-c --css [css]", "path to the CSS file to use for formatting")
  .option("-t --title [title]", "title of the output document")
  .option("-q --quiet", "omit console output")
  .parse(argv);

const options = program.opts();
const inputFile = program.args[0];
const outputFile = options.output;
const data = {};

try {
  if (inputFile) {
    data.raw = await readFile(inputFile, "utf-8");
  } else {
    const buffer = await Array.fromAsync(stdin);
    data.raw = buffer.toString();
  }
} catch {
  error(`${styleText("red", "!")} Could not read input file '${inputFile}'.`);
  exit(1);
}

try {
  data.parsed = html`
    <!DOCTYPE html>
    <meta charset="utf-8" />
    <title>${program.title || `Markdown document`}</title>
    ${program.css ? `<link rel="stylesheet" href="${program.css}">` : ``} ${await render(data.raw)}
  `;
} catch {
  error(`${styleText("red", "!")} Could not parse input data.`);
  exit(1);
}

try {
  if (outputFile) {
    await mkdir(dirname(outputFile), { recursive: true });
    await writeFile(outputFile, data.parsed);
  } else {
    stdout.write(data.parsed + "\n");
  }

  if (outputFile && !options.quiet) {
    log(`${styleText("green", "✔")} Created: ${outputFile}`);
  }
} catch (e) {
  error(`${styleText("red", "!")} Could not write output file '${outputFile}'.`, e);
  exit(1);
}
