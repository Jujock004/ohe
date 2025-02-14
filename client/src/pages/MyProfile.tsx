import { Avatar } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import "../styles/MyProfile.css";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { auth } from "../services/auth";
import { readByUserId, readEventsByOrganizer } from "../services/event";
import { fetchParticipation } from "../services/participation";
import { stringAvatar } from "../services/stringAvatar";
import CreateEvent from "./CreateEvent";

interface Event {
  id: number;
  title: string;
  user_id: number;
  description: string;
  hour: string;
  date: string;
  location: string;
  image_url: string;
}

interface Participation {
  id: number;
  userId: number;
  eventId: number;
}

export default function MyProfile() {
  const { user, setUser } = useAuth();
  const [participatingEvents, setParticipatingEvents] = useState<Event[]>([]);
  const [organizedEvents, setOrganizedEvents] = useState<Event[]>([]);
  const [participation, setParticipation] = useState<Participation[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllParticipating, setShowAllParticipating] = useState(false);
  const [showAllOrganized, setShowAllOrganized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      if (user?.id) {
        try {
          // Récupérer en parallèle les deux types d'événements
          const [participatingEvts, organizedEvts] = await Promise.all([
            readByUserId(user.id),
            readEventsByOrganizer(user.id),
          ]);

          setParticipatingEvents(participatingEvts);
          setOrganizedEvents(organizedEvts);

          // Récupérer les participations pour tous les événements
          const allEvents = [...participatingEvts, ...organizedEvts];
          const allParticipations = await Promise.all(
            allEvents.map((event) => fetchParticipation(event.id)),
          );
          setParticipation(allParticipations);
        } catch (error) {
          console.error("Error fetching events:", error);
          setError(error as Error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchAllEvents();
  }, [user?.id]);

  const handleEventDelete = async () => {
    if (user?.id) {
      try {
        const updatedEvents = await readEventsByOrganizer(user.id);
        setOrganizedEvents(updatedEvents);
      } catch (error) {
        console.error("Erreur lors du rechargement des événements:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (isLoading) {
    return <div>Chargement des événements...</div>;
  }

  if (error) {
    return (
      <div>Une erreur est survenue lors du chargement des événements.</div>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-header">
          <Avatar
            {...stringAvatar(user?.pseudo)}
            sx={{ width: 100, height: 100, fontSize: "48px" }}
          >
            {user?.pseudo.charAt(0).toUpperCase()}
          </Avatar>
          <div className="profile-info">
            <p className="pseudo">{user?.pseudo}</p>
          </div>
        </div>

        <div className="profile-actions">
          {/* <button type="button" className="action-button">
            Modifier profil
          </button> */}
          <button
            type="button"
            className="action-button"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>

        <div className="events-section">
          <div className="events-participating">
            <h2 className="section-title">
              Les événements auxquels je participe
            </h2>
            <div className="event-box">
              {participatingEvents
                ?.slice(
                  0,
                  showAllParticipating ? participatingEvents.length : 1,
                )
                .map((event) => (
                  <EventCard
                    id={event.id}
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    image={event.image_url}
                    participation={participation[event.id - 1]?.length}
                  />
                ))}
              {participatingEvents?.length > 1 && (
                <button
                  type="button"
                  className="see-more"
                  onClick={() => setShowAllParticipating(!showAllParticipating)}
                >
                  {showAllParticipating ? "voir moins" : "voir plus"}
                </button>
              )}
            </div>
          </div>

          <div className="events-organizing">
            <h2 className="section-title">Les événements que j'organise</h2>
            <div className="event-box">
              {organizedEvents
                ?.slice(0, showAllOrganized ? organizedEvents.length : 1)
                .map((event) => (
                  <EventCard
                    id={event.id}
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    image={event.image_url}
                    participation={participation[event.id - 1]?.length}
                    isOrganizer={true}
                    onDelete={handleEventDelete}
                  />
                ))}
              {organizedEvents?.length > 1 && (
                <button
                  type="button"
                  className="see-more"
                  onClick={() => setShowAllOrganized(!showAllOrganized)}
                >
                  {showAllOrganized ? "voir moins" : "voir plus"}
                </button>
              )}
            </div>
            <button
              type="button"
              className="action-button"
              onClick={() => setIsModalOpen(true)}
            >
              Créer mon événement
            </button>
            <CreateEvent
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
