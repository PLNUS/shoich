'use client'

import { useEffect, useState } from "react";
import { useStore } from "./store";

export default function SynergyHead() {
  const [head,setHead] = useState("로딩중..") 

  useEffect(() => {
    const selected = useStore.getState();
    setHead(selected.selectedItem.weapon + " " + selected.selectedItem.name + " " + selected.selectedItem.data.sbcount + " " + selected.selectedItem.data.gamecountbygrade[0])
    }, [])

    return (
        <div className="flex flex-col w-full h-[250px] bg-neutral-200 p-4 text-2xl font-mb">
        {head}
      </div>
    )
}