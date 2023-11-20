'use client'

import { Data } from "@/app/rsc/libs/refactor";
import { useEffect, useState } from "react";
import { CharRadar, CountPerGradeLine } from "./charts";
import SkillDesc from "@/server/parsed/skillDesc.json";
import Image from "next/image";

function getColor(tier: number) {
  switch (tier) {
    case 0: return "bg-zinc-300 bg-opacity-80"
    case 1: return "bg-sky-200 bg-opacity-70"
    case 2: return "bg-green-300 bg-opacity-40"
    case 3: return "bg-amber-500 bg-opacity-20"
    case 4: return "bg-orange-500 bg-opacity-20"
    case 5: return "bg-rose-300 bg-opacity-60"
    case 6: return "bg-red-700 bg-opacity-20"
    default: return "bg-stone-200 bg-opacity-50"
  }
}

function getTextColor(tier:number) {
  switch (tier) {
    case 1: return "text-rose-400";
    case 2: return "text-stone-300";
    case 3: return "text-sky-200";
    case 4: return "text-indigo-300";
    case 5: return "text-emerald-300";
    case 6: return "text-yellow-500";
    case 7: return "text-zinc-400";
    case 8: return "text-yellow-700";
    default : return "";
  }
}

export default function SynergyHead() {
  const [head, setHead] = useState<Data>();
  const [TGText, setTGText] = useState([0,0]);

  function getTier(tier: number) {
    switch (tier) {
      case 1: return "이터니티";
      case 2: return "데미갓";
      case 3: return "미스릴";
      case 4: return "다이아몬드";
      case 5: return "플레티넘";
      case 6: return "골드";
      case 7: return "실버";
      case 8: return "브론즈";
      default: return "정보 없음";
    }
  }

  useEffect(() => {
    const selected: Data = JSON.parse(sessionStorage.getItem("char")!);
    if (selected !== undefined) {
      selected.data!.avggrade = Math.floor(selected.data!.avggrade * 100) / 100;
      setHead(selected);
      const tg = JSON.parse(sessionStorage.getItem("tierGroup")!);
      setTGText(tg);
    }
  }, [])

  return (
      <div className={`flex flex-row justify-between w-full h-auto shadow-xl ${getColor(head?.tier!)} p-4 text-2xl font-mb`}>
        <div className="flex flex-col w-[470px] h-full">
          <CharIcon />
          <SkillDetails />
        </div>
        <PowerHexagon />
        <div className="flex flex-col h-[236px] justify-between">
          <span className="text-2xl font-jl font-bold text-black pl-1">순위별 게임 수</span>
          <span className="text-base font-jl text-black pl-1 -mt-2">그래프 왼쪽이 높을수록 평균 순위가 높아요</span>
          <div className="w-[320px] h-[175px] border border-zinc-800 bg-white rounded p-2">
            <CountPerGradeLine tier={head?.tier} target={head?.data?.gamecountbygrade} hasEscapeValue={true} />
          </div>
        </div>
        <div className="flex flex-col h-[236px] justify-between">
          <span className="text-2xl font-jl font-bold text-black pl-1">순위별 평균 딜링</span>
          <span className="text-base font-jl text-black pl-1 -mt-2">중간이 솟아있으면 트럭 전복률이 높아요</span>
          <div className="w-[320px] h-[175px] border border-zinc-800 bg-white rounded p-2">
            <CountPerGradeLine tier={head?.tier} target={head?.data?.avgdealbygrade} />
          </div>
        </div>
      </div>
    )
  // '평딜', '픽률', '평순', '순방률', '평킬', '승률' 순임

  function SkillDetails() {
    const [showTooltip, setShowTooltip] = useState(0);

    return (
      <div className="flex flex-col w-auto h-full ml-4 rounded-lg gap-y-1 py-1 mt-5">
        <div className="flex flex-row w-full h-full items-center">
          <div className="flex items-center w-[15%] h-full">
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
          <div className="flex items-center w-[15%] h-full">
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
          <div className="flex items-center w-[15%] h-full">
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
          <div className="flex items-center w-[15%] h-full">
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
          <div className="flex items-center w-[15%] h-full">
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
          <div className="flex items-center w-[25%] h-full">
            <div
              onClick={() => { window.history.back() }}
              className="flex items-center justify-center w-full h-full font-mr rounded-lg bg-zinc-800 text-white border-slate-800 border-0 text-sm transition ease-in-out hover:scale-105 hover:text-black hover:font-msb hover:shadow hover:bg-white duration-130">
              티어표로<br />돌아가기
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PowerHexagon() {
    return (
      <div className="flex flex-col h-[236px] bg-zinc-800 rounded-lg p-2">
        <span className="text-xl text-white font-jl pl-1 pb-2">파워 헥사곤 _v1</span>
        <div className="aspect-square h-[184px] rounded-lg overflow-hidden">
          <CharRadar
            tier={head?.tier}
            average={typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("average")!) : [0, 0, 0, 0, 0, 0]}
            target={[head?.data?.avgdealbygrade[0], head?.PR, head?.data?.avggrade, head?.SR, head?.data?.tkbygrade[0], head?.WR]} />
        </div>
      </div>
    )
  }

  function CharIcon() {
    return (
      <div className="flex flex-row">
        <div className="flex items-end justify-end w-[150px] h-[150px] relative mt-3 ml-2">
          <div className={`relative overflow-hidden rounded-full h-full aspect-square bg-neutral-300 l${head?.color} border-[10px] pt-1`}>
            <Image
              className="scale-[100%]"
              alt=""
              quality={100}
              fill
              style={{ objectFit: "cover" }}
              src={`/characters/${head?.code}.webp`} />
          </div>
          <div className="absolute flex aspect-square w-[40px] -translate-y-2">
            <div className={`charicon_dir flex items-center justify-center ${head?.color}`}>
              <span className="font-mb text-xl text-white">{head?.tier === 0 ? "OP" : (head?.tier === 6 ? "RIP" : head?.tier)} </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-2.5 ml-4 w-full">
          <span className="text-[33px] font-jl font-bold pt-4 tracking-tight">
            {head?.weapon} {head?.name}
          </span>
          <div
            id="tiergroup"
            className={`flex tracking-wider w-full h-[30px] items-center justify-center rounded bg-zinc-800 text-white text-sm`}>
            <span className={`${getTextColor(TGText[0])}`}>{getTier(TGText[0])}</span>&nbsp;부터&nbsp;<span className={`${getTextColor(TGText[1])}`}>{getTier(TGText[1])}</span>&nbsp;까지의 통계
          </div>
          <div className="flex flex-row text-xl font-ml tracking-tight gap-x-2">
            <div className={`flex flex-col w-1/3 items-center rounded bg-zinc-800 text-white py-1`}>
              <div className="flex flex-row items-center gap-x-[6px]">
                <span className="text-base">픽률</span>
                <span className="font-ml text-xs border border-white rounded mt-[1px] px-0.5">{head?.PRGrade}</span>
              </div>
              <span className="font-msb">{head?.PR}%</span>
            </div>
            <div className={`flex flex-col w-1/3 items-center rounded bg-zinc-800 text-white py-1`}>
              <div className="flex flex-row items-center gap-x-[6px]">
                <span className="text-base">승률</span>
                <span className="font-ml text-xs border border-white rounded mt-[1px] px-0.5">{head?.WRGrade}</span>
              </div>
              <span className="font-msb">{head?.WR}%</span>
            </div>
            <div className={`flex flex-col w-1/3 items-center rounded bg-zinc-800 text-white py-1`}>
              <span className="text-base">평균 순위</span>
              <span className="font-msb">{head?.data?.avggrade}위</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}