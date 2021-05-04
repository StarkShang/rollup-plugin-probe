import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// @ts-ignore
import { DEFAULT_EXTENSIONS } from "@babel/core";
// @ts-ignore
import empty from "rollup-plugin-empty";
import cleanup from "rollup-plugin-cleanup";
import probe from "./src";
import pkg from "./package.json";

const extensions = [...DEFAULT_EXTENSIONS, ".ts"];

export default [
    {
        input: "src/index.ts",
        external: ["moment", "cheerio", "@babel/runtime/regenerator"],
        plugins: [
            empty({ silent: false, dir: "lib" }),
            babel({
                exclude: "node_modules/**",
                extensions,
            }),
            nodeResolve({
                extensions,
                modulesOnly: true,
            }),
            commonjs(),
            probe({
                hooks: {
                    options: {},
                    // buildStart: {},
                    load: {},
                    transform: {},
                    // buildEnd: {},
                    // outputOption: {},
                    // renderStart: {},
                    // renderChunk: {},
                    // generateBundle: { hideAsset: true },
                    // writeBundle: {},
                }
            }),
            cleanup(),
        ],
        output: [{
            file: pkg.main,
            format: "cjs",
            exports: "auto",
            sourcemap: true,
        }, {
            file: pkg.module,
            format: "es",
            exports: "auto",
            sourcemap: true,
        }],
        watch: {
            include: ["src/**/*"]
        }
    }
]
