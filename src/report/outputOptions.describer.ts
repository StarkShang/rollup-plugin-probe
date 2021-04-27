import { NormalizedOutputOptions } from "rollup";
import { describeBooleanValue } from "./boolean.describer";

export function describeOutputOptions(options: NormalizedOutputOptions) {
    return `
        <section>
            <h4>output options</h4>
            ${descirbeBooleanInfos(options)}
            <div>dir: ${options.dir}</div>
            <div>format: ${options.format}</div>
            <div>exports: ${options.exports}</div>
            <div>entryFileNames: ${options.entryFileNames}</div>
            <div>assetFileNames: ${options.assetFileNames}</div>
            <div>chunkFileNames: ${options.chunkFileNames}</div>
        </section>
    `;
}

export function descirbeBooleanInfos(options: NormalizedOutputOptions) {
    return `
        <div>
            ${describeBooleanValue("compact", options.compact)}
            ${describeBooleanValue("esModule", options.esModule)}
            ${describeBooleanValue("extend", options.extend)}
            ${describeBooleanValue("externalLiveBindings", options.externalLiveBindings)}
            ${describeBooleanValue("freeze", options.freeze)}
            ${describeBooleanValue("hoistTransitiveImports", options.hoistTransitiveImports)}
            ${describeBooleanValue("inlineDynamicImports", options.inlineDynamicImports)}
            ${describeBooleanValue("minifyInternalExports", options.minifyInternalExports)}
            ${describeBooleanValue("namespaceToStringTag", options.namespaceToStringTag)}
            ${describeBooleanValue("noConflict", options.noConflict)}
            ${describeBooleanValue("preferConst", options.preferConst)}
            ${describeBooleanValue("preserveModules", options.preserveModules)}
            ${describeBooleanValue("sourcemapExcludeSources", options.sourcemapExcludeSources)}
            ${describeBooleanValue("strict", options.strict)}
            ${describeBooleanValue("systemNullSetters", options.systemNullSetters)}
            ${describeBooleanValue("validate", options.validate)}
        </div>
    `;
}
