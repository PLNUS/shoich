'use client'

import { useEffect, useRef, useState } from "react";
import { useStore } from "./store";
import CharData from "./charData.json";
import CharMastery from "../rsc/libs/charMastery.json";
import { getKoreanWeapon } from "../rsc/libs/refactor";

export default function SynergyList({ data }) {

    const [baseData, setBaseData] = useState<Array<any>>([]);
    const [showUnstableSynWin, setShowUnstableSynWin] = useState(false);
    const [showUnstableSynSb, setShowUnstableSynSb] = useState(false);

    useEffect(() => {
        const selected = useStore.getState();
        const isValid = selected.selectedItem.data.gamecountbygrade[0];
        setBaseData(getBaseData(getSynergyList(data, selected.selectedItem.code, selected.selectedItem.weaponNum, selected.tierGroup[0], selected.tierGroup[1]), isValid));
        console.log(data);
        console.log(baseData);
    }, [])

    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col w-1/2 h-auto bg-indigo-100 p-2 mb-4">
                <div className="flex flex-row justify-between items-end">
                    <div className="text-2xl font-mr tracking-tighter p-2">
                        함께하면 점수가 올라요
                    </div>
                    <label className="flex flex-row justify-center p-2">
                        <input type="checkbox" className="accent-blue-700" 
                        onChange={(e) => {
                            if(e.target.checked) {
                                setShowUnstableSynSb(true);
                            } else {
                                setShowUnstableSynSb(false);
                            }
                        }}/>
                        <span className="font-msb text-sm ml-2">불안정한 통계 보기</span>
                    </label>
                </div>
                <div className="flex flex-row w-full gap-x-2 h-full overflow-x-scroll overflow-y-hidden">
                    {[...baseData].sort(sortBySb).map((item, p) => (item.validity || showUnstableSynSb ?
                        <div key={p} className={`flex flex-col gap-y justify-start items-center min-w-[85px] h-full rounded-xl ${item.validity ? "bg-emerald-950" : "bg-slate-950"} p-2`}>
                            <div className="flex items-end justify-end w-[65px] h-[65px] relative">
                                <div className="absolute flex justify-end aspect-square w-[65px]">
                                    <div className="charicon_dir pt-1">
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
                                <span className={`text-sm font-msb ${item.synergySb > 50 ? "text-sky-200" : "text-orange-200"} `}>{item.synergySb}%</span>
                            </div>
                            <div className="text-[10px] leading-3 font-mr w-full text-white">
                                <span className="text-xs font-msb">{item.games}</span> 게임
                            </div>
                        </div>
                    : null ))}
                </div>
            </div>
            <div className="flex flex-col w-1/2 h-auto bg-sky-100 p-2 mb-4 rounded-xl">
                <div className="text-2xl font-mr tracking-tighter p-2">
                    함께하면 우승하기 쉬워요
                </div>
                <div className="flex flex-row w-full gap-x-2 h-full overflow-x-scroll overflow-y-hidden">
                    {[...baseData].sort(sortByWR).map((item, p) => (
                        <div key={p} className={`flex flex-col gap-y justify-start items-center min-w-[85px] h-full rounded-xl ${item.validity ? "bg-indigo-950" : "bg-orange-950"} p-2`}>
                            <div className="flex items-end justify-end w-[65px] h-[65px] relative">
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
                                <span className="text-xs font-msb">{item.games}</span> 게임
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const sortByWR = (x, y) => {
    if (x.synergyWin !== y.synergyWin) return y.synergyWin - x.synergyWin;
    return y.code - x.code;
}

const sortBySb = (x, y) => {
    if (x.synergySb !== y.synergySb) return y.synergySb - x.synergySb;
    return y.code - x.code;
}

interface Synergy {
    code: number;
    weapon: string;
    name: string;
    synergyWin: number;
    synergySb: number;
    validity: boolean;
    games: number;
}

function getBaseData(data: Array<Array<number>>, validGames: number) {
    let formattedData: Array<Synergy> = [];
    data.map((char, p) => {
        formattedData.push({
            code: char[0],
            weapon: getWeaponNameByCharCode(char[0], char[1]),
            name: getWeaponNameByCharCode(char[0], char[1]) + " " + getNameByCharCode(char[0]),
            synergyWin: Math.floor(char[2] / char[4] * 10000) / 100,
            synergySb: Math.floor(char[3] / char[4] * 10000) / 100,
            validity: char[4] > validGames / 400,
            games: char[4]
        });
    });

    return formattedData;
}

function getWeaponNameByCharCode(code: number, wpNum: number) {
    let targetWpList = Object.values(CharMastery[code - 1]);
    targetWpList.shift();

    return getKoreanWeapon(targetWpList[wpNum].toString());
}

function getNameByCharCode(code: number) {
    return CharData[code - 1].name;
}

function getSynergyList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브 7 실 6 골 ~ 2 데 1 이
    let sList: Array<Array<number>> = [];

    if (startTierGroup > endTierGroup) {
        for (let i = 0; i <= (startTierGroup - endTierGroup); i++) {
            data[charCode - 1].synergy[weaponNum][startTierGroup - i - 1].map((sData, p) => {
                const isExist = (e) => e[0] == sData[0] && e[1] == sData[1];
                const index = sList.findIndex(isExist);

                if (index === -1) {
                    sList.push(sData);
                } else {
                    sList[index][2] += sData[2];
                    sList[index][3] += sData[3];
                    sList[index][4] += sData[4];
                }
            });
        }
    } else if (startTierGroup === endTierGroup) {
        data[charCode - 1].synergy[weaponNum][startTierGroup - 1].map((sData, p) => {
            const isExist = (e) => e[0] == sData[0] && e[1] == sData[1];
            const index = sList.findIndex(isExist);

            if (index === -1) {
                sList.push(sData);
            } else {
                sList[index][2] += sData[2];
                sList[index][3] += sData[3];
                sList[index][4] += sData[4];
            }
        })
    }

    return sList;
}