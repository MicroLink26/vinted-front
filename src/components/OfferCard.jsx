import { Link } from "react-router-dom";
import avatar from "../assets/avatar.jpeg";

export default function OfferCard({ offer }) {
  return (
    <Link to={`/offer/${offer._id}`} key={offer._id}>
      <div className="offer-card">
        <div>
          <img
            src={offer.owner.account.avatar?.secure_url || avatar}
            alt=""
            className="avatar"
          />
          <p>{offer.owner.account.username}</p>
        </div>

        <img src={offer.product_image.secure_url} alt="" />

        <div>
          <p>{offer.product_price} €</p>
        </div>
      </div>
    </Link>
  );
}
