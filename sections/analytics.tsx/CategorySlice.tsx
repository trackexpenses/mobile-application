import React from "react";
import { G, Path, Line, Text as SvgText } from "react-native-svg";
import { IChartSlice } from "./types";

interface ICategorySlice {
    slice: IChartSlice,
    startAngle: number
    center: number
    radius: number
    total: number
    strokeWidth: number
    setSelectedLabel: (value: IChartSlice | null) => void
    path: string
    sliceAngle: number,
    midAngle: number
}
export default function CategorySlice({ slice, path, radius, center, midAngle, sliceAngle, strokeWidth, setSelectedLabel }: ICategorySlice) {

    const outerRadius = radius + strokeWidth / 2;
    const labelRadius = outerRadius + 15;
    const x1 = center + outerRadius * Math.cos(midAngle);
    const y1 = center + outerRadius * Math.sin(midAngle);
    const x2 = center + labelRadius * Math.cos(midAngle);
    const y2 = center + labelRadius * Math.sin(midAngle);
    const textAnchor = midAngle > Math.PI / 2 && midAngle < (3 * Math.PI) / 2 ? 'end' : 'start';
    const labelOffset = textAnchor === 'start' ? 5 : -5;

    const labelRadiusMid = radius;
    const valueX = center + labelRadiusMid * Math.cos(midAngle);
    const valueY = center + labelRadiusMid * Math.sin(midAngle);

    return (
        <G key={slice.label} onPress={() => setSelectedLabel(slice)}>
            <Path d={path} stroke={slice.color} strokeWidth={strokeWidth} fill="none" />

            <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={slice.color} strokeWidth={1} />

            <SvgText
                x={x2 + labelOffset}
                y={y2}
                fontSize="14"
                fontWeight="bold"
                fill={slice.color}
                textAnchor={textAnchor}
                alignmentBaseline="middle"
            >
                {slice.label}
            </SvgText>

            {sliceAngle > 0.2 && (
                <SvgText
                    x={valueX}
                    y={valueY}
                    fontSize="14"
                    fontWeight="bold"
                    fill="#000"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {slice.total > 1000 ? `${Math.round(slice.total / 1000)}K` : slice.total}
                </SvgText>
            )}
        </G>

    )
}