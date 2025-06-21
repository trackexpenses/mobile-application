export interface ICategorySummary {
    category: string
    value: number
}
export interface IChartSlice {
    label: string
    color: string
    value: number
    summary?: ICategorySummary[]
}

export interface IAnalytics {
    summary: ICategorySummary[]
    chartData: IChartSlice[]
}