export function describeCode(code: string) {
    code = code.replace(/</g, "&lt").replace(/>/g, "&gt");
    return `
        <div>
            <div style="font-weight:700;margin-top:0.5em">Source Code</div>
            <div style="padding:1em;background:#efefef;word-break:break-all;border-radius:3px">
                <code style="display:block;max-height:16em;overflow-y:auto;">
                    ${code}
                </code>
            </div>
        </div>
    `;
}
