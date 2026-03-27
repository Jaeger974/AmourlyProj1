import fetch from "node-fetch";

export async function getRandomPoem() {
  const res = await fetch('./poems.json');
  const poems = await res.json();
  const random = poems[Math.floor(Math.random() * poems.length)];
  displayPoem(random);
}

export default getRandomPoem;