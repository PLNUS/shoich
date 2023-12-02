export const getTierList = async () => {
  const res = await fetch("http://localhost:8080/api/tierfetcher", {
    cache : 'no-store'
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }
  return res.json();
};

export const getPremadeTierList = async () => {
  const res = await fetch("http://localhost:8080/api/premadefetcher", {
    cache : 'no-store'
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }
  return res.json();
};
