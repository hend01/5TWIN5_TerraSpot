import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import styled from 'styled-components';

const CustomButton = styled(Button)(() => ({
  position: 'absolute',
  right: '100px',
  backgroundColor: '#1890ff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#003a8c'
  }
}));

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

const ReadOnlyField = styled.div`
  font-size: 16px;
  color: #333;
`;

const UpdateCommandeForm = () => {
  const { commandeId } = useParams();
  const navigate = useNavigate();
  const [commandeDetail, setCommandeDetail] = useState(null);
  const [error, setError] = useState('');

  const validate = (values) => {
    const errors = {};

    if (!values.confirme) {
      errors.confirme = 'Confirme is required';
    }

    if (!values.delivre) {
      errors.delivre = 'Delivre is required';
    }

    return errors;
  };

  const initialValues = {
    confirme: '',
    delivre: ''
  };

  useEffect(() => {
    const fetchCommandeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/commande/commandes/${commandeId}`);
        setCommandeDetail(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching commande details: ', error);
        setError('Failed to fetch commande details. Please try again later.');
      }
    };

    fetchCommandeDetails();
  }, [commandeId]);

  const handleSubmit = (values) => {
    axios
      .put(`http://localhost:5000/commande/commandes/${commandeId}`, values)
      .then(() => {
        console.log('Commande updated!');
        navigate('/commande-list');
      })
      .catch((error) => {
        console.error('Error updating commande: ', error);
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!commandeDetail) {
    return <p>Loading...</p>;
  }

  const handleGoCommandesList = () => {
    navigate('/commande-list');
  };

  return (
    <>
      <CustomButton onClick={handleGoCommandesList}>Back</CustomButton>
      <Formik initialValues={commandeDetail || initialValues} onSubmit={handleSubmit} validate={validate}>
        {() => (
          <StyledForm>
            <div>
              <label htmlFor="nom_prenom">Nom et Prénom: </label>
              <ReadOnlyField>{commandeDetail.nom_prenom}</ReadOnlyField>
              <ErrorMessage name="nom_prenom" component={ErrorText} />
            </div>

            <div>
              <label htmlFor="adresse">Adresse: </label>
              <ReadOnlyField>{commandeDetail.adresse}</ReadOnlyField>
            </div>

            <Field name="confirme">
              {({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Confirme</InputLabel>
                  <Select name="confirme" value={field.value || ''} onChange={field.onChange} required>
                    <MenuItem value="Oui">Oui</MenuItem>
                    <MenuItem value="Non">Non</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Field>

            <Field name="delivre">
              {({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Delivre</InputLabel>
                  <Select name="delivre" value={field.value || ''} onChange={field.onChange} required>
                    <MenuItem value="Oui">Oui</MenuItem>
                    <MenuItem value="Non">Non</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Field>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default UpdateCommandeForm;
