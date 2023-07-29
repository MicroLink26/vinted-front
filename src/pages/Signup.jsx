import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUserToken }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email,
            username,
            password,
            newsletter,
          }
        );

        // console.log("data>>>", data);

        // -- Créer le cookie
        Cookies.set("token", data.token);
        // Changer la valeur du state
        setUserToken(data.token);
        // Naviguer vers la page d'accueil
        navigate("/");
      } catch (error) {
        console.log("catch>>>", error);
        setErrorMessage("Désolé, une erreur est survenue !");
      }
    }
  };

  return (
    <main>
      <div className="container">
        <h1>S'inscrire</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={username}
            onChange={(event) => {
              // vider le message d'erreur
              setErrorMessage("");
              //   envoyer la valeur entrée dans le champs au state
              setUsername(event.target.value);
            }}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(event) => {
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />

          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={newsletter}
            onChange={(event) => {
              setNewsletter(!newsletter);
            }}
          />
          <label htmlFor="newsletter"> Newsletter</label>

          <button>S'inscrire</button>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
}
