import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");

if (form) {
  const isGuncelle = form.dataset.mode === "guncelle";
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (isGuncelle) {
    const etkinlik = events.find(e => e.id === id);
    if (etkinlik) {
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      form.elements.tarih.value = etkinlik.date;
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      if (form.elements.kontenjan) form.elements.kontenjan.value = etkinlik.capacity || "";
      if (form.elements.aciklama) form.elements.aciklama.value = etkinlik.description;
    } else {
      form.outerHTML = `
        <div class="hata-kutusu">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" tuşunu kullanın.</p>
          <a href="etkinlikler.html" class="btn">Etkinliklere git</a>
        </div>
      `;
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const data = {
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: fd.get("aciklama") ? fd.get("aciklama").trim() : ""
    };

    // Hata temizleme
    document.querySelectorAll(".hata-mesaji").forEach(el => el.textContent = "");
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));

    const errors = {};
    if (data.title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
      form.elements.ad.setAttribute("aria-invalid", "true");
    }
    if (!data.category) {
      errors.kategori = "Bir kategori seçin.";
      form.elements.kategori.setAttribute("aria-invalid", "true");
    }
    if (!data.date) {
      errors.tarih = "Tarih seçin.";
      form.elements.tarih.setAttribute("aria-invalid", "true");
    }
    if (!data.location) {
      errors.yer = "Yer bilgisini yazın.";
      form.elements.yer.setAttribute("aria-invalid", "true");
    }

    // Hataları ekrana yaz
    Object.keys(errors).forEach(key => {
      const hataSpan = document.querySelector(`#${key}-hata`);
      if (hataSpan) hataSpan.textContent = errors[key];
    });

    if (Object.keys(errors).length > 0) return;

    let mesajKutusu = document.querySelector("#form-mesaj");
    if (!mesajKutusu) {
      mesajKutusu = document.createElement("div");
      mesajKutusu.id = "form-mesaj";
      form.appendChild(mesajKutusu);
    }

    mesajKutusu.className = "basari-kutusu";
    mesajKutusu.innerHTML = `
      <p>Etkinlik oluşturuldu (bu sprintte kaydedilmez):</p>
      <pre>${JSON.stringify({ id: "event-7", ...data }, null, 2)}</pre>
    `;
  });
}