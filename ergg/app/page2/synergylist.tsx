'use client'

import { useEffect, useState } from "react";
import { useStore } from "./store";
import CharData from "./charData.json";
import CharMastery from "../rsc/libs/charMastery.json";
import { getKoreanWeapon } from "../rsc/libs/refactor";

export default function SynergyList({ data }) {

    let selectedItem = {
        code: 37,
        weaponNum: 0,
        tierGroup: [4, 1]
    }

    const [baseData, setBaseData] = useState<Array<any>>([]);

    useEffect(() => {
        const selected = useStore.getState();
        const motherData = getSynergyList(data, selected.selectedItem.code, selected.selectedItem.weaponNum, selected.tierGroup[0], selected.tierGroup[1]);
        setBaseData(getBaseData(motherData).sort(sortByWR));
    }, [])

    return (
        <div>
            <div className="flex flex-col text-xl font-mb h-[210px] bg-neutral-300 p-2 mb-4">함께하면 점수먹기 좋은 실험체
                <div className="flex flex-row w-full gap-x-1 h-full overflow-y-scroll">
                    {[...baseData].sort(sortBySb).map((item, p) => (
                        <div key={p} className="flex flex-col gap-y min-w-[130px] h-full rounded bg-slate-100 p-2">
                            <div className="flex items-end justify-end w-[100px] h-[100px] relative">
                                <div className="absolute flex justify-end aspect-square w-[100px]">
                                    <div className="charicon_dir pt-1">
                                        <img className="absolute -translate-y-1 scale-95" src={`/characters/${item.code}.webp`} />
                                    </div>
                                </div>
                                <div className="absolute flex justify-end aspect-square w-[30px]">
                                    <div className="charicon_dir border-2 border-slate-400 bg-slate-400 pt-1">
                                        <img className="absolute -translate-y-1" src={`/weapons/${item.weapon}.png`} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm w-full">
                                점수+ {item.synergySb}%
                            </div>
                            <div className="text-sm w-full">
                                표본 {item.validity}개
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col text-xl font-mb h-[210px] bg-neutral-300 p-2 mb-4">함께하면 우승하기 좋은 실험체
                <div className="flex flex-row w-full gap-x-1 h-full overflow-y-scroll">
                    {[...baseData].sort(sortByWR).map((item, p) => (
                        <div key={p} className="flex flex-col gap-y min-w-[130px] h-full rounded bg-slate-100 p-2">
                             <div className="flex items-end justify-end w-[100px] h-[100px] relative">
                                <div className="absolute flex justify-end aspect-square w-[100px]">
                                    <div className="charicon_dir pt-1">
                                        <img className="absolute -translate-y-1 scale-95" src={`/characters/${item.code}.webp`} />
                                    </div>
                                </div>
                                <div className="absolute flex justify-end aspect-square w-[30px]">
                                    <div className="charicon_dir border-2 border-slate-400 bg-slate-400 pt-1">
                                        <img className="absolute -translate-y-1" src={`/weapons/${item.weapon}.png`} />
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm w-full">
                                승률 {item.synergyWin}%
                            </div>
                            <div className="text-sm w-full">
                                표본 {item.validity}개
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
    validity: number;
    src: string;
}

function getBaseData(data: Array<Array<number>>) {
    let formattedData: Array<Synergy> = [];
    data.map((char, p) => {
        formattedData.push({
            code: char[0],
            weapon: getWeaponNameByCharCode(char[0], char[1]),
            name: getWeaponNameByCharCode(char[0], char[1]) + " " + getNameByCharCode(char[0]),
            synergyWin: Math.floor(char[2] / char[4] * 10000) / 100,
            synergySb: Math.floor(char[3] / char[4] * 10000) / 100,
            validity: char[4],
            src: "/characters/" + char[0]
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
            })
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