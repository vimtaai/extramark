import path from "path";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

import { name, module as input } from "./package.json";

const output = {};

if (process.env.TARGET === "node") {
  const filename = name + ".js";

  output.format = "cjs";
  output.file = path.join("lib", filename);
}

if (process.env.TARGET === "browser") {
  const filename = name + (process.env.BUILD === "production" ? ".min" : "") + ".js";

  output.format = "iife";
  output.file = path.join("dist", filename);
  output.name = name;
  output.sourcemap = process.env.BUILD !== "production";
}

const plugins = [resolve(), builtins(), commonjs(), json()];

if (process.env.BUILD === "production") {
  plugins.push(terser());
}

const watch = { include: "src/**" };

export default {
  input,
  output,
  plugins,
  watch
};
