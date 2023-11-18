'use client'

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Data } from "../libs/refactor";
import Image from "next/image";
import Link from "next/link";
import Modal from "./modal";

export default function TierItem({ char, position, tierGroup }: any) {

  const data: Data = char; // 받아온 값들
  const p = position; // 번호임 그냥
  const [isLoading, setIsLoading] = useState(false);

  function getGradient(tier: number) {
    switch (tier) {
      case 0: return "to-gray-500";
      case 1: return "to-sky-300";
      case 2: return "to-green-300";
      case 3: return "to-yellow-300";
      case 4: return "to-orange-300";
      case 5: return "to-rose-300";
      case 6: return "to-red-700";
      default: return "to-gray-300"
    }
  }

  return (
    <motion.div
      onClick={() => {
        setIsLoading(true);
      }}
      className={`flex flex-row relative min-w-full min-h-[55px] items-center rounded py-2 
    transition-all duration-300 bg-gradient-to-r from-white via-white via-85% ${getGradient(data.tier)} bg-size-200 bg-pos-0 hover:bg-pos-100
     shadow-lg`}
      whileTap={{ scale: 0.98 }} >
      <Modal open={isLoading} />
      <Link className="absolute w-full h-full" href="/page2" onClick={() => {
        typeof window !== 'undefined' ? sessionStorage.setItem("char", JSON.stringify(data)) : null;
      }}></Link>
      <div className="flex flex-row items-center w-full h-full" >
        <div className="w-[10%] text-center font-mb text-lg border-r border-stone-400">{p + 1}</div>
        <div className="flex flex-row min-w-[30%] items-center text-md h-full gap-x-2 pl-3">
          <div
            className="relative h-full aspect-square">
            <Image
              className="rounded-full"
              fill
              alt=""
              quality={60}
              style={{ objectFit: "cover" }}
              src={`/characters/${data.code}.webp`} />
          </div>
          <div className="font-mr w-[80%] border-r text-sm border-stone-400 pl-1">{data.weapon + " " + data.name}</div>
        </div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.PR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.WR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{data.SR}%</div>
        <div className="w-[12%] text-center border-r text-sm border-stone-400">{Math.floor(data.data?.avggrade! * 100) / 100}위</div>
        <div className="w-[12%] px-3">
          <p className={`rounded-xl text-center text-md font-mb text-white ` + data.color}>{data.tier === 0 ? 'OP' : (data.tier === 6 ? 'RIP' : data.tier)}</p>
        </div>
      </div>
    </motion.div >);
}