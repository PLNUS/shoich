import { getSynergyAll, getItemAll, getTraitAll, getTSAll } from "./libs/fetcher";
import SynergyHead from "./components/synergyhead";
import SynergyList from "./components/synergylist";
import { Metadata } from "next";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '실험체 분석 | Shoi.ch',
  description: '이터널리턴 통계 제공 웹서비스\n매일 21시쯤 업데이트',
  openGraph: {
    title: '실험체 분석',
    description: 'Statistics for Eternal Return Playable Character',
    url: 'https://shoi.ch/page2',
    siteName: '실험체 분석',
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default async function Home() {
  'use server'
  // 시발 지금 tierItem에서 데이터 받아와서 SynergyList로 전달해줘야하는데 막혔다
  // 라우팅 쿼리로 전달하던 전역상태로 전달하던 해야함. 전자는 클라이언트 컴포넌트 강제사용때문에 애로함. 후자로 가는게 낫지않을까 생각
  return (
    <div className="flex flex-col w-[1400px] h-screen bg-white gap-y-4 overflow-hidden pt-4">
      <SynergyHead />
      <SynergyList
        synergy={(await getSynergyAll()).data}
        item={(await getItemAll()).data}
        trait={(await getTraitAll()).data}
        ts={(await getTSAll()).data} />
    </div>
  )
}