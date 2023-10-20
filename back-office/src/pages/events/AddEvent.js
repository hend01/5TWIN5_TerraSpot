import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //  const token = localStorage.getItem('token');

  const initialValues = {
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    sportType: '',
    maxParticipants: '',
    registrationPrice: ''
  };

  const validate = (values) => {
    const errors = {};

    if (!values.eventName) {
      errors.eventName = '☹︎ le Nom est requis';
    }

    if (!values.description) {
      errors.description = '☹︎ Description est requise';
    }

    if (!values.startDate) {
      errors.startDate = '☹︎ Date debut est requise';
    }

    if (!values.endDate) {
      errors.endDate = '☹︎ Date fin est requise';
    }

    if (!values.location) {
      errors.location = '☹︎ Localisation est requise';
    }
    if (!values.sportType) {
      errors.sportType = '☹︎ Type de Sport est requis';
    }
    if (!values.maxParticipants) {
      errors.maxParticipants = '☹︎ Nombre maximale de participants est requis';
    }
    if (!values.registrationPrice) {
      errors.registrationPrice = '☹︎ Pris est requis';
    }

    // Vous pouvez ajouter des validations supplémentaires pour les autres champs ici

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      await axios.post('http://localhost:8086/events/', values).then((response) => {
        console.log(response);
        navigate('/event-list');
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Ajouter un Evenements
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {() => (
            <StyledForm>
              <Field name="eventName">{({ field }) => <TextField required label="Nom de Evenement" {...field} fullWidth />}</Field>
              <ErrorMessage name="eventName" component={ErrorText} />

              <Field name="description">{({ field }) => <TextField required label="Description" {...field} fullWidth />}</Field>
              <ErrorMessage name="description" component={ErrorText} />

              <Field name="startDate">
                {({ field }) => (
                  <TextField
                    required
                    label="StartDate"
                    type="datetime-local"
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="startDate" component={ErrorText} />

              <Field name="endDate">
                {({ field }) => (
                  <TextField
                    required
                    label="endDate"
                    type="datetime-local"
                    {...field}
                    fullWidth
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="endDate" component={ErrorText} />

              <Field name="location">{({ field }) => <TextField label="Catégorie" {...field} fullWidth />}</Field>
              <ErrorMessage name="location" component={ErrorText} />

              <Field name="sportType">{({ field }) => <TextField label="sportType" {...field} fullWidth />}</Field>
              <ErrorMessage name="sportType" component={ErrorText} />

              <Field name="maxParticipants">{({ field }) => <TextField label="maxParticipants" {...field} fullWidth />}</Field>
              <ErrorMessage name="maxParticipants" component={ErrorText} />

              <Field name="registrationPrice">{({ field }) => <TextField label="registrationPrice" {...field} fullWidth />}</Field>
              <ErrorMessage name="registrationPrice" component={ErrorText} />

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

export default AddEvent;
