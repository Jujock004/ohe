import logo from "../assets/images/logo-ohe.png";
import BasicMenu from "./BurgerMenu";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <header>
        <Link to="/">
          <img width="64px" src={logo} alt="Logo" />
        </Link>
        <BasicMenu />
      </header>
    </>
  );
}
