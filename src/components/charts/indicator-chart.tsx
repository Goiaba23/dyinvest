"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  label: string;
  data: number[];
  labels: string[];
  color?: string;
}

export function IndicatorChart({ label, data, labels, color = 'rgb(16, 185, 129)' }: ChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        fill: true,
        borderColor: color,
        backgroundColor: `${color.replace('rgb', 'rgba').replace(')', ', 0.1)')}`,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="h-20 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
