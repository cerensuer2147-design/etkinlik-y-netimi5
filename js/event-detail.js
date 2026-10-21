import { events } from "./data.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");
const container = document.querySelector("#detay");

if (container) {
  const event = events.find(e => e.id === id);

  if (!event) {
    container.innerHTML = `
      <div class="hata-kutusu">
        <p>"${id || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="btn">Etkinliklere git</a>
      </div>
    `;
    document.title = "Etkinlik Bulunamadı";
  } else {
    document.title = event.title;
    container.innerHTML = `
      <div class="detay-icerik">
        <h2>${event.title}</h2>
        <div class="kunye">
          <p><strong>Tarih:</strong> ${event.date}, ${event.time}</p>
          <p><strong>Yer:</strong> ${event.location}</p>
          <p><strong>Kategori:</strong> ${event.category}</p>
          ${event.capacity ? `<p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>` : ""}
        </div>
        <h3>Açıklama</h3>
        <p>${event.description}</p>
        <div class="detay-butonlar">
          <a href="etkinlikler.html" class="btn">Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="btn">Bu etkinliği güncelle</a>
        </div>
      </div>
    `;
  }
}