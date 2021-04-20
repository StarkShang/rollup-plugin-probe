import { Plugin } from "rollup";
import { WorkflowVisualizerOptions } from "./options";
import { buildStartProbe } from "./hooks/buildStart";
import { closeBundleProbe } from "./hooks/closeBundle";
import { renderStartProbe } from "./hooks/renderStart";
import { renderChunkProbe } from "./hooks/renderChunk";
import { renderErrorProbe } from "./hooks/renderError";
import { generateBundleProbe } from "./hooks/generateBundle";
import { writeBundleProbe } from "./hooks/writeBundle";
import { buildEndProbe } from "./hooks/buildEnd";
import { optionsProbe } from "./hooks/options";
import { resolveIdProbe } from "./hooks/resolveId";
import { loadProbe } from "./hooks/load";
import { transformProbe } from "./hooks/transform";
import { moduleParsedProbe } from "./hooks/moduleParsed";
import { resolveDynamicImportProbe } from "./hooks/resolveDynamicImport";
import { watchChangeProbe } from "./hooks/watchChange";
import { closeWatcherProbe } from "./hooks/closeWatcher";
import { renderDynamicImportProbe } from "./hooks/renderDynamicImport";
import { augmentChunkHashProbe } from "./hooks/augmentChunkHash";
import { resolveFileUrlProbe } from "./hooks/resolveFileUrl";
import { resolveImportMetaProbe } from "./hooks/resolveImportMeta";
import { outputOptionsProbe } from "./hooks/outputOptions";
import { Reporter } from "./report";

export default function(
    pluginOptions?: WorkflowVisualizerOptions
): Plugin {
    let reporter: Reporter;
    return {
        name: "rollup-probe",
        options(options) {
            reporter = new Reporter(options);
            if (pluginOptions?.options) {
                optionsProbe.call(this, options, reporter);
            }
            return options;
        },
        buildStart(options) {
            if (pluginOptions?.buildStart) {
                buildStartProbe.call(this, options);
            }
        },
        resolveId(source, importer, options) {
            if (pluginOptions?.resolveId) {
                resolveIdProbe.call(this, source, importer, options);
            }
            return null;
        },
        load(id: string) {
            if (pluginOptions?.load) {
                loadProbe.call(this, id);
            }
            return null;
        },
        transform(code, id) {
            if (pluginOptions?.transform) {
                transformProbe.call(this, code, id, reporter);
            }
            return null;
        },
        moduleParsed(info) {
            if (pluginOptions?.moduleParsed) {
                moduleParsedProbe.call(this, info);
            }
        },
        resolveDynamicImport(specifier, importer) {
            if (pluginOptions?.resolveDynamicImport) {
                resolveDynamicImportProbe.call(this, specifier, importer);
            }
            return null;
        },
        buildEnd(err) {
            if (pluginOptions?.buildEnd) {
                buildEndProbe.call(this, err);
            }
        },
        closeBundle() {
            if (pluginOptions?.closeBundle) {
                closeBundleProbe.call(this);
            }
        },
        watchChange(id, change) {
            if (pluginOptions?.watchChange) {
                watchChangeProbe.call(this, id, change);
            }
        },
        closeWatcher() {
            if (pluginOptions?.closeWatcher) {
                closeWatcherProbe.call(this);
            }
        },
        outputOptions(options) {
            if (options.dir) {
                reporter.setOutputPath(options.dir);
            }
            if (pluginOptions?.outputOption) {
                outputOptionsProbe.call(this, options, reporter);
            }
            return null;
        },
        renderStart(outputOptions, inputOptions) {
            if (pluginOptions?.renderStart) {
                renderStartProbe.call(this, outputOptions, inputOptions);
            }
        },
        renderDynamicImport(options) {
            if (pluginOptions?.renderDynamicImport) {
                renderDynamicImportProbe.call(this, options);
            }
            return null;
        },
        augmentChunkHash(chunk) {
            if (pluginOptions?.augmentChunkHash) {
                augmentChunkHashProbe.call(this, chunk);
            }
        },
        resolveFileUrl(options) {
            if (pluginOptions?.resolveFileUrl) {
                resolveFileUrlProbe.call(this, options);
            }
            return null;
        },
        resolveImportMeta(prop, options) {
            if (pluginOptions?.resolveImportMeta) {
                resolveImportMetaProbe.call(this, prop, options);
            }
            return null;
        },
        renderChunk(code, chunk, options) {
            if (pluginOptions?.renderChunk) {
                renderChunkProbe.call(this, code, chunk, options);
            }
            return null;
        },
        renderError(err) {
            if (pluginOptions?.renderError) {
                renderErrorProbe.call(this, err);
            }
        },
        async generateBundle(options, bundle, isWrite) {
            if (pluginOptions?.generateBundle) {
                generateBundleProbe.call(this, options, bundle, isWrite, reporter);
            }
            await reporter.output();
        },
        async writeBundle(options, bundle) {
            if (pluginOptions?.writeBundle) {
                writeBundleProbe.call(this, options, bundle);
            }
        }
    }
}
