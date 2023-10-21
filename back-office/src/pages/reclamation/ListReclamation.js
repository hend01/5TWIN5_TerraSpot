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
  Button,
  Dialog,
  DialogContent
} from '@mui/material';
import { Delete, Visibility, SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)({
  minWidth: 500
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const ListReclamation = () => {
  const [reclamations, setReclamations] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 5;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8086/api/Reclamation/list');
        setReclamations(response.data);
        setIsLoading(false);
        setError('');
      } catch (error) {
        console.error('Error fetching reclamations list:', error);
        setError('Failed to fetch reclamations list. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchReclamations();
  }, []);

  const handleDeleteReclamation = (id) => {
    setSelectedReclamation(id);
    setDialogOpen(true);
  };

  const handleConfirmDeleteReclamation = () => {
    axios
      .delete(`http://localhost:8086/api/Reclamation/delete/${selectedReclamation}`)
      .then(() => {
        console.log('Reclamation deleted successfully');
        setReclamations(reclamations.filter((reclamation) => reclamation.id !== selectedReclamation));
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

  const handleDetailReclamation = (id) => {
    navigate(`/reclamations/${id}`);
  };

  const filteredReclamations = reclamations.filter((reclamation) => {
    const reclamationSujet = reclamation.sujet.toLowerCase();
    const reclamationDescription = reclamation.description.toLowerCase();
    const reclamationEmail = reclamation.email.toLowerCase();
    const searchValueLowercase = searchValue.toLowerCase();

    const isSearchMatched =
      reclamationSujet.includes(searchValueLowercase) ||
      reclamationDescription.includes(searchValueLowercase) ||
      reclamationEmail.includes(searchValueLowercase);

    return isSearchMatched;
  });

  const pageCount = Math.ceil(filteredReclamations.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedReclamations = filteredReclamations.slice(offset, offset + itemsPerPage);

  return (
    <>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              placeholder="Sujet, Description ou Email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </div>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Sujet</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={4}>Chargement...</StyledTableCell>
            </TableRow>
          ) : (
            paginatedReclamations.map((reclamation) => (
              <TableRow key={reclamation.id}>
                <TableCell>{reclamation.sujet}</TableCell>
                <TableCell>{reclamation.description}</TableCell>
                <TableCell>{reclamation.email}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteReclamation(reclamation.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailReclamation(reclamation.id)}>
                    <Visibility />
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

export default ListReclamation;
