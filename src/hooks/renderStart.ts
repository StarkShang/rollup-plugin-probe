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
        <section>
            ${describeHookMetaInfo("Render Start")}
            ${describeInputOptions(inputOptions)}
            ${describeOutputOptions(outputOptions)}
        </section>
    `);
}
