import { NormalizedInputOptions, NormalizedOutputOptions, PluginContext } from "rollup";
import { Reporter } from "@/report";
import { describeInputOptions } from "../report/inputOptions.describer";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeOutputOptions } from "../report/outputOptions.describer";

export interface RenderStartProbeOptions {

}

export function renderStartProbe(
    this: PluginContext,
    reporter: Reporter,
    outputOptions: NormalizedOutputOptions,
    inputOptions: NormalizedInputOptions,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Render Start Hook")}
            ${describeInputOptions(inputOptions)}
            ${describeOutputOptions(outputOptions)}
        </section>
    `);
}
