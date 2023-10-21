import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

const AddTerrain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
//   const token = localStorage.getItem('token');

  const initialValues = {
    nom: '',
    type: '',
    emplacement: '',
    capaciteSpectateurs: '',
    eclairage: false,
    prixLocation: ''
  };

  const validate = (values) => {
    const errors = {};

    if (!values.nom) {
      errors.nom = '☹︎ Nom est requis';
    }

    if (!values.type) {
      errors.type = '☹︎ Type est requis';
    }

    if (!values.emplacement) {
      errors.emplacement = '☹︎ Emplacement est requis';
    }

    if (!values.capaciteSpectateurs) {
      errors.capaciteSpectateurs = '☹︎ Capacité Spectateurs est requise';
    }

    if (!values.prixLocation) {
      errors.prixLocation = '☹︎ Prix de Location est requis';
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const terrainData = {
        nom: values.nom,
        type: values.type,
        emplacement: values.emplacement,
        capaciteSpectateurs: values.capaciteSpectateurs,
        eclairage: values.eclairage,
        prixLocation: values.prixLocation
      };

      await axios.post('http://localhost:8093/Terrain/addTerrain', terrainData, {
        headers: {
        //   Authorization: `Bearer ${token}`
        }
      });

      setIsLoading(false);
      navigate('/terrain-list');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Ajouter un Terrain
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {() => (
            <StyledForm>
              <Field name="nom">{({ field }) => <TextField required label="Nom du Terrain" {...field} fullWidth />}</Field>
              <ErrorMessage name="nom" component={ErrorText} />

              <Field name="type">{({ field }) => <TextField required label="Type" {...field} fullWidth />}</Field>
              <ErrorMessage name="type" component={ErrorText} />

              <Field name="emplacement">{({ field }) => <TextField required label="Emplacement" {...field} fullWidth />}</Field>
              <ErrorMessage name="emplacement" component={ErrorText} />

              <Field name="capaciteSpectateurs">
                {({ field }) => <TextField required label="Capacité Spectateurs" {...field} fullWidth />}
              </Field>
              <ErrorMessage name="capaciteSpectateurs" component={ErrorText} />

              <Field name="eclairage">
                {({ field }) => (
                  <TextField
                    label="Éclairage (true/false)"
                    type="boolean"
                    {...field}
                    fullWidth
                  />
                )}
              </Field>

              <Field name="prixLocation">
                {({ field }) => <TextField required label="Prix de Location" {...field} fullWidth />}
              </Field>
              <ErrorMessage name="prixLocation" component={ErrorText} />

              <Button type="submit" variant="contained" color="primary">
                {isLoading ? 'Chargement...' : 'Enregistrer'}
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AddTerrain;
