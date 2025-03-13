import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Login = ({ isConnected, setIsConnected }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        formData
      );
      Cookies.set("token", response.data.token);
      console.log("Form data submitted successfully:", response.data);
      setIsConnected(true);
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error submitting form data:", response.error);
    }
  };

  return (
    <main className="signup">
      <div className="container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            value={formData.password}
          />

          <button type="submit">Se connecter</button>
        </form>
        <Link to={"/signup"}>Pas encore de compte ? Inscrit-toi ! </Link>
      </div>
    </main>
  );
};

export default Login;
