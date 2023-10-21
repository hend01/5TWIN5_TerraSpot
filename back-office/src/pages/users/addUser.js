import React from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CustomButton, StyledForm, ErrorText } from '../../themes/style';

const AddUserForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const initialValues = {
    firstName: '',
    lastName: '',
    login: '',
    mobile: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: '',
    role: '',
    secteur_activite: '',
    description: '',
    niveau: '',
    promotion: '',
    salary: '',
    specialty: '',
    profil: [],
    studentId: ''
  };

  const handleSubmitIntern = (values) => {
    axios
      .post('https://amazony-backend.vercel.app/admin/registerIntern', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        // Navigate to another route
        navigate('/users-list');
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSubmitTeacher = (values) => {
    console.log(values);
    axios
      .post('https://amazony-backend.vercel.app/admin/registerTeacher', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        // Navigate to another route
        navigate('/users-list');
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSubmitCompany = (values) => {
    axios
      .post('https://amazony-backend.vercel.app/admin/registerCompany', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        // Navigate to another route
        navigate('/users-list');
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSubmitClient = (values) => {
    axios
      .post('https://amazony-backend.vercel.app/admin/register', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        // Navigate to another route
        navigate('/users-list');
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSubmitParent = (values) => {
    axios
      .post('https://amazony-backend.vercel.app/admin/registerParent', values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        // Navigate to another route
        navigate('/users-list');
        // Handle success response
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };
  const handleSubmit = (values) => {
    // Determine the role and call the appropriate submit function
    if (values.role === 'intern') {
      handleSubmitIntern(values);
    } else if (values.role === 'teacher') {
      handleSubmitTeacher(values);
    } else if (values.role === 'company') {
      handleSubmitCompany(values);
    } else if (values.role === 'parent') {
      handleSubmitParent(values);
    } else if (values.role === 'client') {
      handleSubmitClient(values);
    }

    // Handle submission for other roles if needed
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = '☹︎ Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = '☹︎ Invalid email';
    }
    if (!values.mobile) {
      errors.mobile = '☹︎ Mobile is required';
    } else if (!/^[2459]\d{7}$/.test(values.mobile)) {
      errors.mobile = '☹︎ Invalid mobile number';
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = '☹︎ Password and Confirm Password do not match';
    } else if (values.password.length < 7) {
      errors.confirmPassword = '☹︎ Password must have at least 8 characters';
    }
    if (isNaN(Number(values.age))) {
      errors.age = '☹︎ Invalid age, please enter a number';
    } else if (Number(values.age) < 0) {
      errors.age = '☹︎ Age cannot be negative';
    }

    return errors;
  };

  const handleGoUsersList = () => {
    navigate(`/users-list`);
  };

  return (
    <>
      <CustomButton onClick={handleGoUsersList}>Back</CustomButton>

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
        {({ values }) => (
          <StyledForm>
            <Field name="role">
              {({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role" // Add the name attribute
                    value={field.value || ''}
                    onChange={field.onChange}
                    required
                  >
                    <MenuItem value="intern">Intern</MenuItem>
                    <MenuItem value="parent">Parent</MenuItem>
                    <MenuItem value="teacher">Teacher</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Field>
            {values.role !== 'company' && (
              <>
                <Field name="firstName">{({ field }) => <TextField required label="First Name" {...field} fullWidth />}</Field>
                <Field name="lastName">{({ field }) => <TextField required label="Last Name" {...field} fullWidth />}</Field>
                <Field name="age">{({ field }) => <TextField required label="Age" {...field} fullWidth />}</Field>
                <ErrorMessage name="age" component={ErrorText} />
                <Field name="gender">
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender" // Add the name attribute
                        value={field.value || ''}
                        onChange={field.onChange}
                        required
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </>
            )}
            <Field name="login">{({ field }) => <TextField required label="Login" {...field} fullWidth />}</Field>
            <Field name="email">{({ field }) => <TextField required label="Email" {...field} fullWidth />}</Field>
            <ErrorMessage name="email" component={ErrorText} />
            <Field name="mobile">{({ field }) => <TextField required label="Mobile" {...field} fullWidth />}</Field>
            <ErrorMessage name="mobile" component={ErrorText} />
            <Field name="address">{({ field }) => <TextField required label="Address" {...field} fullWidth />}</Field>

            {values.role === 'company' && (
              <>
                <Field name="secteur_activite">{({ field }) => <TextField required label="Activite Sector" {...field} fullWidth />}</Field>
                <Field name="description">{({ field }) => <TextField required label="Description" {...field} fullWidth />}</Field>
              </>
            )}

            {values.role === 'intern' && (
              <>
                <Field name="niveau">{({ field }) => <TextField required label="Level" {...field} fullWidth />}</Field>
                <Field name="promotion">{({ field }) => <TextField required label="Promotion" {...field} fullWidth />}</Field>
              </>
            )}
            {values.role === 'parent' && (
              <>
                <Field name="studentId">{({ field }) => <TextField required label="Student ID : " {...field} fullWidth />}</Field>
              </>
            )}
            {values.role === 'teacher' && (
              <>
                <Field name="firstName">{({ field }) => <TextField required label="First Name" {...field} fullWidth />}</Field>
                <Field name="lastName">{({ field }) => <TextField required label="Last Name" {...field} fullWidth />}</Field>
                <Field name="age">{({ field }) => <TextField required label="Age" {...field} fullWidth />}</Field>
                <ErrorMessage name="age" component={ErrorText} />
                <Field name="gender">
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender" // Add the name attribute
                        value={field.value || ''}
                        onChange={field.onChange}
                        required
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Field>
                <Field name="salary">{({ field }) => <TextField required label="Salary" {...field} fullWidth />}</Field>
                <Field name="specialty">
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
                <FieldArray name="profil">
                  {({ push, remove, form }) => (
                    <div>
                      {form.values.profil.map((profil, index) => (
                        <div key={index}>
                          <Field name={`profil.${index}`} as={TextField} label="Profile" fullWidth />
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
              </>
            )}

            <Field name="password">{({ field }) => <TextField required label="Password" type="password" {...field} fullWidth />}</Field>
            <Field name="confirmPassword">
              {({ field }) => <TextField required label="Confirm Password" type="password" {...field} fullWidth />}
            </Field>
            <ErrorMessage name="confirmPassword" component={ErrorText} />
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
              Save
            </Button>
          </StyledForm>
        )}
      </Formik>
    </>
  );
};

export default AddUserForm;
