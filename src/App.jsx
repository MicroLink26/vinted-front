import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  // Le state aura pour valeur initiale la valeur du cookie "token" s'il exitste sinon elle aura pour valeur une string vide
  const [userToken, setUserToken] = useState(Cookies.get("token") || "");
  // useEffect(() => {
  //   const tokenCookies = Cookies.get("token");
  //   setUserToken(tokenCookies);
  // }, []);

  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup setUserToken={setUserToken} />}
        />
        <Route path="/login" element={<Login setUserToken={setUserToken} />} />

        <Route path="/publish" element={<Publish userToken={userToken} />} />
        <Route path="/payment" element={<Payment userToken={userToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
