import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach } from "node:test";

export function createTempDir() {
  return mkdtemp(join(tmpdir(), "extramark-"));
}

export function removeTempDir(dir) {
  return rm(dir, { recursive: true, force: true });
}

export async function writeInputFile(dir, content) {
  const path = join(dir, "input.md");
  await writeFile(path, content);
  return path;
}

export function setupTempDir() {
  let tempDir;

  beforeEach(async () => {
    tempDir = await createTempDir();
  });

  afterEach(async () => {
    await removeTempDir(tempDir);
  });

  return () => tempDir;
}
