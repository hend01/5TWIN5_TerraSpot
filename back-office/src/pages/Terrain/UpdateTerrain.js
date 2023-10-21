// import React, { useEffect, useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import styled from 'styled-components';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// axios.defaults.withCredentials = true;

// // const CustomButton = styled(Button)(() => ({
// //   position: 'absolute',
// //   right: '100px',
// //   backgroundColor: '#1890ff', // Red color
// //   color: '#fff', // Text color
// //   '&:hover': {
// //     backgroundColor: '#003a8c' // Darker red color on hover
// //   }
// // }));

// const StyledForm = styled(Form)`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   max-width: 500px;
//   margin: 0 auto;
// `;

// const ErrorText = styled.div`
//   color: red;
//   font-size: 14px;
// `;

// const UpdateTerrain = () => {
//   const { terrainId } = useParams();
//   const [terrainDetails, setTerrainDetails] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTerrainDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8089/Terrain/getTerrainById/${terrainId}`);
//         setTerrainDetails(response.data);
//         setError('');
//       } catch (error) {
//         console.error('Error fetching terrain details: ', error);
//         setError('Failed to fetch terrain details. Please try again later.');
//       }
//     };

//     fetchTerrainDetails();
//   }, [terrainId]);

//   const initialValues = {
//     nom: terrainDetails ? terrainDetails.nom : '',
//     type: terrainDetails ? terrainDetails.type : '',
//     emplacement: terrainDetails ? terrainDetails.emplacement : '',
//     capaciteSpectateurs: terrainDetails ? terrainDetails.capaciteSpectateurs : '',
//     eclairage: terrainDetails ? terrainDetails.eclairage : false,
//     prixLocation: terrainDetails ? terrainDetails.prixLocation : ''
//   };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.nom) {
//       errors.nom = '☹︎ Nom is required';
//     }
//     if (!values.type) {
//       errors.type = '☹︎ Type is required';
//     }
//     if (!values.emplacement) {
//       errors.emplacement = '☹︎ Emplacement is required';
//     }
//     if (!values.capaciteSpectateurs) {
//       errors.capaciteSpectateurs = '☹︎ Capacité Spectateurs is required';
//     }
//     if (!values.prixLocation) {
//       errors.prixLocation = '☹︎ Prix de Location is required';
//     }
//     // Add other validations as needed

//     return errors;
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const terrainData = {
//         nom: values.nom,
//         type: values.type,
//         emplacement: values.emplacement,
//         capaciteSpectateurs: values.capaciteSpectateurs,
//         eclairage: values.eclairage,
//         prixLocation: values.prixLocation
//       };

//       await axios.put(`http://localhost:8089/Terrain/updateTerrain/${terrainId}`, terrainData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!terrainDetails) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
//         {() => (
//           <StyledForm>
//             <Field name="nom">
//               {({ field }) => <TextField required label="Nom" {...field} fullWidth />}
//             </Field>
//             <ErrorMessage name="nom" component={ErrorText} />
//             <Field name="type">
//               {({ field }) => <TextField required label="Type" {...field} fullWidth />}
//             </Field>
//             <ErrorMessage name="type" component={ErrorText} />
//             <Field name="emplacement">
//               {({ field }) => <TextField required label="Emplacement" {...field} fullWidth />}
//             </Field>
//             <ErrorMessage name="emplacement" component={ErrorText} />
//             <Field name="capaciteSpectateurs">
//               {({ field }) => <TextField required label="Capacité Spectateurs" {...field} fullWidth />}
//             </Field>
//             <ErrorMessage name="capaciteSpectateurs" component={ErrorText} />
//             <Field name="eclairage">
//               {({ field }) => (
//                 <TextField
//                   label="Éclairage"
//                   type="checkbox"
//                   {...field}
//                   fullWidth
//                   inputProps={{ style: { transform: 'scale(1.5)' } }}
//                 />
//               )}
//             </Field>
//             <Field name="prixLocation">
//               {({ field }) => <TextField required label="Prix de Location" {...field} fullWidth />}
//             </Field>
//             <ErrorMessage name="prixLocation" component={ErrorText} />
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </StyledForm>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default UpdateTerrain;
