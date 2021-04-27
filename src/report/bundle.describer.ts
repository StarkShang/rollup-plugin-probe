import { OutputAsset, OutputBundle, OutputChunk } from "rollup";
import { Reporter } from ".";
import { ChunkDescriber } from "./chunk.describer";

export function describeBundle(bundle: OutputBundle, reporter: Reporter) {
    const bundleInfo = Object.keys(bundle).reduce((rst, key) => {
        switch (bundle[key].type) {
            case "chunk": rst.chunks += describeChunk(key, bundle[key] as OutputChunk, reporter); break;
            case "asset": rst.assets += describeAsset(key, bundle[key] as OutputAsset, reporter); break;
            default: break;
        }
        return rst;
    }, { chunks: "", assets: "" });
    return `
        <section>
            <h4 style="margin-bottom:0">BUNDLE</h4>
            <div>
                ${bundleInfo.chunks}
            </div>
            <div>
                ${bundleInfo.assets}
            </div>
        </section>
    `;
}

export function describeChunk(key: string, chunk: OutputChunk, reporter: Reporter) {
    const describer = new ChunkDescriber(chunk);
    reporter.registerDescriber(describer);
    getChunkDetail(chunk, describer);
    return `
        <div style="margin-top:0.5em">
            <span style="font-weight:700"><a href="${describer.filename}">${chunk.fileName}</a></span>
            <span style='font-size:0.8em;background:deepskyblue;color:white;border-radius:4px;padding:0 0.5em'>CHUNK</span>
            ${chunk.isEntry?"<span style='font-size:0.8em;background:deepskyblue;color:white;border-radius:4px;padding:0 0.5em'>Entry</span>":""}
            ${chunk.isDynamicEntry?"<span style='font-size:0.8em;background:deepskyblue;color:white;border-radius:4px;padding:0 0.5em'>DynamicEntry</span>":""}
            ${chunk.isImplicitEntry?"<span style='font-size:0.8em;background:deepskyblue;color:white;border-radius:4px;padding:0 0.5em'>ImplicitEntry</span>":""}
        </div>
        <div>
            <span style="font-weight:700;margin-right:1em">facadeModuleId</span>${chunk.facadeModuleId}
        </div>
        <div>
            <span style="font-weight:700;margin-right:1em">exports</span>${chunk.exports.join(", ") || "undefined"}
        </div>
        <div>
            <span style="font-weight:700;margin-right:1em">name</span>${chunk.name || "undefined"}
        </div>
        <div>
            <span style="font-weight:700;margin-right:1em">fileName</span>${chunk.fileName || "undefined"}
        </div>
        <div>
            <div style="font-weight:700">modules</div>
            <ul style="margin:0;font-size:0.8em">
                ${Object.keys(chunk.modules).map(key => "<li>" + key + "</li>").join("")}
            </ul>
        </div>
        <div>
            <div style="font-weight:700">reference files</div>
            <ul style="margin:0;font-size:0.8em">
                ${chunk.referencedFiles.map(imp => "<li>" + imp + "</li>").join("")}
            </ul>
        </div>
        <div>
            <div style="font-weight:700">imports</div>
            <ul style="margin:0;font-size:0.8em">
                ${chunk.imports.map(imp => "<li>" + imp + "</li>").join("")}
            </ul>
        </div>
        <div>
            <div style="font-weight:700">dynamic imports</div>
            <ul style="margin:0;font-size:0.8em">
                ${chunk.dynamicImports.map(imp => "<li>" + imp + "</li>").join("")}
            </ul>
        </div>
        <div>
            <div style="font-weight:700">imported bindings</div>
            <ul style="margin:0;font-size:0.8em">
                ${Object.keys(chunk.importedBindings).map(key =>
                    "<li><span style='font-weight:700;margin-right:0.5em'>" + key + ":</span>"
                    + chunk.importedBindings[key].join(", ") + "</li>")
                    .join("")}
            </ul>
        </div>
        <div>
            <div style="font-weight:700">code</div>
            <code style="display:block;max-height:10em;overflow-y:auto;padding:1em;background:#efefef;word-break:break-all;border-radius:3px">${chunk.code}</code>
        </div>
    `;
}

export function describeAsset(key: string, asset: OutputAsset, reporter: Reporter) {
    const source = typeof asset.source === "string"
        ?  asset.source.replace(/</g, "&lt").replace(/>/g, "&gt")
        : asset.source;
    return `
        <div style="margin-top:0.5em">
            <div>
                <span style="font-weight:700">${asset.fileName}</span>
                <span style='font-size:0.8em;background:deepskyblue;color:white;border-radius:4px;padding:0 0.5em'>ASSET</span>
            </div>
            <div>
                <span style="font-weight:700;margin-right:1em">name</span>${asset.name}
            </div>
            <div>
                <span style="font-weight:700;margin-right:1em">fileName</span>${asset.fileName}
            </div>
            <div>
                <span style="font-weight:700">source</span>
                <code style="display:block;max-height:10em;overflow-y:auto;padding:1em;background:#efefef;word-break:break-all;border-radius:3px">
                    ${source}
                </code>
            </div>
        </div>

    `;
}

function getChunkDetail(chunk: OutputChunk, describer: ChunkDescriber) {
    const importInfo = chunk.imports.map(imp => `
        <span>${imp}</span>: [${chunk.importedBindings[imp].join(", ")}]
    `).reduce((rst, imp) => rst + imp, "");
    const moduleInfo = Object.keys(chunk.modules).map(key => `
        <div>${key}</div>
    `).reduce((rst, module) => rst + module, "");
    describer.append(`
        <h1>${chunk.fileName}</h1>
        <div>facadeModuleId: <a href="${chunk.facadeModuleId}">${chunk.facadeModuleId}</a></div>
        <div>
            <span>
                <input type="checkbox" ${chunk.isEntry?"checked":""} disabled>isEntry
            </span>
            <span>
                <input type="checkbox" ${chunk.isDynamicEntry?"checked":""} disabled>isDynamicEntry
            </span>
            <span>
                <input type="checkbox" ${chunk.isImplicitEntry?"checked":""} disabled>isImplicitEntry
            </span>
        </div>
        <div></div>
        <div>
            <h3>Imports</h3>
            ${importInfo}
        </div>
        <div>
            <h3>Modules</h3>
            ${moduleInfo}
        </div>
    `);
}
