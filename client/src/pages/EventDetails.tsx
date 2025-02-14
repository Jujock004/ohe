import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { formatDate } from "../services/formatDate";
import { formatTime } from "../services/formatTime";
import "../styles/EventDetails.css";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import LoginModal from "../components/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { readByEventId } from "../services/participation";
import { stringAvatar } from "../services/stringAvatar";
import { registerToEvent } from "../services/user";

type Event = {
  id: number;
  title: string;
  user_id: number;
  description: string;
  hour: string;
  date: string;
  location: string;
  participation: number;
  image_url: string;
};

type User = {
  id: number;
  pseudo: string;
  email: string;
  password: string;
  avatar_url: string;
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [host, setHost] = useState<User>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [event, setEvent] = useState<Event>();
  const [participantsCount, setParticipantsCount] = useState<number>(0);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Récupérer l'événement et l'hôte
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
      .then((response) => response.json())
      .then((data: Event) => {
        setEvent(data);
        return fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${data.user_id}`,
        );
      })
      .then((response) => response.json())
      .then((data: User) => {
        setHost(data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setError("Erreur lors du chargement de l'événement");
      });
  }, [id]);

  // Récupère le nombre de participants
  useEffect(() => {
    if (!event?.id) return;

    readByEventId(event.id)
      .then((participants) => {
        setParticipantsCount(participants.length);
      })
      .catch((error) => {
        console.error("Error fetching participants:", error);
      });
  }, [event?.id]);

  // Vérifier l'inscription si l'utilisateur est connecté
  useEffect(() => {
    if (!event?.id || !user) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/events/${event.id}/is-registered`,
      {
        credentials: "include",
      },
    )
      .then((response) => {
        if (!response.ok)
          throw new Error("Erreur lors de la vérification de l'inscription");
        return response.json();
      })
      .then((data) => {
        setIsRegistered(data.registered);
      })
      .catch((error) => {
        console.error("Error checking registration:", error);
      });
  }, [event?.id, user]);

  const handleRegister = async () => {
    if (!event?.id || !user) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!isRegistered) {
        await registerToEvent({
          id: event.id,
          data: { event_id: event.id, user_id: user.id },
        });
        setIsRegistered(true);
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/events/${event.id}/unregister`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Erreur lors de la désinscription");
        }

        setIsRegistered(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      {event && (
        <div key={event?.id}>
          <div
            id="bannerimage"
            style={{
              backgroundImage: `url(${event?.image_url})`,
            }}
          >
            <h1 className="event-details-title">{event?.title}</h1>
          </div>
          <div className="event-details-content">
            <div className="host-info">
              <Avatar
                {...stringAvatar(host?.pseudo)}
                alt={host?.pseudo}
                src={host?.avatar_url}
              />
              <div className="host-name">
                Organisateur :{" "}
                <span className="host-name-pseudo">{host?.pseudo}</span>
              </div>
            </div>
            <p className="event-description">{event?.description}</p>
            <ul className="event-details-list">
              <li className="event-time">
                <AccessTimeRoundedIcon />
                {formatTime(event?.hour)}
              </li>
              <li className="event-date">
                <CalendarMonthRoundedIcon />
                {formatDate(event?.date)}
              </li>
              <li className="event-location">
                <LocationOnRoundedIcon />
                {event?.location}
              </li>
            </ul>
            <p className="event-participants">
              {participantsCount} participant{participantsCount > 1 ? "s" : ""}
            </p>
            {error && <div className="error-message">{error}</div>}
            <button
              type="button"
              className={`event-register-btn ${isRegistered ? "registered" : ""}`}
              onClick={!user ? handleModalOpen : handleRegister}
              disabled={isLoading}
            >
              {!user
                ? "Connectez-vous pour participer"
                : isLoading
                  ? "Chargement..."
                  : isRegistered
                    ? "Se désinscrire"
                    : "Je m'inscris"}
            </button>
          </div>
        </div>
      )}
      <LoginModal open={modalOpen} onClose={handleModalClose} />
      <Footer />
    </>
  );
}
