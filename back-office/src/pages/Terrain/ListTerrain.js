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
 
} from '@mui/material';
import { Delete, Visibility, Edit ,SearchOutlined} from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Box } from '@mui/system';

import ReactPaginate from 'react-paginate';

axios.defaults.withCredentials = false;

const StyledTable = styled(Table)({
  minWidth: 500
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const ListTerrain = () => {
//   const navigate = useNavigate();
  const [terrains, setTerrains] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState(''); 
  const itemsPerPage = 5;
  
  // const [searchValue, setSearchValue] = useState('');
//   const [dialogOpen, setDialogOpen] = useState(false);
  // const selectedTerrain and setSearchValue removed as they are not used

  const fetchTerrains = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8093/Terrain/listTerrains');
      setTerrains(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching terrain list:', error);
      setError('Failed to fetch terrain list. Please try again later.');
      setIsLoading(false);
    }
  };
  // const handleSearch = (searchTerm) => {
  //   const filteredTerrains = terrains.filter((terrain) => {
     
  //     return (
  //       terrain.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       terrain.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       terrain.emplacement.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   });

  //   setTerrains(filteredTerrains);
  // };
  const fetchTerrainsByType = async (type) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8093/Terrain/terrains/type?type=${type}`);
      setTerrains(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Erreur lors de la récupération des terrains par type:', error);
      setError('Échec de la récupération des terrains par type. Veuillez réessayer ultérieurement.');
      setIsLoading(false);
    }
  };

  const handleFilterByType = (type) => {
    fetchTerrainsByType(type);
  };
  const handleDeleteTerrain = async (idTerrain) => {
    try {
      const response = await axios.delete(`http://localhost:8093/Terrain/removeTerrain/${idTerrain}`);
      if (response.status === 200) {
        fetchTerrains();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du terrain :', error);
    }
  };
//   const handleEditTerrain = (idTerrain) => {
//   navigate(`/update-terrain/${idTerrain}`);
// };
  
  

  useEffect(() => {
    fetchTerrains();
  }, []);

  return (
    <>

      {error && <p>{error}</p>}
      <div className="button-container">
      <button className="icon-button" onClick={() => handleFilterByType('football')}>
        <i className="fas fa-futbol"></i> Football
      </button>
      <button className="icon-button" onClick={() => handleFilterByType('handball')}>
        <i className="fas fa-hand-paper"></i> Handball
      </button>
      <button className="icon-button" onClick={() => handleFilterByType('basketball')}>
        <i className="fas fa-basketball-ball"></i> Basketball
      </button>
      <button className="icon-button" onClick={() => handleFilterByType('tennis')}>
        <i className="fas fa-tennis-ball"></i> Tennis
      </button>
      <button className="icon-button" onClick={() => handleFilterByType('volleyball')}>
        <i className="fas fa-volleyball-ball"></i> Volleyball
      </button>
    </div>
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
              placeholder="Chercher terrain"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </div>
    
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell>Emplacement</StyledTableCell>
            <StyledTableCell>Capacité Spectateurs</StyledTableCell>
            <StyledTableCell>Éclairage</StyledTableCell>
            <StyledTableCell>Prix de Location</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={7}>Loading...</StyledTableCell>
            </TableRow>
          ) : (
            terrains.map((terrain) => (
              <TableRow key={terrain.id}>
                <TableCell>{terrain.nom}</TableCell>
                <TableCell>{terrain.type}</TableCell>
                <TableCell>{terrain.emplacement}</TableCell>
                <TableCell>{terrain.capaciteSpectateurs}</TableCell>
                <TableCell>{terrain.eclairage ? 'Oui' : 'Non'}</TableCell>
                <TableCell>{terrain.prixLocation}</TableCell>
                <TableCell>
                <IconButton color="error" onClick={() => handleDeleteTerrain(terrain.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailTerrain(terrain.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditTerrain(terrain.id)}>
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
          pageCount={Math.ceil(terrains.length / itemsPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
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
      
    </>
  );
};

export default ListTerrain;
