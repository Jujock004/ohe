interface Participation {
  id: number;
  userId: number;
  eventId: number;
}

export const fetchParticipation = async (
  eventId: number,
): Promise<Participation[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/items/event/${eventId}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
