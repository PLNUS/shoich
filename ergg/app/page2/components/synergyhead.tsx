'use client'

import { Data } from "@/app/rsc/libs/refactor";
import { useEffect, useState } from "react";

export default function SynergyHead() {
  const [head, setHead] = useState("로딩중..")

  useEffect(() => {
    const selected:Data = JSON.parse(sessionStorage.getItem("char")!);
    setHead(`${selected.weapon} ${selected.name} / 나쟈포인트 ${Math.floor(selected.nadjapoint)}점 승률 ${selected.WR}%`)
  }, [])

  return (
    <div className="flex flex-col w-full h-[250px] bg-neutral-200 p-4 text-2xl font-mb">
      {head}
    </div>
  )
}