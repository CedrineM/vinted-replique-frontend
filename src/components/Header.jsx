import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ isConnected, setIsConnected }) => {
  const ButtonLink = ({ to, children }) => {
    return (
      <button>
        <Link className="button-link" to={to}>
          {children}
        </Link>
      </button>
    );
  };

  const disconnect = () => {
    Cookies.remove("token");
    setIsConnected(false);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo-vinted" />
        </Link>
        <input type="text" placeholder="Rechercher des articles" />

        {isConnected ? (
          <button onClick={disconnect}>Se déconnecter</button>
        ) : (
          <div>
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
