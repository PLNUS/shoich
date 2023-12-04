'use client'

import Image from "next/image";
import Link from "next/link";

export default function PremadeTierItem({ char, position, tierGroup }: any) {

  const data = char; // 받아온 값들
  const p = position; // 번호임 그냥

  return (
    <div 
    className={"flex flex-row relative min-w-full min-h-[55px] items-center bg-zinc-400 rounded py-2 overflow-hidden"}>
      <Link className="absolute w-full h-full" href="/page3" onClick={() => {
        typeof window !== 'undefined' ? sessionStorage.setItem("preChar", JSON.stringify(data)) : null;
      }}></Link>
      <div className="flex flex-row items-center w-full h-full">
        <div className="w-[12%] text-center font-mb text-lg border-r border-white text-white">{p + 1}</div>
        <div className="flex flex-row min-w-[35%] items-center text-md h-full gap-x-2 pl-2.5">
          <div className="relative h-[90%] aspect-square">
              <Image
                className="rounded-full bg-stone-300"
                fill
                alt=""
                quality={60}
                style={{objectFit:"cover"}}
                src={`/characters/${data.code}.webp`} />
          </div>
          <div className="font-ml w-[80%] border-r text-xs border-white text-white">{data.weapon + " " + data.name}</div>
        </div>
        <div className="flex flex-col w-[15%] text-center border-r text-sm border-white text-white">
          <span>{data.PR}%</span>
        </div>
        <div className="flex flex-col w-[19%] text-center border-r text-sm border-white text-white">
          <span>{data.WR}%</span>
          <span className={`text-xs font-num ${(data.WR - data.general.WR > 0) ? "text-red-700" : "text-indigo-700"}`}>{(data.WR - data.general.WR > 0 ? "+" : "") + Math.floor((data.WR - data.general.WR) * 100) / 100}%</span>
        </div>
        <div className="flex flex-col w-[19%] text-center text-sm text-white">
          <span>{data.SR}%</span>
          <span className={`text-xs font-num ${(data.SR - data.general.SR > 0) ? "text-red-700" : "text-indigo-700"}`}>{(data.SR - data.general.SR > 0 ? "+" : "") + Math.floor((data.SR - data.general.SR) * 100) / 100}%</span>
        </div>
      </div>
    </div >);
}