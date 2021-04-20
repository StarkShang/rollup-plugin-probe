import typescript from "rollup-plugin-typescript2";
import empty from "rollup-plugin-empty";
import cleanup from "rollup-plugin-cleanup";
import pkg from "./package.json";

export default [
    {
        input: "src/index.ts",
        external: ["ms"],
        plugins: [
            empty({ silent: false, dir: "lib" }),
            typescript(),
            cleanup(),
        ],
        output: [
            { file: pkg.main, format: "cjs" },
            { file: pkg.module, format: "es" }
        ]
    }
]
