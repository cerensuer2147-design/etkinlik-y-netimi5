import { events } from "./data.js";

function formatTarih(tarihStr) {
  const parcalar = tarihStr.split("-");
  const isoStr = `${parcalar[2]}-${parcalar[1]}-${parcalar[0]}`;
  const d = new Date(isoStr);
  return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function createCard(event) {
  return `
    <article class="kart">
      <h2>${event.title}</h2>
      <p class="kategori-adi">${event.category}</p>
      <p><strong>Tarih:</strong> ${formatTarih(event.date)}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      ${event.capacity ? `<p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>` : ""}
      <p class="ozet-metin">${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör</a>
    </article>
  `;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  if (!list) return;
  if (dizi.length === 0) {
    list.innerHTML = "<p class='bulunamadi'>Aramanıza uygun etkinlik bulunamadı.</p>";
    return;
  }
  list.innerHTML = dizi.map(createCard).join("");
}

if (list) {
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);

    const kategoriSelect = document.querySelector("#kategori-filtre");
    const aramaInput = document.querySelector("#arama");
    const sonucSatiri = document.querySelector("#sonuc");

    if (kategoriSelect) {
      const kategoriler = [...new Set(events.map(e => e.category))];
      kategoriler.forEach(kat => {
        const opt = document.createElement("option");
        opt.value = kat;
        opt.textContent = kat;
        kategoriSelect.appendChild(opt);
      });
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.toLocaleLowerCase("tr-TR").trim() : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const filtrelenmis = events.filter(e => {
        const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                            e.description.toLocaleLowerCase("tr-TR").includes(aranan);
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
        return metinUyuyor && kategoriUyuyor;
      });

      render(filtrelenmis);
      if (sonucSatiri) {
        sonucSatiri.textContent = `${filtrelenmis.length} etkinlik listeleniyor.`;
      }
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
    if (sonucSatiri) sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
  }
}