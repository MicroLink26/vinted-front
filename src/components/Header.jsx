import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import logo from "../assets/logo.svg";
import "../styles/header.css";

export default function Header({ userToken, setUserToken }) {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    Cookies.remove("token");
    setUserToken("");
    navigate("/");
  };
  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} alt="logo"></img>
          </Link>
          <div class="search-container">
            <input
              type="text"
              class="search-input"
              placeholder="Recherche des articles"
            ></input>
            <i class="fa-solid fa-search search-input-icon"></i>
          </div>
        </div>

        <div>
          {/* S'il y a un token affichage du bouton de déconnexion sinon affichage des boutons pour naviguer vers les pages de connexion */}
          {userToken ? (
            <>
              <button onClick={handleDisconnect} className="red-button">
                Se déconnecter
              </button>
              <Link to="/publish" className="green-button">
                Vends tes articles
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="header-button">
                S'inscrire
              </Link>
              <Link to="/login" className="header-button">
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
