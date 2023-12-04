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
      animations: {
        scale: {
          duration: 1000,
          from: 0,
          easing: 'easeOutQuart',
        }
      },
      min: 0, // MI
      max: 150, // MAX
      beginAtZero: true,
      pointLabels: {
        font: {
          size: 13,
          family: "NIXGONM-Vb"
        },
        color: 'rgb(255, 255, 255)'
      },
      ticks: {
        display: false,
        color: 'rgb(255, 255, 255)',
        backdropColor: "rgba(0,0,0,0)",
        stepSize: 50
      },
      grid: {
        color: 'rgb(200, 200, 200)'
      },
      angleLines: {
        color: 'rgb(200, 200, 200)'
      }
    },
  }
}

export function Page3Radar({ average, target1, target2 }: any) {
  const exagger = [
    (target1[0] - average[0] * 0.2 < 0 ? 0 : average[0] * 0.2),
    0,
    (target1[2] - average[2] * 0.6 < 0 ? 0 : average[2] * 0.6),
    (target1[3] - average[3] * 0.4 < 0 ? 0 : average[3] * 0.4),
    (target1[4] - average[4] * 0.5 < 0 ? 0 : average[4] * 0.5),
    target1[5] > average[5] ? 1.2 : 1,
  ]

  const dataset1 = [
    (target1[0] - exagger[0]) / (average[0] - exagger[0]) * 100,
    (target1[1] * 1.5 + 2) / (average[1] + 3.5) * 100,
    (average[2] - exagger[2]) / (target1[2] - exagger[2]) * 100,
    (target1[3] - exagger[3]) / (average[3] - exagger[3]) * 100,
    (target1[4] - exagger[4]) / (average[4] - exagger[4]) * 100,
    (target1[5] * exagger[5]) / (average[5]) * 100,];

  const dataset2 = [
    (target2[0] - exagger[0]) / (average[0] - exagger[0]) * 100,
    (target2[1] * 1.5 + 2) / (average[1] + 3.5) * 100,
    (average[2] - exagger[2]) / (target2[2] - exagger[2]) * 100,
    (target2[3] - exagger[3]) / (average[3] - exagger[3]) * 100,
    (target2[4] - exagger[4]) / (average[4] - exagger[4]) * 100,
    (target2[5] * exagger[5]) / (average[5]) * 100,];

  const data = {
    labels: ['평딜', '픽률', '평순', '순방률', '평킬', '승률'],
    datasets: [
      {
        label: '타겟 실험체 사전 구성',
        data: dataset1,
        backgroundColor: 'rgba(255, 140, 160, 0.1)',
        borderColor: 'rgb(255, 140, 160)',
        borderWidth: 3,
      },
      {
        label: '타겟 실험체 전체',
        data: dataset2,
        backgroundColor: 'rgba(100, 60, 255, 0.4)',
        borderColor: 'rgb(150, 150, 255)',
        borderWidth: 3,
      },
      {
        label: '티어 평균',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(130, 130, 130, 0.3)',
        borderColor: 'rgb(130, 130, 130)',
        borderWidth: 2,
        // animations: false
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