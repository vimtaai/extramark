const minify = require("rollup-plugin-babel-minify");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const json = require("rollup-plugin-json");
const builtins = require("rollup-plugin-node-builtins");

const { name: outputFileName, module: input } = require("./package.json");

const isProductionBuild = process.env.BUILD === "production";
const output = { format: "es" };
const plugins = [commonjs(), resolve({ preferBuiltins: false }), json(), builtins()];

if (process.env.TARGET === "node") {
  output.file = `lib/${outputFileName}.js`;
}

if (process.env.TARGET === "browser") {
  output.file = `dist/${outputFileName}${isProductionBuild ? ".min" : ""}.js`;
  output.name = "ExtraMark";
  output.sourcemap = !isProductionBuild;

  if (isProductionBuild) {
    plugins.push(minify());
  }
}

module.exports = { input, output, plugins };
