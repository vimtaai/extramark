#!/usr/bin/env node

import path from "node:path";
import fs from "node:fs/promises";
import process from "node:process";
import program from "commander";

import { html } from "common-tags";
import { render } from "../src/index.js";
import { logger } from "./utils/logger.js";

program
  .description("CLI for converting Markdown documents to HTML with ExtraMark")
  .usage("<input> [options]")
  .option("-i --input [path]", "path of the input .md file")
  .option("-o --output [path]", "path of the output .html file")
  .option("-c --css [css]", "path to the CSS file to use for formatting")
  .option("-t --title [title]", "title of the output document")
  .option("-q --quiet", "omit console output")
  .parse(process.argv);

async function convert(program) {
  const input = {
    file: program.input || program.args[0] || process.stdin.fd,
  };

  const output = {
    dir: program.output ? path.dirname(program.output) : "",
    file: program.output || process.stdout.fd,
  };

  if (program.quiet || output.file === process.stdout.fd) {
    logger.disable();
  }

  try {
    logger.await("Reading input...");
    input.data = await fs.readFile(input.file, "utf-8");
  } catch (err) {
    logger.error(`Could not read input file \`${input.file}\`.\n`, err);
    return;
  }

  try {
    logger.await("Generating output...");
    output.data = html`
      <!DOCTYPE html>
      <meta charset="utf-8" />
      <title>${program.title || `Markdown document`}</title>
      ${program.css ? `<link rel="stylesheet" href="${program.css}">` : ``}
      ${await render(input.data)}
    `;
  } catch (err) {
    logger.error(`Could not parse input data.\n`, err);
    return;
  }

  try {
    await fs.mkdir(output.dir, { recursive: true });
  } catch (err) {
    logger.error(`Could not create output dir \`${output.dir}\`.\n`, err);
    return;
  }

  try {
    logger.await("Writing output...");
    await fs.writeFile(output.file, output.data);
    logger.success(`Created: ${output.file}`);
  } catch (err) {
    logger.error(`Could not write output file \`${output.file}\`.\n`, err);
  }
}

convert(program);
