import MarkdownIt from "markdown-it";

import anchor from "markdown-it-anchor";
import deflist from "markdown-it-deflist";
import container from "markdown-it-container";

import { anchorConfig } from "./config/anchor";
import { containerConfig } from "./config/container";

const parser = new MarkdownIt("commonmark");

parser.set({ linkify: true }).set({ typographer: true });
parser
  .enable("linkify")
  .enable("strikethrough")
  .enable("smartquotes")
  .enable("replacements")
  .enable("table");
parser
  .use(anchor, anchorConfig)
  .use(deflist)
  .use(container, "", containerConfig);

export const ExtraMark = {
  parse: parser.parse.bind(parser),
  render: parser.render.bind(parser)
};
