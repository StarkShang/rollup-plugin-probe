import chalk from "chalk";
import cheerio from "cheerio";
import { promises, existsSync, mkdirSync } from "fs";
import { basename, dirname, join, parse, resolve } from "path";
import { InputOptions, OutputChunk } from "rollup";

export class Reporter {
    public $ = cheerio.load("");
    public outputPath = "";
    public describers: Describer[] = [];

    constructor() {
        const mainDescriber = new Describer("index.html", this.$);
        this.describers.push(mainDescriber);
    }

    public setOutputPath(path: string) {
        this.outputPath = path;
    }

    public append(domString: string) {
        this.$("body").append(domString);
    }

    public registerChunkDescriber(chunk: OutputChunk): Describer {
        const $ = cheerio.load("");
        const outputFile = parse(chunk.fileName);
        const describer = new Describer(`${join(outputFile.dir, outputFile.name)}.html`, $);
        this.describers.push(describer);
        return describer;
    }

    public async output() {
        await Promise.all(this.describers.map(async describer => {
            const reportFile = parse(resolve(this.outputPath, describer.filename));
            console.log(reportFile);
            if (!existsSync(reportFile.dir)) {
                mkdirSync(reportFile.dir, { recursive:true });
            }
            await promises.writeFile(
                resolve(this.outputPath, describer.filename),
                describer.toString(),
                {
                    encoding: "utf8",
                }
            );
        }));
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

export class Describer {
    private $: cheerio.Root;

    public constructor(public filename: string, $?: cheerio.Root) {
        this.$ = $ || cheerio.load("");
    }

    public append(domString: string) {
        this.$("body").append(domString);
    }

    public toString() {
        return this.$.html();
    }
}
