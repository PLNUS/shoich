export default async function getSynergyAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:3000/api/synfetcher");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}