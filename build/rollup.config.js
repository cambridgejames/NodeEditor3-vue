"use strict";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import path from "path";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import vue from "rollup-plugin-vue";

import pkg from "../package.json";

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
        preprocessStyles: true,
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
        include: [
          "packages/**/*.css",
          "packages/**/*.scss",
          "packages/**/*.sass"
        ],
        output: "./lib/bundle.min.css",
        outputStyle: "compressed",
        failOnError: true
      })
    ],
    external: [
      "vue"
    ]
  }
];
