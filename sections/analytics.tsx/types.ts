interface IChildExpense {
    amount: number
    tags: string[]
    description?: string
}
export interface IChartSlice {
    label: string
    color: string
    total: number
    children?: IChildExpense[]
}
export enum VIEW_TYPE {
    SUMMARY = 'summary',
    CHART = 'chart'
}