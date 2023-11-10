'use server'

import {getSynergyAll, getItemAll, getTraitAll} from "./libs/fetcher";
import SynergyHead from "./components/synergyhead";
import SynergyList from "./components/synergylist";

export default async function Home() {
  // 시발 지금 tierItem에서 데이터 받아와서 SynergyList로 전달해줘야하는데 막혔다
  // 라우팅 쿼리로 전달하던 전역상태로 전달하던 해야함. 전자는 클라이언트 컴포넌트 강제사용때문에 애로함. 후자로 가는게 낫지않을까 생각
  return (
    <div className="flex flex-col w-[1400px] h-screen bg-neutral-100 gap-y-4 overflow-hidden">
      <SynergyHead/>
      <SynergyList synergy={(await getSynergyAll()).data} item={(await getItemAll()).data} trait={(await getTraitAll()).data}/>
    </div>
  )
}