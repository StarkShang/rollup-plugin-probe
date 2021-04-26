import { join } from "path";
import { Plugin } from "rollup";
import { normalizeOptions, ProbeOptions } from "./options";
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
    inputOptions?: ProbeOptions
): Plugin {
    const _options = normalizeOptions(inputOptions);
    const _reporter = new Reporter();
    return {
        name: "rollup-probe",
        options(options) {
            if (_options?.hooks?.options) {
                optionsProbe.call(this, options, _reporter);
            }
            return options;
        },
        buildStart(options) {
            if (_options?.hooks?.buildStart) {
                buildStartProbe.call(this, options);
            }
        },
        resolveId(source, importer, options) {
            if (_options?.hooks?.resolveId) {
                resolveIdProbe.call(this, source, importer, options);
            }
            return null;
        },
        load(id: string) {
            if (_options?.hooks?.load) {
                loadProbe.call(this, id);
            }
            return null;
        },
        transform(code, id) {
            if (_options?.hooks?.transform) {
                transformProbe.call(this, code, id, _reporter);
            }
            return null;
        },
        moduleParsed(info) {
            if (_options?.hooks?.moduleParsed) {
                moduleParsedProbe.call(this, info);
            }
        },
        resolveDynamicImport(specifier, importer) {
            if (_options?.hooks?.resolveDynamicImport) {
                resolveDynamicImportProbe.call(this, specifier, importer);
            }
            return null;
        },
        buildEnd(err) {
            if (_options?.hooks?.buildEnd) {
                buildEndProbe.call(this, err);
            }
        },
        closeBundle() {
            if (_options?.hooks?.closeBundle) {
                closeBundleProbe.call(this);
            }
        },
        watchChange(id, change) {
            if (_options?.hooks?.watchChange) {
                watchChangeProbe.call(this, id, change);
            }
        },
        closeWatcher() {
            if (_options?.hooks?.closeWatcher) {
                closeWatcherProbe.call(this);
            }
        },
        outputOptions(options) {
            if (options.dir) {
                _reporter.setOutputPath(join(options.dir, _options.output));
            }
            if (_options?.hooks?.outputOption) {
                outputOptionsProbe.call(this, options, _reporter);
            }
            return null;
        },
        renderStart(outputOptions, inputOptions) {
            if (_options?.hooks?.renderStart) {
                renderStartProbe.call(this, outputOptions, inputOptions);
            }
        },
        renderDynamicImport(options) {
            if (_options?.hooks?.renderDynamicImport) {
                renderDynamicImportProbe.call(this, options);
            }
            return null;
        },
        augmentChunkHash(chunk) {
            if (_options?.hooks?.augmentChunkHash) {
                augmentChunkHashProbe.call(this, chunk);
            }
        },
        resolveFileUrl(options) {
            if (_options?.hooks?.resolveFileUrl) {
                resolveFileUrlProbe.call(this, options);
            }
            return null;
        },
        resolveImportMeta(prop, options) {
            if (_options?.hooks?.resolveImportMeta) {
                resolveImportMetaProbe.call(this, prop, options);
            }
            return null;
        },
        renderChunk(code, chunk, options) {
            if (_options?.hooks?.renderChunk) {
                renderChunkProbe.call(this, code, chunk, options);
            }
            return null;
        },
        renderError(err) {
            if (_options?.hooks?.renderError) {
                renderErrorProbe.call(this, err);
            }
        },
        async generateBundle(options, bundle, isWrite) {
            if (_options?.hooks?.generateBundle) {
                generateBundleProbe.call(this, options, bundle, isWrite, _reporter);
            }
            await _reporter.output();
        },
        async writeBundle(options, bundle) {
            if (_options?.hooks?.writeBundle) {
                writeBundleProbe.call(this, options, bundle);
            }
        }
    }
}
