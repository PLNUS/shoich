'use client'

import { Data } from "@/app/rsc/libs/refactor";
import { useEffect, useState } from "react";
import { CharRadar, CountPerGradeLine } from "./charts";
import Image from "next/image";


export default function SynergyHead() {
  'use client'

  const [head, setHead] = useState<Data>()

  useEffect(() => {
    const selected: Data = JSON.parse(sessionStorage.getItem("char")!);
    selected.data!.avggrade = Math.floor(selected.data!.avggrade * 100) / 100;
    setHead(selected);
  }, [])

  return (
    <div className="flex flex-row justify-between w-full h-auto bg-neutral-300 p-4 text-2xl font-mb">
      <div className="flex flex-col w-[470px] h-full">
        <CharIcon />
        <div className="flex flex-row w-full h-full pl-4">
          <div className="flex items-center w-1/5 h-full px-2">
            <div className="flex items-end justify-end relative w-[60px] h-[60px]">
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                layout='fill'
                src={`/skills/${head?.code}/q.png`} />
              <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">Q</div>
            </div>
          </div>
          <div className="flex items-center w-1/5 h-full px-2">
            <div className="flex items-end justify-end relative w-[60px] h-[60px]">
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                layout='fill'
                src={`/skills/${head?.code}/w.png`} />
              <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">W</div>
            </div>
          </div>
          <div className="flex items-center w-1/5 h-full px-2">
            <div className="flex items-end justify-end relative w-[60px] h-[60px]">
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                layout='fill'
                src={`/skills/${head?.code}/e.png`} />
              <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">E</div>
            </div>
          </div>
          <div className="flex items-center w-1/5 h-full px-2">
            <div className="flex items-end justify-end relative w-[60px] h-[60px]">
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                layout='fill'
                src={`/skills/${head?.code}/r.png`} />
              <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">R</div>
            </div>
          </div>
          <div className="flex items-center w-1/5 h-full px-2">
            <div className="flex items-end justify-end relative w-[60px] h-[60px]">
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                layout='fill'
                src={`/skills/${head?.code}/t.png`} />
              <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">T</div>
            </div>
          </div>
        </div>
      </div>
      <PowerHexagon />
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
  )
  // '평딜', '픽률', '평순', '순방률', '평킬', '승률' 순임

  function PowerHexagon() {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-row p-1 justify-between items-end">
          <span className="text-2xl font-mb">파워 헥사곤</span>
          <span className="text-sm font-mb pb-0.5"><span className="bg-slate-400 text-slate-400">회색</span> : 평균</span>
        </div>
        <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-slate-800 p-2">
          <CharRadar average={typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("average")!) : [0, 0, 0, 0, 0, 0]} target={[head?.data?.avgdealbygrade[0], head?.PR, head?.data?.avggrade, head?.SR, head?.data?.tkbygrade[0], head?.WR]} />
        </div>
      </div>
    )
  }

  function CharIcon() {
    return (
      <div className="flex flex-row w-full p-2 justify-between">
        <div className="flex items-end justify-end w-[130px] h-[130px] relative mt-2 ml-2">
          <div className="absolute flex aspect-square w-[130px]">
            <div className={`charicon_dir bg-neutral-300 l${head?.color} border-[10px] pt-1`}>
              <div className="relative w-full h-full"  >
                <Image
                  className="scale-[107%]"
                  alt=""
                  quality={100}
                  layout='fill'
                  objectFit="cover"
                  src={`/characters/${head?.code}.webp`} />
              </div>
            </div>
          </div>
          <div className="absolute flex aspect-square w-[40px] -translate-y-2">
            <div className={`charicon_dir flex items-center justify-center ${head?.color}`}>
              <span className="font-mb text-xl text-white">{head?.tier === 0 ? "OP" : (head?.tier === 6 ? "RIP" : head?.tier)} </span>
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}