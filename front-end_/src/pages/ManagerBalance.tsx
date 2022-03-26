import { Autocomplete, Box, ListSubheader, Modal, TextField, Typography} from '@mui/material';
import { createStitches} from '@stitches/react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList';
import {useEffect, useState} from 'react'
import UserProfile from '../components/UserProfile';
import UserModel from '../models/UserModel'
import GenericTable from '../components/GenericTable';
import { readAllManagers } from '../services/UserService';
import { getSession } from '../utils/SessionHandler';


function ManagerBalance() {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [list, setList] = useState<UserModel[]>([]);
  const [filteredList, setfilteredList] = useState<UserModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserModel>({});

  useEffect(() => {getManagersList()} , []);

  const handlerChangeFilter = (event : any, value : any ) => {
   setfilteredList([value.item])
  }

  const getManagersList= async () => {
    const result = await readAllManagers();
    setList(result)
    setfilteredList(result)
  }

  const parseListToTable = (data : UserModel[]) => {
    let table: Object[] = [];
    data.map((item,index) => {
      table.push({...item,
        editBtn: <button accessKey={`${list.indexOf(item)}`} onClick={editUserMode}>Editar</button> })
    })
    return table;
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

  const editUserMode = (e : any) : void => {
    setOpen(true);
    setSelectedUser(list[e.target.accessKey])
  }
  const createUserMode = (e : any) : void => {
    setOpen(true);
    setSelectedUser({perfil: 'GERENTE'})
  }

  const tableMBLabel =
[
    {id: 'nome', label: 'Gerente', minWidth: 128 },
    {id: 'telefone', label: 'Telefone', minWidth: 128 },
    {id: 'endereco', label: 'Regional', minWidth: 128 },
    {id: 'cartelas', label: 'Nº Cartelas', minWidth: 64 },
    {id: 'faturado', label: 'Faturado', minWidth: 64 },
    {id: 'comissao', label: 'Comissões', minWidth: 64 },
    {id: 'editBtn', label: 'Editar', minWidth: 64 }
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
            Conta tipo gerencia.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Adicione ou edite  informações de gerente.
          </Typography>
          
          <Row >
              <UserProfile _userForm={selectedUser}></UserProfile>
          </Row>
        </Box>
      </Modal>
        <SideBar backgroundColor="white" title="Caixa dos gerentes" secondaryListItems={menuList}>
          <Container>
            <Row>
              <MyAutocomplete
                disablePortal
                selectOnFocus
                onChange={(event, value) => handlerChangeFilter(event,value)}
                id="search-gerente"
                options={parseListToAutoComplete(list)}
                renderInput={(params) => <TextField {...params} label="Gerentes"/>}
              />
                <Button color="success" onClick={createUserMode}>Novo gerente</Button>
              </Row>
              <GenericTable Labels={tableMBLabel} list={parseListToTable(filteredList)}/>
              </Container>
        </SideBar>
    </Container>)
}


const menuList = (
  <div>
    <ListSubheader  sx={{backgroundColor : 'transparent',color:'#64a0fa', fontWeight: 'bold'}} inset>{getSession().nome}</ListSubheader>
    {menuArray}
  </div>
);

const {styled, css}  = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 512,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};




const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margging: 0,
  width: '100%',
  height: '100vh'
});


const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margging: 0,
  width: '100%',
  flexWrap: 'wrap',
  '@bp1': {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const MyAutocomplete = styled(Autocomplete, {
  width: '50%',
  backgroundColor: 'white',
  '@bp1': {
    width: '100%'
  },
});



const Button = styled('button', {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  padding: '12px 24px',
  fontSize: 18,
  borderRadius: 4,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#228aff',
  color: 'white',
  width: 256,
  height: '100%',
  textDecoration: 'none',
  fontWeight: '400',
  '@bp1': {
    width: '100%',
    marginTop: 12
  },

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});

export default ManagerBalance