import axios from "axios";
import { useState } from "react";

const SignupModal = ({ setConnect, visible, setVisible }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    newsletter: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const closeOnclick = () => {
    const copy = { ...visible };
    copy.signup = false;
    setVisible(copy);
  };

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

      if (response.data.token) {
        // console.log("Form data submitted successfully:", response.data);
        setConnect(response.data.token);
        setFormData({
          email: "",
          username: "",
          password: "",
          newsletter: false,
        });
        closeOnclick();
      }
    } catch (error) {
      // console.log("Error submitting form data:", error.response);
      if (error.response.status === 409) {
        setErrorMessage("Un compte est déjà associé à cette email");
      }
    }
  };

  return (
    <div className="signup-login-modal" onClick={closeOnclick}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button className="close-button" onClick={closeOnclick}>
          X
        </button>
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
          {errorMessage && <p className="errorForm">{errorMessage}</p>}
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
        <p
          className="link-signup-login"
          onClick={() => {
            const copy = { ...visible };
            copy.signup = false;
            copy.login = true;
            setVisible(copy);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
