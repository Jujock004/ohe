import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../services/auth";
import { stringAvatar } from "../services/stringAvatar";
import LoginModal from "./LoginModal";

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const { user, setUser } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.logout();
      setUser(null);
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar {...stringAvatar(user?.pseudo)}>
          {user?.pseudo.charAt(0).toUpperCase()}
        </Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            window.location.href = "/events";
          }}
        >
          Liste des événements
        </MenuItem>
        {!user ? (
          <MenuItem
            sx={{ display: "flex", gap: "8px" }}
            onClick={handleModalOpen}
          >
            <LoginRoundedIcon sx={{ color: "text.secondary" }} />
            Se connecter
          </MenuItem>
        ) : (
          <>
            <MenuItem
              sx={{ display: "flex", gap: "8px" }}
              onClick={() => {
                handleClose();
                window.location.href = "/events";
              }}
            >
              <ManageAccountsRoundedIcon sx={{ color: "text.secondary" }} />
              Profil
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ display: "flex", gap: "8px" }}
            >
              <LogoutRoundedIcon sx={{ color: "text.secondary" }} />
              Déconnexion
            </MenuItem>
          </>
        )}
      </Menu>
      <LoginModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
}
