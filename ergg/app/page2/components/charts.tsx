import { Radar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, Filler);

const radarOptions = {
  maintainAspectRatio: false,
  aspectRatio: 1,
  elements: {
    point: {
      radius: 0, // 점 제거
    },
  },
  scales: {
    r: {
      min: 0, // MI
      max: 150, // MAX
      beginAtZero: true,
      pointLabels: {
        font: {
          size: 12
        },
        color: 'rgb(255, 255, 255)'
      },
      ticks: {
        display: false,
        font: {
          size: 11
        },
        color: 'rgb(255, 255, 255)',
        backdropColor: "rgba(0,0,0,0)",
        stepSize: 50
      },
      grid: {
        color: 'rgb(150, 150, 150)'
      },
      angleLines: {
        color: 'rgb(150, 150, 150)'
      }
    },
  }
}

export function CharRadar({ average, target }: any) {
  const exagger = [
    (target[0] - average[0]*0.2 < 0 ? 0 : average[0]*0.2),
    0,
    (target[2] - average[2]*0.6 < 0 ? 0 : average[2]*0.6),
    (target[3] - average[3]*0.4 < 0 ? 0 : average[3]*0.4),
    (target[4] - average[4]*0.5 < 0 ? 0 : average[4]*0.5),    
    target[5] > average[5] ? 1.2 : 1,
  ]

  const dataset = [ // 그래프 데이터셋 과장
    (target[0] - exagger[0]) / (average[0] -  exagger[0]) * 100,
    (target[1]*1.5 + 2) / (average[1] + 3.5) * 100, // 픽률이 낮을때 더 과장되도록 변경해야함.
    (average[2] - exagger[2]) / (target[2] - exagger[2]) * 100,
    (target[3] - exagger[3]) / (average[3] - exagger[3]) * 100,
    (target[4] - exagger[4]) / (average[4] - exagger[4]) * 100,
    (target[5]*exagger[5]) / (average[5]) * 100,];

  const data = {
    labels: ['평딜', '픽률', '평순', '순방률', '평킬', '승률'],
    datasets: [
      {
        label: '타겟 실험체',
        data: dataset,
        backgroundColor: 'rgba(21, 209, 124, 0.2)',
        borderColor: 'rgb(21, 209, 124)',
        borderWidth: 3,
      },
      {
        label: '티어 평균',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(160, 160, 160, 0.5)',
        borderColor: 'rgb(160, 160, 160)',
        borderWidth: 3,
      },
    ],
  };

  return (
    <Radar
      height="100%"
      options={radarOptions}
      data={data} />
  )
}

export function CountPerGradeLine({ target, hasEscapeValue }: any) {
  target?.shift();
  if (hasEscapeValue) { target?.pop(); }
  const GradeCountOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    elements: {
      point: {
        radius: 0, // 점 제거
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(200, 200, 200)',
          font: {
            size: 10
          },
        }
      },
      y: {// 여기를 비율로 갈껀지 정수형으로 갈껀지 고민 퍼센티지로 가는게 나을듯 일부 / 전체 X 100 해서
        min: (target !== undefined) ? Math.min(...target) - Math.min(...target) / 100 : 0, // MI
        max: (target !== undefined) ? Math.max(...target) + Math.max(...target) / 100 : 0, // MAX
        beginAtZero: false,
        grid: {
          display: false,
          drawBorder: false,
          color: '#555555',
        },
        ticks: {
          display: true,
          beginAtZero: false,
          color: 'rgb(200, 200, 200)',
          font: {
            size: 10
          },
        }
      }
    }
  }
  const data = {
    labels: ['1등', '2등', '3등', '4등', '5등', '6등', '7등', '8등'],
    datasets: [
      {
        label: 'Dataset 1',
        data: target,
        borderColor: 'rgb(21, 209, 124)',
        backgroundColor: 'rgba(21, 209, 124, 0.5)',
        borderWidth: 2,
      }
    ],
  };
  return (
    <Line
      height="100%"
      options={GradeCountOptions}
      data={data}
    />
  )
}