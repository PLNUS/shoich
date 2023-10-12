'use client'

import { useEffect, useRef, useState } from "react";
import { getBaseData, getSynergyList } from "../libs/refactor";
import { Data } from "@/app/rsc/libs/refactor";

export default function SynergyList({ data }: any) {

    const [showUnstableSynWin, setShowUnstableSynWin] = useState(false);
    const [showUnstableSynSb, setShowUnstableSynSb] = useState(false);

    const [baseData, setBaseData] = useState<Array<any>>([]);

    useEffect(() => {
        const selected:Data = JSON.parse(sessionStorage.getItem("char")!);
        const tierGroup = JSON.parse(sessionStorage.getItem("tierGroup")!);
        if(sessionStorage.getItem("synergy") === null) {
            sessionStorage.setItem("synergy", JSON.stringify(data));
            setBaseData(getBaseData(getSynergyList(data, selected.code, selected.weaponNum, tierGroup[0], tierGroup[1])));
        } else {
            setBaseData(getBaseData(getSynergyList(JSON.parse(sessionStorage.getItem("synergy")!), selected.code, selected.weaponNum, tierGroup[0], tierGroup[1])));
        }
    }, [])

    return (
        <div className="flex flex-col w-1/3">
            <div className="flex flex-col w-full h-auto bg-indigo-100">
                <div className="flex flex-row justify-between items-end">
                    <div className="text-2xl font-mr tracking-tighter p-2">
                        함께하면 점수가 올라요
                    </div>
                    <label className="flex flex-row items-center p-2">
                        <input type="checkbox" className="accent-blue-700"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setShowUnstableSynSb(true);
                                } else {
                                    setShowUnstableSynSb(false);
                                }
                            }} />
                        <span className="font-msb text-sm ml-2">불안정한 통계 보기</span>
                    </label>
                </div>
                <div className="flex flex-row w-full gap-x-2 h-full overflow-x-scroll overflow-y-hidden">
                    {[...baseData].sort(sortBySb).map((item, p) => (item.validitySb || showUnstableSynSb ?
                        <div key={p} className={`flex flex-col gap-y justify-start items-center min-w-[85px] h-full rounded-xl bg-slate-800 p-2`}>
                            <div className="flex items-end justify-end w-[65px] h-[65px] relative mt-0.5">
                                <div className="absolute flex justify-end aspect-square w-[65px]">
                                    <div className="charicon_dir bg-neutral-300 pt-1">
                                        <img className="absolute -translate-y-1.5 scale-95" src={`/characters/${item.code}.webp`} />
                                    </div>
                                </div>
                                <div className="absolute flex justify-end aspect-square w-[22px]">
                                    <div className="charicon_dir border-2 border-slate-500 bg-slate-500 pt-1">
                                        <img className="absolute -translate-y-1" src={`/weapons/${item.weapon}.png`} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs w-full text-white pt-2">
                                <span className={`text-sm font-msb ${item.synergySb > 50 ? "text-emerald-200" : item.synergySb > 40 ? "text-amber-200" : "text-rose-200"} `}>{item.synergySb}%</span>
                            </div>
                            <div className="text-[10px] leading-3 font-mr w-full text-white">
                                <span className={`text-xs font-msb ${item.validityWin ? "text-indigo-200" : "text-rose-200"}`}>{item.countSb}회</span> 순방
                            </div>
                        </div>
                        : null))}
                </div>
            </div>
            <div className="flex flex-col w-full h-auto bg-sky-100">
                <div className="flex flex-row justify-between items-end">
                    <div className="text-2xl font-mr tracking-tighter p-2">
                        함께하면 승리하기 쉬워요
                    </div>
                    <label className="flex flex-row items-center p-2">
                        <input type="checkbox" className="accent-blue-700"
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setShowUnstableSynWin(true);
                                } else {
                                    setShowUnstableSynWin(false);
                                }
                            }} />
                        <span className="font-msb text-sm ml-2">불안정한 통계 보기</span>
                    </label>
                </div>
                <div className="flex flex-row w-full gap-x-2 h-full overflow-x-scroll overflow-y-hidden">
                    {[...baseData].sort(sortByWR).map((item, p) => (item.validityWin || showUnstableSynWin ?
                        <div key={p} className={`flex flex-col gap-y justify-start items-between min-w-[85px] h-full rounded-xl 
                        ${item.validityWin ? "bg-indigo-950" : "bg-orange-950"} p-2`}>
                            <div className="flex items-end justify-end w-[65px] h-[65px] relative mt-0.5">
                                <div className="absolute flex justify-end aspect-square w-[65px]">
                                    <div className="charicon_dir bg-neutral-300 pt-1">
                                        <img className="absolute -translate-y-1.5 scale-95" src={`/characters/${item.code}.webp`} />
                                    </div>
                                </div>
                                <div className="absolute flex justify-end aspect-square w-[22px]">
                                    <div className="charicon_dir border-2 border-slate-500 bg-slate-500 pt-1">
                                        <img className="absolute -translate-y-1" src={`/weapons/${item.weapon}.png`} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs w-full text-white pt-2">
                                <span className={`text-sm font-msb ${item.synergySb > 50 ? "text-sky-200" : "text-orange-200"} `}>{item.synergyWin}%</span>
                            </div>
                            <div className="text-[10px] leading-3 font-mr w-full text-white">
                                <span className={`text-xs font-msb ${item.validityWin ? "text-white" : "text-rose-200"}`}>{item.countWin}회</span> 승리
                            </div>
                        </div>
                        : null))}
                </div>
            </div>
            <div className="flex flex-col w-full h-auto bg-indigo-100">
                <div className="flex flex-row justify-between items-end">
                    <div className="text-2xl font-mr tracking-tighter p-2">
                        팀원으로 자주 만나요
                    </div>
                </div>
                <div className="flex flex-row w-full gap-x-2 h-full overflow-x-scroll overflow-y-hidden">
                    {[...baseData].sort(sortByGames).map((item, p) => (
                        <div key={p} className={`flex flex-col gap-y justify-start items-center min-w-[85px] h-full rounded-xl ${item.validitySb ? "bg-emerald-950" : "bg-slate-950"} p-2`}>
                            <div className="flex items-end justify-end w-[65px] h-[65px] relative mt-0.5">
                                <div className="absolute flex justify-end aspect-square w-[65px]">
                                    <div className="charicon_dir bg-neutral-300 pt-1">
                                        <img className="absolute -translate-y-1.5 scale-95" src={`/characters/${item.code}.webp`} />
                                    </div>
                                </div>
                                <div className="absolute flex justify-end aspect-square w-[22px]">
                                    <div className="charicon_dir border-2 border-slate-500 bg-slate-500 pt-1">
                                        <img className="absolute -translate-y-1" src={`/weapons/${item.weapon}.png`} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-xs font-msb w-full text-white pt-2">
                                <span className={`text-sm font-msb`}>{item.games}</span> 게임
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const sortByWR = (x:any, y:any) => {
    if (x.synergyWin !== y.synergyWin) return y.synergyWin - x.synergyWin;
    return y.code - x.code;
}

const sortBySb = (x:any, y:any) => {
    if (x.synergySb !== y.synergySb) return y.synergySb - x.synergySb;
    return y.code - x.code;
}

const sortByGames = (x:any, y:any) => {
    if (x.games !== y.games) return y.games - x.games;
    return y.code - x.code;
}

interface Synergy {
    code: number;
    weapon: string;
    name: string;
    synergyWin: number;
    synergySb: number;
    countWin: number;
    countSb: number;
    validityWin: boolean;
    validitySb: boolean;
    games: number;
}