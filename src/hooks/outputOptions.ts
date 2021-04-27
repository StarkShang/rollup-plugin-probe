import { OutputOptions, PluginContext } from "rollup";
import { Reporter, getValueInfo } from "../report";
import { describeHookMetaInfo } from "../report/hook.describer";

export interface OutputOptionsProbeOptions {

}

export function outputOptionsProbe(
    this: PluginContext,
    options: OutputOptions,
    reporter: Reporter,
) {
    const optionInfo = Object.keys(options).map(key => {
        return `
        <div>
            <h4 style="margin:0.5em 0 0">${key}</h4>
            ${getValueInfo((options as Record<string, any>)[key])}
        </div>`;
    });
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Output Options Hook")}
            ${optionInfo}
        </section>
    `);
}
