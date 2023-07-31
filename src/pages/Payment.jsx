import { useNavigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useState } from "react";
import "../styles/payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);

const payment = ({ userToken }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  if (!location.state) navigate("/");
  const { title, price, id } = location.state;

  const formatNumber = (number) => {
    return number.toFixed(2).toString().replace(".", ",") + " €";
  };

  const getTotal = () => {
    return price + 0.4 + 0.8;
  };
  return (
    <>
      {!completed ? (
        <main class="light-gray-bcg">
          <Elements stripe={stripePromise}>
            <div className="payment-container">
              <h2>Résumé de la commande</h2>
              <div>
                <div>Commande</div>
                <div>{formatNumber(price)}</div>
              </div>
              <div>
                <div>Frais de protection acheteur</div>
                <div>{formatNumber(0.4)}</div>
              </div>
              <div>
                <div>Frais de port</div>
                <div>{formatNumber(0.8)}</div>
              </div>
              <hr />
              <div>
                <div>Total</div>
                <div>{formatNumber(getTotal())}</div>
              </div>
              <div>
                Il ne vous reste plus qu'une etape pour vous offrir&nbsp;
                <span cass="bold">{title}</span>. Vous allez payer&nbsp;
                <span cass="bold">{formatNumber(getTotal())}</span> (frais de
                protection et frais de port inclus).
              </div>

              <CheckoutForm
                title={title}
                amount={getTotal()}
                id={id}
                setCompleted={setCompleted}
                userToken={userToken}
              />
            </div>
          </Elements>
        </main>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default payment;
