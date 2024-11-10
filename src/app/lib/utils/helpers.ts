export function circleIndex(index: number, size: number) {
    return (size + index % size) % size;
}

export function parseGradeAsInt(grade: string) {
    const letterValue = 215 - 3 * grade.charCodeAt(0);
    const modifier = grade.slice(1);
    switch (modifier) {
        case '+':
            return letterValue + 1;
        case '-':
            return letterValue - 1;
        default:
            return letterValue;
    }
}