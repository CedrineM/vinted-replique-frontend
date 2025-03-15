import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

const Header = ({ isConnected, setConnect }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo-vinted" />
        </Link>
        <div className="filter">
          <input type="text" id="search" placeholder="Recherche des articles" />
        </div>
        {isConnected ? (
          <button
            className="disconnect-button"
            onClick={() => {
              setConnect(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="connection-button">
            <ButtonLink to="/signup">S'inscrire</ButtonLink>
            <ButtonLink to="/login">Se connecter</ButtonLink>
          </div>
        )}

        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
