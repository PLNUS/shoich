'use server'

import TierList from "./components/tierlist";
import getTierList from "./libs/tierfetcher";

export default async function Home() {
  const tierlist:any = await getTierList();

  return (
    <div className="page_wrap justify-center">
      <div 
        className="flex flex-col items-center px-4 min-w-[600px] h-full gap-y-2">
          <TierList data={tierlist.data}></TierList>
      </div>
    </div>
  )
}

