import { InputOption, InputOptions, NormalizedInputOptions } from "rollup";
import { getValueInfo } from ".";
import { describePlugins } from "./plugin.describer";

export function describeInputOptions(options: InputOptions | NormalizedInputOptions) {
    return `
        <section>
            <h4>input options</h4>
            ${describeInput(options.input)}
            <div>
                ${describePlugins(options.plugins)}
            </div>
        </section>
    `;
}

function describeInput(input?: InputOption) {
    return `
    <div>
        <h4 style="margin:0.5em 0 0">input</h4>
        <span style="font-size:0.8em">${getValueInfo(input)}</span>
    </div>`;
}
