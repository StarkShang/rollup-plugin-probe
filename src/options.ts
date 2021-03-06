import { AugmentChunkHashProbeOptions } from "./hooks/augmentChunkHash";
import { BannerProbeOptions } from "./hooks/banner";
import { BuildEndProbeOptions } from "./hooks/buildEnd";
import { BuildStartProbeOptions } from "./hooks/buildStart";
import { CloseBundleProbeOptions } from "./hooks/closeBundle";
import { CloseWatcherProbeOptions } from "./hooks/closeWatcher";
import { FooterProbeOptions } from "./hooks/footer";
import { GenerateBundleProbeOptions } from "./hooks/generateBundle";
import { IntroProbeOptions } from "./hooks/intro";
import { LoadProbeOptions } from "./hooks/load";
import { ModuleParsedProbeOptions } from "./hooks/moduleParsed";
import { OptionsProbeOptions } from "./hooks/options";
import { OutputOptionsProbeOptions } from "./hooks/outputOptions";
import { OutroProbeOptions } from "./hooks/outro";
import { RenderChunkProbeOptions } from "./hooks/renderChunk";
import { RenderDynamicImportProbeOptions } from "./hooks/renderDynamicImport";
import { RenderErrorProbeOptions } from "./hooks/renderError";
import { RenderStartProbeOptions } from "./hooks/renderStart";
import { ResolveDynamicImportProbeOptions } from "./hooks/resolveDynamicImport";
import { ResolveFileUrlProbeOptions } from "./hooks/resolveFileUrl";
import { ResolveIdProbeOptions } from "./hooks/resolveId";
import { ResolveImportMetaProbeOptions } from "./hooks/resolveImportMeta";
import { TransformProbeOptions } from "./hooks/transform";
import { WatchChangeProbeOptions } from "./hooks/watchChange";
import { WriteBundleProbeOptions } from "./hooks/writeBundle";

export interface HooksOptions {
    options?: OptionsProbeOptions;
    buildStart?: BuildStartProbeOptions;
    resolveId?: ResolveIdProbeOptions;
    load?: LoadProbeOptions;
    transform?: TransformProbeOptions;
    moduleParsed?: ModuleParsedProbeOptions;
    resolveDynamicImport?: ResolveDynamicImportProbeOptions;
    buildEnd?: BuildEndProbeOptions;
    closeBundle?: CloseBundleProbeOptions;
    watchChange?: WatchChangeProbeOptions;
    closeWatcher?: CloseWatcherProbeOptions;
    outputOption?: OutputOptionsProbeOptions;
    renderStart?: RenderStartProbeOptions;
    intro?: IntroProbeOptions;
    banner?: BannerProbeOptions;
    footer?: FooterProbeOptions;
    outro?: OutroProbeOptions;
    renderDynamicImport?: RenderDynamicImportProbeOptions;
    augmentChunkHash?: AugmentChunkHashProbeOptions;
    resolveFileUrl?: ResolveFileUrlProbeOptions;
    resolveImportMeta?: ResolveImportMetaProbeOptions;
    renderChunk?: RenderChunkProbeOptions;
    renderError?: RenderErrorProbeOptions;
    generateBundle?: GenerateBundleProbeOptions;
    writeBundle?: WriteBundleProbeOptions;
}

export interface ProbeOptions {
    output?: string;
    hooks?: HooksOptions;
}

export interface NormalizedProbeOptions {
    output: string;
    hooks: HooksOptions;
}

export const defaultOptions: NormalizedProbeOptions = {
    output: "report",
    hooks: {}
};

export function normalizeOptions(options?: ProbeOptions) {
    return {
        ...defaultOptions,
        ...options
    }
}
