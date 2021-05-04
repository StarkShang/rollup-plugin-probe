import { NormalizedOutputOptions, OutputAsset, OutputBundle, OutputChunk, PluginContext } from "rollup";
import { Reporter } from "../report";
import { describeBundle } from "../report/bundle.describer";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeOutputOptions } from "../report/outputOptions.describer";

export interface GenerateBundleProbeOptions {
    hideAsset?: boolean;
    hideChunk?: boolean;
}

export interface GenerateBundleHookContext {
    context: PluginContext;
    options: NormalizedOutputOptions;
    bundle: OutputBundle;
    isWrite: boolean;
}

export function generateBundleProbe(
    context: GenerateBundleHookContext,
    reporter: Reporter,
    options: GenerateBundleProbeOptions,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Generate Bundle Hook")}
            ${describeOutputOptions(context.options)}
            ${describeBundle(context.bundle, reporter, options)}
        </section>
    `);
}
