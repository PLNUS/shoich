'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { initData } from "../datas/refactor";
import { gameData } from "../datas/refactor";

export default function Home() {
  const [tempDatas, setTempDatas] = useState([{ code: 0, name: 'null', WR: 0, PR: 0, SR: 0, tier: 0, nadjapoint : 0 }]);

  interface Data {
    code: number; // 험체 코드
    name: string; // 험체 이름 + 무기
    // tiergroup: number; // 티어그룹 - 1 : 이 데 미 , 2 : 다 , 3 : 플 , 4 : 골 , 0 오류

    WR: number; // WinRate
    PR: number; // PickRate
    SR: number; // 점수+Rate
    SbScore: number; // 총 변동점수
    SbCount: number; // 점수+ 수
    TK: number; // 팀킬 
    avgdeal: number; // 평딜

    tier: number; //임시, 삭제예정
    nadjapoint: number; // 나쟈 포인트, 각종 지표로 산출된 정수로 티어 산출시 사용
};

  useEffect(() => {
    setTempDatas(initData);
    gameData();
  }, [])

  return ( // 아래 두개 블록 Grid 종속화 하면 일단 프론트쪽은마무리. ExpressJS MongoDB 연동 / 통계데이터 가공 해야함ㄴ 티어표 초상화이미지 안나오는 버그걸림 확인필요
    // 해결, 매칭 표본설정 기준 다시 잡아야함. 매치평균 인1000 or 미스릴+ 으로 가자.
    <div class="page_wrap">
      <div class="flex flex-col p-4 w-3/5 h-full gap-y-4">
        <span class="text-xl font-mb pl-2 text-stone-700">지금 루미아섬에서..</span>
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
        case 1: return `bg-sky-400`
        case 2: return `bg-emerald-400`
        case 3: return `bg-amber-400`
        case 4: return `bg-orange-400`
        case 5: return `bg-rose-400`
        default: return `bg-stone-100`;
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
        <div class="w-[12%] text-center text-sm">{Math.floor(data.nadjapoint)}점</div>
        <div class="w-[12%] px-2">
          <p class={`rounded-xl text-center text-md font-mb text-white ` + color}>{data.tier}</p>
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
          var sortedData = [...tempDatas].sort((x, y) => y.WR - x.WR);
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>승률</div>
        <div id="sort_by_pr" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas].sort((x, y) => y.PR - x.PR);
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>픽률</div>
        <div id="sort_by_sr" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas].sort((x, y) => y.nadjapoint - x.nadjapoint);
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>나쟈P</div>
        <div id="sort_by_tier" class="w-[12%] text-center text-sm" onClick={() => {
          var sortedData = [...tempDatas].sort((x, y) => x.tier - y.tier);
          JSON.stringify(sortedData) === JSON.stringify(tempDatas) ? setTempDatas(sortedData.reverse()) : setTempDatas(sortedData);
        }}>티어</div>
      </div>
    );
  }
}


