import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parse, render } from "./index.js";

describe("extramark", () => {
  describe("markdown-it-critic", () => {
    it("renders CriticMarkup additions as <ins>", () => {
      const input = "Lorem {++added++} dolor.";
      const expectedOutput = "<p>Lorem <ins>added</ins> dolor.</p>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses CriticMarkup additions as first-class tokens", () => {
      const input = "Lorem {++added++} dolor.";

      const tokens = parse(input, {});
      const inline = tokens.find((token) => token.type === "inline");
      const childTypes = inline.children.map((child) => child.type);

      assert.ok(childTypes.includes("critic_ins_open"));
    });
  });
});
