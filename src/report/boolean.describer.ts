export function describeBooleanValue(name: string, value: boolean) {
    return `
        <span>
            <input type="checkbox" ${value?"checked":""} disabled>${name}
        </span>
    `;
}
