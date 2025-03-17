import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Publish = ({ isConnected }) => {
  const [publishData, setPublishData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    picture: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setPublishData({
      ...publishData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilesChange = (event) => {
    const copy = { ...publishData };
    for (let i = 0; i < event.target.files.length; i++) {
      copy.picture.push(event.target.files[i]);
    }
    // copy.picture = event.target.files[0]
    setPublishData(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    console.log("publishData", publishData);
    const formData = new FormData();
    formData.append("title", publishData.title);
    formData.append("description", publishData.description);
    formData.append("price", publishData.price);
    formData.append("condition", publishData.condition);
    formData.append("city", publishData.city);
    formData.append("size", publishData.size);
    formData.append("color", publishData.color);
    for (let i = 0; i < publishData.picture.length; i++) {
      formData.append("picture", publishData.picture[i]);
    }

    console.log(formData);
    const headers = {
      headers: { authorization: `Bearer ${Cookies.get("token")}` },
    };

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        headers
      );
      console.log(response.data);
    } catch (error) {
      if (error.status === 400) {
        setErrorMessage(
          "Un titre, un prix et une image sont nécessaire pour poster l'offre"
        );
      }

      console.log("Error submitting form data:", error.response);
    }
  };

  return isConnected ? (
    <main className="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <div className={errorMessage && "error-input"}>
              <input
                multiple={true}
                type="file"
                name="picture"
                id="picture"
                onChange={handleFilesChange}
              />
            </div>
          </section>
          <section>
            <div>
              <label for="title">Titre</label>
              <input
                className={errorMessage && "error-input"}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                placeholder="Baskets Nike Air Force 1 blanches – Très bon état"
                value={publishData.title}
              />
            </div>
            <div>
              <label for="description">Description</label>
              <textarea
                onChange={handleChange}
                type="text"
                name="description"
                id="description"
                rows={10}
                placeholder="Je vends une paire de Nike Air Force 1 blanches en très bon état, portées seulement quelques fois. Aucun défaut majeur, semelles propres et cuir bien entretenu."
                value={publishData.description}
              />
            </div>
          </section>
          <section>
            <div>
              <label for="brand">Marque</label>
              <input
                onChange={handleChange}
                type="text"
                name="brand"
                id="brand"
                placeholder="Nike"
                value={publishData.brand}
              />
            </div>
            <div>
              <label for="size">Taille</label>
              <input
                onChange={handleChange}
                type="text"
                name="size"
                id="size"
                placeholder="42 (EU)"
                value={publishData.size}
              />
            </div>
            <div>
              <label for="color">Couleur</label>
              <input
                onChange={handleChange}
                type="text"
                name="color"
                id="color"
                placeholder="Blanc"
                value={publishData.color}
              />
            </div>
            <div>
              <label for="condition">Etat</label>
              <input
                onChange={handleChange}
                type="text"
                name="condition"
                id="condition"
                placeholder="Très bon état"
                value={publishData.condition}
              />
            </div>
            <div>
              <label for="city">Lieu</label>
              <input
                onChange={handleChange}
                type="text"
                name="city"
                id="city"
                placeholder="Paris, France"
                value={publishData.city}
              />
            </div>
          </section>
          <section>
            <div>
              <label for="price">Prix</label>
              <input
                className={errorMessage && "error-input"}
                onChange={handleChange}
                type="text"
                name="price"
                id="price"
                placeholder="75€"
                value={publishData.price}
              />
            </div>
          </section>
          {errorMessage && <p className="errorForm">{errorMessage}</p>}
          <button>Publier l'offre</button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to={"/"} />
  );
};

export default Publish;
