import axios from "axios";
import { useState } from "react";

const LoginModal = ({ setConnect, visible, setVisible }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const closeOnclick = () => {
    const copy = { ...visible };
    copy.login = false;
    setVisible(copy);
  };
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
        closeOnclick();
      }
    } catch (error) {
      setErrorMessage("Les informations saisies sont incorrectes");
      // console.log("Error submitting form data:", error.response);
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
        <p
          className="link-signup-login"
          onClick={() => {
            const copy = { ...visible };
            copy.login = false;
            copy.signup = true;
            setVisible(copy);
          }}
        >
          Pas encore de compte ? Inscrit-toi !
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
