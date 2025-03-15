import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = ({ setConnect }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      if (response.data.token) {
        // console.log("Form data submitted successfully:", response.data);
        setConnect(response.data.token);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Les informations saisies sont incorrectes");
      // console.log("Error submitting form data:", error.response);
    }
  };

  return (
    <main className="signup-login">
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
          {errorMessage && <p className="errorForm">{errorMessage}</p>}
          <button type="submit">Se connecter</button>
        </form>
        <Link className="link-signup-login" to={"/signup"}>
          Pas encore de compte ? Inscrit-toi !{" "}
        </Link>
      </div>
    </main>
  );
};

export default Login;
