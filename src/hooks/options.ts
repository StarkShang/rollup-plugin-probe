import { InputOption, InputOptions, MinimalPluginContext, Plugin } from "rollup";
import moment from "moment";
import { Reporter, getValueInfo } from "../report";
import { describePlugins } from "../report/plugin.describer";
import { describeHookMetaInfo } from "../report/hook.describer";

export interface OptionsProbeOptions {

}

export function optionsProbe(
    this: MinimalPluginContext,
    options: InputOptions,
    reporter: Reporter,
) {
    reporter.append(`
        <section style="box-shadow:0 0 3px 0 #ccc;border-radius:6px;padding:1em;margin:1em">
            ${describeHookMetaInfo("Options Hook")}
            ${getInputInfo(options.input)}
            ${describePlugins(options.plugins)}
        </section>
    `);
}

function getInputInfo(input?: InputOption) {
    return `
    <div>
        <h4 style="margin:0.5em 0 0">input</h4>
        ${getValueInfo(input)}
    </div>`;
}
