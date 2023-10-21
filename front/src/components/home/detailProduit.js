import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FullScreenImageModal from "../FullScreenImage/FullScreenImageModal "; // Importez le composant
import ReactImageZoom from "react-image-zoom"; // Importez ReactImageZoom
import { useCart } from "../../contexte/CartContext";
import toast, { Toaster } from "react-hot-toast";
import GridShop from "../gridShop";
import Suggestions from "./Suggestions";

const DetailProduit = () => {
  // Utilisez useParams pour obtenir l'ID du produit à partir de l'URL
  const { produitId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(""); // État pour l'image principale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const { addToCart } = useCart(); // Utilisez le hook
  const navigate = useNavigate();
  const data = {
    name: "Detail",
    url: "",
    header: "Détails du Produit",
  };

  const handleAddToCart = (product) => {
    // Appeler la fonction addToCart du contexte pour ajouter le produit au panier
    addToCart(product);

    // Afficher une notification de toast
    toast.success("Le produit a été ajouté au panier avec succès!", {
      duration: 3000, // Durée d'affichage en millisecondes (3 secondes dans cet exemple)
    });
  };

  const handleOrder = (product) => {
    // Appeler la fonction addToCart du contexte pour ajouter le produit au panier
    addToCart(product);
    navigate("/checkout");
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(
          `http://localhost:8086/produit/getProduitsById/${produitId}`
        );
        setProduct(response.data);
        if (response.data.images.length > 0) {
          setMainImage(response.data.images[0].secure_url);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du produit",
          error
        );
        navigate("/notfound");

        // Gérer l'erreur ici
      }
    }

    fetchProduct();
  }, [produitId, navigate]);

  // Fonction pour gérer le clic sur une miniature
  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };
  // Gestionnaire d'événements pour ouvrir la modal avec l'image principale
  const openModal = (imageSrc) => {
    setModalImageSrc(imageSrc); // Définissez l'URL de l'image à afficher dans la modal
    setIsModalOpen(true); // Ouvrez la modal
  };

  if (!product) {
    return <div>Loading...</div>; // Vous pouvez afficher un message de chargement
  }
  return (
    <div>
      <GridShop data={data} />
      <div className={`page-content ${isModalOpen ? "modal-opened" : ""}`}>
        <div className="container">
          <div className="product-details-top">
            <div className="row">
              <div className="col-md-6">
                <div className="product-gallery product-gallery-vertical">
                  <div className="row">
                    <figure className="product-main-image">
                      <ReactImageZoom
                        img={mainImage} // Image principale
                        zoomImage={mainImage} // Image à afficher lors du zoom
                        width={458} // Largeur de l'image
                        height={458} // Hauteur de l'image
                      />

                      <a
                        href="#0"
                        id="btn-product-gallery"
                        className="btn-product-gallery"
                        onClick={() => openModal(mainImage)} // Ouvrez la modal avec l'image principale au clic
                      >
                        <i className="icon-arrows"></i>
                      </a>
                    </figure>
                    <div
                      id="product-zoom-gallery"
                      className="product-image-gallery"
                    >
                      {product.images.map((image, index) => (
                        <p
                          key={index}
                          className="product-gallery-item "
                          onClick={() => handleThumbnailClick(image.secure_url)} // Ajoutez ceci
                        >
                          <img
                            src={image.secure_url}
                            alt={`Product ${index + 1}`}
                            style={{ height: "107px", width: "107px" }}
                          />
                        </p>
                      ))}
                    </div>{" "}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-details">
                  <h1 className="product-title">{product.titre}</h1>

                  <div className="ratings-container">
                    <div className="ratings">
                      <div
                        className="ratings-val"
                        style={{
                          width: `${(product.averageRating / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="product-price">{product.prix}DT</div>

                  <div className="product-content">
                    <p>{product.description}</p>
                  </div>
                  {product.couleur.length > 0 && (
                    <div className="details-filter-row details-row-size">
                      <label htmlFor="size">Couleur:</label>
                      <div className="select-custom">
                        <select name="size" id="size" className="form-control">
                          <option value="#" defaultValue>
                            les couleurs disponible
                          </option>
                          {product.couleur.map((couleur, index) => (
                            <option key={index} value={couleur}>
                              {couleur}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {product.taille.length > 0 && (
                    <div className="details-filter-row details-row-size">
                      <label htmlFor="size">Taille:</label>
                      <div className="select-custom">
                        <select name="size" id="size" className="form-control">
                          <option value="#" defaultValue>
                            Les tailles disponible
                          </option>
                          {product.taille.map((taille, index) => (
                            <option key={index} value={taille}>
                              {taille}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="details-filter-row details-row-size">
                    <label htmlFor="qty">Quantite:</label>
                    <div className="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        className="form-control"
                        value={product.quantite}
                        readOnly
                      />
                    </div>
                  </div>
                  {product.quantite === "0" ? (
                    <div className="product-details-action">
                      <span>Rupture de stock</span>
                    </div>
                  ) : (
                    <>
                      <div className="product-details-action">
                        <a
                          href="#0"
                          onClick={() => handleAddToCart(product)}
                          className="btn btn-product btn-cart"
                        >
                          <span>Ajouter au panier</span>
                        </a>
                      </div>
                      <div className="product-details-action">
                        <a
                          href="#0"
                          onClick={() => handleOrder(product)}
                          className="btn btn-product btn-cart"
                        >
                          <span>Commander</span>
                        </a>
                      </div>
                    </>
                  )}

                  <div className="product-details-footer">
                    <div className="product-cat">
                      <span>Categorie:</span>
                      {product.categorie}
                    </div>

                    <div className="social-icons social-icons-sm">
                      <span className="social-label">Partager:</span>
                      <a
                        href="https://www.facebook.com"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="icon-facebook-f"></i>
                      </a>
                      <a
                        href="https://www.instagram.com"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="icon-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details-tab">
            <ul className="nav nav-pills justify-content-center" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                >
                  Description
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  <h3>Informations sur le produit</h3>
                  <p>{product.description_detaillee}</p>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="product-review-tab"
                role="tabpanel"
                aria-labelledby="product-review-link"
              ></div>
            </div>
          </div>
          <Suggestions />
        </div>
      </div>
      <FullScreenImageModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Fermez la modal
        imageSrc={modalImageSrc} // URL de l'image à afficher dans la modal
      />
      <Toaster />
    </div>
  );
};

export default DetailProduit;
