export async function getTierList() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/tierfetcher", { next: { revalidate: 0 } });
  // absolute URL needed
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getPremadeTierList() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/premadefetcher", { next: { revalidate: 0 } });
  // absolute URL needed
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}