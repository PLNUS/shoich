export async function getSynergyAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/synfetcher", { cache: 'no-store' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }

  return res.json();
}

export async function getItemAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/itemfetcher", {cache: "no-store"});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }

  return res.json();
}

export async function getTraitAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/traitfetcher", {cache: "no-store"});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }

  return res.json();
}

export async function getTSAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("http://localhost:8080/api/tsfetcher",{cache: "no-store"});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }

  return res.json();
}