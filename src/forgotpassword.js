import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(0);
  const [newPasswordError, setnewPasswordError] = useState(0);
  const [randomCodeError,setRandomcodeError]  = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputEmailChange = () => {
    setEmailError(0); 
  };

  const handleInputPasswordChange = () => 
    {
      setRandomcodeError(0);
    }
    const handleInputNewPasswordChange = () =>
      {
        setnewPasswordError(0);
      }
  
  const handleSendPassword = async () => {
    if (!email) {
      setEmailError(1);
      return;
    } else if(!email.includes('@')) {
      setEmailError(2);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/sendpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setShowEmailInput(false);
        setShowPasswordInput(true);
        console.log("mail sent successfully");
      } else {
        setErrorMessage(data.error);
        console.log("mail not sent");
      }
    } catch (error) {
      setErrorMessage('An error occurred while sending the password');
    }
  };

  const handleCheckPassword = async () => {
    if(!password)
      {
          setRandomcodeError(1);
          return;
      }
     
    try {
      const response = await fetch('http://127.0.0.1:5000/api/checkpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {

        setShowPasswordInput(false);
        setShowNewPasswordInput(true);
      } else {
        setErrorMessage('Incorrect code.');
      }
    } catch (error) {
      console.error('Error checking password:',error);
      setErrorMessage('An error occurred while checking the password.');
    }
  };

  const handleSavePassword = async () => {
    
    
    if (!newPassword || !confirmNewPassword || newPassword != confirmNewPassword )
    {
      setnewPasswordError(1);
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/api/savepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (data.success) {

        window.alert('Password has been changed successfully');
        window.location.href = '/signin';
    
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error saving password:', error);
      setErrorMessage('An error occurred while saving the password.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} 
          sx={{
            backgroundImage: 'url(https://it.fitnyc.edu/wp-content/uploads/2021/05/Person-tapping-on-change-password-button-on-device.jpg)',
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
              {showEmailInput && 'Forgot Password'}
              {showPasswordInput && 'Email verification'}
              {showNewPasswordInput && 'Change password'}
            </Typography>
            <Typography component="h6" variant="h8" align="center" sx={{ mt: 5, mb: 2 }}>
              {showEmailInput && 'Enter your account email. If it exists in our records, you will receive an email with the next steps!'}
              { showPasswordInput && 'Enter the code sent in your email.'}
              {showNewPasswordInput && "Email verification successful! \n Enter your new password."}
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => e.preventDefault()} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); handleInputEmailChange(); }}
                error={emailError}
                helperText={emailError === 1 ? 'Email required' : emailError === 2 ? 'Invalid email' : ''}
              />
              {showPasswordInput && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Random Code"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value); handleInputPasswordChange();}}
                  error ={randomCodeError}
                  helperText = {randomCodeError === 0 ? ' ': 'Code cannot be empty'}
                />
              )}
              {showNewPasswordInput && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {setNewPassword(e.target.value); handleInputNewPasswordChange();}}
                    error={newPasswordError}
                    helperText = {newPasswordError === 0 ? ' ':'Passwords do not match'}

                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => {setConfirmNewPassword(e.target.value); handleInputNewPasswordChange();}}
                    error={newPasswordError}
                    helperText = {newPasswordError === 0 ? ' ': 'Passwords do not match'}

                  />
                </>
              )}
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={
                  showEmailInput ? handleSendPassword : 
                  showPasswordInput ? handleCheckPassword : 
                  handleSavePassword
                }
              >
                {showEmailInput ? 'Send Mail' : 
                 showPasswordInput ? 'Verify Email' : 
                 'Submit new password'}
              </Button>
              <Typography variant="body2" color="error">
                {errorMessage} 
              </Typography>
              <Grid container>
                <Grid item>
                  <Link to="/signin" variant="body2"> 
                    {"Nevermind just Login back!"}
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

export default ForgotPassword;
