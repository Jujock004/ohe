import { Box, Modal, TextField, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../services/auth";

const StyledModal = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "24px",
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginTop: "20px",
  marginBottom: "20px",
});

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const { setUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "var(--primary-color)",
        light: "var(--primary-color-light)",
        dark: "var(--primary-color-dark)",
        contrastText: "var(--primary-color-contrastText)",
      },
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const userData = await auth.login({
          email: formData.email,
          password: formData.password,
        });
        setUser(userData.user);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Les mots de passe ne correspondent pas");
          return;
        }
        await auth.register({
          pseudo: formData.pseudo,
          email: formData.email,
          password: formData.password,
        });
      }
      onClose();
      window.location.reload();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModal>
        <h2 id="modal-modal-title">
          {isLogin ? "Se connecter" : "Inscrivez-vous"}
        </h2>
        {error && (
          <p style={{ color: "red", margin: "10px 0", fontSize: "14px" }}>
            {error}
          </p>
        )}
        <FormContainer onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              required
              name="pseudo"
              label="Pseudo"
              type="text"
              variant="outlined"
              value={formData.pseudo}
              onChange={handleChange}
              fullWidth
            />
          )}
          <TextField
            required
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            name="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            autoComplete="current-password"
          />
          {!isLogin && (
            <TextField
              required
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              autoComplete="new-password"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: "10px",
              height: "48px",
              fontSize: "16px",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {isLogin ? "Connexion" : "Inscription"}
          </Button>
        </FormContainer>
        <p
          style={{
            margin: "0",
            color: "#666",
            fontSize: "14px",
          }}
        >
          {isLogin ? (
            <>
              Vous n'avez pas de compte ?{" "}
              <button
                type="button"
                style={{
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onClick={() => setIsLogin(false)}
              >
                Inscrivez-vous
              </button>
            </>
          ) : (
            <>
              Vous avez déjà un compte ?{" "}
              <button
                type="button"
                style={{
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onClick={() => setIsLogin(true)}
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </StyledModal>
    </Modal>
  );
}
