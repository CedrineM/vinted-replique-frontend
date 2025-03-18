import tear from "../assets/tear.svg";
import ButtonLink from "./ButtonLink";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div>
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          <ButtonLink to={"/publish"}>Commencer à vendre</ButtonLink>
        </div>
      </div>
      <div className="tear">
        <img src={tear} alt="déchirure" />
      </div>
    </section>
  );
};

export default Hero;
