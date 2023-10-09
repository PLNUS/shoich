export default async function getTierListForAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"

  console.log("파싱 tlwkr");
  const res = await fetch("http://localhost:3000/api/tierfetcher");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  console.log("파싱 완료");

  return res.json();
}