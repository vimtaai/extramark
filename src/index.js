import MarkdownIt from "markdown-it";

import anchor from "markdown-it-anchor";
import deflist from "markdown-it-deflist";
import sup from "markdown-it-sup";
import sub from "markdown-it-sub";

const parser = new MarkdownIt("commonmark");

parser.set({ linkify: true }).set({ typographer: true });
parser.enable("replacements").enable("table");
parser
  .use(anchor, [1, 2, 3])
  .use(deflist)
  .use(sup)
  .use(sub);

export const ExtraMark = {
  parse: parser.parse.bind(parser),
  render: parser.render.bind(parser)
};
