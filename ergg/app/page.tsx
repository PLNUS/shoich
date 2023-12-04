import TierList from "./rsc/components/tierlist";
import { getTierList, getPremadeTierList } from "./rsc/libs/tierfetcher";

export const dynamic = 'force-dynamic'

export default async function Home() {
  'use server'
  const tierlist: any = await getTierList(); // 전체 티어 Data
  const premadeTierList: any = await getPremadeTierList(); // 사전큐 티어 Data

  return (
    <div className="flex flex-col bg-white w-full h-full items-center">
      <div className="absolute z-50 md:hidden w-screen h-screen flex flex-col justify-center items-center">
        <img className="h-[200px] w-[200px]" src="/emoji/emma_no.png" alt="않되"/>
        <div className="pt-2 text-xl font-jl">모바일 페이지는 지원하지 않아요.</div>
        <div className="text-lg font-jl">귀찮아서 안 만들었어요.</div>
      </div>
      <div
        className="hidden text-[70px] font-ml pt-8 pb-4 tracking-wider bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-transparent md:inline-block bg-clip-text">
        Shoi.ch
      </div>
      <div className="hidden md:flex flex-row w-[1200px] py-4">
        <TierList data={tierlist.data} premadedata={premadeTierList.data}></TierList>
      </div>
    </div>
  )
}