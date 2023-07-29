import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/offer.css";

export default function Offer() {
  const [offerInfos, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/offer/${id}`
        );

        console.log(data);
        setOfferInfos(data);

        setIsLoading(false);
      } catch (error) {
        console.log("catch Offer>>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="container offer-page">
        <div>
          <img src={offerInfos.product_pictures[0].secure_url} alt="" />
        </div>

        <div>
          <p>{offerInfos.product_price} €</p>
          <p>{offerInfos.product_name}</p>
          <div>
            {offerInfos.product_details.map((elem, index) => {
              //console.log(elem);

              const keyName = Object.keys(elem)[0];
              return (
                <div key={index}>
                  {keyName} : {elem[keyName]}
                </div>
              );
            })}
          </div>
          <Link
            to="/payment"
            state={{
              title: offerInfos.product_name,
              price: offerInfos.product_price,
              id: offerInfos._id,
            }}
            className="green-button"
          >
            Acheter
          </Link>
        </div>
      </div>
    </main>
  );
}
