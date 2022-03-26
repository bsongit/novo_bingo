import {Autocomplete, Box, ListSubheader, Modal, TextField, Typography} from '@mui/material';
import { createStitches} from '@stitches/react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList';
import { ChangeEvent, useEffect, useState } from 'react';
import UserModel from '../models/UserModel';
import { IMaskInput } from 'react-imask';
import OrderModel from '../models/OrderModel';
import format from 'date-fns/format';
import GenericTable from '../components/GenericTable';
import { readAllSellers } from '../services/UserService';
import { adminCreateOrder, disableOrder, readAllActiveOrders, readTicketList } from '../services/OrderService';
import { getSession } from '../utils/SessionHandler';
import Ticket from '../components/Ticket';

interface Cartela {
  clienteNome: string;
  cartelaCodigo:  string;
  vendedorId: string;
  data: Date;
}

function Orders() {

  useEffect(() => {
    getSellersList()
    getOrdersList()
  } , []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPreview, setOpenPreview] = useState(false);
  const handleOpenPreview = () => setOpenPreview(true);
  const handleClosePreview = () => setOpenPreview(false);
  const [sellerList, setSellerList] = useState<UserModel[]>([]);
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderModel[]>([]);
  const [searchCode, setSearchCode] = useState<string>('');
  const [cartela, setCartela] = useState<Cartela>({
    clienteNome: '',
    cartelaCodigo: '',
    vendedorId: '',
    data: new Date()
  });
  const [tickets, setTickets] = useState<any[]>([]);

  const handlerChangeFilter =  (event : any, obj : any ) => {
    setCartela({...cartela, vendedorId: obj.item._id})
    console.clear()
    console.log(cartela)
   }
 

   const handlerChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    setCartela({...cartela,[e.target.name] : e.target.value});
    console.clear()
    console.log(cartela)
  }

  const handlerChangeCode = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {  
    setSearchCode(e.target.value)
  }

  const getSellersList = async () => {
    const result = await readAllSellers();
    setSellerList(result)
  }

  const getOrdersList = async () => {
    const result = await readAllActiveOrders();
    setOrders(result)
    setFilteredOrders(result);
  }

  
  const getTicketList = async (_id : string) => {
    const result = await readTicketList(_id);
    console.log(result)
    setTickets(result)
  }

  const submitOrder = async () => {adminCreateOrder(cartela)}

  const setDisableToOrder = async (e: any) => {disableOrder(e.target.accessKey)}

  const findCode = () => {
    let arrCartelas: OrderModel[] = []
    orders.map(item => {
      if(item.codigo.includes(searchCode.toUpperCase())){
        arrCartelas.push(item)
      }
    })
    arrCartelas.length > 0? setFilteredOrders(arrCartelas) : setFilteredOrders(orders)
  }

  const submitCartela = async () => {
    if(cartela.cartelaCodigo.length <= 0){
      alert("Você inserir um código válido de cartela.")
      return;
    }
    else if(cartela.clienteNome.length <= 2){
      alert("Nome de cliente inválido!")
      return;
    }
    else if(cartela.vendedorId.length <= 10){
      alert("Escolha um vendedor!")
      return;
    }
    else{
      submitOrder()
    }
  
  }

  const parseListToAutoComplete = (data : UserModel[]) => {
    let autoComplete: Object[] = [];
    data.map(item => {
      autoComplete.push({
        label: item.nome, item
      })
    })
    return autoComplete;
  }

  const seeTicketlist = (e : any) => {
    getTicketList(e.target.accessKey)
    handleOpenPreview()
  }

  const parseListToTable = (data : OrderModel[]) => {
    let table: Object[] = [];
    data.map((item,index) => {
      table.push({
        data:  format(new Date(item.data),'dd/MM/yyyy'), 
        codigo: item.codigo, 
        vendedorName: item.vendedorId?.nome || 'carregando...',
        cartelas: item.listaCartelasId.length, 
        valor: item.listaCartelasId.length * item.valorCadaCartela,
        btnPreview : <button accessKey={item._id} onClick={seeTicketlist} >Visualizar</button>,
        btnRemove : <button accessKey={item._id} onClick={setDisableToOrder}>REMOVER</button>
    })
  })
    return table;
}



const tableOrderLabel =
[
    {id: 'data', label: 'Data', minWidth: 128 },
    {id: 'codigo', label: 'Código', minWidth: 128 },
    {id: 'vendedorName', label: 'Vendedor', minWidth: 128 },
    {id: 'cartelas', label: 'Nº Cartelas', minWidth: 128 },
    {id: 'valor', label: 'Valor do pedido', minWidth: 128 },
    {id: 'btnPreview', label: 'Visualizar', minWidth: 128 },
    {id: 'btnRemove', label: 'Remover', minWidth: 128 }
]

  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Criar pedido.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Insira uma cartela que não esteja vendida ainda.
          </Typography>
          
          <Row  css={{marginTop: 24 }}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(event, item) => handlerChangeFilter(event,item)}
            options={parseListToAutoComplete(sellerList)}
            sx={{width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Vendedor" />}
          />
            <InputTxMask
              onChange={handlerChange}
              name="clienteNome"
              mask="###########################"
              placeholder='Nome do cliente'
              definitions={{
                '#': /\D/,
              }}
              overwrite
            />
            <InputTxMask
              onChange={handlerChange}
              name="cartelaCodigo"
              mask="#00000-0"
              placeholder='999999-9'
              definitions={{
                '#': /[1-9]/,
              }}
              overwrite
            />
          <Button css={{marginLeft: 5}}  onClick={submitCartela}>Criar</Button>
          </Row>
        </Box>
      </Modal>
       <Modal
        open={openPreview}
        onClose={handleClosePreview}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detalhes do pedido.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Visualizando cartelas contidas no pedido.
          </Typography>
          
          <Row  css={{marginTop: 24, flexWrap: 'nowrap', overflowX: 'scroll' }}>
            {tickets.map(ticket => <Ticket ticket={ticket}/>)}
          </Row>
        </Box>
      </Modal>
        <SideBar backgroundColor="white" title="Gerenciamento de pedidos" secondaryListItems={menuList}>
          <Container>
               <Row>
                 <MyTextField label="Pedido código / Cartela código"  onChange={handlerChangeCode} name="searchCode"/>
                 <Button onClick={findCode}>BUSCAR</Button>
                 <Button css={getSession().perfil == 'GERENTE'? {display: 'none'} : {marginLeft: '60%'}} color="success" onClick={handleOpen} >CRIAR PEDIDO</Button>
                 </Row>
                <GenericTable Labels={tableOrderLabel} list={parseListToTable(filteredOrders)}/>
              </Container>
        </SideBar>
    </Container>)
}


const menuList = (
  <div>
    <ListSubheader  sx={{backgroundColor : 'transparent', color:'#64a0fa', fontWeight: 'bold'}} inset>{getSession().nome}</ListSubheader>
    {menuArray}
  </div>
);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1024,
  height: 512,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



const {styled, css}  = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});

const InputTxMask = styled(IMaskInput, {
  marginTop: '32px',
  width: '100%',
  height: '58px',
  borderRadius: '3px',
  border: '1px solid #bfbfbf',
  paddingLeft: 12,
  color: 'gray',
  fontSize: '15px',
  '@bp1': {
    width: '100%'
  },
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margging: 0,
  width: '100%',
  height: '100vh'
});

const MyTextField = styled(TextField, {
  marginTop: '12px !important',
  marginLeft: '6px',
  backgroundColor: 'white',
  '@bp1': {
    width:'100%'
  }
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  margging: 0,
  width: '100%',
  flexWrap: 'wrap',
  '@bp1': {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Button = styled('button', {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  padding: '12px 24px',
  fontSize: 14,
  borderRadius: 4,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#228aff',
  color: 'white',
  width: 160,
  height: 'auto',
  textDecoration: 'none',
  fontWeight: '400',
  marginTop: '12px',
  marginLeft: '6px',
  '@bp1': {
    width: '100%',
    marginLeft: '0 !important',
    marginTop: 12
  },

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});


export default Orders