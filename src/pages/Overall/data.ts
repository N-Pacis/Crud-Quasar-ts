import { api } from 'src/boot/axios';
import { ChartData, chartDataFromBackend } from 'src/types/Chart';
import { Employee } from './types';

export async function getEmployeesData(): Promise<Employee[]> {
  const {data} = await api.get('/employees');
  return data.data
}

export async function getEmployeesEnrollmentsData(): Promise<ChartData>{
  const {data} = await api.get('/employees/graph-statistics')

  const chartDataFromBackend = data.data;
  const labels: string[] = [];
  const dataset: number[] = [];

  chartDataFromBackend.map((item:chartDataFromBackend)=>{
    labels.push(item.month);
    dataset.push(item.value)
  })

  return {
    labels,
    datasets: [
      {
        data: dataset
      }
    ]
  }
}
