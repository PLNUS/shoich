'use server'

import PremadeTierList from "./components/premadetierlist";
import TierList from "./components/tierlist";
import {getTierList, getPremadeTierList } from "./libs/tierfetcher";

export default async function Home() {
  const tierlist: any = await getTierList(); // 전체 티어 Data
  const premadeTierList: any = await getPremadeTierList(); // 사전큐 티어 Data
  // console.log(premadeTierList.data[29].grades);
  return (
    <div className="page_wrap justify-center">
      <div
        className="flex flex-col px-4 min-w-[720px] h-full gap-y-2">
        <span className="text-3xl font-mr py-2">{tierlist.date}</span>{}
        <TierList data={tierlist.data}></TierList>
      </div>
      <div
        className="flex flex-col px-4 min-w-[600px] h-full gap-y-2">
        <span className="text-3xl font-mr py-2">사전 구성 팀 티어표</span>{}
        <PremadeTierList data={premadeTierList.data}></PremadeTierList>
      </div>
    </div>
  )
}

