import { InternalModuleFormat, PluginContext } from "rollup";

export interface ResolveImportMetaProbeOptions {

}

export function resolveImportMetaProbe(
    this: PluginContext,
	prop: string | null,
	options: { chunkId: string; format: InternalModuleFormat; moduleId: string }
) {

}
