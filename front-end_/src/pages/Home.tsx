import { styled} from '@stitches/react';
import backgroundImg from '../assets/images/background.png'
import logo from '../assets/images/logo1.png'
import {Link} from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Home() {
  return (
    <Container>
      <Image src={logo} />
      <Button color={'success'} to="/sign-in">Comprar cartelas Online</Button>
      <Button color={'danger'} to="#"><YouTubeIcon/>Acompanhar sorteio</Button>
      <Button to="#"><EmojiEventsIcon/>Lista de ganahdores</Button>
      <CustomLink to="#"><HelpOutlineIcon/>Precisa de ajuda?</CustomLink>
      <CustomLink to="/regulation">Ler regulamento.</CustomLink>
    </Container>)
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  margging: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `url(${backgroundImg})`
});

const Button = styled(Link, {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  marginTop: '1em',
  padding: '12px 24px',
  fontSize: 18,
  borderRadius: 24,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#228aff',
  color: 'white',
  boxShadow: '4px 4px 6px black',
  width: 256,
  textDecoration: 'none',
  fontWeight: '400',

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});

const CustomLink = styled(Link, {
  marginTop: '1em',
  width: 256,
  fontSize: 18,
  fontWeight: '400',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center'
});

const Image = styled('img', {});


export default Home