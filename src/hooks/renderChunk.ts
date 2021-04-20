import { NormalizedOutputOptions, PluginContext, RenderedChunk } from "rollup";

export interface RenderChunkProbeOptions {

}

export function renderChunkProbe(
    this: PluginContext,
    code: string,
    chunk: RenderedChunk,
    options: NormalizedOutputOptions
) {

}
