export function describeList(filePaths: readonly string[]) {
    const fileList = filePaths
        .map(path => `<li>${path}</li>`)
        .reduce((list, path) => list + path, "");
    return `
        <ul style="margin:0">
            ${fileList}
        </ul>
    `;
}

export function describeListSection(title: string, filePaths: readonly string[]) {
    const fileList = filePaths
        .map(path => `<li>${path}</li>`)
        .reduce((list, path) => list + path, "");
    return `
        <div>
            <div style="margin-top:0.5em;font-weight:700">${title}</div>
            <ul style="margin:0">
                ${fileList}
            </ul>
        </div>
    `;
}
