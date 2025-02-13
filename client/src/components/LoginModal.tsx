import { Box, Modal, TextField, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

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

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledModal>
        <h2 id="modal-modal-title">Se connecter</h2>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
          <TextField
            required
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            id="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
          />
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
            Connexion
          </Button>
        </FormContainer>
        <p
          style={{
            margin: "0",
            color: "#666",
            fontSize: "14px",
          }}
        >
          Vous n'avez pas de compte ?{" "}
          <a href="/signup" style={{ color: "primary" }}>
            Inscrivez-vous
          </a>
        </p>
      </StyledModal>
    </Modal>
  );
}
