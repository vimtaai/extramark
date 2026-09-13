import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { createCliRunner } from "../test/cli-runner.js";
import { setupTempDir, writeInputFile } from "../test/temp-dir.js";

const cliPath = new URL("./extramark.js", import.meta.url).pathname;
const runCli = createCliRunner(cliPath);
const getTempDir = setupTempDir();

describe("extramark CLI", () => {
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
});
