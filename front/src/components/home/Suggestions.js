import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";

const Suggestions = () => {
  const [products, setProducts] = useState([]);
  moment.locale("fr");


  useEffect(() => {
    // Effectuez la requête HTTP pour obtenir les produits au hasard depuis votre backend
    axios
      .get("http://localhost:8086/produit/getRandomProducts")
      .then((response) => {
        // Mettez à jour l'état avec les produits récupérés
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des produits au hasard :",
          error
        );
      });
  }, []); // Exécutez cette fonction une seule fois lors du montage du composant

  return (
    <div>
      <h2 className="title text-center mb-2">Suggestions</h2>
      <div className="row max-col-2">
        {products.map((product) => (
          <div className="col-md-6" key={product._id}>
            <article className="entry entry-grid">
              <figure className="entry-media">
                <Link to={`/${product._id}`}>
                  <img src={product.images[0].secure_url} alt="desc" />
                </Link>
              </figure>

              <div className="entry-body text-center">
                <div className="entry-meta">
                  <Link to={`/${product._id}`}>{moment(product.createdAt).format("DD MMMM YYYY")}</Link>
                </div>
                <h2 className="entry-title">
                  <Link to={`/${product._id}`} >{product.titre}.</Link>
                </h2>

                <div className="entry-content">
                  <Link to={`/${product._id}`} className="read-more">
                    Afficher le produit
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
