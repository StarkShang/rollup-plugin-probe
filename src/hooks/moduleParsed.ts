import { ModuleInfo, PluginContext } from "rollup";
import { Reporter } from "@/report";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeModule } from "../report/module.describer";

export interface ModuleParsedProbeOptions {
    match?: RegExp;  // regex to match modules
}

export function moduleParsedProbe(
    this: PluginContext,
    reporter: Reporter,
    module: ModuleInfo,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Module Parsed Hook")}
            ${describeModule(module)}
        </section>
    `);
}
