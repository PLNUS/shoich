import Image from "next/image";
import { Trait } from "../libs/traitRefactor";
import { useState } from "react";
import { sortByPR } from "../libs/assets";


export default function TraitLsit({ data }: any) {
    const [showTCD, setShowTCD] = useState(0);

    function SubTraitList({ trait, tp }: any) {
        const [showTD, setShowTD] = useState(0);

        return (
            <div className="w-full h-full pl-2 grid grid-cols-2 grid-rows-3 gap-2">
                {trait.sub.sort(sortByPR).map((sub: any, p: number) => p < 6 ? (
                    <div
                        key={p}
                        className={`flex flex-row items-center w-full h-full 
                            ${sub.type === "Havoc" ? "bg-rose-200" : sub.type === "Support" ? "bg-green-200" : "bg-indigo-200"} 
                            rounded p-1.5 gap-x-2`}>
                        <div className="relative w-[40px] h-[40px] rounded-full aspect-square"
                            onMouseOver={() => setShowTD(p + 1)}
                            onMouseOut={() => setShowTD(0)}>
                            <Image
                                alt={sub.sub!}
                                quality={50}
                                fill
                                style={{objectFit:"cover"}}
                                src={`/trait/${sub.sub?.replaceAll(" ", "")}.png`} />
                            {showTD === p + 1 ? <div className={`flex absolute justify-end bg-gray-300 opacity-95 shadow-xl w-[180px] h-auto z-50 rounded`
                                + (tp === 2 ? " -translate-x-[92%] -translate-y-[80%] items-end " : " -translate-x-[92%] translate-y-[24px] ")}>
                                <div className="w-full h-full p-2 text-xs font-mb">{sub.desc}</div>
                                <div className={"absolute w-[13px] h-[13px] bg-orange-400 " + (tp === 2 ? "rounded-ss-xl rounded-ee" : "rounded-es-xl rounded-se")}></div>
                            </div> : null}
                        </div>
                        <div className="flex flex-col grow h-full items-center">
                            <div className={"w-[100%] text-center text-sm font-ml rounded text-white " +
                                `${sub.type === "Havoc" ? "bg-rose-900" : sub.type === "Support" ? "bg-green-900" : "bg-indigo-900"} `}>{sub.sub}</div>
                            <div className="flex flex-row w-full h-full gap-x-1 items-end">
                                <div className="text-center w-1/3 text-xs font-mr rounded bg-white text-black">{sub.pickRate}<span className="text-[10px]">%</span></div>
                                <div className="text-center w-1/3 text-xs font-ml rounded bg-slate-600 text-white">{sub.winRate}<span className="text-[10px]">%</span></div>
                                <div className="text-center w-1/3 text-xs font-ml rounded bg-neutral-600 text-white">{sub.sbRate}<span className="text-[10px]">%</span></div>
                            </div>
                        </div>
                    </div>
                ) : null)}
            </div>
        )
    }

    return (
        <div className="flex flex-col w-[555px] h-[640px] overflow-y-auto scrollbar-hide pl-4 gap-y-2">
            {data.sort(sortByPR).map((trait: Trait, p: number) => p < 3 ?
                (
                    <div className="flex flex-row w-full h-[200px] border-neutral-300 border-2 rounded-md p-2 items-center"
                        key={p}>
                        <div className="flex flex-col min-w-[130px] gap-y-1 items-center p-1">
                            <div className="relative w-[75px] h-[75px] rounded-full aspect-square"
                                onMouseOver={() => setShowTCD(p + 1)}
                                onMouseOut={() => setShowTCD(0)}>
                                <Image
                                    alt=""
                                    quality={100}
                                    fill
                                    style={{objectFit:"cover"}}
                                    src={`/trait/${trait.core?.replaceAll(" ", "")}.png`} />
                                <div className={`flex flex-col absolute bg-gray-300 opacity-95 shadow-xl w-[370px] h-[110px] z-50 rounded 
                                    ${p === 0 ? "translate-x-[55px] translate-y-[50px] " : "translate-x-[55px] -translate-y-[82px] "}
                                    ${showTCD === p + 1 ? "visible" : "invisible"}`}>
                                    <div className="w-full h-auto px-2.5 pt-2 pb-0.5 text-base font-mb">{trait.core} |
                                        <span className={(trait.type === "Havoc" ? "text-red-700" : (trait.type === "Support" ? "text-emerald-700" : "text-blue-700"))}>
                                            {trait.type === "Havoc" ? " 파괴" : trait.type === "Support" ? " 지원" : " 저항"}
                                        </span>
                                    </div>
                                    <div className="w-full h-full px-2.5 text-xs font-mr">{trait.desc}</div>
                                </div>
                            </div>
                            <div className="text-center text-base font-mb pt-1">{trait.core}</div>
                            <div className="w-full text-center text-sm font-ml shadow-lg rounded text-black p-0.5">픽률 <span className="font-mb">{trait.pickRate}%</span></div>
                            <div className="flex flex-row w-full gap-x-1.5">
                                <div className="text-center w-1/2 text-xs font-mr bg-slate-600 rounded text-white p-1">승률<br />{trait.winRate}%</div>
                                <div className="text-center w-1/2 text-xs font-mr bg-neutral-600 rounded text-white p-1">순방<br />{trait.sbRate}%</div>
                            </div>
                        </div>
                        <SubTraitList trait={trait} tp={p} />
                    </div>
                ) : null
            )}
        </div>
    );
}