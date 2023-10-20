import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import { Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/system';

const UserDetailsPage = () => {
  const CustomButton = styled(Button)(() => ({
    position: 'absolute',
    right: '100px',
    backgroundColor: '#1890ff', // Red color
    color: '#fff', // Text color
    '&:hover': {
      backgroundColor: '#003a8c' // Darker red color on hover
    }
  }));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://amazony-backend.vercel.app/admin/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching user details: ', error);
        setError('Failed to fetch user details. Please try again later.');
      }
    };

    fetchUserDetails();
  }, [userId, token]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  const handleGoUsersList = () => {
    navigate(`/users-list`);
  };

  const handleUnSetAdmin = (userId) => {
    axios
      .put(
        `https://amazony-backend.vercel.app/admin/teacher/unsetAdmin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        toast.success(` Action effectuée avec succès`, { autoClose: 5000 });
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSetAdmin = (userId) => {
    axios
      .put(
        `https://amazony-backend.vercel.app/admin/teacher/setAdmin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        toast.success(` Action effectuée avec succès`, { autoClose: 5000 });
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <>
      <ToastContainer />
      <CustomButton onClick={handleGoUsersList}>Back</CustomButton>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#1890ff', marginBottom: '1rem' }}>
          User Details
        </Typography>
        <Box>
          {/* Informations communes */}
          {/* Afficher le prénom, le nom et l'âge uniquement si le rôle n'est pas "company" */}
          {userDetails.user.role !== 'company' && (
            <>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  First Name:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.user.firstName}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Last Name:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.user.lastName}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Age:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.user.age}
                </Typography>
              </Box>
            </>
          )}
          <Box sx={{ marginBottom: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              Login:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              {userDetails.user.login}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              Email:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              {userDetails.user.email}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              Role:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              {userDetails.user.role}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              Mobile:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              {userDetails.user.mobile}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '0.5rem' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
              Address:
            </Typography>
            <Typography variant="body1" sx={{ color: '#666666' }}>
              {userDetails.user.address}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} /> {/* Ajout du séparateur */}
          {/* Informations spécifiques au rôle */}
          {userDetails.user.role === 'teacher' && (
            <>
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Specialite:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.specialty}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Salaire:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.salary}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Profile:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.profil}
                </Typography>
              </Box>
              {userDetails.additionalData.isAdmin == true ? (
                <>
                  {' '}
                  <Button variant="contained" color="primary" onClick={() => handleUnSetAdmin(userDetails.user._id)}>
                    Supprimer les fonctionnalités Admin
                  </Button>
                </>
              ) : (
                <>
                  {' '}
                  <Button variant="contained" color="primary" onClick={() => handleSetAdmin(userDetails.user._id)}>
                    Ajouter les fonctionnalités Admin
                  </Button>
                </>
              )}
            </>
          )}
          {userDetails.user.role === 'intern' && (
            <>
              {' '}
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Identifiant:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.identifiant}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Niveau:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.niveau}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Promotion:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.promotion}
                </Typography>
              </Box>
            </>
          )}
          {userDetails.user.role === 'company' && (
            <>
              <Divider />
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Secteur Activite:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.secteur_activite}
                </Typography>
              </Box>
              <Box sx={{ marginBottom: '0.5rem' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                  Description:
                </Typography>
                <Typography variant="body1" sx={{ color: '#666666' }}>
                  {userDetails.additionalData.description}
                </Typography>
              </Box>
            </>
          )}
          {userDetails.user.role === 'client' && <>{/* Ajouter les attributs spécifiques au rôle 'client' ici */}</>}
          {/* Pas de séparateur ici car c'est la dernière section */}
        </Box>
      </Box>
    </>
  );
};

export default UserDetailsPage;
