import { ChangeEvent, PluginContext } from "rollup";

export interface WatchChangeProbeOptions {

}

export function watchChangeProbe(
    this: PluginContext,
    id: string,
	change: { event: ChangeEvent }
) {

}
