'use client'

import { Data } from "@/app/rsc/libs/refactor";
import { useEffect, useState } from "react";
import { CharRadar, CountPerGradeLine } from "./charts";


export default function SynergyHead() {
  'use client'

  const [head, setHead] = useState<Data>()

  useEffect(() => {
      const selected: Data = JSON.parse(sessionStorage.getItem("char")!);
      selected.data!.avggrade = Math.floor(selected.data!.avggrade * 100) / 100;
      setHead(selected);
  }, [])

  return (
    <div className="flex flex-col w-full h-[300px] bg-neutral-300 p-2 text-2xl font-mb">
      <div className="flex flex-row w-full p-2 justify-between">
        <CharIcon />
        <div className="flex flex-col gap-y-2">
          <span className="text-[42px] font-rb py-4">
            {head?.weapon} {head?.name}
          </span>
          <div className="flex flex-row text-xl font-ml tracking-tight gap-x-2">
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <span className="text-base">픽률</span>
              <span className="font-mb">{head?.PR}%</span>
            </div>
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <span className="text-base">승률</span>
              <span className="font-mb">{head?.WR}%</span>
            </div>
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <span className="text-base">평균 순위</span>
              <span className="font-mb">{head?.data?.avggrade}위</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-row p-1 justify-between items-end">
            <span className="text-2xl font-mb">파워 헥사곤</span>
            <span className="text-sm font-mb pb-0.5"><span className="bg-slate-400 text-slate-400">회색</span> : 평균</span>
          </div>
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-slate-800 p-2">
            <CharRadar average={typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("average")!) : [0,0,0,0,0,0]} target={[head?.data?.avgdealbygrade[0], head?.PR, head?.data?.avggrade, head?.SR, head?.data?.tkbygrade[0], head?.WR]} />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-1">
            <span className="text-2xl font-mb">순위별 게임 수</span>
            <span className="text-sm font-msb text-slate-500 pl-0.5">그래프 왼쪽이 높을수록 좋은 실험체</span>
          </div>
          <div className="w-[320px] h-[180px] rounded-lg bg-slate-800 p-2">
            <CountPerGradeLine target={head?.data?.gamecountbygrade} hasEscapeValue={true} />
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-1">
            <span className="text-2xl font-mb">순위별 평균 딜링</span>
            <span className="text-sm font-msb text-slate-500 pl-0.5">그래프 왼쪽이 높을수록 좋은 실험체</span>
          </div>
          <div className="w-[320px] h-[180px] rounded-lg bg-slate-800 p-2">
            <CountPerGradeLine target={head?.data?.avgdealbygrade} hasEscapeValue={false} />
          </div>
        </div>
      </div>
    </div>
  )
  // '평딜', '픽률', '평순', '순방률', '평킬', '승률' 순임

  function CharIcon() {
    return (
      <div className="flex items-end justify-end w-[130px] h-[130px] relative mt-2 ml-2">
        <div className="absolute flex aspect-square w-[130px]">
          <div className={`charicon_dir bg-neutral-300 l${head?.color} border-[10px] pt-1`}>
            <img className="absolute -translate-y-1.5 object-cover" src={`/characters/${head?.code}.webp`} />
          </div>
        </div>
        <div className="absolute flex aspect-square w-[40px] -translate-y-2">
          <div className={`charicon_dir flex items-center justify-center ${head?.color}`}>
            <span className="font-mb text-xl text-white">{head?.tier === 0 ? "OP" : head?.tier} </span>
          </div>
        </div>
      </div>
    );
  }
}