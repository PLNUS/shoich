'use server'

import RankList from "./components/ranklist";
import TierList from "./components/tierlist";
import getTierList from "./libs/tierfetcher";

export default async function Home() {
  const tierlist: any = await getTierList();

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

  return (
    <div className="page_wrap justify-center">
      <div
        className="flex flex-col px-4 min-w-[800px] h-full gap-y-2">
        <span className="text-3xl font-rb py-2">{formattedDate} 21:00 기준</span>{}
        <TierList data={tierlist.data}></TierList>
      </div>
    </div>
  )
}

