import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';  
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    loginError: '', 
  });

  const handleInputChange = (event) => {
    const { name } = event.target;
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit button clicked'); 
    const formData = new FormData(event.currentTarget);
    const userData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    if (!userData.username || !userData.password) {
      setFormErrors({
        username: !userData.username ? 'Username is required' : '',
        password: !userData.password ? 'Password is required' : '',
      });
      return;
    }

    try {
      const response = await fetch('http:///127.0.0.1:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log('Login successful'); 

        if (responseData.role === 'admin') {
          localStorage.setItem('adminid',responseData.adminid)
          window.location.href = '/admindashboard';
          
        } else if (responseData.role === 'user') {
          localStorage.setItem('userid',responseData.userid)
          window.location.href = '/userdashboard';
        }
      } else {
        console.error(responseData.error); 
        setFormErrors({ ...formErrors, loginError: 'Account does not exist, sign up now to start summarising!' });
      }
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nJTIwc2V0dXB8ZW58MHx8MHx8fDA%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black', height: 80, width: 80 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to start summarising!
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="UserName"
                name="username"
                autoComplete="username"
                autoFocus
                error={Boolean(formErrors.username)}
                helperText={formErrors.username}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                onChange={handleInputChange}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Typography variant="body2" color="error">
                {formErrors.loginError} 
              </Typography>
              <Grid container>
                <Grid item xs>
                <Link to="/forgotpassword" variant="body2" sx={{ textAlign: 'center' }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2"> 
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
