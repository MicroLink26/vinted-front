import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: props.title,
      amount: props.amount,
      title: props.title,
    });

    const stripeToken = stripeResponse.token.id;
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/payment",
        {
          token: stripeToken,
          amount: props.amount,
          title: props.title,
          name: props.title,
        }
      );

      if (response.data.status === "succeeded") {
        //remove item from db
        console.log(props.id, props.userToken);
        try {
          await axios.put(
            import.meta.env.VITE_API_URL + "/offer/archive/" + props.id,
            {},
            {
              headers: {
                Authorization: "Bearer " + props.userToken,
              },
            }
          );
          //TODO: archiver plutôt que delete
          // const deletedItem = await axios.delete(
          //   import.meta.env.VITE_API_URL + "/offer/delete/" + props.id,
          //   {
          //     headers: {
          //       Authorization: "Bearer " + props.userToken,
          //
          //     },
          //   }
          // );
          props.setCompleted(true);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Votre paiement est refusé");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        {errorMessage !== "" && <p>{errorMessage}</p>}
        <button className="green-button" type="submit">
          Valider
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
