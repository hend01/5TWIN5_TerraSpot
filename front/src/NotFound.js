import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Accueil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                404
              </li>
            </ol>
          </div>
        </nav>

        <div
          className="error-content text-center"
        >
          <div className="container">
            <h1 className="error-title">Erreur 404</h1>
            <p>
              Nous sommes désolés, la page que vous avez demandée n'est pas
              disponible.
            </p>
            <Link to="/" className="btn btn-outline-primary-2 btn-minwidth-lg">
              <span>RETOUR À LA PAGE D'ACCUEIL</span>
              <i className="icon-long-arrow-right"></i>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
