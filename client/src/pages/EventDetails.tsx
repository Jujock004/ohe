import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { formatDate } from "../services/formatDate";
import { formatTime } from "../services/formatTime";
import "../styles/EventDetails.css";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { stringAvatar } from "../services/stringAvatar";

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
  const [event, setEvent] = useState<Event>();

  const [host, setHost] = useState<User>();

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
      });
  }, [id]);

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
                {event && formatTime(event?.hour)}
              </li>
              <li className="event-date">
                <CalendarMonthRoundedIcon />
                {event && formatDate(event?.date)}
              </li>
              <li className="event-location">
                <LocationOnRoundedIcon />
                {event?.location}
              </li>
            </ul>
            <button type="button" className="event-register-btn">
              Je m'inscris
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
