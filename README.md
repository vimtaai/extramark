# ExtraMark

[![License][license-badge]][license-link]
[![Version][version-badge]][version-link]
[![Build][build-badge]][build-link]

Superset of [CommonMark](https://commonmark.org/) that includes syntax extensions that are commonly used by other Markdown dialects. The list and syntax for the extensions are decided by looking at the most popular Markdown dialects and selecting the most common syntax for each feature. The goal of the project is to create a (somewhat) standard superset of CommonMark that supports the features that are requested by most. The parser is based on [markdown-it](https://github.com/markdown-it/markdown-it) and uses plugins for syntax extensions.

## Setup

Install via `npm`:

```bash
npm install extramark
```

## Usage

The `extramark` package exposes two functions, `parse()` and `render()`. The `parse()` function creates an abstract syntax tree from the input while the `render()` function returns the generated HTML code (see [markdown-it](https://github.com/markdown-it/markdown-it)).

```js
const { parse, render } = require("extramark");

parse("# Heading");
// [Object] - AST of the Markdown code

render("# Heading");
// <h1>Heading</h1>
```

In a browser environment you can access the `parse()` and `render()` functions via the `ExtraMark` global object.

```js
const { parse, render } = ExtraMark;
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

### Features

- Defined clearly as a superset of CommonMark
- Syntax extensions
  - [Automatic typographic replacements][typographer]
  - [Tables][table]
  - [Anchors for headings][anchor] (up to heading level 3)
  - [Definition lists][definition-list]
  - [Superscript][superscript]
  - [Subscript][subscript]
  - [Abbreviations][abbreviation]
  - [Footnotes][footnote]
  - [Critic Markup][critic-markup]
- Integrated CLI tool for command-line conversion to HTML

[typographer]: https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
[table]: https://help.github.com/articles/organizing-information-with-tables/
[anchor]: https://github.com/valeriangalliat/markdown-it-anchor
[definition-list]: https://github.com/markdown-it/markdown-it-deflist
[superscript]: https://github.com/markdown-it/markdown-it-sup
[subscript]: https://github.com/markdown-it/markdown-it-sub
[abbreviation]: https://github.com/markdown-it/markdown-it-abbr
[footnote]: https://github.com/markdown-it/markdown-it-footnote
[critic-markup]: http://criticmarkup.com/

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. 😊

[license-badge]: https://img.shields.io/npm/l/extramark.svg
[license-link]: https://github.com/vimtaai/extramark/blob/master/LICENSE.md
[version-badge]: https://img.shields.io/npm/v/extramark.svg
[version-link]: https://npmjs.com/package/extramark
[build-badge]: https://github.com/vimtaai/extramark/actions/workflows/main.yaml/badge.svg
[build-link]: https://github.com/vimtaai/extramark/actions/workflows/main.yaml
