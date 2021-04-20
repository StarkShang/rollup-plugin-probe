import { InternalModuleFormat, PluginContext } from "rollup";

export interface ResolveFileUrlProbeOptions {

}

export function resolveFileUrlProbe(
    this: PluginContext,
	options: {
		assetReferenceId: string | null;
		chunkId: string;
		chunkReferenceId: string | null;
		fileName: string;
		format: InternalModuleFormat;
		moduleId: string;
		referenceId: string;
		relativePath: string;
	}
) {

}
