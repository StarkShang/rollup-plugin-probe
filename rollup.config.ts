import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
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
        external: ["moment", "cheerio"],
        plugins: [
            empty({ silent: false, dir: "lib" }),
            nodeResolve({
                extensions,
                modulesOnly: true,
            }),
            babel({
                exclude: "node_modules/**",
                extensions,
                babelHelpers: "bundled",
            }),
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
        output: [
            { file: pkg.main, format: "cjs", exports: "auto" },
            { file: pkg.module, format: "es", exports: "auto" }
        ],
        watch: {
            include: ["src/**/*"]
        }
    }
]
