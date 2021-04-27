import { NormalizedOutputOptions, OutputBundle, PluginContext } from "rollup";
import { Reporter } from "@/report";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeOutputOptions } from "../report/outputOptions.describer";
import { describeBundle } from "../report/bundle.describer";

export interface WriteBundleProbeOptions {

}

export function writeBundleProbe(
    this: PluginContext,
    reporter: Reporter,
    options: NormalizedOutputOptions,
    bundle: OutputBundle,
) {
    reporter.append(`
    <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
        ${describeHookMetaInfo("Write Bundle Hook")}
        ${describeOutputOptions(options)}
        ${describeBundle(bundle, reporter)}
    </section>
    `);
}
