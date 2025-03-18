import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// connection au compte Stripe avec clef publique
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ isConnected }) => {
  const location = useLocation();
  const { product } = location.state;
  // console.log(product);

  const tabPrice = {
    productPrice: product.product_price,
    protectionPrice: Number((product.product_price / 10).toFixed(2)),
    shippingCost: Number(((product.product_price / 10) * 2).toFixed(2)),
  };
  const total =
    tabPrice.productPrice + tabPrice.protectionPrice + tabPrice.shippingCost;
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: total * 100,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };

  return isConnected ? (
    <main className="payment">
      <div className="container">
        <div className="resume-payment">
          <section>
            <h1>Résumer de la commande</h1>
            <div>
              <span>Commande</span>
              <span>{tabPrice.productPrice} €</span>
            </div>
            <div>
              <span>Frais de protection acheteurs</span>
              <span>{tabPrice.protectionPrice} €</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>{tabPrice.shippingCost} €</span>
            </div>
          </section>
          <section>
            <div>
              <span>Total</span> <span>{total} €</span>
            </div>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir
              <span> {product.product_name}</span>. Vous allez payer
              <span> {total} €</span> (frais de protection et frais de port
              inclus).
            </p>
          </section>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              product_name={product.product_name}
              product_price={product.product_price}
            />
          </Elements>
        </div>
      </div>
    </main>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Payment;
