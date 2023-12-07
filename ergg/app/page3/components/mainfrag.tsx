'use client'

import { useEffect, useState } from "react"
import { Page3Radar } from "./chart";

export default function MainFrag(props: any) {
    const [base, setBase] = useState<any>({
        WR: 0,
        PR: 0,
        SR: 0,
        AvgGrade: 1,
        AvgDeal: 0,
        AvgTK: 0,
        general: {
            WR: 0,
            PR: 0,
            SR: 0,
            AvgGrade: 1,
            AvgDeal: 0,
            AvgTK: 0
        }
    });

    useEffect(() => {
        setBase(JSON.parse(sessionStorage.getItem("preChar")!));
    }, []);

    return (
        <div className="w-[1400px] h-full p-2">
            <div className="text-lg font-jl">개발 중인 페이지 입니다. 빨강은 사전큐 통계 파랑은 전체 통계</div>
            <div className="flex flex-col h-[270px] bg-zinc-800 rounded-lg p-2">
                <span className="text-xl text-white font-jl pl-1 pb-2">파워 헥사곤 _v2</span>
                <div className="aspect-square h-[198px] rounded-lg overflow-hidden">
                    <Page3Radar
                        average={typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("average")!) : [0, 0, 0, 0, 0, 0]}
                        target1={[base?.AvgDeal, base?.PR, base?.AvgGrade, base?.SR, base?.AvgTK, base?.WR]}
                        target2={[base?.general.AvgDeal, base?.general.PR, base?.AvgGrade, base?.general.SR, base?.general.AvgTK, base?.general.WR]} />
                </div>
            </div>
            <div className="text-lg font-jl py-2">
                    승률 변화_ 기존 {base?.general.WR}% =&gt; 사전큐 {base?.WR}%, {((Math.floor((base?.WR - base?.general.WR)* 10) / 10) > 0 ? "+" : "" ) + Math.floor((base?.WR - base?.general.WR)* 100) / 100}%p 변화  
            </div>
            <div className="text-lg font-jl py-2">
                    픽률 변화_ 기존 {base?.general.PR}% =&gt; 사전큐 {base?.PR}%, {((Math.floor((base?.PR - base?.general.PR)* 10)) > 0 ? "+" : "" ) + Math.floor((base?.PR - base?.general.PR)* 100) / 100}%p 변화  
            </div>
            <div className="text-lg font-jl py-2">
                    순방률 변화_ 기존 {base?.general.SR}% =&gt; 사전큐 {base?.SR}%, {((Math.floor((base?.SR - base?.general.SR)* 10) / 10) > 0 ? "+" : "" ) + Math.floor((base?.SR - base?.general.SR)* 100) / 100}%p 변화  
            </div>
            <div className="text-lg font-jl py-2">
                    평딜 변화_ 기존 {base?.general.AvgDeal} =&gt; 사전큐 {base?.AvgDeal}, {((Math.floor((base?.AvgDeal - base?.general.AvgDeal)* 10) / 10) > 0 ? "+" : "" ) + Math.floor((base?.AvgDeal - base?.general.AvgDeal)* 10) / 10} 변화  
            </div>
            <div className="text-lg font-jl py-2">
                    평순 변화_ 기존 {base?.general.AvgGrade}위 =&gt; 사전큐 {base?.AvgGrade}위, {((Math.floor((base?.AvgGrade - base?.general.AvgGrade)* 10) / 10) > 0 ? "+" : "" ) + Math.floor((base?.AvgGrade - base?.general.AvgGrade)* 10) / 10}위 변화  
            </div>
            <div className="text-lg font-jl py-2">
                    평킬 변화_ 기존 {base?.general.AvgTK}킬 =&gt; 사전큐 {base?.AvgTK}킬, {((Math.floor((base?.AvgTK - base?.general.AvgTK)* 10) / 10) > 0 ? "+" : "" ) + Math.floor((base?.AvgTK - base?.general.AvgTK)* 10) / 10}킬 변화  
            </div>
        </div>
    )
}