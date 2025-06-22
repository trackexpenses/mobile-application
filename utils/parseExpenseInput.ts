export function parseExpenseInput(input: string) {
    const parts = input.trim().split(/\s+/);

    const amount = parseFloat(parts[0]);
    const tags: string[] = [];
    const descriptionParts: string[] = [];

    for (let i = 1; i < parts.length; i++) {
        if (parts[i].startsWith('#')) {
            tags.push(parts[i].slice(1).toLowerCase());
        } else {
            descriptionParts.push(parts[i]);
        }
    }

    return {
        amount,
        tags,
        description: descriptionParts.join(' '),
    };
}
