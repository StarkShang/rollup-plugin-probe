import { join, parse } from "path";
import { OutputChunk, RenderedChunk } from "rollup";
import { Describer } from "./describer";

export class ChunkDescriber extends Describer {
    constructor(chunk: OutputChunk | RenderedChunk) {
        const outputFile = parse(chunk.fileName);
        super(`${join(outputFile.dir, outputFile.name)}.html`)
    }
}
