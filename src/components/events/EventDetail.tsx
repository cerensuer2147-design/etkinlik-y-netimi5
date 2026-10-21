import type { CampusEvent } from "../../types/event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  const tarih = formatDate(event.date);

  return (
    <>
      <h2>{event.title}</h2>

      <div className="detail-container">
        <figure className="poster-container">
          <div className="poster-box">
            <div className="poster-baslik">{event.title}</div>
            <div className="poster-alt">{tarih} · {event.location}</div>
          </div>
          <figcaption>Şekil 1: {event.title} afişi</figcaption>
        </figure>

        <dl className="info-list">
          <dt>Tarih</dt>
          <dd>{tarih}, {event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      <h3 className="aciklama-baslik">Açıklama</h3>
      <p className="detail-desc">{event.description}</p>

      <div className="detail-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          ← Listeye dön
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </>
  );
}

export default EventDetail;