import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profession: '',
    username: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    profession: '',
    username: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("inside handleSubmit");

    // Form validation
    let valid = true;
    const errors = { ...formErrors };

    if (!formData.email.includes('@')) {
      errors.email = 'Missing @ in email';
      valid = false;
    }
    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[\W_]/.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character';
      valid = false;
    }
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
      valid = false;
    }
    if (!formData.profession) {
      errors.profession = 'Profession is required';
      valid = false;
    }
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
      valid = false;
    }

    if (!valid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        console.log('Signup successful');
        window.location.href = '/signin'
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          setFormErrors({ ...formErrors, username: 'User ID already exists' });
          setSubmitStatus('fail');
        } else {
          console.error('Signup failed', errorData.error);
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSubmitStatus('error');
    }
  };

  const professions = [
    'Software Developer',
    'Business Intelligence Engineer',
    'Business Analyst',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Engineer',
    'Student',
    'Other'
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" classname="body">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black', height: 80, width: 80 }}>
            <LockOutlinedIcon fontSize='large' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up to start summarising!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={Boolean(formErrors.firstName)}
                  helperText={formErrors.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={Boolean(formErrors.lastName)}
                  helperText={formErrors.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  Your Profession
                </Typography>
                <Select
                  labelId="profession-select-label"
                  id="profession-select"
                  value={formData.profession}
                  label="Profession"
                  error={Boolean(formErrors.profession)}
                  helperText={formErrors.profession}
                  onChange={handleChange}
                  fullWidth
                  name="profession"
                >
                  {professions.map((prof, index) => (
                    <MenuItem key={index} value={prof}>
                      {prof}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="UserName"
                  type="text"
                  id="username"
                  autoComplete="username"
                  error={Boolean(formErrors.username)}
                  helperText={formErrors.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={Boolean(formErrors.password)}
                  helperText={formErrors.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {submitStatus === 'success' && (
              <Typography color="primary" variant="body1" gutterBottom>
                Signup successful!
              </Typography>
            )}
            {submitStatus === 'fail' && (
              <Typography color="error" variant="body1" gutterBottom>
                User ID already exists.Login with existing UserName.
              </Typography>
            )}
            {submitStatus === 'error' && (
              <Typography color="error" variant="body1" gutterBottom>
               SignUp Error. Try again after some time.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link component={RouterLink} to="/signin" variant="body2" sx={{ textAlign: 'center' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
