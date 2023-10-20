import { styled } from '@mui/system';
import { Table, TableCell, Select, MenuItem, InputLabel, Button } from '@mui/material';
import { Form } from 'formik';
import styledd from 'styled-components';

export const DeleteManyButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#E32845', // Red color
  color: '#fff', // Text color

  '&:hover': {
    backgroundColor: '#C4132A' // Darker red color on hover
  },

  [theme.breakpoints.up('sm')]: {
    // On small screens and up
    left: '400px',
    top: '40px',
    marginTop: '40px'
  },

  [theme.breakpoints.down('xs')]: {
    // On extra-small screens
    left: 'auto', // Reset left position to default
    top: 'auto', // Reset top position to default
    width: '100%', // Set the button width to 100% of the container
    marginBottom: '40px' // Add some margin at the bottom for spacing
  }
}));

export const StyledTable = styled(Table)({
  minWidth: 500
});

export const StyledInputLabel = styled(InputLabel)(() => ({
  top: '-12px' // Adjust the margin as needed
}));

export const StyledTableCell = styled(TableCell)(() => ({
  fontWeight: 'bold',
  color: '#E32845',
  fontSize: 14
}));

export const StyledSelect = styled(Select)({
  minWidth: 150,
  backgroundColor: '#F5F5F5',
  borderRadius: 7,
  padding: '0px 10px',
  color: '#333',
  fontSize: 14,
  '&:focus': {
    backgroundColor: '#FFF',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
    outline: 'none'
  }
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: 14
});

export const CustomButton = styled(Button)(() => ({
  position: 'absolute',
  right: '100px',
  backgroundColor: '#1890ff', // blue color
  color: '#fff', // Text color
  '&:hover': {
    backgroundColor: '#003a8c' // Darker blue color on hover
  }
}));

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
`;
export const ErrorText = styledd.div`
  color: red;
  font-size: 14px;
`;
