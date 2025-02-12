import logo from "../assets/images/logo-ohe.png";
import BasicMenu from "./BurgerMenu";
import "../styles/Header.css";

export default function () {
  return (
    <>
      <header>
        <img width="50px" src={logo} alt="Logo" />
        <BasicMenu />
      </header>
      <hr />
    </>
  );
}
