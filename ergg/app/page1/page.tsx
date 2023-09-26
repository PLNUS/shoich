'use client'

import { useEffect, useState } from "react";
import Select from "react-select";
import { Data, PrimaryData, getListforTiergroup } from "../datas/refactor";
import React from "react";

const startOptions = [
  {
    text: '플래티넘',
    value: 4,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/플래티넘.png" className="h-[25px] object-cover" />플래티넘</div>,
  },
  {
    text: '다이아몬드',
    value: 3,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/다이아몬드.png" className="h-[25px] object-cover" />다이아몬드</div>,
  },
  {
    text: '미스릴',
    value: 2,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/미스릴.png" className="h-[25px] object-cover" />미스릴</div>,
  },
  {
    text: '이터니티',
    value: 1,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/이터니티.png" className="h-[25px] object-cover" />이터니티</div>,
  },
];
const endOptions = [
  {
    text: '플래티넘',
    value: 4,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/플래티넘.png" className="h-[25px] object-cover" />플래티넘</div>,
  },
  {
    text: '다이아몬드',
    value: 3,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/다이아몬드.png" className="h-[25px] object-cover" />다이아몬드</div>,
  },
  {
    text: '미스릴',
    value: 2,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/미스릴.png" className="h-[25px] object-cover" />미스릴</div>,
  },
  {
    text: '이터니티',
    value: 1,
    isDisabled: false,
    label: <div className="tierselector_label"><img src="/tiericons/이터니티.png" className="h-[25px] object-cover" />이터니티</div>,
  },
];

let sortStandard = ["nadjapoint",(x:Data, y:Data) => {
  if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
  if (x.PR !== y.PR) return y.PR - x.PR;
  if (x.code !== y.code) return y.code - x.code;
  return undefined;
}];

export default function Home() {
  const [tempDatas, setTempDatas] = useState<Array<Data>>([{ code: 0,name: "null",WR: 0,PR: 0,SR: 0,data: undefined,tier: 0,nadjapoint: 0}]);
  
  let startTierGroup = 4;
  let endTierGroup = 1;
  // 정렬기준 useState화 시켜서 초깃값 지정 필요

  useEffect(() => {
    setTempDatas(getListforTiergroup(startTierGroup, endTierGroup).sort(sortStandard[1]));
  }, [])

  return ( // 아래 두개 블록 Grid 종속화 하면 일단 프론트쪽은마무리. ExpressJS MongoDB 연동 / 통계데이터 가공 해야함ㄴ 티어표 초상화이미지 안나오는 버그걸림 확인필요
    // 해결, 매칭 표본설정 기준 다시 잡아야함.
    <div className="page_wrap">
      <div className="flex flex-col p-4 w-3/5 h-full gap-y-4">
        <span className="text-xl font-mb pl-2 text-stone-700">{tempDatas[0].data?.entiregamecount} 개 표본의 통계</span>
        <div className="main_grid">
          <div className="main_grid_block">
            <h1 className="main_grid_block_title">가장 핫한 실험체는?</h1>
            <div className="main_grid_block_item">
              <div className="tiericon">
                <div className="charicon_dir border-[6px] border-sky-400 scale-[97%]">
                  <img className="charicon" src={`/characters/16.webp`} />
                </div>
                <span className="charicon_tier min-w-[32px] min-h-[32px] font-mb text-lg self-end me-1 mb-1.5 bg-sky-400">1</span>
              </div>
              <div className="flex flex-col grow pl-4 pt-1">
                <div className="font-mb text-xl">
                  투척 아드리아나
                </div>
                <div className="font-ml text-sm tracking-tight">
                  100,000 표본간 픽률 5%p 상승!
                </div>
                <div className="flex flex-row w-full h-[62px] pt-2 gap-x-2">
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-emerald-400">
                      <img className="charicon" src={`/characters/31.webp`} />
                    </div>
                    <span className="charicon_tier bg-emerald-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">2</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-amber-400">
                      <img className="charicon" src={`/characters/33.webp`} />
                    </div>
                    <span className="charicon_tier bg-amber-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">3</span>
                  </div>
                  <div className="tiericon">
                    <div className="charicon_dir border-[4px] border-rose-400">
                      <img className="charicon" src={`/characters/37.webp`} />
                    </div>
                    <span className="charicon_tier bg-rose-400 min-w-[20px] min-h-[20px] font-mb text-xs self-end mb-[1px]">4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <div className="font-ml text-sm tracking-tight">
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
                <div className="font-ml text-sm tracking-tight">
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
                <div className="font-ml text-sm tracking-tight">
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
        <div className="flex flex-row w-full justify-between p-2">
          <div className="flex flex-row gap-x-4 items-center">
          <Select
            className="w-[160px]"
            isSearchable={false}
            options={startOptions}
            onChange={(e) => { // 이상한 조건일때 ex) 이터부터 다이아까지 안되게 해야함
              setTempDatas(getListforTiergroup(e!.value!, endTierGroup).sort(sortStandard[1]));
              startTierGroup = e!.value!;
              endOptions.map((options, p) => {
                if(options.value > startTierGroup){
                  endOptions[p].isDisabled = true;
                } else {
                  endOptions[p].isDisabled = false;
                }
              })
            }}
            defaultValue={startOptions[0]} />
          <div className="text-md font-ml">
            부터
          </div>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
          <Select
            className="w-[160px]"
            isSearchable={false}
            options={endOptions}
            onChange={(e) => {
              setTempDatas(getListforTiergroup(startTierGroup, e!.value!).sort(sortStandard[1]));
              endTierGroup = e!.value!;
              startOptions.map((options, p) => {
                if(options.value < endTierGroup){
                  startOptions[p].isDisabled = true;
                } else {
                  startOptions[p].isDisabled = false;
                }
              })
            }}
            defaultValue={endOptions[3]} />
          <div className="text-md font-ml">
            까지
          </div>
          </div>
        </div>
        <TierHead />
        <div className="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
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
      <div className="flex flex-row w-full min-h-[55px] items-center divide-x divide-slate-400 bg-zinc-200 rounded-xl py-2">
        <div className="w-[12%] text-center font-mb text-lg">{p + 1}</div>
        <div className="flex flex-row w-[42%] items-center text-md h-full gap-x-2 pl-2">
          <div className="charicon_dir scale-[90%]">
            <img className="charicon scale-110" src={`/characters/${data.code}.webp`} />
          </div>
          <div className="font-mr text-sm w-[80%]">{data.name}</div>
        </div>
        <div className="w-[12%] text-center text-sm">{data.WR}%</div>
        <div className="w-[12%] text-center text-sm">{data.PR}%</div>
        <div className="w-[12%] text-center text-sm">{data.SR}%</div>
        <div className="w-[12%] px-2">
          <p className={`rounded-xl text-center text-md font-mb text-white ` + color}>{data.tier === 0 ? 'OP' : data.tier}</p>
        </div>
      </div>
    );
  }

  function TierHead() {
    return (
      <div className="flex flex-row py-2 w-full divide-x divide-slate-300 border-b-[1px] border-slate-300">
        <div className="w-[12%] text-center font-ml text-sm">순위</div>
        <div id="sort_by_abc" className="w-[42%] text-center text-sm">구분</div>
        <div id="sort_by_wr" className="w-[12%] text-center text-sm" onClick={() => {
          let newst = ["wr",(x:Data, y:Data) => {
            if (x.WR !== y.WR) return y.WR - x.WR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>승률</div>
        <div id="sort_by_pr" className="w-[12%] text-center text-sm" onClick={() => {
          let newst = ["pr", (x:Data, y:Data) => {
            if (x.PR !== y.PR) return y.PR - x.PR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>픽률</div>
        <div id="sort_by_sr" className="w-[12%] text-center text-sm" onClick={() => {
          let newst =  ["sr",(x:Data, y:Data) => {
            if (x.SR !== y.SR) return y.SR - x.SR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>순방률</div>
        <div id="sort_by_tier" className="w-[12%] text-center text-sm" onClick={() => {
          let newst =  ["nadjapoint",(x:Data, y:Data) => {
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.PR !== y.PR) return y.PR - x.PR;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>티어</div>
      </div>
    );
  }
  
  function compareAndSort(newStandard) {
    if(sortStandard[0] == newStandard[0]) {
      setTempDatas([...tempDatas].reverse())
    } else {
      sortStandard = newStandard;
      setTempDatas([...tempDatas].sort(newStandard[1]))
    }
  }
}

