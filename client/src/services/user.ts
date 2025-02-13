interface RegisterData {
  user_id: number;
  event_id: number;
}

interface RegisterEventParams {
  id: number;
  data: RegisterData;
}

export const registerToEvent = async ({ id, data }: RegisterEventParams) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/events/${id}/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur de connexion");
  }
  const userData = await response.json();
  return userData;
};
