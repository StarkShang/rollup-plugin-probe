import { OutputOptions, PluginContext } from "rollup";
import moment from "moment";
import { Reporter } from "../report";

export interface OutputOptionsProbeOptions {

}

export function outputOptionsProbe(
    this: PluginContext,
    options: OutputOptions,
    reporter: Reporter,
) {
    reporter.append(`
        <section>
            <h3>
                Output Options
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
            ${JSON.stringify(options)}
        </section>
    `);
}
