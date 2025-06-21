import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { G } from 'react-native-svg';
import CategoryBreakDown from './CategoryBreakdown';
import CategorySlice from './CategorySlice';
import TotalExpensesText from './TotalExpensesText';
import { IChartSlice } from './types';
import { createArc } from './utils';

const { width } = Dimensions.get('window');
const chartSize = width * 0.6;
const radius = chartSize / 2;
const strokeWidth = 80;
const padding = 100;
const svgSize = chartSize + padding * 2;
const center = svgSize / 2;

export interface IAnalyticsDonutChart {
    data: IChartSlice[]
    total: any
}
export default function AnalyticsDonutChart({ data, total }: IAnalyticsDonutChart) {
    const [selectedLabel, setSelectedLabel] = useState<IChartSlice | null>(null);
    let startAngle = 0;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'relative', width: svgSize, height: svgSize }}>
                <Svg width={svgSize} height={svgSize} style={{ position: 'absolute' }}>
                    <G rotation="-90" origin={`${center}, ${center}`}>
                        {data.map((slice, index) => {
                            const sliceAngle = (slice.total / total) * 2 * Math.PI;
                            const endAngle = startAngle + sliceAngle;
                            const path = createArc(startAngle, endAngle, center, radius);
                            const midAngle = startAngle + sliceAngle / 2;

                            startAngle = startAngle + sliceAngle;;
                            return <CategorySlice
                                key={index}
                                slice={slice}
                                setSelectedLabel={setSelectedLabel}
                                strokeWidth={strokeWidth}
                                path={path}
                                sliceAngle={sliceAngle}
                                startAngle={startAngle}
                                midAngle={midAngle}
                                center={center}
                                radius={radius}
                                total={total}
                            />

                        })}
                    </G>
                </Svg>
                <TotalExpensesText chartSize={chartSize} total={total} />
            </View>

            {selectedLabel && (
                <CategoryBreakDown selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
            )}

        </View>
    )
}