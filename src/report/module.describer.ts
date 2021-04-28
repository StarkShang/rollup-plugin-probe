import { ModuleInfo } from "rollup";
import { describeBooleanValue } from "./boolean.describer";
import { describeCode } from "./code.describer";
import { describeListSection } from "./list.describer";

export function describeModule(module: ModuleInfo) {
    // console.log(module);
    // console.log(module.importedIds);
    // console.log("meta", module.meta);
    return `
        <h4 style="margin:0">
            <span style="background:#FFA754;color:white;border-radius:4px;margin-right:0.5em;padding:0.1em 0.5em">source</span>
            ${module.id}
        </h4>
        <div>
            ${describeBooleanValue("isEntry", module.isEntry)}
            ${describeBooleanValue("isExternal", module.isExternal)}
            ${typeof module.hasModuleSideEffects === "boolean" ? describeBooleanValue("hasModuleSideEffects", module.hasModuleSideEffects) : "" }
            ${typeof module.syntheticNamedExports === "boolean" ? describeBooleanValue("syntheticNamedExports", module.syntheticNamedExports) : "" }
        </div>
        ${ module.importers.length > 0 ? describeListSection("importers", module.importers) : "" }
        ${ module.dynamicImporters.length > 0 ? describeListSection("dynamicImporters", module.dynamicImporters) : "" }
        ${ module.dynamicallyImportedIds.length > 0 ? describeListSection("dynamicallyImportedIds", module.dynamicallyImportedIds) : "" }
        ${ module.implicitlyLoadedBefore.length > 0 ? describeListSection("implicitlyLoadedBefore", module.implicitlyLoadedBefore) : "" }
        ${ module.implicitlyLoadedAfterOneOf.length > 0 ? describeListSection("implicitlyLoadedAfterOneOf", module.implicitlyLoadedAfterOneOf) : "" }
        ${ module.code ? describeCode(module.code) : "" }
    `;
}
