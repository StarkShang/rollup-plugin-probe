import { join, parse } from "path";
import { OutputChunk } from "rollup";
import { Describer } from "./describer";

export class ChunkDescriber extends Describer {
    constructor(chunk: OutputChunk) {
        const outputFile = parse(chunk.fileName);
        super(`${join(outputFile.dir, outputFile.name)}.html`)
    }
}
