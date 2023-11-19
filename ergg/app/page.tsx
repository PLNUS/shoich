'use server'

import TierList from "./rsc/components/tierlist";
import { getTierList, getPremadeTierList } from "./rsc/libs/tierfetcher";

export default async function Home() {
  const tierlist: any = await getTierList(); // 전체 티어 Data
  const premadeTierList: any = await getPremadeTierList(); // 사전큐 티어 Data
  // console.log(premadeTierList.data[29].grades);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div
        className="text-[70px] font-ml pt-8 pb-4 tracking-wider bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-transparent inline-block bg-clip-text">
        Shoi.ch
      </div>
      <div className="flex flex-row bg-slate-50 w-[1200px] py-4">
        <TierList data={tierlist.data} premadedata={premadeTierList.data}></TierList>
      </div>
    </div>
  )
}

