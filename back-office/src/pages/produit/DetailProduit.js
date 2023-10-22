import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography, Button, Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

const DetailProduit = () => {
  const navigate = useNavigate();
  const { produitId } = useParams();
  const [produitDetails, setProduitDetails] = useState(null);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProduitDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/produit/getProduitById/${produitId}`);
        setProduitDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching produit details:', error);
        setError('Failed to fetch produit details. Please try again later.');
      }
    };

    fetchProduitDetails();
  }, [produitId]);

  const handleConfirmDeleteProduit = () => {
    axios
      .delete(`http://localhost:5000/produit/deleteProduit/${produitId}`)
      .then(() => {
        console.log('Produit deleted successfully');
        navigate('/produit-list');
      })
      .catch((error) => {
        console.error('Error deleting produit:', error);
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

  if (!produitDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => navigate('/produit-list')}>
        Retourner à la liste des produits
      </Button>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#E32845', marginBottom: '1rem' }}>
          Détails du produit
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {produitDetails.images.map((image, index) => (
              <img key={index} src={image.secure_url} alt={`Ima ${index}`} style={{ width: '100%', height: 'auto', maxWidth: '400px' }} />
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Titre :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.titre}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Description :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.description}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Description détaillée :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.description_detaillee}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Catégorie :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.categorie}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Prix :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.prix}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Taille :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.taille.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Couleur :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.couleur.join(', ')}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Quantité :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.quantite}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Marque :
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {produitDetails.marque}
                </Typography>
              </Box>
              <Button variant="outlined" color="error" onClick={() => setDialogOpen(true)}>
                Supprimer le produit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <h2>Êtes-vous sûr de vouloir supprimer ce produit?</h2>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDeleteProduit} color="error">
            Supprimer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailProduit;
