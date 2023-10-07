import parseSynergy from "./fetcher";
import SynergyHead from "./synergyhead";
import SynergyList from "./synergylist";

export default async function Home() {
  // 시발 지금 tierItem에서 데이터 받아와서 SynergyList로 전달해줘야하는데 막혔다
  // 라우팅 쿼리로 전달하던 전역상태로 전달하던 해야함. 전자는 클라이언트 컴포넌트 강제사용때문에 애로함. 후자로 가는게 낫지않을까 생각
  const data = await parseSynergy();
  
  // 위 주석은 해결했고, 이제 RSC -> PAGE2 순으로 접속하지 않았을 경우 퇴출시켜야함 왜와이 selectedItem이 없기 때문 아 아닌가 모르겠다 시발

  return (
    <div className="flex flex-col w-[1400px] h-screen bg-neutral-100 gap-y-4 overflow-scroll">
      <SynergyHead/>
      <SynergyList data={data}/>
    </div>
  )
}