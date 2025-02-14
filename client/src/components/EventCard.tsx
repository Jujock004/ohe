import { ArrowRight } from "@mui/icons-material";
import "../styles/EventCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent } from "../services/event";
import { formatDate } from "../services/formatDate";

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  participation: number;
  isOrganizer?: boolean;
  onDelete?: () => void;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  image,
  participation,
  isOrganizer,
  onDelete,
}: EventCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        setIsDeleting(true);
        await deleteEvent(id);
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression de l'événement");
      } finally {
        setIsDeleting(false);
      }
    }
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
        <Link to={`/events/${id}`} className="discover-button">
          <span className="button-content">
            Découvrir l'événement
            <ArrowRight className="arrow-icon" />
          </span>
        </Link>
      </div>
      {isOrganizer && (
        <IconButton
          onClick={handleDelete}
          disabled={isDeleting}
          className="delete-button"
          color="error"
          size="small"
          aria-label="supprimer l'événement"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
}
