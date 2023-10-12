'use client'

import { useEffect, useRef, useState } from "react";
import { endOptions, scrollbarStyles, sortStandard, startOptions, updateEndDisable, updateStartDisable } from "../libs/assets";
import { Data, getListforTiergroup } from "../libs/refactor";
import ReactSelect from "react-select";
import TierItem from "./tieritem";

export default function TierList({ data }: any) { // data >> refactor속 parsedData에 쓰이는 원시형 , charList >> 가공형
  const [charList, setCharList] = useState<Array<any>>(getListforTiergroup(data, 5, 1).sort(sortStandard.np));
  const tierGroups = useRef([5, 1]);

  useEffect(() => {
    sortStandard.current = sortStandard.np;
    updateEndDisable(tierGroups.current[0]);
    updateStartDisable(tierGroups.current[1]);
    setAverage();
  }, [])

  return (
    <div className="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
      <div className="flex flex-row w-full justify-between p-2">
        <div className="flex flex-row gap-x-2 items-center">
          <ReactSelect
            className="w-[150px]"
            isSearchable={false}
            options={startOptions}
            styles={scrollbarStyles}
            defaultValue={startOptions[3]}
            onChange={(e) => { // .sort(sortStandard[1])
              setCharList(getListforTiergroup(data, e!.value!, tierGroups.current[1]).sort(sortStandard.current));
              tierGroups.current[0] = e!.value!;
              updateEndDisable(tierGroups.current[0]);
              setAverage()
            }} />
          <div className="text-base font-ml">
            부터
          </div>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <ReactSelect
            className="w-[150px]"
            isSearchable={false}
            options={endOptions}
            styles={scrollbarStyles}
            defaultValue={endOptions[7]}
            onChange={(e) => { // 이상한 조건일때 ex) 이터부터 다이아까지 안되게 해야함
              setCharList(getListforTiergroup(data, tierGroups.current[0], e!.value!).sort(sortStandard.current));
              tierGroups.current[1] = e!.value!;
              updateStartDisable(tierGroups.current[1]);
              setAverage()
            }} />
          <div className="text-base font-ml">
            까지
          </div>
        </div>
      </div>
      <TierHead />
      <div className="flex flex-col h-full w-full gap-y-2 overflow-scroll scrollbar-hide">
      {charList.map((char, p) => (
        <TierItem key={p} char={char} position={p} tierGroup={tierGroups.current} />))}
        </div>
    </div>
  )

  function TierHead() {
    return (
      <div className="flex flex-row relative min-w-full min-h-[40px] items-center rounded py-1 bg-neutral-600">
        <div className="w-[12%] text-center text-base border-r border-white text-white font-msb">순위</div>
        <div id="sort_by_abc" className="w-[42%] text-center border-r text-base border-white text-white font-msb">구분</div>
        <div id="sort_by_wr" className="w-[12%] text-center border-r text-base border-white text-white font-msb" onClick={() => {
          compareAndSort(sortStandard.wr);
        }}>승률</div>
        <div id="sort_by_pr" className="w-[12%] text-center border-r text-base border-white text-white font-msb" onClick={() => {
          compareAndSort(sortStandard.pr);
        }}>픽률</div>
        <div id="sort_by_sr" className="w-[12%] text-center border-r text-base border-white text-white font-msb" onClick={() => {
          compareAndSort(sortStandard.sr);
        }}>순방률</div>
        <div id="sort_by_tier" className="w-[12%] text-center text-base text-white font-msb" onClick={() => {
          compareAndSort(sortStandard.np);
        }}>티어</div>
      </div>
    );
  }

  function compareAndSort(newStandard: any) {
    if (sortStandard.current == newStandard) {
      setCharList([...charList].reverse())
    } else {
      setCharList([...charList].sort(newStandard));
      sortStandard.current = newStandard;
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
    charList.map((char:Data, p:number) => {
      entireAvgDeal += char.data?.avgdealbygrade[0]!;
      entireAvgGrade += char.data?.avggrade!;
      entireTK += char.data?.tkbygrade[0]!;
      entireSB += char.SR;
      entirePR += char.PR;
      entireWR += char.WR;

      counts++;
    });
    
    sessionStorage.setItem("average", JSON.stringify([entireAvgDeal / counts, entirePR / counts ,entireAvgGrade / counts, entireSB/counts, entireTK / counts, entireWR / counts]));
  }
}

