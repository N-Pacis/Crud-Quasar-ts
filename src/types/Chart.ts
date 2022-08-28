export interface ChartData{
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset{
  data: number[]
}

export interface chartDataFromBackend{
  month: string
  value: number
}
