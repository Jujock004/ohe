interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  pseudo: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
}

interface AuthResponse {
  message: string;
  user: User;
}

export const auth = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
  },

  register: async (data: RegisterData) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur d'inscription");
    }
    return response.json();
  },

  logout: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur de déconnexion");
    }
    return response.json();
  },
};
