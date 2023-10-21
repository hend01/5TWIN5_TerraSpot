import React, { useState } from "react";
import GridShop from "../gridShop";
import { useCart } from "../../contexte/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const data = {
    name: "Commander",
    url: "/checkout",
    header: "Validation de la commande",
  };

  const { cart } = useCart();

  function phoneVerify(values) {
    const errors = {};

    if (!values.tel) {
      errors.tel = toast.error("Le numéro de téléphone est requis.");
    } else if (!/^[2459]\d{7}$/.test(values.tel)) {
      errors.tel = toast.error("Le numéro de téléphone est invalide.");
    }

    return errors;
  }

  const [formData, setFormData] = useState({
    nom_prenom: "",
    ville: "",
    adresse: "",
    tel: "",
    note: "",
  });

  const [formErrors, setFormErrors] = useState({
    nom_prenom: false,
    ville: false,
    adresse: false,
    tel: false,
  });

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.quantite_demande * product.prix + 7,
      0
    );
  };

  const calculateSousTotal = () => {
    return cart.reduce(
      (total, product) => total + product.quantite_demande * product.prix,
      0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: false,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.nom_prenom) {
      errors.nom_prenom = true;
    }
    if (!formData.ville) {
      errors.ville = true;
    }
    if (!formData.adresse) {
      errors.adresse = true;
    }
    if (!formData.tel) {
      errors.tel = true;
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.values(errors).every((error) => !error)) {
      const requestBody = {
        nom_prenom: formData.nom_prenom,
        ville: formData.ville,
        adresse: formData.adresse,
        tel: formData.tel,
        note: formData.note,
        prix_totale: calculateTotal().toString(),
        produits: cart.map((product) => ({
          produit: product._id,
          quantite: product.quantite_demande,
        })),
      };

      // Validation du numéro de téléphone
      const phoneErrors = phoneVerify(formData);

      if (Object.values(phoneErrors).length > 0) {
        // Afficher des erreurs si le numéro de téléphone est invalide
        setFormErrors({ ...formErrors, ...phoneErrors });
        return;
      }


      try {
        await toast.promise(
          axios.post("http://localhost:8086/commande/commandes", requestBody),
          {
            loading: "Enregistrement en cours...",
            success: <b>Commande validé!</b>,
            error: <b>Impossible de sauvegarder.</b>,
          }
        );

        localStorage.clear();
        navigate("/");
      } catch (error) {
        console.error("Erreur lors de l'ajout du commande :", error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <GridShop data={data} />
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-9">
                  <h2 className="checkout-title">Détails de facturation</h2>

                  <label>(الاسم و اللقب) Nom et Prenom *</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.nom_prenom ? "is-invalid" : ""
                    }`}
                    name="nom_prenom"
                    value={formData.nom_prenom}
                    onChange={handleInputChange}
                  />
                  {formErrors.nom_prenom && (
                    <div className="invalid-feedback">Ce champ est requis.</div>
                  )}

                  <label>(الولاية) Ville *</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.ville ? "is-invalid" : ""
                    }`}
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                  />
                  {formErrors.ville && (
                    <div className="invalid-feedback">Ce champ est requis.</div>
                  )}

                  <label>(العنوان) Adresse *</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.adresse ? "is-invalid" : ""
                    }`}
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    placeholder="Numéro de maison et nom de la rue"
                  />
                  {formErrors.adresse && (
                    <div className="invalid-feedback">Ce champ est requis.</div>
                  )}

                  <label>(الهاتف) Téléphone *</label>
                  <input
                    type="tel"
                    className={`form-control ${
                      formErrors.tel ? "is-invalid" : ""
                    }`}
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                  />
                  {formErrors.tel && (
                    <div className="invalid-feedback">Ce champ est requis.</div>
                  )}

                  <label>(ملاحظات الطلب) Notes de commande (facultatif)</label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Notes concernant votre commande, par exemple des instructions spéciales pour la livraison"
                  ></textarea>
                </div>
                <aside className="col-lg-3">
                  <div className="summary">
                    <h3 className="summary-title">Votre commande</h3>

                    <table className="table table-summary">
                      <thead>
                        <tr>
                          <th>Produit</th>
                          <th>Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {cart.map((product) => (
                          <React.Fragment key={product._id}>
                            <tr>
                              <td>
                                <Link to={`/${product._id}`}>
                                  {product.titre} * {product.quantite_demande}
                                </Link>
                              </td>
                              <td>{product.prix}DT</td>
                            </tr>
                          </React.Fragment>
                        ))}
                        <tr className="summary-subtotal">
                          <td>Sous-total :</td>
                          <td>{calculateSousTotal()}DT</td>
                        </tr>
                        <tr>
                          <td>Livraison :</td>
                          <td>7DT</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total :</td>
                          <td>{calculateTotal()}DT</td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      type="submit"
                      className="btn btn-outline-primary-2 btn-order btn-block"
                      disabled={cart.length === 0} // Désactiver le bouton si le panier est vide
                    >
                      Passer la commande
                    </button>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
