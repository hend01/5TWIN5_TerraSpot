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

const AddProduit = () => {
  const [produitImages, setProduitImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    titre: '',
    description: '',
    couleur: [], // Peut contenir plusieurs couleurs, assurez-vous de gérer cela côté serveur
    quantite: '',
    prix: '',
    taille: [], // Peut contenir plusieurs tailles, assurez-vous de gérer cela côté serveur
    categorie: '',
    marque: '',
    description_detaillee: '',
    images: []
  };

  const validate = (values) => {
    const errors = {};

    if (!values.titre) {
      errors.titre = '☹︎ Titre est requis';
    }

    if (!values.description) {
      errors.description = '☹︎ Description est requise';
    }

    if (!values.quantite) {
      errors.quantite = '☹︎ Quantité est requise';
    }

    if (!values.prix) {
      errors.prix = '☹︎ Prix est requis';
    }

    if (!values.categorie) {
      errors.categorie = '☹︎ Categorie est requise';
    }

    // Vous pouvez ajouter des validations supplémentaires pour les autres champs ici

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const produitData = {
        titre: values.titre,
        description: values.description,
        couleur: values.couleur,
        quantite: values.quantite,
        prix: values.prix,
        taille: values.taille,
        categorie: values.categorie,
        marque: values.marque,
        description_detaillee: values.description_detaillee,
        images: []
      };

      const axiosConfig = {
        withCredentials: true, // Inclure les informations d'authentification (cookies)
        headers: {
          'Content-Type': 'application/json' // Assurez-vous que le type de contenu est correct
        }
      };

      const uploadPromises = produitImages.map(async (image) => {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dotvzhxdz/image/upload',
          {
            file: image,
            upload_preset: 'InfoPlus'
          },
          axiosConfig
        );
        return response.data.secure_url;
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);
      produitData.images = uploadedImageUrls;

      await axios.post('http://localhost:8086/produit/addProduit', produitData);

      setIsLoading(false);
      navigate('/produit-list');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onImageInputChange = (e) => {
    const selectedImages = event.target.files;
    const maxImages = 4; // Limite à 4 images
    const uploadedImages = Array.from(e.target.files);

    if (selectedImages.length > maxImages) {
      // Si plus de 4 images ont été sélectionnées, affichez un message d'erreur ou prenez des mesures appropriées.
      alert(`Vous ne pouvez sélectionner que jusqu'à ${maxImages} images.`);
      event.target.value = null; // Réinitialise l'élément input pour permettre de sélectionner à nouveau.
    } else {
      // Gérez les images sélectionnées ici, par exemple, en les stockant dans un tableau d'images.
    }

    Promise.all(
      uploadedImages.map((image) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      })
    ).then((imageURLs) => {
      setProduitImages(imageURLs);
    });
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Ajouter un Produit
        </Typography>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
          {() => (
            <StyledForm>
              <Field name="titre">{({ field }) => <TextField required label="Titre du Produit" {...field} fullWidth />}</Field>
              <ErrorMessage name="titre" component={ErrorText} />

              <Field name="description">{({ field }) => <TextField required label="Description" {...field} fullWidth />}</Field>
              <ErrorMessage name="description" component={ErrorText} />

              <Field name="description_detaillee">
                {({ field }) => (
                  <TextField
                    label="Description détaillée"
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description détaillée du produit"
                  />
                )}
              </Field>

              <Field name="quantite">{({ field }) => <TextField required label="Quantité" {...field} fullWidth />}</Field>
              <ErrorMessage name="quantite" component={ErrorText} />

              <Field name="prix">{({ field }) => <TextField required label="Prix" {...field} fullWidth />}</Field>
              <ErrorMessage name="prix" component={ErrorText} />

              <Field name="categorie">{({ field }) => <TextField label="Catégorie" {...field} fullWidth />}</Field>
              <ErrorMessage name="categorie" component={ErrorText} />

              <Field name="marque">{({ field }) => <TextField label="Marque" {...field} fullWidth />}</Field>

              <Field name="couleur">
                {({ form }) => (
                  <TextField
                    label="Couleur(s)"
                    fullWidth
                    placeholder="Séparez les couleurs par des virgules (par exemple : Rouge, Bleu)"
                    onBlur={(e) => {
                      const couleur = e.target.value.split(',').map((c) => c.trim());
                      form.setFieldValue('couleur', couleur);
                    }}
                  />
                )}
              </Field>

              <Field name="taille">
                {({ form }) => (
                  <TextField
                    label="Taille(s)"
                    fullWidth
                    placeholder="Séparez les tailles par des virgules (par exemple : S, M, L)"
                    onBlur={(e) => {
                      const taille = e.target.value.split(',').map((t) => t.trim());
                      form.setFieldValue('taille', taille);
                    }}
                  />
                )}
              </Field>

              <input type="file" id="images" name="images" multiple accept="image/*" onChange={onImageInputChange} />

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

export default AddProduit;
