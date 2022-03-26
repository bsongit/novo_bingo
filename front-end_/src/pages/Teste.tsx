import { createStitches} from '@stitches/react';
import { useEffect } from 'react';
import Api from '../utils/Api';

const FristName = ['Piu', 'Luiz', 'Zeze', 'Piton', 'Gledilson', 'Calhau', 'Pity', 'Paty', 'Ana', 'Maria', 'Maze','Marcia', 'Julia', 'Talita', 'Beatriz', 'Milena', 'Carol', 'Samara' ,'Carlos','Antonio', 'Julio', 'Pablo', 'Francisco', 'Bob', 'Michel', 'Miguel', 'Rafael', 'Placido', 'Marlei', 'Bruno', 'Victor']
const MidName = ['Piulita', 'Minuta', 'Porta', 'Planta', 'Variuda', 'Marilda', 'Marceliuda','da Silva', 'dos Santos', 'de Sousa', 'de Oliveira', 'de Padua', 'da Selva', 'dos Pinhais', 'Correia', 'da Cruz', 'do Carmo', 'Ferreira']
const LastName = ['Becker', 'Zarins', 'Pedreira', 'Carneiro','Gonzaga', 'Neto', 'Filho', 'Junior', 'Pereira', 'Silveira', 'Quadros', 'Matos', 'Gomes', 'Bastos', 'Tenorio', 'Hermano']

function Teste() {
  useEffect(() => {
    var count = 0;
    var interval = setInterval(() => {
      if(count > 100000){
        clearInterval(interval)
      }
      (count % 2) > 0 ? generateTicket1() : generateTicket2();
      count++;
    },200)

  } , []);

  
const deleteRandoTicket= async () => {
  try {
    const response = await Api.post('/cartelas/delete');
    console.clear()
    console.log(response)
  } catch (error) {
    console.log('ERRO')
  }
}

  const generateTicket1 = async () => {
    let a1 = Math.floor(Math.random() * 15) + 1;
    let a2 = Math.floor(Math.random() * 2) + a1 + 1;
    let a3 = Math.floor(Math.random() * 3) + a2+ 1; 
    let a4 = Math.floor(Math.random() * 2) + a3+ 1;
    let a5 = Math.floor(Math.random() * 3) + a4+ 1;
    let a6 = Math.floor(Math.random() * 2) + a5+ 1;
    let a7 = Math.floor(Math.random() * 3) + a6+ 1;
    let a8 = Math.floor(Math.random() * 2) + a7+ 1;
    let a9 = Math.floor(Math.random() * 3) + a8+ 1;
    let a10 = Math.floor(Math.random() * 2) + a9+ 1;
    let a11 = Math.floor(Math.random() * 3) + a10+ 1;
    let a12 = Math.floor(Math.random() * 2) + a11+ 1;
    let a13 = Math.floor(Math.random() * 3) + a12+ 1;
    let a14 = Math.floor(Math.random() * 2) + a13+ 1;
    let a15 = Math.floor(Math.random() * 3) + a14+ 1;
    let a16 = Math.floor(Math.random() * 2) + a15+ 1;
    let a17 = Math.floor(Math.random() * 3) + a16+ 1;
    let a18 = Math.floor(Math.random() * 2) + a17+ 1;
    let a19 = Math.floor(Math.random() * 3) + a18+ 1;
    let a20 = Math.floor(Math.random() * 2) + a19+ 1;
    let a21 = Math.floor(Math.random() * 3) + a20+ 1;
    let a22 = Math.floor(Math.random() * 2) + a21+ 1;
    let a23 = Math.floor(Math.random() * 3) + a22+ 1;
    let a24 = Math.floor(Math.random() * 2) + a23+ 1;
    let a25 = Math.floor(Math.random() * 3) + a24+ 1;
    const numeros = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25]
    const codigo = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 9) + 1}`;
    try {
      const {data} = await Api.post('/cartelas/create',{codigo, numeros: numeros.join()});
      console.clear()
      console.log(data)
    } catch (error) {
      console.log('ERRO')
    }
  }

  const generateTicket2 = async () => {
    let a1 = Math.floor(Math.random() * 3) + 1;
    let a2 = Math.floor(Math.random() * 3) + 4;
    let a3 = Math.floor(Math.random() * 3) + 7; 
    let a4 = Math.floor(Math.random() * 3) + 10;
    let a5 = Math.floor(Math.random() * 3) + 13;
    let a6 = Math.floor(Math.random() * 3) + 16;
    let a7 = Math.floor(Math.random() * 3) + 19;
    let a8 = Math.floor(Math.random() * 3) + 22;
    let a9 = Math.floor(Math.random() * 3) + 25;
    let a10 = Math.floor(Math.random() * 3) + 28;
    let a11 = Math.floor(Math.random() * 3) + 31;
    let a12 = Math.floor(Math.random() * 3) + 34;
    let a13 = Math.floor(Math.random() * 3) + 37;
    let a14 = Math.floor(Math.random() * 3) + 40;
    let a15 = Math.floor(Math.random() * 3) + 43;
    let a16 = Math.floor(Math.random() * 3) + 46;
    let a17 = Math.floor(Math.random() * 3) + 49;
    let a18 = Math.floor(Math.random() * 3) + 52;
    let a19 = Math.floor(Math.random() * 3) + 55;
    let a20 = Math.floor(Math.random() * 3) + 58;
    let a21 = Math.floor(Math.random() * 3) + 61;
    let a22 = Math.floor(Math.random() * 3) + 64;
    let a23 = Math.floor(Math.random() * 3) + 67;
    let a24 = Math.floor(Math.random() * 3) + 70;
    let a25 = Math.floor(Math.random() * 3) + 73;
    const numeros = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25]
    const codigo = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 9) + 1}`;
    try {
      const {data} = await Api.post('/cartelas/create',{codigo, numeros: numeros.join()});
      console.clear()
      console.log(data)
    } catch (error) {
      console.log('ERRO')
    }
  }

const geradorDeGerentes = async () => {
  try {
    let name = `${FristName[Math.floor(Math.random() * FristName.length)]} ${MidName[Math.floor(Math.random() * MidName.length)]} ${LastName[Math.floor(Math.random() * LastName.length)]}`
    const {data} = await Api.post('/usuarios/create',{
      data: new Date(),
      status: true,
      perfil: "GERENTE",
      endereco: "Pedreiras Ma",
      comissao: 0,
      nome: name,
      email: `${name}`.toLowerCase().replace(/\s/ig,'.') + '@flashday.com',
      senha: "123123",
      telefone: `(${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}) ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
  });
  } catch (error) {
    alert('ERRO')
  }
}

const geradorDeVendedores= async () => {
  try {
    let name = `${FristName[Math.floor(Math.random() * FristName.length)]} ${MidName[Math.floor(Math.random() * MidName.length)]} ${LastName[Math.floor(Math.random() * LastName.length)]}`
    const response = await Api.post('/usuarios/gerentes');
    const tutorId = response.data[Math.floor(Math.random() * response.data.length)]
    const {data} = await Api.post('/usuarios/create',{
      data: new Date(),
      status: true,
      perfil: "VENDEDOR",
      endereco: "Pedreiras Ma",
      comissao: 0,
      nome: name,
      email: `${name}`.toLowerCase().replace(/\s/ig,'.') + '@flashday.com',
      senha: "123123",
      telefone: `(${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}) ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`,
      tutorId: tutorId
  });
  } catch (error) {
    alert('ERRO')
  }
}

const geradorDeSerieGerente= async () => {
  try {
    const response = await Api.post('/usuarios/gerentes');
    const manager = response.data[Math.floor(Math.random() * response.data.length)];
    const body = {gerenteId: manager._id, tamanhoInicial: 500, tipo: 'GERENTE'}
    const {data} = await Api.post('/series/create',body)
  } catch (error) {
    alert('ERRO')
  }
}

const geradorDeSerieVendedor  = async () => {
  try {
    const response = await Api.post('/usuarios/vendedores',{perfil: ''});
    const seller = response.data[Math.floor(Math.random() * response.data.length)];
    const body = {clienteNome: `${FristName[Math.floor(Math.random() * FristName.length)]} ${MidName[Math.floor(Math.random() * MidName.length)]} ${LastName[Math.floor(Math.random() * LastName.length)]}`, 
      data: new Date(), status: true, gerenteId: seller.tutorId, vendedorId: seller, tamanhoInicial: 5}
    const {data} = await Api.post('/series/create',{...body})
    console.log(data)
  } catch (error) {
    console.log('ERRO')
  }
}



  return (
    <Container>

    </Container>)
}
const {styled}  = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  marging: 0,
  width: '100%',
  height: '76vh'
});


export default Teste;