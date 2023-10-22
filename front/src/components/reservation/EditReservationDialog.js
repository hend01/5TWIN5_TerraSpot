import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

const EditReservationDialog = ({ open, onClose, onSave, reservation }) => {
  const [updatedReservation, setUpdatedReservation] = useState(reservation);

  const handleSave = () => {
    onSave(updatedReservation);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservation({
      ...updatedReservation,
      [name]: value,
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h3>Edit Reservation</h3>
        <input
          name="date"
          className="form-control"

          label="Date"
          value={updatedReservation.date}
          onChange={handleChange}
          fullWidth
        />
        <input
                  className="form-control"

          name="heure"
          label="Heure"
          value={updatedReservation.heure}
          onChange={handleChange}
          fullWidth
        />
        <input
                  className="form-control"

          name="terrain"
          label="Terrain"
          value={updatedReservation.terrain}
          onChange={handleChange}
          fullWidth
        />
        <input
                  className="form-control"

          name="description"
          label="Description"
          value={updatedReservation.description}
          onChange={handleChange}
          fullWidth
          multiline
        />
        <button onClick={handleSave} variant="contained" color="primary">
          Save
        </button>
        <button onClick={onClose} variant="contained" color="default">
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EditReservationDialog;
