'use client'

import { useState } from "react";
import { getColor } from "../libs/assets";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TierItem({ char, position }: any) {
    const [animate, setAnimate] = useState('hidden');
    const data = char; // 받아온 값들
    const p = position; // 번호임 그냥
  
    const color = getColor(data.tier);
  
    return (
      <motion.div className="tierlist_item_wrap"
        whileTap={{ scale: 0.98 }}
        onHoverStart={e => { setAnimate("visible") }}
        onHoverEnd={e => { setAnimate("hidden") }}>
        <motion.div className={`absolute flex flex-row justify-end w-full h-full items-center ${color} rounded-xl py-2`}
          variants={{
            hidden: { opacity: 1, x: "-101%" },
            visible: { opacity: 1, x: 0 }
          }}
          initial="hidden"
          transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
          animate={animate}>
          <svg fill="#FFFFFF" className="mr-3 p-1.5 w-10 h-10" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fillRule="nonzero" />
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
          <div className="font-mr w-[80%] border-r text-sm border-stone-400">{data.weapon + " " + data.name}</div>
        </div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.WR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.PR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.SR}%</div>
        <div className="w-[12%] px-2">
          <p className={`rounded-xl text-center text-md font-mb text-white ` + color}>{data.tier === 0 ? 'OP' : data.tier}</p>
        </div>
      </motion.div >);
  }