import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch events data from an API
    axios
      .get("http://localhost:8088/events")
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
            <div className="col-lg-9">
              <div className="products mb-3">
                {isLoading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : (
                  <div className="row">
                    {events.map((event) => (
                      <div key={event.id} className="col-md-4">
                        <div className="event-card">
                          <h3>{event.eventName}</h3>
                          <p>{event.description}</p>
                          <p>Start Date: {event.startDate}</p>
                          <p>End Date: {event.endDate}</p>
                          <p>Location: {event.location}</p>
                          <p>Sport Type: {event.sportType}</p>
                          <p>Max Participants: {event.maxParticipants}</p>
                          <p>Registration Price: {event.registrationPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
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
