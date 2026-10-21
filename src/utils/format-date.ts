const AYLAR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export function formatDate(date: string): string {
  const p = date.split("-");
  if (p.length !== 3) return date;
  const [yil, ay, gun] = p;
  return `${Number(gun)} ${AYLAR[Number(ay) - 1]} ${yil}`;
}