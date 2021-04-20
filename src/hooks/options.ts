import { InputOption, InputOptions, MinimalPluginContext, Plugin } from "rollup";
import moment from "moment";
import { Reporter, getValueInfo } from "../report";

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
            ${getPluginInfos(options.plugins)}
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

function getPluginInfos(plugins?: Plugin[]) {
    const pluginInfo = plugins?.map(plugin => {
        return `
            <li style="line-height:2em">
                <span style="font-weight:700">${plugin.name}: </span>
                ${Object.keys(plugin)
                    .filter(key => key!=="name")
                    .map(key => `<span style="display:inline-block;line-height:1.5em;padding:0.1em 0.5em;border-radius:4px;background:#5CAAFB;color:white">${key}</span>`)
                    .join(" ")}
            </li>
        `;
    }).reduce((html, li) => html + li, "");
    return `
        <h4 style="margin:0.5em 0 0">plugins</h4>
        <ul style="margin:0">${pluginInfo}</ul>
    `;
}
