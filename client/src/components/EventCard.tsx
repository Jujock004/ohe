import { ArrowRight } from "@mui/icons-material";
import "../styles/EventCard.css";
import { Link } from "react-router-dom";
import { formatDate } from "../services/formatDate";

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
        <Link to={`/events/${id}`} className="discover-button">
          <span className="button-content">
            Découvrir l'événement
            <ArrowRight className="arrow-icon" />
          </span>
        </Link>
      </div>
    </div>
  );
}
