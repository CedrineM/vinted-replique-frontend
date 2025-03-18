import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
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
    } else if (action === "publish") {
      const copy = { ...visible };
      copy.from = "/publish";
      copy.login = !copy.login;
      setVisible(copy);
    }
  };

  if (visible.signup || visible.login) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "inherit";
  }
  const handleChange = (event) => {
    setObjFiltres({ ...objFiltres, [event.target.name]: event.target.value });
  };

  const location = useLocation();
  const { pathname } = location;

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
          {pathname === "/" && (
            <div className="price-filter">
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
              <div>
                <label htmlFor="priceMin">Prix minimum : </label>
                <input
                  min={0}
                  type="number"
                  name="priceMin"
                  id="priceMin"
                  value={objFiltres.priceMin}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="priceMax">Prix maximum : </label>
                <input
                  min={0}
                  type="number"
                  name="priceMax"
                  id="priceMax"
                  value={objFiltres.priceMax}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
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

        {isConnected ? (
          <ButtonLink to={"/publish"}>Vends tes articles</ButtonLink>
        ) : (
          <button
            onClick={() => {
              handleModalOnclick("publish");
            }}
          >
            Vends tes articles
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderModal;
