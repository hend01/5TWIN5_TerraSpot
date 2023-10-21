import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import GridShop from "../gridShop";

const AddReclamation = () => {
  var Filter = require("bad-words");
  const filter = new Filter();
  filter.addWords("fuck");

  const navigate = useNavigate();
  const data = {
    name: "Reclamation",
    url: "/reclamation",
    header: "Reclamer",
  };
  const [formData, setFormData] = useState({
    email: "",
    sujet: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (filter.isProfane(formData.description)) {
      toast.error(
        "Votre description contient des mots interdits. Veuillez modifier votre description."
      );
      return;
    }

    const uniqueLetters = new Set(
      formData.description.replace(/\s/g, "").split("")
    );
    if (uniqueLetters.size < 5 || formData.description.length < 20) {
      toast.error(
        "Votre description doit contenir au moins 20 caractères et 5 lettres différentes."
      );
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8086/api/Reclamation/add",
        formData
      );

      if (response.status === 200) {
        toast.success("Réclamation soumise avec succès!");
      } else {
        toast.error("Échec de la soumission de la réclamation.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la réclamation :", error);
    }
  };

  return (
    <div>
      <GridShop data={data} />

      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <hr className="mt-3 mb-5 mt-md-1" />
        <div className="touch-container row justify-content-center">
          <div className="col-md-9 col-lg-7">
            <div className="text-center">
              <h2 className="title mb-1">Réclamation</h2>
              <p className="lead text-primary">
                Si vous rencontrez un problème ou avez des préoccupations, nous
                sommes là pour vous aider. Nous nous engageons à résoudre tous
                les soucis que vous pourriez rencontrer, et nous aimerions
                entendre votre avis.
              </p>
              <p className="mb-3">
                Chez nous, chaque client compte, et nous sommes déterminés à
                fournir une expérience exceptionnelle. Si vous avez des
                commentaires, des questions ou des réclamations, n'hésitez pas à
                nous les faire parvenir. Votre opinion est précieuse pour nous.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form mb-2">
              <div className="row">
                <div className="col-sm-12">
                  <label htmlFor="cemail" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="cemail"
                    name="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <label htmlFor="csubject" className="sr-only">
                Sujet
              </label>
              <input
                type="text"
                className="form-control"
                id="csubject"
                name="sujet"
                placeholder="Sujet"
                value={formData.sujet}
                onChange={handleInputChange}
              />

              <label htmlFor="cdescription" className="sr-only">
                description
              </label>
              <textarea
                className="form-control"
                cols="30"
                rows="4"
                id="cdescription"
                name="description"
                required
                placeholder="description *"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                >
                  <span>Valider</span>
                  <i className="icon-long-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReclamation;
