import { OutputOptions, PluginContext } from "rollup";
import moment from "moment";
import { Reporter, getValueInfo } from "../report";

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
        <section>
            <h3 style="margin:2em 0 0">
                Output Options
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
            ${optionInfo}
        </section>
    `);
}
