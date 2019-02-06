# ExtraMark

[![NPM version 0.1.0](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://npmjs.com/package/extramark)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/vimtaai/extramark/blob/master/LICENSE.md)

> CommonMark superset with the most widely used syntax extensions

## About

**ExtraMark** is a superset of [CommonMark](https://commonmark.org/) that includes syntax extensions that are commonly used by other Markdown dialects. The list and syntax for the extensions are decided by looking at the most popular Markdown dialects and selecting the most common syntax for each feature. The goal of the project is to create a (somewhat) standard superset of CommonMark that supports the features that are requested by most. The parser is based on [markdown-it](https://github.com/markdown-it/markdown-it) and uses plugins for syntax extensions.

## Features

- Defined clearly as a superset of CommonMark
- Syntax extensions
  - [Automatic typographic replacements][typographer]
  - [Tables][table]
  - [Anchors for headings][anchor] (up to heading level 3)
  - [Definition lists][deflist]
  - [Superscript][superscript]
  - [Subscript][subscript]
  - [Abbreviations][abbreviation]
  - [Footnotes][footnote]
  - [Critic Markup][critic-markup]
- Integrated CLI tool for command-line conversion to HTML

[typographer]: https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
[table]: https://help.github.com/articles/organizing-information-with-tables/
[anchor]: https://github.com/valeriangalliat/markdown-it-anchor
[deflist]: https://github.com/markdown-it/markdown-it-deflist
[superscript]: https://github.com/markdown-it/markdown-it-sup
[subscript]: https://github.com/markdown-it/markdown-it-sub
[abbreviation]: https://github.com/markdown-it/markdown-it-abbr
[footnote]: https://github.com/markdown-it/markdown-it-footnote
[critic-markup]: http://criticmarkup.com/

## Usage

The ExtraMark parser can be used to transform Markdown code into HTML. You can use the parser in both NodeJS and browser environments.

### NodeJS

The `extramark` package includes a CommonJS build in the `lib` folder. To use the ExtraMark parser in NodeJS you have to install it as a local dependency.

```bash
npm install extramark
```

The `extramark` module has a single named export called `ExtraMark`. This object exposes a `.parse(input)` and a `.render(input)` method. The `parse` method creates an abstract syntax tree from the input while the `render` method generates the output HTML. (see [markdown-it](https://github.com/markdown-it/markdown-it))

```js
const { ExtraMark } = require("extramark");

const html = ExtraMark.render("# Heading");
```

### CLI

To transform documents in the command line you have to install the `extramark` package globally.

```bash
npm install -g extramark
```

After the installation the `extramark` command becomes available. The command can be used to transform the input text (file or `stdin`) to HTML (file or `stdout`).

```bash
extramark input.md -o output.html -c style.css
```

To see all options of the `extramark` see it's help:

```bash
extramark --help
```

### Browser

The `extramark` package includes a browser build in [IIFE]() format in the `dist` folder. You can include the production (`extramark.min.js`) or development (`extramark.js`) builds in your HTML. The scripts expose the ExtraMark object into the global scope.

```html
<script src="path/to/extramark.min.js"></script>
<script>
  const html = ExtraMark.render("# Heading");
</script>
```

The recommended way to add `extramark` to you site from a CDN like [jsdelivr](https://www.jsdelivr.com/package/npm/extramark) or [unpkg](https://unpkg.com/extramark).

## Prerequisites

You need to have [NodeJS](https://nodejs.org) installed on your computer to use the CLI tool.

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. :smile:
