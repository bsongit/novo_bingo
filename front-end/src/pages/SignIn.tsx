import { styled} from '@stitches/react';
import logo from '../assets/images/logo1.png'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doLoggin } from '../services/AuthService';
import UserModel from '../models/UserModel';
import { useState } from 'react';

const theme = createTheme();

export default function SignIn() {
  const [form, setForm] = useState<UserModel>({})

  const handleChange = (e : any) => {  
    setForm({...form,[e.target.name] : 
      isNaN(parseFloat(e.target.value))? e.target.value : parseFloat(e.target.value)
    });
    console.clear()
    console.log(form)
  }

  const handleSubmit = (e : any) => { 
    e.preventDefault();
    doLoggin(form)
    console.log(form);
  } 

  return (
    <SuperContainer>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img src={logo}/>
          <Typography component="h1" variant="h5">
            Faça o Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              color="secondary"
              required
              fullWidth
              id="email"
              label="Endereço de Email"
              name="email"
              autoComplete="email"
              autoFocus
              style={{backgroundColor: "white", borderRadius: '8px'}}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              color="secondary"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}

              style={{backgroundColor: "white", borderRadius: '8px'}}
            />
            <FormControlLabel 
              control={<Checkbox value="remember" color="default" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              color="warning"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ENTRAR
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Não possui uma conta? Cadastrar-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </SuperContainer>
  );
}


const SuperContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  margging: 0,
  width: '100%',
  height: '100%'
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://sorteflash.com/">
        SorteFlash
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
