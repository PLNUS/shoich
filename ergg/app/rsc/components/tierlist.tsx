'use client'

import { useEffect, useRef, useState } from "react";
import { endOptions, scrollbarStyles, sortStandard, startOptions, updateEndDisable, updateStartDisable } from "../libs/assets";
import { Data, getListforTiergroup } from "../libs/refactor";
import ReactSelect from "react-select";
import TierItem from "./tieritem";
import { includesByCho } from "hangul-util";

export default function TierList({ data }: any) {
  // data >> refactor속 parsedData에 쓰이는 원시형 , charList >> 가공형
  // 리스트에 표현되는 것들로만 만든 리스트가 필요하다. 전체데이터 포함된걸로 할려니까 너무 느림
  const tierGroups = useRef([5, 1]);
  if (typeof window !== "undefined" && sessionStorage.getItem("tierGroup")) {
    tierGroups.current = JSON.parse(sessionStorage.getItem("tierGroup")!);
  }
  const [charList, setCharList] = useState<Array<any>>(getListforTiergroup(data, tierGroups.current[0], tierGroups.current[1]).sort(sortStandard.np));
  const searchBase = useRef(charList);

  useEffect(() => {
    sortStandard.current === undefined ? sortStandard.current = sortStandard.np : null;
    sessionStorage.setItem("tierGroup", JSON.stringify(tierGroups.current));
    updateEndDisable(tierGroups.current[0]);
    updateStartDisable(tierGroups.current[1]);
    setAverage();
  }, [])

  return (
    <div className="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
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
              setCharList(newList);
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
            onChange={(e) => { // 이상한 조건일때 ex) 이터부터 다이아까지 안되게 해야함
              const newList = getListforTiergroup(data, tierGroups.current[0], e!.value!).sort(sortStandard.current);
              setCharList(newList);
              searchBase.current = newList;
              tierGroups.current[1] = e!.value!;
              updateStartDisable(tierGroups.current[1]);
              sessionStorage.setItem("tierGroup", JSON.stringify(tierGroups.current));
              setAverage()
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

