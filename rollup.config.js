const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const minify = require("rollup-plugin-babel-minify");
const commonjs = require("rollup-plugin-commonjs");
const builtins = require("rollup-plugin-node-builtins");
const json = require("rollup-plugin-json");

const { name: outputFileName, module: input } = require("./package.json");

const isProductionBuild = process.env.BUILD === "production";
const output = {};
const plugins = [resolve({ preferBuiltins: false }), babel(), commonjs(), json(), builtins()];

if (process.env.TARGET === "node") {
  output.format = "cjs";
  output.file = `lib/${outputFileName}.js`;
}

if (process.env.TARGET === "browser") {
  output.format = "iife";
  output.file = `dist/${outputFileName}${isProductionBuild ? ".min" : ""}.js`;
  output.name = "ExtraMark";
  output.sourcemap = !isProductionBuild;

  if (isProductionBuild) {
    plugins.push(minify());
  }
}

module.exports = { input, output, plugins };
