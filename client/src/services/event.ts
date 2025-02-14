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

interface CreateEventData {
  title: string;
  user_id: number;
  description: string;
  hour: string;
  date: string;
  location: string;
  image_url: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Pour les événements auxquels l'utilisateur participe
export const readByUserId = async (userId: number): Promise<Event[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/participations/user/${userId}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// Pour les événements que l'utilisateur organise
export const readEventsByOrganizer = async (
  userId: number,
): Promise<Event[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/events/user/${userId}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const createEvent = async (event: CreateEventData): Promise<Event> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const deleteEvent = async (eventId: number): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};
