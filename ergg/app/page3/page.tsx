import MainFrag from "./components/mainfrag"

export const dynamic = 'force-dynamic'

export default async function Home() {
  'use server'

  return (
    <div className="flex flex-col bg-white w-full h-full items-center">
      <MainFrag />
    </div>
  )
}