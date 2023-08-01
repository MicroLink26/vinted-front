import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/offer.css";
import avatar from "../assets/avatar.jpeg";

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

        //console.log(data);
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
    <main className="offer">
      <div className="container offer-container">
        <div>
          <img src={offerInfos.product_pictures[0].secure_url} alt="" />
        </div>

        <div>
          <p className="price">{offerInfos.product_price} €</p>
          <p>{offerInfos.product_name}</p>
          <div>
            {offerInfos.product_details.map((elem, index) => {
              const keyName = Object.keys(elem)[0];
              return (
                <div key={index}>
                  {keyName} : {elem[keyName]}
                </div>
              );
            })}
          </div>
          <h2>{offerInfos.product_name}</h2>
          <p>{offerInfos.product_description}</p>
          <div
            onClick={() => {
              alert("TODO: profil page");
            }}
          >
            <img
              src={offerInfos.owner.account.avatar?.secure_url || avatar}
              alt=""
              className="avatar"
            />
            <p>{offerInfos.owner.account.username}</p>
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
