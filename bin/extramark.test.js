import { strict as assert } from "node:assert";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, it } from "node:test";

import { createCliRunner } from "../test/cli-runner.js";
import { setupTempDir, writeInputFile } from "../test/temp-dir.js";

const cliPath = new URL("./extramark.js", import.meta.url).pathname;
const runCli = createCliRunner(cliPath);
const getTempDir = setupTempDir();

describe("extramark CLI", () => {
  it("renders Markdown to HTML with no options", async () => {
    const inputFile = await writeInputFile(getTempDir(), "# Heading");

    const result = await runCli([inputFile]);

    assert.equal(result.exitCode, 0);
    assert.ok(result.stdout.includes("<title>Markdown document</title>"));
    assert.match(result.stdout, /<h1[^>]*>Heading<\/h1>/);
  });

  it("fails with a clear error and exit 1 on a nonexistent input file", async () => {
    const inputFile = join(getTempDir(), "does-not-exist.md");

    const result = await runCli([inputFile]);

    assert.equal(result.exitCode, 1);
    assert.ok(result.stderr.includes(`Could not read input file '${inputFile}'`));
  });

  it("uses the --title option for the output document's title", async () => {
    const inputFile = await writeInputFile(getTempDir(), "# Heading");

    const result = await runCli([inputFile, "--title", "My Title"]);

    assert.ok(result.stdout.includes("<title>My Title</title>"));
  });

  it("uses the --css option to link a stylesheet in the output document", async () => {
    const inputFile = await writeInputFile(getTempDir(), "# Heading");

    const result = await runCli([inputFile, "--css", "style.css"]);

    assert.ok(result.stdout.includes('<link rel="stylesheet" href="style.css">'));
  });

  it("writes the rendered output to disk with -o, creating missing parent directories", async () => {
    const dir = getTempDir();
    const inputFile = await writeInputFile(dir, "# Heading");
    const outputFile = join(dir, "nested", "output.html");

    const result = await runCli([inputFile, "-o", outputFile]);

    assert.equal(result.exitCode, 0);
    const written = await readFile(outputFile, "utf-8");
    assert.match(written, /<h1[^>]*>Heading<\/h1>/);
  });

  it("logs a confirmation after writing with -o by default", async () => {
    const dir = getTempDir();
    const inputFile = await writeInputFile(dir, "# Heading");
    const outputFile = join(dir, "output.html");

    const result = await runCli([inputFile, "-o", outputFile]);

    assert.ok(result.stdout.includes(`Created: ${outputFile}`));
  });

  it("suppresses the confirmation with -o and --quiet", async () => {
    const dir = getTempDir();
    const inputFile = await writeInputFile(dir, "# Heading");
    const outputFile = join(dir, "output.html");

    const result = await runCli([inputFile, "-o", outputFile, "-q"]);

    assert.ok(!result.stdout.includes("Created:"));
  });

  it("fails with a clear error and exit 1 when -o's directory is blocked by an existing file", async () => {
    const dir = getTempDir();
    const blockerFile = join(dir, "blocker");
    await writeFile(blockerFile, "");
    const inputFile = await writeInputFile(dir, "# Heading");
    const outputFile = join(blockerFile, "output.html");

    const result = await runCli([inputFile, "-o", outputFile]);

    assert.equal(result.exitCode, 1);
    assert.ok(result.stderr.includes(`Could not write output file '${outputFile}'`));
  });
});
