'use server'

import TierList from "./components/tierlist";
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
      
      // 
  })

  return (
    <div className="page_wrap justify-center">
      <div 
        className="flex flex-col items-center px-4 min-w-[700px] h-full gap-y-2">
          <TierList data={tierlists.data} verOptions={verOptions}></TierList>
      </div>
    </div>
  )
}

