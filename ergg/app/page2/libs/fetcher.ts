export async function getSynergyAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://stunning-couscous-pjrvwgv55gwphwvq-3000.app.github.dev/api/synfetcher", {next : {revalidate: false}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}

export async function getItemAll() {  // 버전별로 각각 List 따로 병합하기..
  "use server"
  const res = await fetch("https://stunning-couscous-pjrvwgv55gwphwvq-3000.app.github.dev/api/itemfetcher", {next : {revalidate: false}});

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json();
}