import { NormalizedInputOptions, NormalizedOutputOptions, PluginContext } from "rollup";

export interface RenderStartProbeOptions {

}

export function renderStartProbe(
    this: PluginContext,
    outputOptions: NormalizedOutputOptions,
    inputOptions: NormalizedInputOptions
) {
    console.log("renderStart", outputOptions);
}
