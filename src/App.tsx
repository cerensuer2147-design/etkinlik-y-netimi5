import { useState } from "react";
import type { PageName } from "./types/page";
import type { CampusEvent } from "./types/event";
import { events as initialEvents } from "./data/events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const selected = events.find((e) => e.id === selectedId);

  function go(p: PageName, id?: string) {
    setPage(p);
    if (id) setSelectedId(id);
    setMessage("");
    window.scrollTo(0, 0);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const aranan = searchText.trim().toLocaleLowerCase("tr-TR");
  const filtered = events.filter((e) => {
    const metin = `${e.title} ${e.location} ${e.description} ${e.category}`.toLocaleLowerCase("tr-TR");
    return metin.includes(aranan) && (!category || e.category === category);
  });

  const categories = [...new Set(events.map((e) => e.category))];

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: "Kampüs Etkinlikleri",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };

  return (
    <>
      <Header
        title={titles[page]}
        text={page === "events" ? "Ekim ayında kampüste düzenlenen etkinlikler." : undefined}
      >
        <Navigation current={page} onNavigate={(p) => go(p)} />
      </Header>

      <main>
        {message && <div className="success-box">{message}</div>}

        {page === "home" && (
          <>
            <p className="intro-text">Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} twoColumns onShowDetail={(id) => go("detail", id)} />
            <button type="button" className="btn btn-primary" onClick={() => go("events")}>
              Tüm etkinlikleri gör →
            </button>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p className="sonuc">
              {filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : ""}
            </p>
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {page === "add" && (
          <EventForm
            submitLabel="Kaydet"
            onSubmit={(data) => {
              setEvents([...events, data]);
              go("events");
              setMessage(`"${data.title}" başarıyla eklendi.`);
            }}
          />
        )}

        {page === "update" && selected && (
          <EventForm
            key={selected.id}
            initial={selected}
            submitLabel="Güncelle"
            onSubmit={(data) => {
              setEvents(events.map((e) => (e.id === data.id ? data : e)));
              go("detail", data.id);
              setMessage("Etkinlik başarıyla güncellendi.");
            }}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;