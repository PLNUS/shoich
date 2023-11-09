import Image from "next/image";
import { Trait } from "../libs/traitRefactor";


export default function TraitLsit({ data }: any) {
    console.log(data);

    return (
        <div className="flex flex-col w-[535px] h-[640px] overflow-y-auto scrollbar-hide pl-4 gap-y-2">
            {data.map((trait: Trait, p: number) =>
            (
                <div className="flex flex-row w-full h-[200px] bg-stone-300 p-2 rounded items-center">
                    <div className="flex flex-col min-w-[140px] gap-y-1 items-center p-1">
                        <div className="relative w-[80px] h-[80px] overflow-hidden rounded-full aspect-square">
                            <Image
                                alt=""
                                quality={70}
                                layout='fill'
                                objectFit="cover"
                                src={`/trait/${trait.core?.replaceAll(" ","")}.png`} />
                        </div>
                        <div className="text-center text-base font-mb pt-1">{trait.core}</div>
                        <div className="w-full text-center text-sm font-mr bg-slate-100 rounded text-black p-0.5">픽률 <span className="font-mb">{trait.pickRate}%</span></div>
                        <div className="flex flex-row w-full gap-x-1.5">
                            <div className="text-center w-1/2 text-xs font-mr bg-slate-600 rounded text-white p-1">승률<br />{trait.winRate}%</div>
                            <div className="text-center w-1/2 text-xs font-mr bg-neutral-600 rounded text-white p-1">순방<br />{trait.sbRate}%</div>
                        </div>
                    </div>
                    <div className="w-full h-full px-2 grid grid-cols-2 grid-rows-3 gap-2 overflow-hidden">
                        {trait.sub.map((sub, p) =>  p < 6 ? (
                            <div className={`flex flex-row items-center w-full h-full 
                            ${sub.type === "Havoc" ? "bg-pink-500" : sub.type === "Support" ? "bg-green-500" : "bg-indigo-500"} 
                            rounded p-2 gap-x-2`}>
                            <div className="relative w-[40px] h-[40px] overflow-hidden rounded-full aspect-square">
                                <Image
                                    alt={sub.sub!}
                                    quality={50}
                                    layout='fill'
                                    objectFit="cover"
                                    src={`/trait/${sub.sub?.replaceAll(" ","")}.png`} />
                            </div>
                            <div className="flex flex-col grow h-full items-center">
                                <div className="w-full text-center text-sm font-mr bg-violet-700 rounded text-white">{sub.sub}</div>
                                <div className="flex flex-row w-full h-full gap-x-1.5 items-end">
                                    <div className="text-center w-1/2 text-xs font-mr bg-slate-600 rounded text-white">{sub.winRate}%</div>
                                    <div className="text-center w-1/2 text-xs font-mr bg-neutral-600 rounded text-white">{sub.sbRate}%</div>
                                </div>
                            </div>
                        </div>
                        ) : null)}
                    </div>
                </div>
            )
            )}
        </div>
    );
}