import Image from "next/image";
import { sortByPR } from "../libs/assets";
import { TacticalSkill } from "../libs/tsRefactor";

export default function TSList({ data }: any) {
    return (
        <div className="flex flex-col w-full h-[208px] p-2 rounded border-2 border-stone-300">
            <div className="w-full h-[40px] text-2xl font-mr pl-2">전술 스킬 통계</div>
            <div className="w-full min-h-[149px] gap-2 grid grid-cols-4 grid-rows-1">
                {data.sort(sortByPR).map((ts: TacticalSkill, p: number) =>
                    p < 4 ? (
                        <div
                            key={p}
                            className="flex flex-col items-center bg-stone-300 rounded w-full h-full pt-2">
                            <div className="relative w-[55px] h-[55px] rounded-full">
                                <Image
                                    alt=""
                                    quality={50}
                                    layout='fill'
                                    objectFit="cover"
                                    src={`/tacticalskills/${ts.group}.png`} />
                            </div>
                            <div className="w-full text-center font-mb tracking-tighter text-sm py-1">{ts.name}</div>
                            <div className="flex flex-row w-full justify-between px-1">
                                <div className="w-1/2 font-msb text-center tracking-tighter text-xs">픽률</div>
                                <div className="w-1/2 font-msb text-center tracking-tighter text-xs bg-white text-black rounded">{ts.pickRate}%</div>
                            </div>
                            <div className="flex flex-row w-full justify-between px-1 mt-0.5">
                                <div className="w-1/2 font-msb text-center tracking-tighter text-xs">승률</div>
                                <div className="w-1/2 font-ml text-center tracking-tighter text-xs rounded bg-slate-600 text-white">{ts.winRate}%</div>
                            </div>
                            <div className="flex flex-row w-full justify-between px-1 mt-0.5">
                                <div className="w-1/2 font-msb text-center tracking-tighter text-xs">순방률</div>
                                <div className="w-1/2 font-ml text-center tracking-tighter text-xs rounded bg-neutral-600 text-white">{ts.sbRate}%</div>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
}