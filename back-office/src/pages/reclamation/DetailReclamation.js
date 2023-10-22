import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import { Typography, Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ReclamationDetail = () => {
  const navigate = useNavigate();
  const { reclamationId } = useParams();
  const [reclamationDetails, setReclamationDetails] = useState(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReclamationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/api/Reclamation/${reclamationId}`);
        setReclamationDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching reclamation details:', error);
        setError('Failed to fetch reclamation details. Please try again later.');
      }
    };

    fetchReclamationDetails();
  }, [reclamationId]);

  const handleConfirmDeleteReclamation = () => {
    axios
      .delete(`http://localhost:8082/api/Reclamation/delete/${reclamationId}`)
      .then(() => {
        console.log('Reclamation deleted successfully');
        navigate('/reclamation-list');
      })
      .catch((error) => {
        console.error('Error deleting reclamation:', error);
      })
      .finally(() => {
        setDialogOpen(false);
      });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!reclamationDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => navigate('/reclamation-list')}>
        Retourner à la liste des réclamations
      </Button>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#E32845', marginBottom: '1rem' }}>
          Détails de la réclamation
        </Typography>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Sujet :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {reclamationDetails.sujet}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Description :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {reclamationDetails.description}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Email :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {reclamationDetails.email}
          </Typography>
        </Box>

        <Button variant="outlined" color="error" onClick={() => setDialogOpen(true)}>
          Supprimer la réclamation
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer cette réclamation?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDeleteReclamation} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReclamationDetail;
