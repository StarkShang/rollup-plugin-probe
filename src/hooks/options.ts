import { InputOption, InputOptions, MinimalPluginContext, Plugin } from "rollup";
import moment from "moment";
import { Reporter, getValueInfo } from "../report";
import { describePlugins } from "../report/plugin.describer";

export interface OptionsProbeOptions {

}

export function optionsProbe(
    this: MinimalPluginContext,
    options: InputOptions,
    reporter: Reporter,
) {
    reporter.append(`
        <section>
            <h3 style="margin:2em 0 0">
                Options
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
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
