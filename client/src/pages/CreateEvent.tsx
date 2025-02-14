import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, TextField, Typography } from "@mui/material";
import "../styles/CreateEvent.css";
import { type ChangeEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { createEvent } from "../services/event";

interface CreateEventProps {
  open: boolean;
  onClose: () => void;
}

// Utiliser l'interface du service event.ts
interface CreateEventData {
  title: string;
  user_id: number;
  description: string;
  hour: string;
  date: string;
  location: string;
  image_url: string;
}

const CreateEvent = ({ open, onClose }: CreateEventProps) => {
  const { user } = useAuth();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    location: "",
    image_url:
      "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!user?.id) {
      console.error("No user ID found");
      return;
    }

    try {
      const eventToCreate: CreateEventData = {
        title: eventData.title,
        description: eventData.description,
        hour: eventData.time,
        date: eventData.date,
        user_id: user.id,
        location: eventData.location,
        image_url:
          eventData.image_url ||
          "https://img.freepik.com/photos-gratuite/vie-nocturne-gens-qui-dansent-dans-club_23-2149052703.jpg",
      };

      await createEvent(eventToCreate);
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      if (error instanceof Error) {
        console.error("Message d'erreur:", error.message);
      }
    }
  };

  // Le reste du composant reste inchangé...
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-create-event"
      className="event-modal"
    >
      <Box className="modal-content">
        <Typography variant="h6" component="h2" className="modal-title">
          Je crée un événement
        </Typography>

        <form onSubmit={handleSubmit} className="event-form">
          <TextField
            fullWidth
            label="Titre"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            label="Heure"
            name="time"
            type="time"
            value={eventData.time}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 minutes
            }}
            required
          />

          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={eventData.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <TextField
            fullWidth
            label="Lieu"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            margin="normal"
            required
          />

          <div className="button-container">
            <IconButton
              onClick={onClose}
              className="cancel-button"
              color="error"
            >
              <CloseIcon />
            </IconButton>

            <IconButton type="submit" className="submit-button" color="success">
              <CheckIcon />
            </IconButton>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateEvent;
