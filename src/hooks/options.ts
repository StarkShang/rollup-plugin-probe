import { InputOptions, MinimalPluginContext } from "rollup";
import { Reporter } from "../report";
import { describeHookMetaInfo } from "../report/hook.describer";
import { describeInputOptions } from "../report/inputOptions.describer";

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
            ${describeInputOptions(options)}
        </section>
    `);
}
