# ExtraMark

[![NPM version 0.1.0](https://img.shields.io/badge/npm-0.1.0-blue.svg)](https://npmjs.com/package/extramark)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/vimtaai/extramark/blob/master/LICENSE.md)

> CommonMark superset with the most widely used syntax extensions

## About

**ExtraMark** is a superset of [CommonMark](https://commonmark.org/) that includes syntax extensions that are commonly used by other Markdown dialects. The list and syntax for the extensions are decided by looking at the most popular Markdown dialects and selecting the most common syntax for each feature. The goal of the project is to create a (somewhat) standard superset of CommonMark that supports the features that are requested by most.

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
- Integrated CLI tool for command-line conversion to HTML

[typographer]: https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
[table]: https://github.github.com/gfm/#tables-extension-
[anchor]: https://www.npmjs.com/package/markdown-it-anchor
[deflist]: https://github.com/markdown-it/markdown-it-deflist
[superscript]: https://github.com/markdown-it/markdown-it-sup
[subscript]: https://github.com/markdown-it/markdown-it-sub
[abbreviation]: https://github.com/markdown-it/markdown-it-abbr

## Usage

### NodeJS

### CLI

### Browser

## Prerequisites

You need to have [Node.js](https://nodejs.org) installed on your computer to use the CLI tool.

## Contributing

All ideas, recommendations, bug reports, pull requests are welcome. :smile:
