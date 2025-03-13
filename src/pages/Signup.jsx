import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    newsletter: false,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNewsletterOnClick = () => {
    const copy = { ...formData };
    copy.newsletter = !copy.newsletter;
    setFormData(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        formData
      );
      Cookies.set("token", response.data.token);
      console.log("Form data submitted successfully:", response.data);
      setFormData({
        email: "",
        username: "",
        password: "",
        newsletter: false,
      });
    } catch (error) {
      console.log("Error submitting form data:", response.error);
    }
  };

  return (
    <main className="signup">
      <div className="container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
            value={formData.username}
          />
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
          <div>
            <div>
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                onClick={handleNewsletterOnClick}
              />
              <label for="newsletter">S'inscrire à notre newsletter</label>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confrme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        <Link to={"/login"}>Tu as déjà un compte ? Connecte-toi ! </Link>
      </div>
    </main>
  );
};

export default Signup;
