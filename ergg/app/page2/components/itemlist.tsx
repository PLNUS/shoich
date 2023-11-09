import Image from "next/image";
import { sortByGames } from "./synergylist";
import ParsedItemData from "@/server/parsed/itemData.json";
import { useState } from "react";
import ReactSelect from "react-select";
import { scrollbarStyles } from "@/app/rsc/libs/assets";
import { itemGradeOptions, itemTypeOptions } from "./assets";

export default function ItemList({ data }: any) {
    const [type, setType] = useState(0);
    const [grade, setGrade] = useState("Legend");

    function getGradientByGrade(grade: string) {
        switch (grade) {
            case "Legend": return "bg-gradient-to-b from-yellow-700 to-amber-400";
            case "Epic": return "bg-gradient-to-b from-violet-700 to-violet-400";
        }
        return "";
    }

    function getItemNameByCode(code: number) {
        return ParsedItemData.find(e => e.code === code)?.name;
    }

    return (
        <div className="flex flex-col w-[434px] h-[616px] ml-4 border-neutral-300 border-2 rounded-md px-2">
            <span className="font-ml text-2xl pl-1 pt-2 pb-1">아이템 통계</span>
            <div className="flex flex-row items-center w-full min-h-[45px] divide-x-2 divide-slate-800 pt-0.5">
                <div className="flex flex-row w-[46%] pr-4 gap-x-2">
                    <ReactSelect
                        className="w-full"
                        isSearchable={false}
                        options={itemGradeOptions}
                        styles={scrollbarStyles}
                        defaultValue={itemGradeOptions[1]}
                        onChange={(e) => {
                            setGrade(e!.value);
                        }} />
                    <ReactSelect
                        className="w-full"
                        isSearchable={false}
                        options={itemTypeOptions}
                        styles={scrollbarStyles}
                        defaultValue={itemTypeOptions[0]}
                        onChange={(e) => {
                            setType(e!.value);
                        }} />
                </div>
                <div className="w-[18%] text-sm text-center tracking-widest font-msb text-slate-700">
                    픽률
                </div>
                <div className="w-[18%] text-sm text-center tracking-widest font-msb text-slate-700">
                    승률
                </div>
                <div className="w-[18%] text-sm text-center tracking-widest font-msb text-slate-700">
                    순방률
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-y-2 py-2 overflow-hidden">
                {data.sort(sortByGames).map((item: any, p: number) => (
                    item.itemtype === type && item.itemgrade === grade ?
                        <div key={p} className={`flex flex-row items-center w-full min-h-[50px] divide-x-2 divide-slate-800
                        ${grade === "Epic" ? "bg-[rgb(228,224,254)]" : "bg-[rgb(254,221,187)]"}
                         rounded-md shadow-md`}>
                            <div className="flex flex-row w-[46%] items-center gap-x-2 py-2 pl-3">
                                <div className={`flex justify-center w-[60px] h-[36px] py-1 ${getGradientByGrade(item.itemgrade)} rounded-md`}>
                                    <Image alt=""
                                        quality={30}
                                        width={52} height={36} src={`/items/${item.code}.png`} ></Image>
                                </div>
                                <span className="text-xs font-msb text-slate-800 ">{getItemNameByCode(item.code)}</span>
                            </div>
                            <div className="w-[18%] text-xs text-center tracking-wide font-rb text-slate-800 pb-[1px]">
                                {item.PR}%
                            </div>
                            <div className="w-[18%] text-xs text-center tracking-wide font-rb text-slate-800 pb-[1px]">
                                {item.synergyWin}%
                            </div>
                            <div className="w-[18%] text-xs text-center tracking-wide font-rb text-slate-800 pb-[1px]">
                                {item.synergySb}%
                            </div>
                        </div>
                        : null
                )) // 퍼센티지에 따른 시각화 처리 필요
                }
            </div>
        </div>
    )
}