import { PluginContext } from "rollup";
import { Reporter } from "../report";
import { describeHookMetaInfo } from "../report/hook.describer";

export interface LoadProbeOptions {
    match?: RegExp;  // regex to match modules
}

export interface LoadHookContext {
    context: PluginContext;
    id: string;
}

export function loadProbe(
    context: LoadHookContext,
    reporter: Reporter,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Load Hook")}
            <h4 style="margin:0">
                <span style="background:#FFA754;color:white;border-radius:4px;margin-right:0.5em;padding:0.1em 0.5em">source</span>
                ${context.id}
            </h4>
        </section>
    `);
}
