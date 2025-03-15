import tear from "../assets/tear.svg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div>
          <h1>Prêt à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <div className="tear">
        <img src={tear} alt="déchirure" />
      </div>
    </section>
  );
};

export default Hero;
