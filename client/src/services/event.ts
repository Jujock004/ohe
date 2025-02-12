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

export const fetchEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
