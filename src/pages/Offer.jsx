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
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/6794b9d4970e9514f3802e1f`
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
          <p>{product.product_price} €</p>
          <div>
            <span>MARQUE</span>
            <span>{product.product_details[0].MARQUE}</span>
          </div>
          <div>
            <span>TAILLE</span>
            <span>{product.product_details[1].TAILLE}</span>
          </div>
          <div>
            <span>ETAT</span>
            <span>{product.product_details[2].ÉTAT}</span>
          </div>
          <div>
            <span>COULEUR</span>
            <span>{product.product_details[3].COULEUR}</span>
          </div>
          <div>
            <span>EMPLACEMENT</span>
            <span>{product.product_details[4].EMPLACEMENT}</span>
          </div>
          {product.product_details[5] && (
            <div>
              <span>MODES DE PAIEMENT</span>
              <span>{product.product_details[0].MARQUE}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
export default Offer;
