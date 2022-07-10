"use strict";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import path from "path";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "../package.json";

import scss from "rollup-plugin-scss";

const deps = Object.keys(pkg.dependencies);
const vue = require("rollup-plugin-vue");

export default [
  {
    input: path.resolve(__dirname, "../packages/index.ts"),
    output: [
      {
        format: "es",
        file: pkg.module
      }
    ],
    plugins: [
      terser(),
      nodeResolve(),
      vue({
        target: "browser",
        css: false,
        exposeFilename: false
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true
          },
          include: [
            "packages/**/*",
            "typings/shims-vue.d.ts"
          ],
          exclude: [
            "node_modules",
            "packages/**/__tests__/*"
          ]
        },
        abortOnError: false
      }),
      scss({
        output: false
      })
    ],
    external(id) {
      return /^vue/.test(id) || deps.some(k => new RegExp("^" + k).test(id));
    }
  }
];
