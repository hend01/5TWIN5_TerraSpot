import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./home.css";

const Terrain = () => {
    const [terrains, setTerrains] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch events data from an API
    axios
      .get("http://localhost:8093/Terrain/listTerrains")
      .then((response) => {
        setTerrains(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Terrain:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-16">
              <div className="products mb-3">
                {isLoading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : (
                  <>
                  <div className="terrain-cards-container">
  {terrains.map((terrain, index) => (
    <div key={index} className="entry-item">
      <article className="entry entry-grid text-center">
        <div className="entry-body">
          <h2 className="entry-title">{terrain.nom}</h2>

          <div className="entry-cats">
            Type: {terrain.type}
          </div>
          <div className="entry-cats">
            Emplacement: {terrain.emplacement}
          </div>
          <div className="entry-cats">
            Capacité de Spectateurs: {terrain.capaciteSpectateurs}
          </div>
          <div className="entry-cats">
            Éclairage: {terrain.eclairage ? 'Oui' : 'Non'}
          </div>
          <div className="entry-cats">
            Prix de Location: {terrain.prixLocation}
          </div>
        </div>
      </article>
    </div>
  ))}
</div>

                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terrain;
