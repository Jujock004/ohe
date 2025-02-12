import "../styles/EventCard.css";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  participation: number | 0;
  image: string;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  participation,
  image,
}: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className="event-card-image"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div key={id} className="event-card-overlay">
        <h2 className="title-event-card">{title}</h2>
        <p className="details-event-card">
          {formatDate(date)} • {location}
        </p>
        <p className="participants-event-card">
          {participation || "0"} participants
        </p>
      </div>
    </div>
  );
}
