import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Product from "../components/Product";

const Home = ({ data }) => {
  //   console.log(data.offers);
  return (
    <>
      <Hero />

      <main className="home">
        <div className="container">
          {data.offers.map((productInfo) => {
            // console.log(productInfo.owner);
            return <Product key={productInfo._id} productInfo={productInfo} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
