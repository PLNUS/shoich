export default async function getSynergyAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  console.log("t파싱 시작")
  const res = await fetch("http://localhost:3000/api/synfetcher");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  console.log("t파싱 종료")

  return res.json();
}