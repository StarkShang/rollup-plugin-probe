import moment from "moment";
import { NormalizedInputOptions, PluginContext } from "rollup";
import { Reporter } from "@/report";
import { describeInputOptions } from "../report/inputOptions.describer";

export interface BuildStartProbeOptions {

}

export function buildStartProbe(
    this: PluginContext,
    options: NormalizedInputOptions,
    reporter: Reporter,
) {
    console.log("buildStart", options);
    reporter.append(`
        <section>
            <h3 style="margin:2em 0 0">
                Build Start
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
            ${describeInputOptions(options)}
        </section>
    `);
}

// function describeInputOptions(
//     options: NormalizedInputOptions,
//     reporter: Reporter,
// ) {
//     reporter.append(`
//         <div></div>
//     `);
// }
