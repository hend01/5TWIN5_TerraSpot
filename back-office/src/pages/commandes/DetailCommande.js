import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import { Typography, Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CommandeDetail = () => {
  const navigate = useNavigate();
  const { commandeId } = useParams();
  const [commandeDetails, setCommandeDetails] = useState(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCommandeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/commande/commandes/${commandeId}`);
        setCommandeDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching commande details:', error);
        setError('Failed to fetch commande details. Please try again later.');
      }
    };

    fetchCommandeDetails();
  }, [commandeId]);

  const handleConfirmDeleteCommande = () => {
    axios
      .delete(`http://localhost:5000/commande/commandes/${commandeId}`)
      .then(() => {
        console.log('Commande deleted successfully');
        navigate('/commande-list');
      })
      .catch((error) => {
        console.error('Error deleting commande:', error);
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

  if (!commandeDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => navigate('/commande-list')}>
        Retourner à la liste des commandes
      </Button>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#E32845', marginBottom: '1rem' }}>
          Détails de la commande
        </Typography>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Nom et Prénom :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.nom_prenom}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Ville :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.ville}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Adresse :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.adresse}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Téléphone :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.tel}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Note :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.note ? commandeDetails.note : 'Pas de note'}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Confirme :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.confirme}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Délivré :
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.delivre}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Produits :
          </Typography>
          <Typography component={'span'} variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.produits.map((produitCommande, index) => (
              <div key={index}>
                {produitCommande.produit.titre} - Quantité: {produitCommande.quantite}
              </div>
            ))}{' '}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: '0.5rem' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
            Prix totale avec livraison:
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666' }}>
            {commandeDetails.prix_totale}
          </Typography>
        </Box>

        <Button variant="outlined" color="error" onClick={() => setDialogOpen(true)}>
          Supprimer la commande
        </Button>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer cette commande?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDeleteCommande} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandeDetail;
