import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/verify`,
          {
            credentials: "include",
          },
        );

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // En cas d'erreur 401, on ne considère pas ça comme une erreur
          // C'est juste que l'utilisateur n'est pas connecté
          setUser(null);
        }
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        // En cas d'erreur, on considère l'utilisateur comme déconnecté
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Cleanup function pour éviter les mises à jour sur un composant démonté
    return () => {
      isMounted = false;
    };
  }, []); // On ne lance la vérification qu'une seule fois au montage

  const value = {
    user,
    setUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider",
    );
  }
  return context;
}
