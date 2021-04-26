import { NormalizedOutputOptions, OutputAsset, OutputBundle, OutputChunk, PluginContext } from "rollup";
import moment from "moment";
import { Reporter } from "../report";

export interface GenerateBundleProbeOptions {

}

export function generateBundleProbe(
    this: PluginContext,
    options: NormalizedOutputOptions,
    bundle: OutputBundle,
    isWrite: boolean,
    reporter: Reporter,
) {
    reporter.append(`
        <section>
            <h3 style="margin:2em 0 0">
                Generate Bundle
                <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
            </h3>
            ${describeBundleInfo(bundle, reporter)}
        </section>
    `);
}

function describeBundleInfo(bundle: OutputBundle, reporter: Reporter) {
    return getChunkInfo(bundle, reporter) + getAssetInfo(bundle, reporter);
}

function getChunkInfo(bundle: OutputBundle, reporter: Reporter) {
    const bundleInfo = Object.keys(bundle)
        .filter(key => bundle[key].type === "chunk")
        .map(key => {
            const chunk = bundle[key] as OutputChunk;
            const chunkDescriber = reporter.registerChunkDescriber(chunk);
            chunkDescriber.append(`
                ${chunk.fileName}
            `);
            return `
                <tr>
                    <th>${key}</th>
                    <th><a href="${chunkDescriber.filename}">${chunk.fileName}</a></th>
                    <th>${chunk.isEntry}</th>
                    <th>${chunk.isDynamicEntry}</th>
                </tr>
            `;})
        .reduce((html, tr) => html + tr, "");
    return `
        <table style="width:100%;line-height:3em;border:1px solid #ebeef5">
            <caption style="text-align:left;font-size:1.1em;line-height:1.5em;font-weight:700;margin-top:0.5em">Chunks</caption>
            <tr style="background:#ebeef5">
                <th>key</th>
                <th>fileName</th>
                <th>isEntry</th>
                <th>isDynamicEntry</th>
            </tr>
            ${bundleInfo}
        </table>
    `;
}

function getAssetInfo(bundle: OutputBundle, reporter: Reporter) {
    const bundleInfo = Object.keys(bundle)
        .filter(key => bundle[key].type === "asset")
        .map(key => {
            const chunk = bundle[key] as OutputAsset;
            return `
                <tr>
                    <th>${key}</th>
                    <th>${chunk.name}</th>
                    <th>${chunk.fileName}</th>
                </tr>
            `;})
        .reduce((html, tr) => html + tr, "");
    return `
        <table style="width:100%;line-height:3em;border:1px solid #ebeef5">
            <caption style="text-align:left;font-size:1.1em;line-height:1.5em;font-weight:700;margin-top:0.5em">Assets</caption>
            <tr style="background:#ebeef5">
                <th>key</th>
                <th>name</th>
                <th>fileName</th>
            </tr>
            ${bundleInfo}
        </table>
    `;
}
