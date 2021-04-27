import { Plugin } from "rollup";

export function describePlugins(plugins?: Plugin[]) {
    const infos = plugins
        ?.map(plugin => `<li style="line-height:1.6em">${describePlugin(plugin)}</li>`)
        ?.reduce((desc, info) => desc + info, "");
    return `
        <h4 style="margin:0.5em 0 0">plugins</h4>
        <ul style="margin:0;font-size:0.8em">${infos}</ul>
    `;
}

export function describePlugin(plugin: Plugin) {
    const hookInfo = Object.keys(plugin)
        .filter(key => key!=="name")
        .map(key => `<span style="display:inline-block;line-height:1.5em;margin-right:0.5em;padding:0.1em 0.5em;border-radius:4px;background:#5CAAFB;color:white;font-size:0.8em">${key}</span>`)
        .join("");
    return`<span style="font-weight:700">${plugin.name}: </span>${hookInfo}`;
}
