import TierList from "./rsc/components/tierlist";
import { getTierList, getPremadeTierList } from "./rsc/libs/tierfetcher";

export const dynamic = 'force-dynamic'

export default async function Home() {
  'use server'
  const tierlist: any = await getTierList(); // 전체 티어 Data
  const premadeTierList: any = await getPremadeTierList(); // 사전큐 티어 Data

  return (
    <div className="flex flex-col bg-white w-full h-full items-center">
      <div
        className="text-[70px] font-ml pt-8 pb-4 tracking-wider bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-transparent inline-block bg-clip-text">
        Shoi.ch
      </div>
      <div className="flex flex-row w-[1200px] py-4">
        <TierList data={tierlist.data} premadedata={premadeTierList.data}></TierList>
      </div>
    </div>
  )
}