import moment from "moment";

export function describeHookMetaInfo(name: string) {
    return `
        <h3 style="margin:2em 0 0">
            ${name}
            <small>${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}</small>
        </h3>
    `;
}
