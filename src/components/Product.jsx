const Product = ({ productInfo }) => {
  console.log(productInfo.owner.account.avatar.secure_url);

  return (
    <div className="product">
      <div>
        {productInfo.owner.account.avatar.secure_url && (
          <img
            src={productInfo.owner.account.avatar.secure_url}
            alt={`avatar de ${productInfo.owner.account.username}`}
          />
        )}
        <span>{productInfo.owner.account.username}</span>
      </div>
      <div className="product-picture">
        <img src="" alt="image-produit" />
      </div>
      <div>
        <p>Prix</p>
        <p>Taille</p>
        <p>Marque</p>
      </div>
    </div>
  );
};

export default Product;
