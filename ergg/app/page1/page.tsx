'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { Data, PrimaryData, getListforTiergroup } from "../datas/refactor";

export default function Home() {
  const [tempDatas, setTempDatas] = useState<Array<Data>>([{
    code:0,
    name:"null",
    WR:0,
    PR:0,
    SR: 0,
    data:undefined,
    tier:0,
    nadjapoint:0
  }]);
  const [startTierGroup, setStartTierGroup] = useState(0);
  const [endTierGroup, setEndTierGroup] = useState(0);

  useEffect(() => {
    setTempDatas(getListforTiergroup(startTierGroup, endTierGroup));
  }, [])

  return ( // 아래 두개 블록 Grid 종속화 하면 일단 프론트쪽은마무리. ExpressJS MongoDB 연동 / 통계데이터 가공 해야함ㄴ 티어표 초상화이미지 안나오는 버그걸림 확인필요
    // 해결, 매칭 표본설정 기준 다시 잡아야함. 매치평균 인1000 or 미스릴+ 으로 가자.
    <div class="page_wrap">
      <div class="flex flex-col p-4 w-3/5 h-full gap-y-4">
        <span class="text-xl font-mb pl-2 text-stone-700">{tempDatas[0].data?.entiregamecount} 개 표본의 통계</span>
        <div class="main_grid">
          <div class="main_grid_block">
            <h1 class="main_grid_block_title">가장 핫한 실험체는?</h1>
            <div class="main_grid_block_item">
              <div class="tiericon">
                <div class="charicon_dir border-[6px] border-sky-400 scale-[97%]">
                  <img class="charicon" src={`/characters/16.webp`} />
                </div>
                <span class="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-sky-400">1</span>
              </div>
              <div class="flex flex-col grow pl-4 pt-1">
                <div class="font-mb text-xl">
                  투척 아드리아나
                </div>
                <div class="font-ml text-sm tracking-tight">
                  100,000 표본간 픽률 5%p 상승!
                </div>
                <div class="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-emerald-400">
                      <img class="charicon" src={`/characters/31.webp`} />
                    </div>
                    <span class="charicon_tier bg-emerald-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-amber-400">
                      <img class="charicon" src={`/characters/33.webp`} />
                    </div>
                    <span class="charicon_tier bg-amber-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-rose-400">
                      <img class="charicon" src={`/characters/37.webp`} />
                    </div>
                    <span class="charicon_tier bg-rose-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main_grid_block">
            <h1 class="main_grid_block_title">점수 복사기 실험체는?</h1>
            <div class="main_grid_block_item">
              <div class="tiericon">
                <div class="charicon_dir border-[6px] border-sky-400 scale-[97%]">
                  <img class="charicon" src={`/characters/32.webp`} />
                </div>
                <span class="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-sky-400">1</span>
              </div>
              <div class="flex flex-col grow pl-4 pt-1">
                <div class="font-mb text-xl">
                  투척 윌리엄
                </div>
                <div class="font-ml text-sm tracking-tight">
                  미스릴 이상 최근 100,000 게임간 +452p
                </div>
                <div class="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-emerald-400">
                      <img class="charicon" src={`/characters/45.webp`} />
                    </div>
                    <span class="charicon_tier bg-emerald-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-amber-400">
                      <img class="charicon" src={`/characters/11.webp`} />
                    </div>
                    <span class="charicon_tier bg-amber-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-rose-400">
                      <img class="charicon" src={`/characters/6.webp`} />
                    </div>
                    <span class="charicon_tier bg-rose-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main_grid_block">
            <h1 class="main_grid_block_title">가장 캐리력이 높은 실험체는?</h1>
            <div class="main_grid_block_item">
              <div class="tiericon">
                <div class="charicon_dir border-[6px] border-amber-400 scale-[97%]">
                  <img class="charicon" src={`/characters/67.webp`} />
                </div>
                <span class="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-amber-400">3</span>
              </div>
              <div class="flex flex-col w-fit pl-4 p-2">
                <div class="font-mb text-xl mb-1">
                  도끼 아비게일
                </div>
                <div class="font-ml text-sm tracking-tight">
                  캐리력 59로 1위!
                </div>
              </div>
            </div>
          </div>
          <div class="main_grid_block">
            <h1 class="main_grid_block_title">피해야 하는 폭탄 실험체는?</h1>
            <div class="main_grid_block_item">
              <div class="tiericon">
                <div class="charicon_dir border-[6px] border-stone-700 scale-[97%]">
                  <img class="charicon" src={`/characters/29.webp`} />
                </div>
                <span class="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-stone-700">1</span>
              </div>
              <div class="flex flex-col grow pl-4 pt-1">
                <div class="font-mb text-xl">
                  글러브 레온
                </div>
                <div class="font-ml text-sm tracking-tight">
                  승률 -4%p 저하!
                </div>
                <div class="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-stone-600">
                      <img class="charicon" src={`/characters/57.webp`} />
                    </div>
                    <span class="charicon_tier bg-stone-600 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-stone-500">
                      <img class="charicon" src={`/characters/66.webp`} />
                    </div>
                    <span class="charicon_tier bg-stone-500 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div class="tiericon">
                    <div class="charicon_dir border-[4px] border-stone-400">
                      <img class="charicon" src={`/characters/59.webp`} />
                    </div>
                    <span class="charicon_tier bg-stone-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center px-4 w-2/5 h-full gap-y-2">
        <TierHead />
        <div class="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
          {tempDatas.map((data, p) => (
            <TierList data={data} p={p}></TierList>
          ))}
        </div>
      </div>
    </div>
  )

  function TierList(props: any) {
    const data = props.data;
    const p = props.p;
    const color = getColor(data.tier);

    function getColor(tier: number) {
      switch (tier) {
        case 0: return `bg-stone-500`
        case 1: return `bg-sky-400`
        case 2: return `bg-emerald-400`
        case 3: return `bg-amber-400`
        case 4: return `bg-orange-400`
        case 5: return `bg-rose-400`
        default: return `bg-stone-100`
      }
    }

    return (
      <div class="flex flex-row w-full min-h-[55px] items-center divide-x divide-slate-400 bg-zinc-200 rounded-xl py-2">
        <div class="w-[12%] text-center font-mb text-lg">{p + 1}</div>
        <div class="flex flex-row w-[42%] items-center text-md h-full gap-x-2 pl-2">
          <div class="charicon_dir scale-[90%]">
            <img class="charicon scale-110" src={`/characters/${data.code}.webp`} />
          </div>
          <div class="font-mr text-sm w-[80%]">{data.name}</div>
        </div>
        <div class="w-[12%] text-center text-sm">{data.WR}%</div>
        <div class="w-[12%] text-center text-sm">{data.PR}%</div>
        <div class="w-[12%] text-center text-sm">{data.SR}%</div>
        <div class="w-[12%] px-2">
          <p class={`rounded-xl text-center text-md font-mb text-white ` + color}>{data.tier === 0 ? 'OP' : data.tier}</p>
        </div>
      </div>
    );
  }

  function TierHead() {
    return (
      <div class="flex flex-row py-2 w-full divide-x divide-slate-400 border-b-[1px] border-slate-400">
        <div class="w-[12%] text-center text-md">순위</div>
        <div id="sort_by_abc" class="w-[42%] text-center text-sm">구분</div>
        <div id="sort_by_wr" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas!].sort((x, y) => {
            if (x.WR !== y.WR) return y.WR - x.WR;

            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;

            if (x.code !== y.code) return y.code - x.code;
          });
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>승률</div>
        <div id="sort_by_pr" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas!].sort((x, y) => {
            if (x.PR !== y.PR) return y.PR - x.PR;

            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;

            if (x.code !== y.code) return y.code - x.code;
          });
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>픽률</div>
        <div id="sort_by_sr" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas!].sort((x, y) => {
            if (x.SR !== y.SR) return y.SR - x.SR;

            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;

            if (x.code !== y.code) return y.code - x.code;
          });
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>순방률</div>
        <div id="sort_by_tier" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas!].sort((x, y) => {
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;

            if (x.PR !== y.PR) return y.PR - x.PR;

            if (x.code !== y.code) return y.code - x.code;
          });
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>티어</div>
      </div>
    );
  }
}