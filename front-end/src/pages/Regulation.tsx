import { styled} from '@stitches/react';
import backgroundImg from '../assets/images/background.png'
import logo from '../assets/images/logo1.png'
import {Link} from "react-router-dom";
import Typography from '@mui/material/Typography';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Regulation() {
  return (
    <Container>
      <Image src={logo} />
      <Typography component="h1" color="white" variant="h5">
           <MenuBookIcon/> Regulamento
      </Typography>
      <Paragraph>REGULAMENTO SORTE FLASH O que é – O Bilhete do SORTE FLASH é um instrumento de ação social, que busca na sociedade o apoio, através da aquisição de bilhetes, para custear sua missão filantrópica. Da modalidade – O concurso de prognóstico Bilhete do SORTE FLASH, consiste no sorteio contínuo ao acaso de adquirentes dos bilhetes emitidos eletronicamente ou sistema gráfico, onde virão já impressas quinze dezenas, geradas num sistema randômico, entre os números de 01 a 75, cujos sorteios ocorrerão pela extração de bolas, igualmente numeradas de 01 a 75, através do globo sorteador. Os Sorteios serão transmitidos em tempo real em LIVE NO YOUTUBE. Este projeto está protegido contra cópias e usos sem licença de autoria, conforme Lei 9.279/96 e Lei 9.609/98. Da Legalidade – A iniciativa está respaldada pelas Leis Federais 13.019 e 13.204, Art. 84B. O adquirente deste bilhete social SORTE FLASH, estará contribuindo com amarebrasil.org.br. O Sorteio é continuo, do 1º ao 5º prêmio, ou seja, o adquirente concorre as todos os prêmios com um único bilhete, as bolas serão extraídas do globo até surgir ganhador nas seguintes legendas. SUPER GIRO FLASH - É sorteado pelo número série do bilhete no sistema Sorte Flash. KUADRA - O primeiro a marcar 4 dezenas em uma das 3 linhas horizontais ganha o prêmio. KINA - O primeiro a marcar 5 dezenas em uma das 3 linhas horizontais ganha o prêmio. CRUZADINHA - O primeiro a marcar 7 dezenas na cruz no centro do bilhete ganha o prêmio. CHEIA - O primeiro a marcar 15 dezenas ganha o prêmio. FINA CHEIA - É composto por 14 dezenas, ou seja, faltando um número na cartela cheia. GIRO FLASH - É sorteado pelo número série do bilhete no sistema Sorte Flash. Da Premiação - Em caso de dois ou mais ganhadores os prêmios serão divididos em partes iguais, prazo de validade do bilhete é 90 dias após extração sorteada, o detentor do bilhete premiado recebe o prêmio na regional responsável mediante conta bancaria do titular do bilhete, o ganhador deverá estar munido do bilhete premiado, sem rasuras, documentos pessoais, RG, CPF e comprovante de endereço de acordo com cadastro do bilhete premiado no site. Caso o prêmio não seja resgatado em 90 dias, será doado para amarebrasil.org.br A íntegra do regulamento desta iniciativa esta disponível em sorteflash.com PROIBIDA A COMERCIALIZAÇÃO PARA MENORES DE 18 ANOS.
    </Paragraph>
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
const Image = styled('img', {});

const Paragraph = styled('p', {
  color: 'white',
  fontSize: 13,
  maxWidth: '80%',
  textAlign: 'justify',
  textJustify: 'inter-word',
  padding: 24,
  backgroundColor: 'black',
  borderRadius: 6,
  scrollBehavior:'smooth',
  overflowY: 'scroll'
});



export default Regulation