'use server'

import TierList from "./components/tierlist";
import { getTierList, getPremadeTierList } from "./libs/tierfetcher";

export default async function Home() {
  const tierlist: any = await getTierList(); // 전체 티어 Data
  const premadeTierList: any = await getPremadeTierList(); // 사전큐 티어 Data
  // console.log(premadeTierList.data[29].grades);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="text-[70px] pt-8 tracking-wider bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-transparent inline-block bg-clip-text">Shoi.ch</div>
      <span className="text-xl text-center font-num py-2">{tierlist.date}</span>
      <div className="flex flex-row bg-slate-50 w-[1200px] py-4">
        <div
          className="flex flex-col px-4 min-w-[720px] gap-y-2">
          <TierList data={tierlist.data} premadedata={premadeTierList.data}></TierList>
        </div>
      </div>
    </div>
  )
}

