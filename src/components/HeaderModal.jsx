import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

const HeaderModal = ({ isConnected, setConnect, setVisible, visible }) => {
  const handleModalOnclick = (action) => {
    if (action === "signup") {
      const copy = { ...visible };
      copy.signup = !copy.signup;
      setVisible(copy);
    } else if (action === "login") {
      const copy = { ...visible };
      copy.login = !copy.login;
      setVisible(copy);
    }
  };
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
            <button
              onClick={() => {
                handleModalOnclick("signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                handleModalOnclick("login");
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default HeaderModal;
