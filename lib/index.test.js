import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

import { parse, render } from "./index.js";

function inlineChildTypes(tokens) {
  const inline = tokens.find((token) => token.type === "inline");
  return inline.children.map((child) => child.type);
}

function topLevelTypes(tokens) {
  return tokens.map((token) => token.type);
}

describe("extramark", () => {
  describe("markdown-it-critic", () => {
    it("renders CriticMarkup additions as <ins>", () => {
      const input = "Lorem {++added++} dolor.";
      const expectedOutput = "<p>Lorem <ins>added</ins> dolor.</p>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses CriticMarkup additions as first-class tokens", () => {
      const input = "Lorem {++added++} dolor.";

      const childTypes = inlineChildTypes(parse(input, {}));

      assert.ok(childTypes.includes("critic_ins_open"));
    });
  });

  describe("markdown-it-abbr", () => {
    it("renders abbreviations as <abbr>", () => {
      const input = "*[HTML]: HyperText Markup Language\n\nHTML is great.";
      const expectedOutput =
        '<p><abbr title="HyperText Markup Language">HTML</abbr> is great.</p>\n';

      assert.equal(render(input), expectedOutput);
    });

    it("parses abbreviations as first-class tokens", () => {
      const input = "*[HTML]: HyperText Markup Language\n\nHTML is great.";

      const childTypes = inlineChildTypes(parse(input, {}));

      assert.ok(childTypes.includes("abbr_open"));
    });
  });

  describe("markdown-it-anchor", () => {
    it("renders heading anchors with an id", () => {
      const input = "# My Heading";
      const expectedOutput = '<h1 id="my-heading" tabindex="-1">My Heading</h1>\n';

      assert.equal(render(input), expectedOutput);
    });

    it("parses headings with an id attribute", () => {
      const input = "# My Heading";

      const tokens = parse(input, {});
      const heading = tokens.find((token) => token.type === "heading_open");

      assert.equal(heading.attrGet("id"), "my-heading");
    });
  });

  describe("markdown-it-deflist", () => {
    it("renders definition lists as <dl>", () => {
      const input = "Term\n: Definition";
      const expectedOutput = "<dl>\n<dt>Term</dt>\n<dd>Definition</dd>\n</dl>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses definition lists as first-class tokens", () => {
      const input = "Term\n: Definition";

      const types = topLevelTypes(parse(input, {}));

      assert.ok(types.includes("dl_open"));
    });
  });

  describe("markdown-it-footnote", () => {
    it("renders footnotes with backrefs", () => {
      const input = "Note.[^1]\n\n[^1]: Footnote text.";

      const output = render(input);

      assert.ok(output.includes('class="footnote-ref"'));
      assert.ok(output.includes('class="footnote-item"'));
    });

    it("parses footnote references as first-class tokens", () => {
      const input = "Note.[^1]\n\n[^1]: Footnote text.";

      const childTypes = inlineChildTypes(parse(input, {}));

      assert.ok(childTypes.includes("footnote_ref"));
    });
  });

  describe("markdown-it-sub", () => {
    it("renders subscript as <sub>", () => {
      const input = "H~2~O";
      const expectedOutput = "<p>H<sub>2</sub>O</p>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses subscript as first-class tokens", () => {
      const input = "H~2~O";

      const childTypes = inlineChildTypes(parse(input, {}));

      assert.ok(childTypes.includes("sub_open"));
    });
  });

  describe("markdown-it-sup", () => {
    it("renders superscript as <sup>", () => {
      const input = "29^th^";
      const expectedOutput = "<p>29<sup>th</sup></p>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses superscript as first-class tokens", () => {
      const input = "29^th^";

      const childTypes = inlineChildTypes(parse(input, {}));

      assert.ok(childTypes.includes("sup_open"));
    });
  });

  describe("typographic replacements", () => {
    it("renders (c)/--/... in their typographic form", () => {
      const input = "(c) 2024";
      const expectedOutput = "<p>© 2024</p>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses replacements into the text token's content", () => {
      const input = "(c) 2024";

      const tokens = parse(input, {});
      const inline = tokens.find((token) => token.type === "inline");
      const text = inline.children.find((child) => child.type === "text");

      assert.equal(text.content, "© 2024");
    });
  });

  describe("table syntax", () => {
    it("renders tables as <table>", () => {
      const input = "| a |\n| - |\n| 1 |";
      const expectedOutput =
        "<table>\n<thead>\n<tr>\n<th>a</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n" +
        "</tr>\n</tbody>\n</table>\n";

      assert.equal(render(input), expectedOutput);
    });

    it("parses tables as first-class tokens", () => {
      const input = "| a |\n| - |\n| 1 |";

      const types = topLevelTypes(parse(input, {}));

      assert.ok(types.includes("table_open"));
    });
  });
});
