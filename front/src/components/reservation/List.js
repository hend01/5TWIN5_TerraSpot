import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './List.css'
const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [updatedReservation, setUpdatedReservation] = useState({
    date: '',
    heure: '',
    terrain: '',
    description: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8088/api/reservation/list')
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reservations: ', error);
      });
  }, []);

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setIsEditDialogOpen(true);
    setUpdatedReservation(reservation);
  };

  const handleEditDialogSave = () => {
    axios
      .put(`http://localhost:8088/api/reservation/update/${selectedReservation.id}`, updatedReservation)
      .then((response) => {
        const updatedReservations = reservations.map((reservation) =>
          reservation.id === selectedReservation.id ? updatedReservation : reservation
        );
        setReservations(updatedReservations);
        toast.success('Reservation updated successfully');
      })
      .catch((error) => {
        toast.error('Failed to update reservation');
        console.error('Error updating reservation:', error);
      });

    setIsEditDialogOpen(false);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8088/api/reservation/remove/${id}`)
      .then((response) => {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        toast.success('Reservation deleted successfully');
        console.log(`Deleted reservation with id ${id}`);
      })
      .catch((error) => {
        console.error(`Error deleting reservation with id ${id}: `, error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservation({
      ...updatedReservation,
      [name]: value,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
      <h2>Reservation List</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Terrain</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.date}</td>
                <td>{reservation.heure}</td>
                <td>{reservation.terrain}</td>
                <td>{reservation.description}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleEdit(reservation)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(reservation.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Toaster position="top-center" reverseOrder={false} />
    {isEditDialogOpen && selectedReservation && (
  <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
  <DialogContent>
    <h3>Edit Reservation</h3>
    <TextField
      name="date"
      type="date"
      label="Date"
      className="form-control"
      value={updatedReservation.date}
      onChange={handleChange}
      fullWidth
      style={{ marginBottom: '20px' }} 
    />
    <TextField
      name="heure"
      className="form-control"
      label="Heure"
      type="time"
      value={updatedReservation.heure}
      onChange={handleChange}
      fullWidth
      style={{ marginBottom: '20px' }} 
    />
    <TextField
      type="text"
      name="description"
      label="Description"
      className="form-control"
      value={updatedReservation.description}
      onChange={handleChange}
      fullWidth
      multiline
      style={{ marginBottom: '20px' }} 
    />
    <Button onClick={handleEditDialogSave}>Save</Button>
    <Button variant="contained" color="error" onClick={handleEditDialogClose}>Cancel</Button>
  </DialogContent>
</Dialog>

    )}
  </div>
  
  );
};

export default ReservationList;
