import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import "../styles/Home.css";
import Footer from "../components/Footer";
import { fetchEvents } from "../services/event";
import { fetchParticipation } from "../services/participation";

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

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [participation, setParticipation] = useState<Participation[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchEvents()
      .then((events) => {
        setEvents(events);
        return Promise.all(events.map((event) => fetchParticipation(event.id)));
      })
      .then((participations) => {
        setParticipation(participations);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });

    fetchEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
      <div className="home">
        <section className="intro-section">
          <h1 className="title-intro-home">
            Créons ensemble les moments qui comptent !
          </h1>
          <p className="text-intro-home">
            Bienvenue sur OHE, la plateforme où chaque rencontre devient une
            histoire à partager. <br />
            Que vous souhaitiez organiser un événement ou rejoindre une
            communauté passionnée, vous êtes au bon endroit.
            <br /> Découvrez des événements uniques, rencontrez des personnes
            inspirantes et créez des souvenirs inoubliables.
          </p>
        </section>
        <section className="events-home">
          {events.slice(0, 3)?.map((event) => (
            <EventCard
              id={event.id}
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              participation={participation[event.id - 1]?.length}
              image={event.image_url}
            />
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
}
