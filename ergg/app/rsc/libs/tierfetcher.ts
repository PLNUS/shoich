export default async function getTierListForAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://bug-free-memory-j495xw4gprjcq575-3000.app.github.dev/api/tierfetcher", { next: { revalidate: 0 } });
  // absolute URL needed
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}