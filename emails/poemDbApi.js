import fetch from "node-fetch";

export async function getRandomPoem() {
  const res = await fetch("https://poetrydb.org/random");
  const data = await res.json();
  return data[0]; // contains title, author, lines[]
}

export default getRandomPoem;