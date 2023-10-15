import Image from "next/image";
import { sortByGames } from "./synergylist";
import ParsedItemData from "@/server/parsed/itemData.json";
import { useState } from "react";
import ReactSelect from "react-select";
import { scrollbarStyles } from "@/app/rsc/libs/assets";
import { itemTypeOptions } from "./assets";

export default function ItemList({ data, itemGrade }: any) {
    const [type, setType] = useState(0);

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
        <div className="flex flex-col w-[500px] h-fit ml-8">
            <div className="flex flex-row items-center w-full min-h-[45px] divide-x divide-slate-700 pt-0.5">
                <div className="flex flex-row w-[46%] px-2">
                    <ReactSelect
                        className="w-full"
                        isSearchable={false}
                        options={itemTypeOptions}
                        styles={scrollbarStyles}
                        defaultValue={itemTypeOptions[0]}
                        onChange={(e) => {
                            setType(e!.value)
                        }} />
                </div>
                <div className="w-[18%] text-base text-center font-msb text-slate-700">
                    픽률
                </div>
                <div className="w-[18%] text-base text-center font-msb text-slate-700">
                    승률
                </div>
                <div className="w-[18%] text-base text-center font-msb text-slate-700">
                    순방률
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-y-2 py-2 overflow-hidden">
                {data.sort(sortByGames).map((item: any, p: number) => (
                    item.itemtype === type && item.itemgrade === itemGrade ?
                        <div key={p} className="flex flex-row items-center w-full min-h-[50px] divide-x divide-white bg-slate-700">
                            <div className="flex flex-row w-[46%] items-center gap-x-3 py-2 pl-3">
                                <div className={`flex w-[60px] h-[36px] p-1 ${getGradientByGrade(item.itemgrade)} rounded-lg`}>
                                    <div className="w-full h-full relative">
                                        <Image alt=""
                                            quality={10}
                                            layout="fill" src={`/items/${item.code}.png`} ></Image>
                                    </div>
                                </div>
                                <span className="text-sm tracking-widest font-msb text-white ">{getItemNameByCode(item.code)}</span>
                            </div>
                            <div className="w-[18%] text-sm text-center font-mr text-white">
                                {item.PR}%
                            </div>
                            <div className="w-[18%] text-sm text-center font-mr text-white">
                                {item.synergyWin}%
                            </div>
                            <div className="w-[18%] text-sm text-center font-mr text-white">
                                {item.synergySb}%
                            </div>
                        </div>
                        : null
                ))}
            </div>
        </div>
    )
}