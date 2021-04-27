import { NormalizedOutputOptions, PluginContext, RenderedChunk } from "rollup";
import { Reporter } from "@/report";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeOutputOptions } from "../report/outputOptions.describer";
import { describeCode } from "../report/code.describer";
import { describeChunk } from "../report/bundle.describer";

export interface RenderChunkProbeOptions {

}

export function renderChunkProbe(
    this: PluginContext,
    reporter: Reporter,
    code: string,
    chunk: RenderedChunk,
    options: NormalizedOutputOptions
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Render Chunk Hook")}
            ${describeOutputOptions(options)}
            ${describeChunk(chunk, reporter)}
            ${describeCode(code)}
        </section>
    `);
}
