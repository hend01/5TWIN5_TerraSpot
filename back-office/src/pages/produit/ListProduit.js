import React, { useCallback, useEffect, useState } from 'react';
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
axios.defaults.withCredentials = true;

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

const ListProduit = () => {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 5;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8086/produit/getAllCategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  const fetchProduits = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8086/produit/getAllProduits');
      setProduits(response.data);
      console.log(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching produit list:', error);
      setError('Failed to fetch produit list. Please try again later.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProduits();
    fetchCategories();
  }, [fetchCategories, fetchProduits]);

  const handleDeleteProduit = (id) => {
    setSelectedProduit(id);
    setDialogOpen(true);
  };

  const handleConfirmDeleteProduit = () => {
    axios
      .delete(`http://localhost:8086/produit/deleteProduit/${selectedProduit}`)
      .then(() => {
        console.log('Produit deleted successfully');
        setProduits(produits.filter((produit) => produit._id !== selectedProduit));
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

  const handleDetailProduit = (id) => {
    navigate(`/produits/${id}`);
  };

  const handleEditProduit = (id) => {
    navigate(`/produits/edit/${id}`);
  };

  const handleFilter = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0);
  };

  const filteredProduits = produits.filter((produit) => {
    const produitTitle = produit.titre.toLowerCase();
    const produitMarque = produit.marque.toLowerCase();
    const searchValueLowercase = searchValue.toLowerCase();

    const isCategoryMatched = selectedCategory === '' || produit.categorie === selectedCategory;
    const isSearchMatched = produitTitle.includes(searchValueLowercase) || produitMarque.includes(searchValueLowercase);

    return isCategoryMatched && isSearchMatched;
  });

  const pageCount = Math.ceil(filteredProduits.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl>
          <InputLabel>Catégorie de produit</InputLabel>
          <StyledSelect value={selectedCategory} onChange={handleFilter}>
            <StyledMenuItem value="">Toutes les catégories</StyledMenuItem>
            {categories.map((category) => (
              <StyledMenuItem key={category} value={category}>
                {category}
              </StyledMenuItem>
            ))}
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
              placeholder="Titre ou Description"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </div>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Titre</StyledTableCell>
            <StyledTableCell>Marque</StyledTableCell>
            <StyledTableCell>Catégorie</StyledTableCell>
            <StyledTableCell>Prix</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={5}>Loading...</StyledTableCell>
            </TableRow>
          ) : (
            filteredProduits.map((produit) => (
              <TableRow key={produit._id}>
                <TableCell>{produit.titre}</TableCell>
                <TableCell>{produit.marque}</TableCell>
                <TableCell>{produit.categorie}</TableCell>
                <TableCell>{produit.prix}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteProduit(produit._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailProduit(produit._id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditProduit(produit._id)}>
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
          previousLabel={'Previous'}
          nextLabel={'Next'}
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

export default ListProduit;
