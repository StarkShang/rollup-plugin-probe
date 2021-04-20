import { rollup } from "rollup";
import path from "path";
import probe from "../src";

rollup({
    input: path.resolve(__dirname, "src/main.ts"),
    plugins: [
        probe({ generateBundle: {} })
    ],
}).then(build => {
    build.write({
        dir: path.resolve(__dirname, "dist")
    });
});
