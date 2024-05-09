import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import './firstpage.css';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

function FirstPage() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box className="title-container" sx={{ textAlign: 'center', marginY: 5 }}>
        <Box className="title-box">
          <Typography variant="h3" component="h1" color="black" fontWeight="bold">
            Code Summariser and Evaluator
          </Typography>
        </Box>
      </Box>
      <div className="page-background"></div> {/* Add the background */}
      <Container component="main" maxWidth="xs" className='page'>
        <Box className="container">
          <Avatar className="avatar" sx={{ m: 2, bgcolor: 'black', width: 120, height: 120 }}>
            <DataObjectRoundedIcon fontSize="large" />
          </Avatar>
          <Box width="100%">
           <Link to ="/signup">
            <Button
              sx={{ mt: 5, mb: 2 }}
              variant="outlined"
              startIcon={<ExitToAppOutlinedIcon />}
              fullWidth
              className="button button-sign-up"
              color="primary"
            >
              Sign Up
            </Button>
            </Link>
            <Link to ="/signin">
            <Button
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              fullWidth
              variant="contained"
              className="button"
              color="primary"
            >
              Sign in
            </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FirstPage;
