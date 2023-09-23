'use client'

import React, { forwardRef, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart, Line, } from 'react-chartjs-2';

ChartJS.defaults.font.family = 'SUIT-REGULAR';
ChartJS.defaults.font.family = 'SUIT-REGULAR';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: false,
    },
    interactions: {
      pointHoverBorderColor: '#FFFFFF',
      pointHoverBorderWidth: 5,
      pointHoverRadius: 7,
    },
    title: {
      display: true,
      text: '각 등수 별 확률',
      font: {
        size: 12,
      }
    },
  },
};

const labels = ['8등', '7등', '6등', '5등', '탈출', '4등', '3등', '2등', '1등'];

export const data = {
  labels,
  datasets: [
    {
      label: '??%',
      data: labels.map((l, p) => Math.floor(Math.random()*100)),
      borderColor: '#300759',
      backgroundColor: '#1c1c1c',
      borderWidth: 1.5,
      tension: 0.2,
    }
  ],
};

export default function Home() {
  return (
    <div class="flex p-8 justify-center w-screen h-screen">
      <div class="bg-stone-100 lg:w-[1200px] h-screen">
        <div class="w-[400px] h-[200px] p-2 rounded-md bg-slate-200">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  )
}
