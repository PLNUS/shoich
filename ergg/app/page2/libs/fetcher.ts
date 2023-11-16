export async function getSynergyAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://bug-free-memory-j495xw4gprjcq575-3000.app.github.dev/api/synfetcher", {next: { revalidate: 0 }});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getItemAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://bug-free-memory-j495xw4gprjcq575-3000.app.github.dev/api/itemfetcher", {next: { revalidate: 0 }});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getTraitAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://bug-free-memory-j495xw4gprjcq575-3000.app.github.dev/api/traitfetcher", {next : {revalidate: 0}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getTSAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://bug-free-memory-j495xw4gprjcq575-3000.app.github.dev/api/tsfetcher", {next : {revalidate: 0}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}