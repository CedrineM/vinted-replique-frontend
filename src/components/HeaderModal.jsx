import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import ButtonLink from "./ButtonLink";

const HeaderModal = ({
  isConnected,
  setConnect,
  setVisible,
  visible,
  setObjFiltres,
  objFiltres,
}) => {
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
  const handleChange = (event) => {
    setObjFiltres({ ...objFiltres, [event.target.name]: event.target.value });
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo-vinted" />
        </Link>
        <div className="filter">
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id="title"
            placeholder="Recherche des articles"
            value={objFiltres.title}
          />
          <div>
            <span>Trier par prix :</span>
            <div
              className={
                objFiltres.sort === "price-asc"
                  ? "sort price-asc"
                  : "sort price-desc"
              }
            >
              <span
                onClick={() => {
                  if (objFiltres.sort === "price-asc") {
                    setObjFiltres({ ...objFiltres, sort: "price-desc" });
                  } else {
                    setObjFiltres({ ...objFiltres, sort: "price-asc" });
                  }
                }}
              >
                {objFiltres.sort === "price-asc" ? "↑" : "↓"}
              </span>
            </div>
          </div>
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
