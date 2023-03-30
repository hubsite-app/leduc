export default function getRandomColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  const r = Math.min(parseInt(c.substring(0, 2), 16), 200)
    .toString(16)
    .padStart(2, "0");
  const g = Math.min(parseInt(c.substring(2, 4), 16), 200)
    .toString(16)
    .padStart(2, "0");
  const b = Math.min(parseInt(c.substring(4, 6), 16), 200)
    .toString(16)
    .padStart(2, "0");
  return "#" + r + g + b;
}
