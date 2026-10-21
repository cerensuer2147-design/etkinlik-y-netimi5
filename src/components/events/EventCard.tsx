import type { CampusEvent } from "../../types/event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
      <div>
        <span className="kategori-badge">{event.category}</span>
        <h3>{event.title}</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
        <p>{event.description}</p>
      </div>
      <div>
        <a
          href="#"
          className="card-link"
          onClick={(e) => {
            e.preventDefault();
            onShowDetail(event.id);
          }}
        >
          Detayları gör →
        </a>
      </div>
    </article>
  );
}

export default EventCard;