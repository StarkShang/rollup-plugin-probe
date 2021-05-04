import { promises, existsSync, mkdirSync } from "fs";
import { parse, resolve } from "path";
import { Describer } from "./describer";

export function getValueInfo(value: any): string | undefined {
    if (typeof value === "string") {
        return `<ul style="margin:0"><li>${value}</li></ul>`;
    } else if (Array.isArray(value)) {
        return `
        <ul style="margin:0">
            ${value.map(i => `<li>${i}</li>`)}
        </ul>`;
    } else if (value) {
        return `
        <ul style="margin:0">
            ${Object.keys(value).map(key => `<li>${key}:${value[key]}</li>`)}
        </ul>`;
    }
}

export class Reporter extends Describer {
    public outputPath = "";
    public describers: Describer[] = [];

    constructor() {
        super("index.html");
        this.describers.push(this);
    }

    public setOutputPath(path: string) {
        this.outputPath = path;
    }

    public registerDescriber(describer: Describer): Describer {
        this.describers.push(describer);
        return describer;
    }

    public async output() {
        await Promise.all(this.describers.map(async describer => {
            const reportFile = parse(resolve(this.outputPath, describer.filename));
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
