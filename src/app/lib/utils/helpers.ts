export function circleIndex(index:number, size:number) {
    return (size + index % size) % size;
}