'use client'

import { Data } from "@/app/rsc/libs/refactor";
import { useEffect, useState } from "react";
import { CharRadar, CountPerGradeLine } from "./charts";
import SkillDesc from "@/server/parsed/skillDesc.json";
import Image from "next/image";


export default function SynergyHead() {
  'use client'

  const [head, setHead] = useState<Data>();

  useEffect(() => {
    const selected: Data = JSON.parse(sessionStorage.getItem("char")!);
    selected.data!.avggrade = Math.floor(selected.data!.avggrade * 100) / 100;
    setHead(selected);
  }, [])

  return (
    <div className="flex flex-row justify-between w-full h-auto border-neutral-300 border-2 rounded-md p-4 text-2xl font-mb mt-2">
      <div className="flex flex-col w-[470px] h-full">
        <CharIcon />
        <SkillDetails />
      </div>
      <PowerHexagon />
      <div className="flex flex-col h-full">
        <div className="flex flex-col p-1">
          <span className="text-2xl font-mb">순위별 게임 수</span>
          <span className="text-sm font-msb text-slate-500 pl-0.5">그래프 왼쪽이 높을수록 평균 순위가 높아요</span>
        </div>
        <div className="w-[320px] h-[180px] rounded-lg bg-slate-800 p-2">
          <CountPerGradeLine target={head?.data?.gamecountbygrade} hasEscapeValue={true} />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col p-1">
          <span className="text-2xl font-mb">순위별 평균 딜링</span>
          <span className="text-sm font-msb text-slate-500 pl-0.5">중간이 솟아있으면 트럭 전복하기 쉬운 실험체에요</span>
        </div>
        <div className="w-[320px] h-[180px] rounded-lg bg-slate-800 p-2">
          <CountPerGradeLine target={head?.data?.avgdealbygrade} hasEscapeValue={false} />
        </div>
      </div>
    </div>
  )
  // '평딜', '픽률', '평순', '순방률', '평킬', '승률' 순임

  function SkillDetails() {
    const [showTooltip, setShowTooltip] = useState(0);

    return (<div className="flex flex-col w-auto h-full ml-4 rounded-lg gap-y-1 py-1">
      <div className="text-lg font-num">스킬 설명 -</div>
      <div className="flex flex-row w-full h-full">
        <div className="flex items-center w-1/5 h-full">
          <div
            className="flex items-end justify-end relative w-[50px] h-[50px] shadow-xl"
            onMouseOver={() => setShowTooltip(1)}
            onMouseOut={() => setShowTooltip(0)}>
            {head !== undefined ? (
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                fill
                src={`/skills/${head?.code}/q.png`} />) : null}
            <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">Q</div>
            <div className={"flex flex-col absolute text-sm font-ml translate-x-[97%] translate-y-[90%] bg-gray-300 opacity-95 shadow-xl w-[550px] h-auto z-50 rounded p-2 "
              + (showTooltip === 1 ? "visible" : "invisible")}>
              <div className="font-mb text-base">{head === undefined ? "" : SkillDesc[head!.code - 1].nameQ}</div>
              <div>{head === undefined ? "" : SkillDesc[head!.code - 1].descQ}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/5 h-full">
          <div
            className="flex items-end justify-end relative w-[50px] h-[50px] shadow-xl"
            onMouseOver={() => setShowTooltip(2)}
            onMouseOut={() => setShowTooltip(0)}>
            {head !== undefined ? (
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                fill
                src={`/skills/${head?.code}/w.png`} />) : null}
            <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">W</div>
            <div className={"flex flex-col absolute text-sm font-ml translate-x-[97%] translate-y-[90%] bg-gray-300 opacity-95 shadow-xl w-[550px] h-auto z-50 rounded p-2 "
              + (showTooltip === 2 ? "visible" : "invisible")}>
              <div className="font-mb text-base">{head === undefined ? "" : SkillDesc[head!.code - 1].nameW}</div>
              <div>{head === undefined ? "" : SkillDesc[head!.code - 1].descW}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/5 h-full">
          <div className="flex items-end justify-end relative w-[50px] h-[50px] shadow-xl"
            onMouseOver={() => setShowTooltip(3)}
            onMouseOut={() => setShowTooltip(0)}>
            {head !== undefined ? (
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                fill
                src={`/skills/${head?.code}/e.png`} />) : null}
            <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">E</div>
            <div className={"flex flex-col absolute text-sm font-ml translate-x-[97%] translate-y-[90%] bg-gray-300 opacity-95 shadow-xl w-[550px] h-auto z-50 rounded p-2 "
              + (showTooltip === 3 ? "visible" : "invisible")}>
              <div className="font-mb text-base">{head === undefined ? "" : SkillDesc[head!.code - 1].nameE}</div>
              <div>{head === undefined ? "" : SkillDesc[head!.code - 1].descE}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/5 h-full">
          <div className="flex items-end justify-end relative w-[50px] h-[50px] shadow-xl"
            onMouseOver={() => setShowTooltip(4)}
            onMouseOut={() => setShowTooltip(0)}>
            {head !== undefined ? (
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                fill
                src={`/skills/${head?.code}/r.png`} />) : null}
            <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">R</div>
            <div className={"flex flex-col absolute text-sm font-ml translate-x-[97%] translate-y-[90%] bg-gray-300 opacity-95 shadow-xl w-[550px] h-auto z-50 rounded p-2 "
              + (showTooltip === 4 ? "visible" : "invisible")}>
              <div className="font-mb text-base">{head === undefined ? "" : SkillDesc[head!.code - 1].nameR}</div>
              <div>{head === undefined ? "" : SkillDesc[head!.code - 1].descR}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/5 h-full">
          <div className="flex items-end justify-end relative w-[50px] h-[50px] shadow-lg"
            onMouseOver={() => setShowTooltip(5)}
            onMouseOut={() => setShowTooltip(0)}>
            {head !== undefined ? (
              <Image
                className="rounded-lg"
                alt=""
                quality={100}
                fill
                src={`/skills/${head?.code}/t.png`} />) : null}
            <div className="flex items-center justify-center rounded-ee-lg absolute text-[12px] font-mb text-white bg-gray-700 w-[20px] h-[20px]">T</div>
            <div className={"flex flex-col absolute text-sm font-ml translate-x-[97%] translate-y-[90%] bg-gray-300 opacity-95 shadow-xl w-[550px] h-auto z-50 rounded p-2 "
              + (showTooltip === 5 ? "visible" : "invisible")}>
              <div className="font-mb text-base">{head === undefined ? "" : SkillDesc[head!.code - 1].nameT}</div>
              <div>{head === undefined ? "" : SkillDesc[head!.code - 1].descT.toString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

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
                  fill
                  style={{objectFit:"cover"}}
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
          <span className="text-[33px] font-rb py-4 tracking-tight">
            {head?.weapon} {head?.name}
          </span>
          <div className="flex flex-row text-xl font-ml tracking-tight gap-x-2">
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <div className="flex flex-row items-center gap-x-[6px]">
                <span className="text-base">픽률</span>
                <span className="font-ml text-xs border border-white rounded mt-[1px] px-0.5">{head?.PRGrade}</span>
              </div>
              <span className="font-msb">{head?.PR}%</span>
            </div>
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <div className="flex flex-row items-center gap-x-2">
                <span className="text-base">승률</span>
                <span className="font-ml text-xs border border-white rounded mt-[1px] px-0.5">{head?.WRGrade}</span>
              </div>
              <span className="font-msb">{head?.WR}%</span>
            </div>
            <div className={`flex flex-col w-[90px] items-center rounded ${head?.color} text-white py-1`}>
              <span className="text-base">평균 순위</span>
              <span className="font-msb">{head?.data?.avggrade}위</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}