export function describeBooleanValue(name: string, value: boolean) {
    return `
        <span style="white-space:nowrap">
            <input type="checkbox" ${value?"checked":""} disabled>${name}
        </span>
    `;
}
