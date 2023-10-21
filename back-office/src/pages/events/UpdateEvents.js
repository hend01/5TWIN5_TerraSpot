import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

const UpdateEvents = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
    end_date: '',
    sportType: '',
    maxParticipants: '',
    registrationPrice: ''
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/events/${eventId}`);
        setEventDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching event details: ', error);
        setError('Failed to fetch event details. Please try again later.');
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = (values) => {
    setIsLoading(true);

    axios
      .put(`http://localhost:8088/events/${eventId}`, values)
      .then(() => {
        navigate('/events-list');
      })
      .catch((error) => {
        console.error('Error updating event: ', error);
      });
    setIsLoading(false);
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
      errors.registrationPrice = '☹︎ Prix est requis';
    }

    // Vous pouvez ajouter des validations supplémentaires pour les autres champs ici

    return errors;
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!eventDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Formik initialValues={eventDetails || initialValues} onSubmit={handleSubmit} validate={validate}>
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
                type="date"
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
                type="date"
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
  );
};

export default UpdateEvents;
