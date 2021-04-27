import { Reporter } from "@/report";
import { PluginContext } from "rollup";

export interface BuildEndProbeOptions {

}

export function buildEndProbe(
    this: PluginContext,
    reporter: Reporter,
    err?: Error,
) {
    console.log("buildEnd", err);
}
