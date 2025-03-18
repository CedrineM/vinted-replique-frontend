import tear from "../assets/tear.svg";
import ButtonLink from "./ButtonLink";

const Hero = ({ isConnected, visible, setVisible }) => {
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

  return (
    <section className="hero">
      <div className="container">
        <div>
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          {isConnected ? (
            <ButtonLink to={"/publish"}>Commencer à vendre</ButtonLink>
          ) : (
            <button
              onClick={() => {
                handleModalOnclick("publish");
              }}
            >
              Commencer à vendre
            </button>
          )}
        </div>
      </div>
      <div className="tear">
        <img src={tear} alt="déchirure" />
      </div>
    </section>
  );
};

export default Hero;
