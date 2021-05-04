require("ts-node").register({
    compilerOptions: {
        module: "CommonJS",
        allowJs: true,
    },
});

module.exports = require("./rollup.config.ts");
