import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const setConnect = (token) => {
    if (token) {
      Cookies.set("token", token);
      setIsConnected(true);
    } else {
      Cookies.remove("token");
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(response.error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>en chargement</div>
  ) : (
    <Router>
      <Header isConnected={isConnected} setConnect={setConnect} />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup setConnect={setConnect} />} />
        <Route path="/login" element={<Login setConnect={setConnect} />} />
      </Routes>
    </Router>
  );
};

export default App;
