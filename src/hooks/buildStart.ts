import { NormalizedInputOptions, PluginContext } from "rollup";

export interface BuildStartProbeOptions {

}

export function buildStartProbe(
    this: PluginContext,
    options: NormalizedInputOptions
) {
    console.log("buildStart", options);
}
