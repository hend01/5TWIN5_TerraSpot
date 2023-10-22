import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import EditReservationDialog from './EditReservationDialog'; // Import the dialog component
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    // Fetch reservations from your Spring Boot backend when the component mounts
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
  };

  const handleEditDialogSave = (updatedReservation) => {
    // Send the updated reservation to the server
    axios
      .put(`http://localhost:8088/api/reservation/update/${selectedReservation.id}`, updatedReservation)
      .then((response) => {
        // Update the UI with the updated reservation
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
    // Implement delete action here
    // You can send a DELETE request to your API to delete the reservation
    axios
      .delete(`http://localhost:8088/api/reservation/remove/${id}`)
      .then((response) => {
        // Remove the deleted reservation from the list
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        // Show a success toast
        toast.success('Reservation deleted successfully');
        console.log(`Deleted reservation with id ${id}`);
      })
      .catch((error) => {
        console.error(`Error deleting reservation with id ${id}: `, error);
      });
  };

// ...

return (
  <div>
    <h2>Reservation List</h2>
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
            <td style={{ paddingLeft: '10px' }}>{reservation.terrain}</td>
            <td>{reservation.description}</td>
            <td>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit(reservation)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(reservation.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Toaster position="top-center" reverseOrder={false} />
    {isEditDialogOpen && selectedReservation && (
      <EditReservationDialog
        open={isEditDialogOpen}
        onClose={handleEditDialogClose}
        onSave={handleEditDialogSave}
        reservation={selectedReservation}
      />
    )}
  </div>
);

};

export default ReservationList;
