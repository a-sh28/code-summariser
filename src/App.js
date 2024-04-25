
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const defaultTheme = createTheme();
function App() {
 return (
    <ThemeProvider theme={defaultTheme}>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height:200,
            width:700,
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        > <h1> Code Summariser and Evaluator</h1>
        <h4 > Experience seemless understanding of code in your language! </h4></Box>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Avatar sx={{ m: 2, bgcolor: 'black',width:120, height:120}}>
           <DataObjectRoundedIcon fontSize='large'/>
          </Avatar>
          <Typography component="h1" variant="h5">
            
          </Typography>
          <Box>
          <Button
              variant="outlined" startIcon={< ExitToAppOutlinedIcon/>}
              type="signup"
              fullWidth

              sx={{ mt: 5, mb: 2 }}
              color='primary'
             
            >Sign Up</Button>
            <Button
              type="=signin"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              color="primary"
            >Sign in</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              color="inherit"
            >
              Sign In with Google
            </Button>
            
          </Box>
      </Box>
      </Container>
    </ThemeProvider>
  );
}
export default App;
