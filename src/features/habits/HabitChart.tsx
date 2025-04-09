import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HabitChartProps {
  type: 'line' | 'bar';
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
}

const HabitChart: React.FC<HabitChartProps> = ({ 
  type, 
  data, 
  options = {}, 
  height = 300 
}) => {
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  return (
    <Box sx={{ height: height, width: '100%' }}>
      {type === 'line' ? (
        <Line data={data} options={mergedOptions} />
      ) : (
        <Bar data={data} options={mergedOptions} />
      )}
    </Box>
  );
};

export default HabitChart;
