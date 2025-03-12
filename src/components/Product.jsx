import { Link } from "react-router-dom";

const Product = ({ productInfo }) => {
  return (
    <Link to={`/offers/${productInfo._id}`} className="product">
      <div>
        {productInfo.owner.account.avatar && (
          <div className="product-avatar">
            <img
              className="product-avatar"
              src={productInfo.owner.account.avatar.secure_url}
              alt={`avatar de ${productInfo.owner.account.username}`}
            />
          </div>
        )}
        <span>{productInfo.owner.account.username}</span>
      </div>
      <div className="product-picture">
        <img
          src={productInfo.product_image.secure_url}
          alt={productInfo.product_name}
        />
      </div>
      <div>
        <p>{productInfo.product_price} €</p>
        <p>{productInfo.product_details[1].TAILLE}</p>
        <p>{productInfo.product_details[0].MARQUE}</p>
      </div>
    </Link>
  );
};

export default Product;
