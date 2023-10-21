import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import { Delete, Visibility, Edit, SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Box } from '@mui/system';
import moment from 'moment'; // Importez Moment.js
import 'moment/locale/fr';

axios.defaults.baseURL = 'http://localhost:8088';

const StyledTable = styled(Table)({
  minWidth: 500
});
const StyledSelect = styled(Select)({
  minWidth: 180,
  backgroundColor: '#F5F5F5',
  borderRadius: 7,
  padding: '0px 10px',
  color: '#333',
  fontSize: 14,
  height: 40, // Augmenter la hauteur ici
  '&:focus': {
    backgroundColor: '#FFF',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    outline: 'none'
  }
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

const StyledMenuItem = styled(MenuItem)({
  fontSize: 14
});

const ListEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 5;
  moment.locale('fr');

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY hh:mm'); // Utilisez le format de date souhaité
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/events/');
      setEvents(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching event list:', error);
      setError('Failed to fetch event list. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios
        .delete(`/events/${id}`)
        .then(() => {
          setEvents(events.filter((event) => event.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting event:', error);
        });
    }
  };

  const handleDetailEvent = (id) => {
    navigate(`/events/detail/${id}`);
  };

  const handleEditEvent = (id) => {
    navigate(`/events/${id}`);
  };

  const handleFilter = (event) => {
    setSelectedType(event.target.value);
    setCurrentPage(0);
  };

  const filteredEvents = selectedType
    ? events.filter((event) => event.sportType === selectedType && event.eventName.toLowerCase().includes(searchValue.toLowerCase()))
    : events.filter((event) => event.eventName.toLowerCase().includes(searchValue.toLowerCase()));

  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(offset, offset + itemsPerPage);

  return (
    <>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl>
          <InputLabel>Type d&apos;événement</InputLabel>
          <StyledSelect value={selectedType} onChange={handleFilter}>
            <StyledMenuItem value="">Tous les types</StyledMenuItem>
            <StyledMenuItem value="Foot">Free Event</StyledMenuItem>
            <StyledMenuItem value="Paid Event">Paid Event</StyledMenuItem>
            <StyledMenuItem value="Online Event">Online Event</StyledMenuItem>
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
              placeholder="Ctrl + K"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
        </Box>
      </div>

      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>End Date</StyledTableCell>
            <StyledTableCell>sportType</StyledTableCell>
            <StyledTableCell>max Participants</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={6}>Loading...</StyledTableCell>
            </TableRow>
          ) : (
            paginatedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.eventName}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{formatDate(event.startDate)}</TableCell>
                <TableCell>{formatDate(event.endDate)}</TableCell>
                <TableCell>{event.sportType}</TableCell>
                <TableCell>{event.maxParticipants}</TableCell>
                <TableCell>{event.registrationPrice}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDeleteEvent(event.id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailEvent(event.id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditEvent(event.id)}>
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
    </>
  );
};

export default ListEvent;
