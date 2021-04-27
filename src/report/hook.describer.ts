import moment from "moment";

export function describeHookMetaInfo(name: string) {
    return `
        <h3 style="margin-top:0">
            ${name}
            <small style="font-size:0.8rem;font-weight:normal;margin-left:1em">
                ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}
            </small>
        </h3>
    `;
}
