import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch events data from an API
    axios
      .get("http://localhost:8086/events/")
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
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
                    <div className="event-cards-container">
                      {events.map((event) => (
                        <div key={event.id} className="entry-item">
                          <article className="entry entry-grid text-center">
                            <figure className="entry-media">
                              <a href="single.html">
                                <img
                                  src="/assets/images/evenement-sportif.jpg"
                                  alt="image desc"
                                  width="50"
                                  height="50"
                                />
                              </a>
                            </figure>

                            <div className="entry-body">
                              <h2 className="entry-title">
                                <a href="single.html">{event.eventName}</a>
                              </h2>

                              <div className="entry-cats">
                                in <a href="#">{event.sportType}</a>
                              </div>
                              <div className="entry-cats">
                                Description <a href="#">{event.description}</a>
                              </div>
                              <div className="entry-cats">
                                Price <a href="#">{event.registrationPrice}</a>
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

export default Home;
