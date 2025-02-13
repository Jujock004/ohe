import logo from "../assets/images/logo-ohe.png";
import BasicMenu from "./BurgerMenu";
import "../styles/Header.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function () {
  const { user } = useAuth();

  return (
    <>
      <header>
        <Link to="/">
          <img width="64px" src={logo} alt="Logo" />
        </Link>
        <div className="avatar-and-menu">
          <Avatar sx={{ bgcolor: "#006D77" }}>
            {user?.pseudo.charAt(0).toUpperCase()}
          </Avatar>
          <BasicMenu />
        </div>
      </header>
    </>
  );
}
