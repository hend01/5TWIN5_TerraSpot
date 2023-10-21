import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <footer className="footer">
        <div className="footer-middle">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-3">
                <div className="widget widget-about">
                  <img
                    src="assets/images/logo.png"
                    className="footer-logo"
                    alt="Footer Logo"
                    width="105"
                    height="25"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <p>
                  Découvrez les meilleures affaires, chaque jour sur Amazony !
                </p>
              </div>

              <div className="col-lg-3">
                <div className="widget">
                  <h4 className="widget-title">Liens Utiles</h4>

                  <ul className="widget-list">
                    <li>
                      <Link to="/">Acceuil</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Validation de la commande</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button
              id="scroll-top"
              className={` ${showScrollTop ? "show" : ""}`}
              onClick={scrollToTop}
            >
              <i className="icon-arrow-up"></i>
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container d-flex justify-content-between align-items-center">
            <p className="footer-copyright">
              Copyright © 2023 Amazony. All Rights Reserved.
            </p>

            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                className="social-icon"
                target="_blank"
                title="Facebook"
                rel="noreferrer"
              >
                <i className="icon-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com"
                className="social-icon"
                target="_blank"
                title="Instagram"
                rel="noreferrer"
              >
                <i className="icon-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
