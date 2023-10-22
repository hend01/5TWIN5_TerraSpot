import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router';
axios.defaults.withCredentials = true;

const CustomButton = styled(Button)(() => ({
  position: 'absolute',
  right: '100px',
  backgroundColor: '#1890ff', // Red color
  color: '#fff', // Text color
  '&:hover': {
    backgroundColor: '#003a8c' // Darker red color on hover
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

const UpdateProduit = () => {
  const { produitId } = useParams();
  const [produitImages, setProduitImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [produitDetails, setProduitDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduitDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/produit/getProduitById/${produitId}`);
        setProduitDetails(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching produit details: ', error);
        setError('Failed to fetch produit details. Please try again later.');
      }
    };

    fetchProduitDetails();
  }, [produitId]);

  const initialValues = {
    titre: produitDetails ? produitDetails.titre : '',
    description: produitDetails ? produitDetails.description : '',
    description_detaillee: produitDetails ? produitDetails.description_detaillee : '',
    couleur: produitDetails ? produitDetails.couleur.join(', ') : '',
    quantite: produitDetails ? produitDetails.quantite : '',
    prix: produitDetails ? produitDetails.prix : '',
    taille: produitDetails ? produitDetails.taille.join(', ') : '',
    categorie: produitDetails ? produitDetails.categorie : '',
    marque: produitDetails ? produitDetails.marque : ''
  };

  const validate = (values) => {
    const errors = {};

    if (!values.titre) {
      errors.titre = '☹︎ Titre is required';
    }
    if (!values.description) {
      errors.description = '☹︎ Description is required';
    }
    if (!values.quantite) {
      errors.quantite = '☹︎ Quantité is required';
    }
    if (!values.prix) {
      errors.prix = '☹︎ Prix is required';
    }
    // Ajoutez d'autres validations en fonction de vos besoins

    return errors;
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);

      const produitData = {
        titre: values.titre,
        description: values.description,
        description_detaillee: values.description_detaillee,
        couleur: values.couleur.split(',').map((color) => color.trim()), // Convertir en tableau
        quantite: values.quantite,
        prix: values.prix,
        taille: values.taille.split(',').map((size) => size.trim()), // Convertir en tableau
        categorie: values.categorie,
        marque: values.marque,
        images: []
      };

      const uploadPromises = produitImages.map(async (image) => {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dotvzhxdz/image/upload', {
          file: image,
          upload_preset: 'InfoPlus'
        });
        return response.data.secure_url;
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);
      produitData.images = uploadedImageUrls;

      await axios.put(`http://localhost:5000/produit/updateProduit/${produitId}`, produitData);

      setIsLoading(false);
      navigate('/produit-list');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleProduitList = () => {
    navigate('/produit-list');
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!produitDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CustomButton onClick={handleProduitList}>Back</CustomButton>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {() => (
          <StyledForm>
            <Field name="titre">{({ field }) => <TextField required label="Titre" {...field} fullWidth />}</Field>
            <ErrorMessage name="titre" component={ErrorText} />
            <Field name="description">
              {({ field }) => <TextField required label="Description" {...field} multiline rows={4} fullWidth />}
            </Field>
            <ErrorMessage name="description" component={ErrorText} />
            <Field name="description_detaillee">
              {({ field }) => <TextField label="Description détaillée" {...field} multiline rows={4} fullWidth />}
            </Field>
            <Field name="couleur">{({ field }) => <TextField label="Couleur" {...field} fullWidth />}</Field>
            <ErrorMessage name="couleur" component={ErrorText} />
            <Field name="quantite">{({ field }) => <TextField required label="Quantité" {...field} fullWidth />}</Field>
            <ErrorMessage name="quantite" component={ErrorText} />
            <Field name="prix">{({ field }) => <TextField required label="Prix" {...field} fullWidth />}</Field>
            <ErrorMessage name="prix" component={ErrorText} />
            <Field name="taille">{({ field }) => <TextField label="Taille" {...field} fullWidth />}</Field>
            <ErrorMessage name="taille" component={ErrorText} />
            <Field name="categorie">{({ field }) => <TextField label="Catégorie" {...field} fullWidth />}</Field>
            <ErrorMessage name="categorie" component={ErrorText} />
            <Field name="marque">{({ field }) => <TextField label="Marque" {...field} fullWidth />}</Field>
            <ErrorMessage name="marque" component={ErrorText} />
            <input type="file" id="images" name="images" multiple accept="image/*" onChange={onImageInputChange} />
            {produitDetails.images.map((image, index) => (
              <img key={index} src={image.secure_url} alt={`Ima ${index}`} style={{ width: '100%', height: 'auto' }} />
            ))}
            <Button type="submit" variant="contained" color="primary">
              {isLoading ? 'Chargement...' : 'Enregistrer'}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default UpdateProduit;
