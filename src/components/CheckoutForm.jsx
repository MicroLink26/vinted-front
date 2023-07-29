import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // On récupère ici les données bancaires que l'utilisateur rentre
    const cardElement = elements.getElement(CardElement);

    //console.log(props.amount);
    // Demande de création d'un token via l'API Stripe
    // On envoie les données bancaires dans la requête
    const stripeResponse = await stripe.createToken(cardElement, {
      name: props.title,
      amount: props.amount,
      title: props.title,
    });
    //console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers notre serveur
    // On envoie le token reçu depuis l'API Stripe
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/payment",
      {
        token: stripeToken,
        amount: props.amount,
        title: props.title,
        name: props.title,
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      //remove item from db
      props.setCompleted(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button className="green-button" type="submit">
          Valider
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
