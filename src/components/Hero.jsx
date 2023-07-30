import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-body">
        <div>
          <p>Prêts à faire du tri dans vos placards ?</p>
          <Link to="/publish" className="publish-button">
            Commencez à vendre
          </Link>
        </div>
      </div>
      <img
        src="https://static.vinted.com/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
        alt="dechiré"
      />
    </div>
  );
};

export default Hero;
