export const createArc = (startAngle: number, endAngle: number, center: number, radius: number) => {
    if (endAngle - startAngle >= 2 * Math.PI - 0.0001) {
        const start = {
            x: center + radius * Math.cos(startAngle),
            y: center + radius * Math.sin(startAngle),
        };
        const end = {
            x: center + radius * Math.cos(startAngle + Math.PI),
            y: center + radius * Math.sin(startAngle + Math.PI),
        };
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y} A ${radius} ${radius} 0 1 1 ${start.x} ${start.y}`;
    }

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
};