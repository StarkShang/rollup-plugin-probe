import { AcornNode, PluginContext } from "rollup";

export interface ResolveDynamicImportProbeOptions {

}

export function resolveDynamicImportProbe(
    this: PluginContext,
    specifier: string | AcornNode,
    importer: string,
) {

}
