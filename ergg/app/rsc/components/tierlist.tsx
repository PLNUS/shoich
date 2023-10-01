'use client'

import { useEffect, useRef, useState } from "react";
import { endOptions, scrollbarStyles, sortStandard, startOptions, updateEndDisable, updateStartDisable } from "../libs/assets";
import { getListforTiergroup } from "../libs/refactor";
import ReactSelect from "react-select";
import TierItem from "./tieritem";

export default function TierList({ data }: any) { // data >> refactor속 parsedData에 쓰이는 원시형 , charList >> 가공형
  const [charList, setCharList] = useState<Array<any>>(getListforTiergroup(data, 5, 1).sort(sortStandard.np));
  const tierGroups = useRef([5, 1]);

  useEffect(() => {
    sortStandard.current = sortStandard.np;
    updateEndDisable(tierGroups.current[0]);
    updateStartDisable(tierGroups.current[1]);
  }, [])

  return (
    <div className="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
      <div className="flex flex-row w-full justify-between p-2">
        <div className="flex flex-row gap-x-4 items-center">
          <ReactSelect
            className="w-[160px]"
            isSearchable={false}
            options={startOptions}
            styles={scrollbarStyles}
            defaultValue={startOptions[3]}
            onChange={(e) => { // .sort(sortStandard[1])
              setCharList(getListforTiergroup(data, e!.value!, tierGroups.current[1]).sort(sortStandard.current));
              tierGroups.current[0] = e!.value!;
              updateEndDisable(tierGroups.current[0]);
            }} />
          <div className="text-md font-ml">
            부터
          </div>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <ReactSelect
            className="w-[160px]"
            isSearchable={false}
            options={endOptions}
            styles={scrollbarStyles}
            defaultValue={endOptions[7]}
            onChange={(e) => { // 이상한 조건일때 ex) 이터부터 다이아까지 안되게 해야함
              setCharList(getListforTiergroup(data, tierGroups.current[0], e!.value!).sort(sortStandard.current));
              tierGroups.current[1] = e!.value!;
              updateStartDisable(tierGroups.current[1]);
            }} />
          <div className="text-md font-ml">
            까지
          </div>
        </div>
      </div>
      <TierHead />
      {charList.map((char, p) => (
        <TierItem key={p} char={char} position={p} />))}
    </div>
  )

  function TierHead() {
    return (
      <div className="flex flex-row relative min-w-full min-h-[40px] items-center rounded-xl py-1">
        <div className="w-[12%] text-center text-sm border-r border-stone-400">순위</div>
        <div id="sort_by_abc" className="w-[42%] text-center border-r text-sm border-stone-400">구분</div>
        <div id="sort_by_wr" className="w-[12%] text-center border-r text-sm border-stone-400" onClick={() => {
          compareAndSort(sortStandard.wr);
        }}>승률</div>
        <div id="sort_by_pr" className="w-[12%] text-center border-r text-sm border-stone-400" onClick={() => {
          compareAndSort(sortStandard.pr);
        }}>픽률</div>
        <div id="sort_by_sr" className="w-[12%] text-center border-r text-sm border-stone-400" onClick={() => {
          compareAndSort(sortStandard.sr);
        }}>순방률</div>
        <div id="sort_by_tier" className="w-[12%] text-center text-sm" onClick={() => {
          compareAndSort(sortStandard.np);
        }}>티어</div>
      </div>
    );
  }

  function compareAndSort(newStandard:any) {
    if (sortStandard.current == newStandard) {
      setCharList([...charList].reverse())
    } else {
      setCharList([...charList].sort(newStandard));
      sortStandard.current = newStandard;
    }
  }
}

