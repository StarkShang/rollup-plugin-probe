import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import probe from "../../src";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        cssCodeSplit: true
    },
    plugins: [
        vue(),
        {
            ...probe({
                hooks: {
                    options: {},
                    buildStart: {},
                    transform: {},
                    buildEnd: {},
                    outputOption: {},
                    renderStart: {},
                    renderChunk: {},
                    generateBundle: {},
                    writeBundle: {},
                }
            }),
            enforce: "pre"
        },
    ]
})
