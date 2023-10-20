import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { StyledForm, ErrorText, CustomButton } from '../../themes/style';

const UpdateUserForm = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [formations, setFormations] = useState([]);
  const [error, setError] = useState('');
  const [isLoadingFormations, setIsLoadingFormations] = useState(false);

  const initialFormValues = {
    user: {
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      mobile: '',
      address: '',
      age: '',
      gender: '',
      role: ''
    },
    additionalData: {
      niveau: '',
      promotion: '',
      formations: []
    }
  };

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

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`https://amazony-backend.vercel.app/admin/formations/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setFormations(response.data);
        setIsLoadingFormations(true); // Mettre à jour ici
        setError('');
      } catch (error) {
        console.error('Error fetching Formations: ', error);
        setError('Failed to fetch formation Please try again later.');
      }
    };
    fetchFormations();
  }, [token]);

  const handleUpdateIntern = (values) => {
    const data = {
      ...values.user,
      ...values.additionalData
    };
    axios
      .put(`https://amazony-backend.vercel.app/admin/updateIntern/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log(data);
        console.log('INTERN UPDATED !');
      })
      .catch((error) => {
        console.error('Error updating user', error);
      });
  };

  const handleUpdateTeacher = (values) => {
    const data = {
      ...values.user,
      ...values.additionalData
    };
    axios
      .put(`https://amazony-backend.vercel.app/admin/updateTeacher/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error updating user', error);
      });
  };

  const handleUpdateCompany = (values) => {
    const data = {
      ...values.user,
      ...values.additionalData
    };
    axios
      .put(`https://amazony-backend.vercel.app/admin/updateCompany/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log(data);
        console.log('Company UPDATED !');
      })
      .catch((error) => {
        console.error('Error updating user', error);
      });
  };
  const handleUpdate = (values) => {
    const data = {
      userId,
      ...values.user
    };
    axios
      .put(`https://amazony-backend.vercel.app/admin/update/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        console.log(data);
        console.log('USER UPDATED !');
      })
      .catch((error) => {
        console.error('Error updating user', error);
      });
  };

  const handleSubmit = (values) => {
    if (values.user.role === 'intern') {
      handleUpdateIntern(values);
    } else if (values.user.role === 'teacher') {
      handleUpdateTeacher(values);
    } else if (values.user.role === 'company') {
      handleUpdateCompany(values);
    } else {
      handleUpdate(values);
    }
    navigate('/users-list');
  };

  const validate = () => {
    // Votre logique de validation ici
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!userDetails || !userDetails.user) {
    return <p>Loading...</p>;
  }

  const handleGoUsersList = () => {
    navigate(`/users-list`);
  };

  return (
    <>
      <CustomButton variant="contained" color="primary" onClick={handleGoUsersList}>
        Back
      </CustomButton>
      <Formik initialValues={userDetails || initialFormValues} onSubmit={handleSubmit} validate={validate}>
        {({ values }) => (
          <StyledForm>
            {/* Champs pour les informations de base de l'utilisateur */}
            <Field name="user.firstName">{({ field }) => <TextField required label="First Name" {...field} fullWidth />}</Field>
            <Field name="user.lastName">{({ field }) => <TextField required label="Last Name" {...field} fullWidth />}</Field>
            <Field name="user.login">{({ field }) => <TextField required label="Login" {...field} fullWidth />}</Field>
            <Field name="user.email">{({ field }) => <TextField required label="Email" {...field} fullWidth />}</Field>
            <ErrorMessage name="user.email" component={ErrorText} />
            <Field name="user.mobile">{({ field }) => <TextField required label="Mobile" {...field} fullWidth />}</Field>
            <ErrorMessage name="user.mobile" component={ErrorText} />
            <Field name="user.address">{({ field }) => <TextField required label="Address" {...field} fullWidth />}</Field>
            <Field name="user.age">{({ field }) => <TextField required label="Age" {...field} fullWidth />}</Field>
            <ErrorMessage name="user.age" component={ErrorText} />
            <Field name="user.gender">
              {({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select name="user.gender" value={field.value || ''} onChange={field.onChange} required>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Field>
            {/* Champs spécifiques à l'intern */}
            {values.user.role === 'intern' && (
              <>
                <Field name="additionalData.niveau">{({ field }) => <TextField required label="Level" {...field} fullWidth />}</Field>
                <Field name="additionalData.promotion">
                  {({ field }) => <TextField required label="Promotion" {...field} fullWidth />}
                </Field>
              </>
            )}
            {values.user.role === 'company' && (
              <>
                <Field name="additionalData.secteur_activite">
                  {({ field }) => <TextField required label="Activite Sector" {...field} fullWidth />}
                </Field>
                <Field name="additionalData.description">
                  {({ field }) => <TextField required label="Description" {...field} fullWidth />}
                </Field>
              </>
            )}
            {values.user.role === 'teacher' && (
              <>
                <Field name="additionalData.salary">{({ field }) => <TextField required label="Salary" {...field} fullWidth />}</Field>
                <Field name="additionalData.specialty">
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Specialty</InputLabel>
                      <Select
                        name="specialty" // Add the name attribute
                        value={field.value || ''}
                        onChange={field.onChange}
                        required
                      >
                        <MenuItem value="vacataire">Vacataire</MenuItem>
                        <MenuItem value="permanent">Permanent</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>{' '}
                <FieldArray name="additionalData.profil">
                  {({ push, remove }) => (
                    <div>
                      {values.additionalData.profil.map((_, index) => (
                        <div key={index}>
                          <Field name={`additionalData.profil.${index}`} as={TextField} label="Profile" fullWidth />
                          <Button type="button" onClick={() => remove(index)}>
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')}>
                        Add Profile
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="additionalData.formations">
                  {({ push, remove }) => (
                    <div>
                      {values.additionalData.formations.map((_, index) => (
                        <div key={index}>
                          <Field
                            name={`additionalData.formations.${index}`} // Nom du champ Formik
                          >
                            {({ field }) => (
                              <div>
                                {isLoadingFormations ? (
                                  <Select {...field} label="Formation" fullWidth>
                                    {formations.map((formation) => (
                                      <MenuItem key={formation._id} value={formation._id}>
                                        {formation.nom}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                ) : (
                                  <MenuItem value="">
                                    <em>Loading...</em>
                                  </MenuItem>
                                )}
                                <Button type="button" onClick={() => remove(index)}>
                                  Remove
                                </Button>
                              </div>
                            )}
                          </Field>
                        </div>
                      ))}
                      <Button type="button" onClick={() => push('')}>
                        Add Formation
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </>
            )}

            {/* Bouton de soumission */}
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default UpdateUserForm;
