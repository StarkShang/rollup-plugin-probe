import { NormalizedInputOptions, PluginContext } from "rollup";
import { Reporter } from "@/report";
import { describeInputOptions } from "../report/inputOptions.describer";
import { describeHookMetaInfo } from "../report/hook.describer";

export interface BuildStartProbeOptions {

}

export function buildStartProbe(
    this: PluginContext,
    options: NormalizedInputOptions,
    reporter: Reporter,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Build Start Hook")}
            ${describeInputOptions(options)}
        </section>
    `);
}
