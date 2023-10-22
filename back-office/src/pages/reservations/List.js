import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

import { Delete, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledTable = styled(Table)({
  minWidth: 500,
});

const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14,
}));

const Listreservation = () => {
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('sm');

  const [data, setData] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8088/api/reservation/list'); 
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8088/api/reservation/remove/${id}`);
      if (response.status === 200) {
        setData(data.filter((reservation) => reservation.id !== id));
        toast.success('Reservation deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Failed to delete reservation');
    }
  };

  const handleDetailReservation = (reservation) => {
    setSelectedReservation(reservation);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell>Heure</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Terrain</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <StyledTableCell colSpan={4}>Loading...</StyledTableCell>
            </TableRow>
          ) : (
            data.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.heure}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.terrain}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteReservation(reservation.id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    color="dark"
                    onClick={() => handleDetailReservation(reservation)}
                  >
                    <Visibility />
                  </IconButton>
                
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </StyledTable>

      {selectedReservation && (
        <Dialog open={isDialogOpen}         fullWidth={fullWidth}
        maxWidth={maxWidth}
 onClose={handleCloseDialog}  >
          <DialogTitle><h2>Reservation Details</h2></DialogTitle>
          <DialogContent>
            <p>Heure: {selectedReservation.heure}</p>
            <p>Date: {selectedReservation.date}</p>
            <p>Terrain: {selectedReservation.terrain}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(data.length / 5)} 
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

      <ToastContainer />
    </>
  );
};

export default Listreservation;
