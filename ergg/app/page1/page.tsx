'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"
import Select from "react-select";
import { Data, PrimaryData } from "../datas/refactor";
import { Refacter } from "../datas/refactor";
import { startOptions, endOptions, getColor, scrollbarStyles } from "./builder";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GetStaticProps } from "next";

let sortStandard = ["nadjapoint", (x: Data, y: Data) => {
  if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
  if (x.PR !== y.PR) return y.PR - x.PR;
  if (x.code !== y.code) return y.code - x.code;
  return undefined;
}];


export default function Home({ games }) {

  const startTierGroup = useRef(5);
  const endTierGroup = useRef(1);
  let refacter: any;

  const [tempDatas, setTempDatas] = useState<Array<Data>>([{ code: 0, name: "null", weapon: "", WR: 0, PR: 0, SR: 0, data: undefined, tier: 0, nadjapoint: 0 }]);

  useEffect(() => {
    const refacter = new Refacter(games);
    setTempDatas(refacter.getListforTiergroup(startTierGroup.current, endTierGroup.current).sort(sort));
    updateStartDisable();
    updateEndDisable();
  }, [])

  return ( // 아래 두개 블록 Grid 종속화 하면 일단 프론트쪽은마무리. ExpressJS MongoDB 연동 / 통계데이터 가공 해야함ㄴ 티어표 초상화이미지 안나오는 버그걸림 확인필요
    // 해결, 매칭 표본설정 기준 다시 잡아야함.

    // TODO : 그리드 블록 컴포넌트화로 재사용성 올리기
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
                <div className="font-ml  tracking-tight">
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
        <div className="flex flex-row w-full justify-between p-2">
          <div className="flex flex-row gap-x-4 items-center">
            <Select
              className="w-[160px]"
              isSearchable={false}
              options={startOptions}
              styles={scrollbarStyles}
              defaultValue={startOptions[3]}
              onChange={(e) => { // 이상한 조건일때 ex) 이터부터 다이아까지 안되게 해야함
                setTempDatas(refacter.getListforTiergroup(e!.value!, endTierGroup.current).sort(sortStandard[1]));
                startTierGroup.current = e!.value!;
                updateEndDisable();
              }} />
            <div className="text-md font-ml">
              부터
            </div>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <Select
              className="w-[160px]"
              isSearchable={false}
              options={endOptions}
              styles={scrollbarStyles}
              defaultValue={endOptions[7]}
              onChange={(e) => {
                setTempDatas(refacter.getListforTiergroup(startTierGroup.current, e!.value!).sort(sortStandard[1]));
                endTierGroup.current = e!.value!;
                updateStartDisable();
              }} />
            <div className="text-md font-ml">
              까지
            </div>
          </div>
        </div>
        <TierHead />
        <div className="flex flex-col h-fill w-full overflow-x-hidden overflow-y-auto scrollbar-hide gap-y-2">
          {tempDatas.sort(sortStandard[1]).map((data, p) => (
            <TierList data={data} p={p}></TierList>
          ))}
        </div>
      </div>
    </div>
  )

  function updateEndDisable() {
    endOptions.map((options, p) => {
      if (options.value > startTierGroup.current) {
        endOptions[p].isDisabled = true;
      } else {
        endOptions[p].isDisabled = false;
      }
    });
  }

  function updateStartDisable() {
    startOptions.map((options, p) => {
      if (options.value < endTierGroup.current) {
        startOptions[p].isDisabled = true;
      } else {
        startOptions[p].isDisabled = false;
      }
    });
  }

  function TierList(props: any) {
    const [animate, setAnimate] = useState('hidden');
    const data = props.data; // 받아온 값들
    const p = props.p; // 번호임 그냥

    const color = getColor(data.tier);

    return (
      <motion.div className="tierlist_item_wrap"
        whileTap={{ scale: 0.98 }}
        onHoverStart={e => { setAnimate("visible") }}
        onHoverEnd={e => { setAnimate("hidden") }}>
        <motion.div className={`absolute flex flex-row justify-end w-full h-full items-center ${color} rounded-xl py-2`}
          variants={{
            hidden: { opacity: 1, x: "-100%" },
            visible: { opacity: 1, x: 0 }
          }}
          initial="hidden"
          transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
          animate={animate}>
          <svg fill="#FFFFFF" className="mr-3 p-1.5 w-10 h-10" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fill-rule="nonzero" />
          </svg>
        </motion.div>
        <motion.div
          className="tierlist_item_hover_textdiv"
          variants={{
            hidden: { opacity: 0, y: "-100%", x: `${65}px` },
            visible: { opacity: 1, y: 0, x: `${65}px` }
          }}
          initial="hidden"
          transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
          animate={animate}>
          <div className="tierlist_item_hover_text">
            <div>평균 딜량</div>
            <div>{data.data === undefined ? 0 : Math.floor(data.data.avgdealbygrade[0] * 10) / 10}</div>
          </div>
          <div className="tierlist_item_hover_text">
            <div>평균 순위</div>
            <div>{data.data === undefined ? 0 : Math.floor(data.data.avggrade * 100) / 100 + "위"}</div>
          </div>
          <div className="tierlist_item_hover_text">
            <div>평균 팀킬</div>
            <div>{data.data === undefined ? 0 : Math.floor(data.data.tkbygrade[0] * 100) / 100}</div>
          </div>
          <div className="tierlist_item_hover_text">
            <div>점수 변동</div>
            <div>{data.data === undefined ? 0 : Math.floor(data.data.sbscore / data.data.gamecountbygrade[0] * 100) / 100}</div>
          </div>
          <div className="tierlist_item_hover_text">
            <div>탈출 확률</div>
            <div>{data.data === undefined ? 0 : Math.floor(data.data.gamecountbygrade[9] / data.data.gamecountbygrade[0] * 100) + "%"}</div>
          </div>
        </motion.div>
        <Link href="/page2" className="absolute w-full h-full" />
        <div className="w-[12%] text-center font-mb text-lg border-r border-stone-400">{p + 1}</div>
        <div className="flex flex-row w-[42%] items-center text-md h-full gap-x-2 pl-2">
          <motion.div
            variants={{
              hidden: { opacity: 1, x: "0" },
              visible: { opacity: 1, x: "-145%" }
            }}
            transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
            animate={animate}
            className="charicon_dir scale-[90%]">
            <img className="charicon scale-110" src={`/characters/${data.code}.webp`} />
          </motion.div>
          <div className="font-mr  w-[80%] border-r text-sm border-stone-400">{data.weapon + " " + data.name}</div>
        </div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.WR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.PR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.SR}%</div>
        <div className="w-[12%] px-2">
          <p className={`rounded-xl text-center text-md font-mb text-white ` + color}>{data.tier === 0 ? 'OP' : data.tier}</p>
        </div>
      </motion.div >
    ); // TODO 링크도 되면서 재축소버튼도 동작하게 코딩해야함
  }

  function TierHead() {
    return (
      <div className="flex flex-row py-2 w-full divide-x divide-slate-300 border-b-[1px] border-slate-300">
        <div className="w-[12%] text-center font-ml ">순위</div>
        <div id="sort_by_abc" className="w-[42%] text-center ">구분</div>
        <div id="sort_by_wr" className="w-[12%] text-center " onClick={() => {
          let newst = ["wr", (x: Data, y: Data) => {
            if (x.WR !== y.WR) return y.WR - x.WR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>승률</div>
        <div id="sort_by_pr" className="w-[12%] text-center " onClick={() => {
          let newst = ["pr", (x: Data, y: Data) => {
            if (x.PR !== y.PR) return y.PR - x.PR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>픽률</div>
        <div id="sort_by_sr" className="w-[12%] text-center " onClick={() => {
          let newst = ["sr", (x: Data, y: Data) => {
            if (x.SR !== y.SR) return y.SR - x.SR;
            if (x.nadjapoint !== y.nadjapoint) return y.nadjapoint - x.nadjapoint;
            if (x.code !== y.code) return y.code - x.code;
          }];
          compareAndSort(newst);
        }}>순방률</div>
        <div id="sort_by_tier" className="w-[12%] text-center " onClick={() => {
          let newst = ["nadjapoint", (x: Data, y: Data) => {
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
    if (sortStandard[0] == newStandard[0]) {
      setTempDatas([...tempDatas].reverse())
    } else {
      setTempDatas([...tempDatas].sort(newStandard[1]));
      sortStandard = newStandard;
    }
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("/api/dbapi"
    // { "versionMajor": 5, "versionMinor": 0 }, {}
  );
  return {
    props: { games: res.data.data },
  };
};