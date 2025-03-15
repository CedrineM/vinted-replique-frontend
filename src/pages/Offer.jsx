import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        // console.log(response.data);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(response.error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <main className="offer">
      <div className="container">
        <div>
          <img src={product.product_image.secure_url} alt="" />
        </div>
        <div>
          <h2>{product.product_price} €</h2>
          <div className="offer-detail">
            <div>
              <p>MARQUE</p>
              <p>TAILLE</p>
              <p>ETAT</p> <p>COULEUR</p>
              <p>EMPLACEMENT</p>
              {product.product_details[5] && <p>MODES DE PAIEMENT</p>}
            </div>
            <div>
              <p>{product.product_details[0].MARQUE}</p>
              <p>{product.product_details[1].TAILLE}</p>
              <p>{product.product_details[2].ÉTAT}</p>
              <p>{product.product_details[3].COULEUR}</p>{" "}
              <p>{product.product_details[4].EMPLACEMENT}</p>
              {product.product_details[5] && (
                <p>{product.product_details[5]["MODES DE PAIEMENT"]}</p>
              )}
            </div>
          </div>
          <div className="separate">
            _________________________________________________
          </div>
          <div className="offer-description">
            <h2>{product.product_name}</h2>
            <p>{product.product_description}</p>
            <div>
              {product.owner.account.avatar && (
                <div className="offer-avatar">
                  <img
                    src={product.owner.account.avatar.secure_url}
                    alt={`avatar de ${product.owner.account.username}`}
                  />
                </div>
              )}
              <span>{product.owner.account.username}</span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </main>
  );
};
export default Offer;
