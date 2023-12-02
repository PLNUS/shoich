'use client'

import { useEffect, useRef, useState } from "react";
import { endOptions, scrollbarStyles, sortByGap, sortStandard, startOptions, updateEndDisable, updateStartDisable } from "../libs/assets";
import { Data, getListforTiergroup } from "../libs/refactor";
import ReactSelect from "react-select";
import TierItem from "./tieritem";
import { includesByCho } from "hangul-util";
import HeadPart from "./headpart";
import PremadeTierItem from "./premadetieritem";
import { getPremadeList } from "../libs/prerefactor";

export default function TierList({ data, premadedata }: any) {
const existTg = typeof window !== "undefined" && sessionStorage.getItem("tierGroup") !== null ? JSON.parse(sessionStorage.getItem("tierGroup")!) : [5, 1];
  // 지금 이 TierList Component 자체가 SSR로 한번 Generate 되어서 클라이언트로 내려오는데 그때 이 tierGroups.current 값이 [5,1] 이 됨 (typeof window 에 걸려서)
  // 이후 Hydrate 시 다른 tierGroups.current 값이 배정되면서 Hydration 에러가 발생하여 CSR로 전환, 이후 sessionStorage 에서 가져온 TierGroup 값으로 다시 렌더링
  // 에러긴 하지만 결과적으로는 원하는 기능(초기 데이터 더미이더라도 보이기, 이후 정식 데이터로 업데이트) 구현됨.

  const tierGroups = useRef(existTg);
  const [charList, setCharList] = useState<Array<Data>>(getListforTiergroup(data, tierGroups.current[0], tierGroups.current[1]).sort(sortStandard.np));
  const [preList, setPreList] = useState<Array<any>>(getPremadeList(premadedata, data, tierGroups.current[0], tierGroups.current[1]));
  const searchBase = useRef(charList);

  useEffect(() => {
    sessionStorage.setItem("tierGroup", JSON.stringify(tierGroups.current));
    sortStandard.current === undefined ? sortStandard.current = sortStandard.np : null;
    updateEndDisable(tierGroups.current[0]);
    updateStartDisable(tierGroups.current[1]);
    setAverage();
  }, [])

  return (
    <div className="flex flex-row w-[1200px] gap-x-2">
      <div className="flex flex-col h-[760px] w-[720px] overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row items-end">
            <ReactSelect
              className="w-[150px]"
              isSearchable={false}
              options={startOptions}
              styles={scrollbarStyles}
              defaultValue={startOptions[8 - tierGroups.current[0]]}
              onChange={(e) => { // .sort(sortStandard[1])
                const newList = getListforTiergroup(data, e!.value!, tierGroups.current[1]).sort(sortStandard.current);
                const newPreList = getPremadeList(premadedata, data, e!.value!, tierGroups.current[1]);
                setCharList(newList);
                setPreList(newPreList);
                searchBase.current = newList;
                tierGroups.current[0] = e!.value!;
                updateEndDisable(tierGroups.current[0]);
                sessionStorage.setItem("tierGroup", JSON.stringify(tierGroups.current));
                setAverage()
              }} />
            <div className="text-base font-msb ml-2">
              부터
            </div>
          </div>
          <div className="flex flex-row items-end">
            <ReactSelect
              className="w-[150px]"
              isSearchable={false}
              options={endOptions}
              styles={scrollbarStyles}
              defaultValue={endOptions[8 - tierGroups.current[1]]}
              onChange={(e) => { 
                const newList = getListforTiergroup(data, tierGroups.current[0], e!.value!).sort(sortStandard.current);
                const newPreList = getPremadeList(premadedata, data, tierGroups.current[0], e!.value!);
                setCharList(newList);
                setPreList(newPreList);
                searchBase.current = newList;
                tierGroups.current[1] = e!.value!;
                updateStartDisable(tierGroups.current[1]); // 유효하지 않은 티어그룹 Disable(from 다이아 to 브론즈)
                sessionStorage.setItem("tierGroup", JSON.stringify(tierGroups.current));
                setAverage();
              }} />
            <div className="text-base font-msb ml-2">
              까지
            </div>
          </div>
          <div className="flex items-center w-[150px] h-full border-b border-slate-500 ml-2">
            <input
              className="appearance-none bg-transparent text-right border-none w-full h-full text-gray-700 mr-2 text-sm leading-tight focus:outline-none"
              type="text"
              placeholder="실험체 검색(초성) >>"
              onChange={(e) => {
                if (e.target.value === "") {
                  setCharList(searchBase.current);
                } else {
                  setCharList(searchBase.current.filter((element) => includesByCho(e.target.value.replace(" ", ""), element.weapon + element.name)));
                }
              }} />
          </div>
        </div>
        <div className="flex flex-row relative min-w-full min-h-[32px] items-center rounded py-1 bg-neutral-700">
          <div className="w-[10%] text-center text-sm border-r border-white text-white font-ml">순위</div>
          <div id="sort_by_abc" className="w-[30%] text-center border-r text-sm border-white text-white font-ml">구분</div>
          <HeadPart sortFunc={compareAndSort} sortBy={sortStandard.pr} sortCur={sortStandard.current} text="픽률" />
          <HeadPart sortFunc={compareAndSort} sortBy={sortStandard.wr} sortCur={sortStandard.current} text="승률" />
          <HeadPart sortFunc={compareAndSort} sortBy={sortStandard.sr} sortCur={sortStandard.current} text="순방률" />
          <HeadPart sortFunc={compareAndSort} sortBy={sortStandard.ag} sortCur={sortStandard.current} text="평순" />
          <HeadPart isLast={true} sortFunc={compareAndSort} sortBy={sortStandard.np} sortCur={sortStandard.current} text="티어" />
        </div>
        <div className="flex flex-col h-full w-full gap-y-2 overflow-scroll scrollbar-hide">
          {charList.map((char, p) => (
            <TierItem key={p} char={char} position={p} tierGroup={tierGroups.current} />))}
        </div>
      </div>

      <div className="flex flex-col px-2 gap-y-2">
          <div className="w-full text-center text-2xl font-ml tracking-wider py-1.5">사전 구성 통계 (Beta)</div>
          {/* <div className="w-full text-center text-xs font-msb">사전 구성 팀으로 게임 시 보통에 비해 승률, 순방률 변화폭이 큰 실험체 리스트</div>
          <div className="w-full text-center text-xs font-msb">사전 구성된 표본 자체가 적기 때문에 신뢰도가 떨어질 수 있어요. (픽률 0.2% 이하 제외)</div> */}
          <div className="flex flex-row w-full text-center pb-2 shadow-xl">
            <div className="w-[12%] border-r border-black font-msb text-sm">순위</div>
            <div className="w-[35%] border-r border-black font-msb text-sm">실험체</div>
            <div className="w-[15%] border-r border-black font-msb text-sm">픽률</div>
            <div className="w-[19%] border-r border-black font-msb text-sm">승률</div>
            <div className="w-[19%] font-msb text-sm">순방률</div>
          </div>
        <div className="flex flex-col w-[450px] h-[500px] overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
          {preList.map((char, p) =>  p < 99 ? (
            <PremadeTierItem key={p} char={char} position={p} tierGroup={tierGroups.current} />) : null)}
          {/* {preList.sort(sortByGap).map((char, p) =>  preList.length - p <= 5 ? (
            <PremadeTierItem key={p} char={char} gradient="from-stone-400 via-neutral-400 to-gray-400" position={p} tierGroup={tierGroups.current} />) : null)} */}
        </div>
        <div className="flex flex-col rounded border border-gray-400 shadow-lg w-[450px] h-[165px] p-2">
            <div>전체 실험체 통계</div>
            <div className="grid grid-rows-2 grid-cols-3"></div>
        </div>
      </div>
    </div>
  )

  function compareAndSort(newStandard: any) {
    if (sortStandard.current == newStandard) {
      setCharList([...charList].reverse());
      searchBase.current.reverse();
    } else {
      setCharList([...charList].sort(newStandard));
      sortStandard.current = newStandard;
      searchBase.current.sort(newStandard);
    }
  }

  function setAverage() {
    // '평딜', '픽률', '평순', '순방률', '평킬', '승률' 순임
    let entireAvgDeal = 0;
    let entireAvgGrade = 0;
    let entireTK = 0;
    let entireSB = 0;
    let entirePR = 0;
    let entireWR = 0;

    let counts = 0;
    charList.map((char: Data, p: number) => {
      entireAvgDeal += char.data?.avgdealbygrade[0]!;
      entireAvgGrade += char.data?.avggrade!;
      entireTK += char.data?.tkbygrade[0]!;
      entireSB += char.SR;
      entirePR += char.PR;
      entireWR += char.WR;

      counts++;
    });

    typeof window !== 'undefined' ? sessionStorage.setItem("average", JSON.stringify([entireAvgDeal / counts, entirePR / counts, entireAvgGrade / counts, entireSB / counts, entireTK / counts, entireWR / counts])) : null;
  }
}

