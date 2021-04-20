import chalk from "chalk";
import cheerio from "cheerio";
import { promises } from "fs";
import { parse, resolve } from "path";
import { InputOptions } from "rollup";

export class Reporter {
    public $ = cheerio.load("");
    public outputPath = "";
    public entryName = "";

    constructor(options: InputOptions) {
        if (typeof options.input === "string") {
            this.entryName = parse(options.input).name;
        } else if (Array.isArray(options.input)) {
            if (options.input.length > 0) {
                this.entryName = parse(options.input[0]).name;
            }
        } else if (options.input) {
            const entries = Object.values(options.input);
            if (entries.length > 0) {
                this.entryName = parse(entries[0]).name;
            }
        }
    }

    public setOutputPath(path: string) {
        this.outputPath = path;
    }

    public append(domString: string) {
        this.$("body").append(domString)
    }

    public async output() {
        const outputPath = resolve(
            this.outputPath,
            this.entryName
                ? `${this.entryName}.report.html`
                : "report.html");
        console.log(chalk.blue("Generate reports to: ", outputPath));
        await promises.writeFile(
            outputPath,
            this.$.html(),
            {
                encoding: "utf8"
            }
        );
    }
}

export function getValueInfo(value: any) {
    if (typeof value === "string") {
        return `<ul style="margin:0"><li>${value}</li></ul>`;
    } else if (Array.isArray(value)) {
        return `
        <ul>
            ${value.map(i => `<li>${i}</li>`)}
        </ul>`;
    } else if (value) {
        return `
        <ul style="margin:0">
            ${Object.keys(value).map(key => `<li>${key}:${value[key]}</li>`)}
        </ul>`;
    }
}
