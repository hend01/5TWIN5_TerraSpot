import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  FormControl,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogContent
} from '@mui/material';
import { Delete, Visibility, Edit, SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';

const StyledTable = styled(Table)({
  minWidth: 500
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const StyledSelect = styled(Select)({
  minWidth: 180,
  backgroundColor: '#F5F5F5',
  borderRadius: 7,
  padding: '0px 10px',
  color: '#333',
  fontSize: 14,
  height: 40,
  '&:focus': {
    backgroundColor: '#FFF',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    outline: 'none'
  }
});

const StyledMenuItem = styled(MenuItem)({
  fontSize: 14
});

const ListCommande = () => {
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const itemsPerPage = 5;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/commande/commandes');
        setCommandes(response.data);
        setIsLoading(false);
        setError('');
      } catch (error) {
        console.error('Error fetching commandes list:', error);
        setError('Failed to fetch commandes list. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchCommandes(); // Appel de la fonction ici
  }, []); // Ajout de 'token' comme dépendance

  const handleDeleteCommande = (id) => {
    setSelectedCommande(id);
    setDialogOpen(true);
  };

  const handleConfirmDeleteCommande = () => {
    axios
      .delete(`http://localhost:5000/commande/commandes/${selectedCommande}`)
      .then(() => {
        console.log('Commande deleted successfully');
        setCommandes(commandes.filter((commande) => commande._id !== selectedCommande));
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

  const handleDetailCommande = (id) => {
    navigate(`/commandes/${id}`);
  };

  const handleEditCommande = (id) => {
    navigate(`/commandes/edit/${id}`);
  };

  const handleFilter = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(0);
  };

  const filteredCommandes = commandes.filter((commande) => {
    const commandeNomPrenom = commande.nom_prenom.toLowerCase();
    const searchValueLowercase = searchValue.toLowerCase();

    const isStatusMatched = selectedStatus === '' || commande.confirme === selectedStatus;
    const isSearchMatched = commandeNomPrenom.includes(searchValueLowercase);

    return isStatusMatched && isSearchMatched;
  });

  const pageCount = Math.ceil(filteredCommandes.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedCommandes = filteredCommandes.slice(offset, offset + itemsPerPage);

  const sortedCommandes = [...paginatedCommandes].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl>
          <InputLabel>Statut de la commande</InputLabel>
          <StyledSelect value={selectedStatus} onChange={handleFilter}>
            <StyledMenuItem value="">Tous les statuts</StyledMenuItem>
            <StyledMenuItem value="Oui">Confirmée</StyledMenuItem>
            <StyledMenuItem value="Non">Non confirmée</StyledMenuItem>
          </StyledSelect>
        </FormControl>
        <Box sx={{ marginLeft: 'auto' }}>
          <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
            <OutlinedInput
              size="small"
              id="header-search"
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              placeholder="Nom ou prénom"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </div>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom et Prénom</StyledTableCell>
            <StyledTableCell>Ville</StyledTableCell>
            <StyledTableCell>Les produits</StyledTableCell>
            <StyledTableCell>Prix totale</StyledTableCell>
            <StyledTableCell>Confirmé</StyledTableCell>
            <StyledTableCell>Délivré</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={7}>Chargement...</StyledTableCell>
            </TableRow>
          ) : (
            sortedCommandes.map((commande) => (
              <TableRow key={commande._id}>
                <TableCell>{commande.nom_prenom}</TableCell>
                <TableCell>{commande.ville}</TableCell>
                <TableCell>
                  {commande.produits.map((produitCommande, index) => (
                    <div key={index}>
                      {produitCommande.produit.titre} - Quantité: {produitCommande.quantite}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{commande.prix_totale}</TableCell>
                <TableCell>{commande.confirme}</TableCell>
                <TableCell>{commande.delivre}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteCommande(commande._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailCommande(commande._id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditCommande(commande._id)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={'Précédent'}
          nextLabel={'Suivant'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          breakClassName={'break-me'}
          breakLabel={'...'}
        />
      </div>
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

export default ListCommande;
