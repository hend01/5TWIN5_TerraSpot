import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import { Delete, Visibility, Edit, SearchOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { DeleteManyButton, StyledTable, StyledInputLabel, StyledTableCell, StyledSelect, StyledMenuItem } from '../../themes/style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import './uploadExcel.css';

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [selectedRole, setSelectedRole] = useState(''); // State variable for selected role
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const reactPaginateRef = useRef(null);
  const token = localStorage.getItem('token');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleFileUpload = async (e) => {
    try {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);

      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        toast.info('Chargement des données en cours, Veuillez patienter...', { autoClose: 3000 });

        const successResults = [];
        const errorResults = [];

        for (const row of parsedData) {
          const rowWithoutRowNum = { ...row };
          delete rowWithoutRowNum['__rowNum__'];

          // Ensure that the 'password' field is present and valid in the row
          const password = row['password'];
          if (!password || typeof password !== 'string') {
            errorResults.push('Invalid password');
            continue;
          }

          try {
            let endpoint = '';
            switch (rowWithoutRowNum['role']) {
              case 'intern':
                endpoint = 'registerIntern';
                break;
              case 'parent':
                endpoint = 'registerParent';
                break;
              case 'company':
                endpoint = 'registerCompany';
                break;
              case 'teacher':
                endpoint = 'registerTeacher';
                break;
              default:
                // Invalid role, skip this row
                errorResults.push('Invalid role');
                continue;
            }

            const response = await axios.post(`https://amazony-backend.vercel.app/admin/${endpoint}`, rowWithoutRowNum, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            successResults.push(response.data);
          } catch (error) {
            console.error(error.message);
            errorResults.push(error.message);
          }
        }

        const successCount = successResults.length;
        const errorCount = errorResults.length;

        if (successCount > 0) {
          toast.success(`${successCount} objet(s) ajouté(s) avec succès`, { autoClose: 5000 });
        }
        if (errorCount > 0) {
          toast.error(`Erreur d'ajout de ${errorCount} objet(s)`, { autoClose: 5000 });
        }

        // Mettre à jour automatiquement la liste des utilisateurs après l'ajout
        refresh();
      };
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://amazony-backend.vercel.app/admin/getUsersList', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Error fetching USERS list : ', error);
      setError('Failed to fetch user list. Please try again later.');
    }
  }, [token]); // Include 'token' in the dependency array

  useEffect(() => {
    fetchUsers(); // Use the useCallback-wrapped fetchUsers function
    return () => {};
  }, [fetchUsers]); // Include fetchUsers in the dependency array

  const refresh = async () => {
    try {
      await fetchUsers(); // Assuming fetchUsers is a function that retrieves the updated user data
      const validLastPage = Math.max(0, pageCount - 1); // Calculate the valid last page index
      const updatedCurrentPage = Math.min(currentPage, validLastPage); // Set the current page to the valid last page if it exceeds the limit
      setCurrentPage(updatedCurrentPage);
    } catch (error) {
      console.error('Error refreshing user list:', error);
    }
  };

  const handleDetailUser = (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleEditUser = (userId) => {
    navigate(`/users/update/${userId}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      axios
        .delete(`https://amazony-backend.vercel.app/admin/deleteUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          toast.success(`Utilisateur supprimer avec succès`, { autoClose: 2000 });
          setUsers(users.filter((user) => user._id !== id)); // Remove the deleted user from the state
        })
        .catch((error) => {
          toast.error(`Erreur lors de suppression`, { autoClose: 2000 });
          console.error('Error deleting user', error);
        });
    }
  };

  const handleDeleteMany = () => {
    if (selectedUsers.length === 0) {
      toast.error(`Veuillez sélectionner au moins un utilisateur.`, { autoClose: 2000 });
      return;
    }

    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ces ${selectedUsers.length} utilisateurs?`)) {
      const userIdsToDelete = selectedUsers.map((user) => user._id);
      axios
        .delete(`https://amazony-backend.vercel.app/admin/deleteMany`, {
          data: { userIds: userIdsToDelete },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          toast.success(`${selectedUsers.length} utilisateur(s) supprimé(s) avec succès`, { autoClose: 2000 });
          setUsers((prevUsers) => prevUsers.filter((user) => !userIdsToDelete.includes(user._id))); // Remove the deleted users from the state
          setSelectedUsers([]); // Clear the selected users array after deletion
        })
        .catch((error) => {
          toast.error(`Erreur lors de la suppression`, { autoClose: 2000 });
          console.error('Error deleting users', error);
        });
    }
  };

  const handleFilter = (event) => {
    setSelectedRole(event.target.value || ''); // Set the selected role as the value from the dropdown or an empty string
    setCurrentPage(0);
  };

  const filteredUsers = selectedRole
    ? users.filter(
        (user) =>
          user.role === selectedRole &&
          (user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.login.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.additionalData.some((data) => data.identifiant && data.identifiant.toLowerCase().includes(searchValue.toLowerCase())))
      )
    : users.filter((user) => {
        return (
          user.login.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.additionalData.some((data) => data.identifiant && data.identifiant.toLowerCase().includes(searchValue.toLowerCase()))
        );
      });

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(offset, offset + itemsPerPage);

  return (
    <>
      <ToastContainer />
      {error && <p>{error}</p>} {/* Display error message if present */}
      <div>
        <input id="file-upload" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ display: 'none' }} />
        <label htmlFor="file-upload" className="custom-file-upload">
          <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '10px' }} />
          Ajouter des Utilisateurs à partir d un fichier Excel
        </label>
      </div>
      <DeleteManyButton onClick={handleDeleteMany}>Delete Many</DeleteManyButton>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledInputLabel>Filter</StyledInputLabel>
        <FormControl>
          <InputLabel>Role</InputLabel>
          <StyledSelect value={selectedRole} onChange={handleFilter}>
            <StyledMenuItem value="">All Roles</StyledMenuItem>
            <StyledMenuItem value="intern">Intern</StyledMenuItem>
            <StyledMenuItem value="parent">Parent</StyledMenuItem>
            <StyledMenuItem value="teacher">Teacher</StyledMenuItem>
            <StyledMenuItem value="company">Company</StyledMenuItem>
            <StyledMenuItem value="client">Client</StyledMenuItem>
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
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Login</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell>OPTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.some((selectedUser) => selectedUser._id === user._id)}
                    onChange={() =>
                      setSelectedUsers((prevSelectedUsers) =>
                        prevSelectedUsers.some((selectedUser) => selectedUser._id === user._id)
                          ? prevSelectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
                          : [...prevSelectedUsers, user]
                      )
                    }
                  />
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(user._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton color="info" onClick={() => handleDetailUser(user._id)}>
                    <Visibility />
                  </IconButton>
                  <IconButton color="dark" onClick={() => handleEditUser(user._id)}>
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
          ref={reactPaginateRef}
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

export default UsersList;
