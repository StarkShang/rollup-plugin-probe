import { InternalModuleFormat, PluginContext } from "rollup";

export interface RenderDynamicImportProbeOptions {

}

export function renderDynamicImportProbe(
    this: PluginContext,
    options: {
        customResolution: string | null;
        format: InternalModuleFormat;
        moduleId: string;
        targetModuleId: string | null;
    }
) {

}
