export const getTierList = async () => {
  const res = await fetch("http://localhost:8080/api/tierfetcher", { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }
  return res.json();
};

export const getPremadeTierList = async () => {
  const res = await fetch("http://localhost:8080/api/premadefetcher", { next: { revalidate: 300 } });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {};
  }
  return res.json();
};
