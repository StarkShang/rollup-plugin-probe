import { TransformPluginContext } from "rollup";
import { Reporter } from "../report";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeCode } from "../report/code.describer";

export interface TransformProbeOptions {
    match?: RegExp;  // regex to match files
}

export function transformProbe(
    this: TransformPluginContext,
    code: string,
    id: string,
    reporter: Reporter,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Transform Hook")}
            <h4 style="margin:0.5em 0 0">
                <span style="background:#FFA754;color:white;border-radius:4px;margin-right:0.5em;padding:0.1em 0.5em">source</span>
                ${id}
            </h4>
            ${describeCode(code)}
        </section>
    `);
}
