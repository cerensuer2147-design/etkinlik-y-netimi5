import type { CampusEvent } from "../../types/event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
  twoColumns?: boolean;
}

function EventList({
  events,
  onShowDetail,
  emptyText = "Etkinlik bulunamadı.",
  twoColumns = false,
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc">{emptyText}</p>;
  }

  return (
    <section className={twoColumns ? "etkinlik-listesi iki-kolon" : "etkinlik-listesi"}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </section>
  );
}

export default EventList;