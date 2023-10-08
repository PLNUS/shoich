'use client'

import { useEffect, useState } from "react";

export default function SynergyHead() {
  const [head, setHead] = useState("로딩중..")

  useEffect(() => {

  }, [])

  return (
    <div className="flex flex-col w-full h-[250px] bg-neutral-200 p-4 text-2xl font-mb">
      {head}
    </div>
  )
}