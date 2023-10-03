'use server'

import TierList from "./components/tierlist";
import TrendGrid from "./components/trendgrid";
import { getGameCount } from "./libs/refactor";
import getTierList from "./libs/tierfetcher";

export default async function Home() {
  const tierlists:any = await getTierList();

  let verOptions:Array<Object> = []; // Ver Selector의 Options
  tierlists.versions.map((ver:any, p:number) => {
     verOptions.push({
        value: p,
        isDisabled: false,
        label: <div className="text-left">{`Ver 1.${ver.versionMajor}.${ver.versionMinor}`}</div>,
      });
  })

  return (
    <div className="page_wrap">
      <div className="trend_wrap">
        <span className="text-xl font-mb pl-2 text-stone-700">{getGameCount(tierlists.data[0], 0, 0, 8, 1, 0)} 개 표본의 통계</span>
        <div className="main_grid">
          <TrendGrid />
          <TrendGrid />
          <TrendGrid />
          <TrendGrid />
        </div>
      </div>
      <div 
        className="flex flex-col items-center px-4 min-w-[600px] h-full gap-y-2">
        <TierList data={tierlists.data} verOptions={verOptions}></TierList>
      </div>
    </div>
  )
}

