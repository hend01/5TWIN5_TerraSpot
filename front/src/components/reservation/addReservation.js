import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import GridShop from "../gridShop";
import { Link, useNavigate } from "react-router-dom";

function AddReservation() {
  const navigate = useNavigate();

  const data = {
    name: "reservation",
    url: "/reservation",
    header: "reserver",
  };
  const [reservation, setReservation] = useState({
    date: "",
    heure: "",
    utilisateur: "",
    terrain: "",
    description: "",
  });

  const terrainOptions = ["Option 1", "Option 2", "Option 3", "Option 4"]; 
  const navigateToListPage = () => {
    navigate('/list');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8088/api/reservation/add", reservation)
      .then((response) => {
        console.log("Reservation created:", response.data);
        toast.success("Reservation created successfully");
        setReservation({
          date: "",
          heure: "",
          utilisateur: "",
          terrain: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error creating reservation:", error);
        toast.error("Failed to create reservation");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
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
              <h2 className="title mb-1">reservation</h2>
             
            </div>

            <form onSubmit={handleSubmit} className="contact-form mb-2">
              <div className="row">
                <div className="col-sm-12">
                  <label htmlFor="csubject" className="sr-only">
                    Terrain:
                  </label>
                  <select
                    name="terrain"
                    className="form-control" 
                    value={reservation.terrain}
                    onChange={handleChange}
                  >
                    <option value="">Select Terrain</option>
                    {terrainOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="csubject" className="sr-only">
                date
              </label>
              <input
                type="date"
                className="form-control"
                id="csubject"
                name="date"
                placeholder="date"
                value={reservation.date}
                onChange={handleChange}
              />
              <label htmlFor="cemail" className="sr-only">
                heure
              </label>
              <input
                type="time"
                className="form-control"
                id="cemail"
                name="heure"
                placeholder="heure *"
                required
                value={reservation.heure}
                onChange={handleChange}
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
                value={reservation.description}
                onChange={handleChange}
              ></textarea>

              <div className="text-center">
                <div className="button-container">
                  <button
                    type="submit"
                    className="btn btn-outline-primary-2 btn-minwidth-sm"
                  >
                    <span>Valider</span>
                    <i className="icon-long-arrow-right"></i>
                  </button>

                  <button
                    className="btn btn-outline-primary-2 btn-minwidth-sm"
                    onClick={navigateToListPage} 
                  >
                    <span>View Reservations</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReservation;
