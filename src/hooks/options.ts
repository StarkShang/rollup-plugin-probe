import { InputOption, InputOptions, MinimalPluginContext, Plugin } from "rollup";
import moment from "moment";
import { Reporter } from "../report";

export interface OptionsProbeOptions {

}

export function optionsProbe(
    this: MinimalPluginContext,
    options: InputOptions,
    reporter: Reporter,
) {
    reporter.append(`
        <section>
            <h3>
                Options
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
            ${getInputInfo(options.input)}
            ${getPluginInfos(options.plugins)}
        </section>
    `);
}

function getInputInfo(input?: InputOption) {
    if (typeof input === "string") {
        return `<div>input: ${input}</div>`;
    } else if (Array.isArray(input)) {
        return `<div>input:
            <ul>
                ${input.map(i => `<li>${i}</li>`)}
            </ul>
        </div>`;
    } else if (input) {
        return `<div>input:
            <ul>
                ${Object.keys(input).map(key => `<li>${key}:${input[key]}</li>`)}
            </ul>
        </div>`;
    }
}

function getPluginInfos(plugins?: Plugin[]) {
    const pluginInfo = plugins?.map(plugin => {
        return `
            <li>
                ${plugin.name}: ${Object.keys(plugin).filter(key => key!=="name").join(", ")}
            </li>
        `;
    }).reduce((html, li) => html + li, "");
    return `
        <div>plugins</div>
        <ul>${pluginInfo}</ul>
    `;
}
