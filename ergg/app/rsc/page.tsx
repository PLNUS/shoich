'use server'

import TierList from "./components/tierlist";
import TrendGrid from "./components/trendgrid";
import { getGameCount } from "./libs/refactor";
import getTierList from "./libs/tierfetcher";

export default async function Home() {
  const tierlists = await getTierList(5, 0);
  
  return (
    <div className="page_wrap">
      <div className="trend-wrap">
        <span className="text-xl font-mb pl-2 text-stone-700">{getGameCount(tierlists,0,0,8,1,0)} 개 표본의 통계</span>
        <div className="main_grid">
          <TrendGrid />
          <div className="main_grid_block">
            <h1 className="main_grid_block_title">점수 복사기 실험체는?</h1>
            <div className="main_grid_block_item">
              <div className="tiericon">
                <div className="charicon_dir border-[6px] border-sky-400 scale-[97%]">
                  <img className="charicon" src={`/characters/32.webp`} />
                </div>
                <span className="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-sky-400">1</span>
              </div>
              <div className="flex flex-col grow pl-4 pt-1">
                <div className="font-mb text-xl">
                  투척 윌리엄
                </div>
                <div className="font-ml  tracking-tight">
                  미스릴 이상 최근 100,000 게임간 +452p
                </div>
                <div className="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-emerald-400">
                      <img className="charicon" src={`/characters/45.webp`} />
                    </div>
                    <span className="charicon_tier bg-emerald-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-amber-400">
                      <img className="charicon" src={`/characters/11.webp`} />
                    </div>
                    <span className="charicon_tier bg-amber-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-rose-400">
                      <img className="charicon" src={`/characters/6.webp`} />
                    </div>
                    <span className="charicon_tier bg-rose-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_grid_block">
            <h1 className="main_grid_block_title">가장 캐리력이 높은 실험체는?</h1>
            <div className="main_grid_block_item">
              <div className="tiericon">
                <div className="charicon_dir border-[6px] border-amber-400 scale-[97%]">
                  <img className="charicon" src={`/characters/67.webp`} />
                </div>
                <span className="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-amber-400">3</span>
              </div>
              <div className="flex flex-col w-fit pl-4 p-2">
                <div className="font-mb text-xl mb-1">
                  도끼 아비게일
                </div>
                <div className="font-ml  tracking-tight">
                  캐리력 59로 1위!
                </div>
              </div>
            </div>
          </div>
          <div className="main_grid_block">
            <h1 className="main_grid_block_title">피해야 하는 폭탄 실험체는?</h1>
            <div className="main_grid_block_item">
              <div className="tiericon">
                <div className="charicon_dir border-[6px] border-stone-700 scale-[97%]">
                  <img className="charicon" src={`/characters/29.webp`} />
                </div>
                <span className="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-stone-700">1</span>
              </div>
              <div className="flex flex-col grow pl-4 pt-1">
                <div className="font-mb text-xl">
                  글러브 레온
                </div>
                <div className="font-ml  tracking-tight">
                  승률 -4%p 저하!
                </div>
                <div className="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-stone-600">
                      <img className="charicon" src={`/characters/57.webp`} />
                    </div>
                    <span className="charicon_tier bg-stone-600 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-stone-500">
                      <img className="charicon" src={`/characters/66.webp`} />
                    </div>
                    <span className="charicon_tier bg-stone-500 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-stone-400">
                      <img className="charicon" src={`/characters/59.webp`} />
                    </div>
                    <span className="charicon_tier bg-stone-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center px-4 w-2/5 h-full gap-y-2">
        
      <TierList data={tierlists}></TierList>
      </div>
    </div>
  )
}

