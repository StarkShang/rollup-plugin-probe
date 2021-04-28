import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import probe from "../../src";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        {
            ...probe({
                hooks: {
                    options: {},
                    buildStart: {},
                    transform: {
                        match: /\.(css|woff|tff)/
                    },
                    moduleParsed: {
                        match: /\.(css|woff|tff)/
                    },
                    buildEnd: {},
                    outputOption: {},
                    renderStart: {},
                    renderChunk: {},
                    generateBundle: {},
                    writeBundle: {},
                }
            }),
            enforce: "pre"
        }
    ]
})
