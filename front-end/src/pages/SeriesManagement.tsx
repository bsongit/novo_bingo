import { Autocomplete, Box, FormControl, InputLabel, ListSubheader, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import SideBar from '../components/SideBars';
import {menuArray} from '../components/ProfileMenuList';
import { createStitches} from '@stitches/react';
import SerieModel from '../models/SerieModel';
import UserModel from '../models/UserModel';
import GenericTable from '../components/GenericTable';
import { createSeries, readAllManagerSeries, readAllSellerSeries } from '../services/SeriesService';
import { readAllManagers, readAllSellers } from '../services/UserService';
import { getSession } from '../utils/SessionHandler';
import { ticketSomatory } from '../utils/Utils';



function SeriesManagement() {

  useEffect(() => {
    getCollaboratorList()
    getCollaboratorSeries()
    if(getSession().perfil == 'GERENTE')
      getManagerSeries()
  } , []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [collaboratorList, setCollaboratorList] = useState<UserModel[]>([]);
  const [form, setForm] = useState<SerieModel>(
    {
      data: new Date(),
      status: true,
      tamanhoInicial: 0,
      gerenteId: undefined,
      numero: 0,
      printNumber: 0,
      tipo: getSession().perfil == 'GERENTE'? 'VENDEDOR' : 'GERENTE'
    }
  );
  const [seriesList, setSeriesList] = useState<SerieModel[]>([]);
  const [seriesListFiltered, setSeriesListFiltered] = useState<SerieModel[]>([]);
  const [managerSeriesList, setManagerSeriesList] = useState<SerieModel[]>([]);
  
  const handlerChangeManager= (event : any, value : any ) => {
    getSession().perfil == 'GERENTE'? setForm({...form, vendedorId:  value.item._id, gerenteId: getSession()._id as any})  : setForm({...form, gerenteId:  value.item._id})
   }

  const handlerChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> ) => {  
    setForm({...form,[e.target.name] : 
      isNaN(parseFloat(e.target.value))? e.target.value : parseFloat(e.target.value)
    });
    console.clear()
    console.log(form)
  }

  const handlerChangeFilter = (event : any, value : any ) => {
    if(value){
      var list : SerieModel[] = []
      seriesList.map(item => {
        if(item.gerenteId?.nome == value.label){
          list.push(item)
        }
        else  if(item.vendedorId?.nome == value.label){
          list.push(item)
        }
      })
      setSeriesListFiltered(list)
    }
    else {
      setSeriesListFiltered(seriesList);
      event.target.value = ''
    }
   }

  const submitForm = async () => {
    if(form.tamanhoInicial <= 0){
      alert("Você deve selecionar um tamanho de série!")
      return;
    }
    else if(form.gerenteId == undefined){
      alert("Você deve selecionar um gerente!")
      return;
    }
    else{
      submitSeries()
    }
  }

  const submitSeries = async () => {createSeries(form)}

  const getCollaboratorList= async () => {
    const result = getSession().perfil == 'GERENTE'? await readAllSellers() :  await readAllManagers()
    setCollaboratorList(result)
  }

  const getCollaboratorSeries= async () => {
    const result = getSession().perfil == 'GERENTE'? await readAllSellerSeries() : await readAllManagerSeries();
    setSeriesList(result)
    setSeriesListFiltered(result)
  }

  const getManagerSeries= async () => {
    const result =  await readAllManagerSeries();
    setManagerSeriesList(result)
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

  const parseSerieListToTable = (data : SerieModel[]) => {
    let table: Object[] = [];
    data.map(item => {
      table.push(
        {
        vendedorNome: item.vendedorId?.nome || '???????????', 
        gerenteNome: item.gerenteId?.nome, 
        numero : item.numero , 
        tamanhoInicial : item.tamanhoInicial,  
        tamanhoAtual: item.listaCartelasId?.length,  
        printedNumber: item.printNumber
        }
      )
    })
    return table;
  }

  const tableSeriesMLabel =
[
    {id: 'vendedorNome', label: 'Vendedor', minWidth: 170 },
    {id: 'gerenteNome', label: 'Gerente', minWidth: 170 },
    {id: 'numero', label: 'Numero de série', minWidth: 64 },
    {id: 'tamanhoInicial', label: 'Tamanho inicial', minWidth: 64 },
    {id: 'tamanhoAtual', label: 'Tamanho atual', minWidth: 64 },
    {id: 'printedNumber', label: 'X vezes impressa', minWidth: 64 },
]

const selectorArrayItems = getSession().perfil == 'GERENTE'? 
[<MenuItem value={10}>10</MenuItem>,
  <MenuItem value={25}>25</MenuItem>,
  <MenuItem value={50}>50</MenuItem>,
  <MenuItem value={100}>100</MenuItem>] :
[<MenuItem value={100}>100</MenuItem>,
  <MenuItem value={500}>500</MenuItem>,
  <MenuItem value={1000}>1000</MenuItem>]
   


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
            Criar série para gerencia.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            O numero de cartelas deve ser baseado na eficiencia do gerente.
          </Typography>
          
          <Row  css={{marginTop: 24 }}>
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={handlerChangeManager}
            options={parseListToAutoComplete(collaboratorList)}
            sx={{width: '100%' }}
            renderInput={(params) => <TextField {...params} label={getSession().perfil == 'GERENTE'? 'Vendedores' : 'Gerentes'}  />}
          />
          <FormControl sx={{width: '190px' , m: 1}}>
            <InputLabel id="demo-simple-select-label">Quantidade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quantidade"
              name="tamanhoInicial"
              onChange={handlerChange}
            >
            {selectorArrayItems}
        </Select>
      </FormControl>
            <Button css={{marginLeft: 5}}  onClick={submitForm}>Criar</Button>
          </Row>
        </Box>
      </Modal>
        <SideBar backgroundColor="none" title={getSession().perfil == 'GERENTE'? `Você possui um banco de : ${String(ticketSomatory(managerSeriesList))} cartelas ` : "Gerenciamento de séries"} secondaryListItems={menuList}>
        <Container>
            <Row css={{justifyContent: 'flex-end'}}>
                <Autocomplete
                disablePortal
                id="search-collaborator"
                onChange={(event, value) => handlerChangeFilter(event,value)}
                options={parseListToAutoComplete(collaboratorList)}
                sx={{width: '100%',
                   backgroundColor: 'white'
                   }}
                renderInput={(params) => <TextField {...params} label={getSession().perfil == 'GERENTE'? 'Vendedores' : 'Gerentes'} />}
              />
              <Button onClick={handleOpen}>Criar série</Button>
              </Row>
            <GenericTable Labels={tableSeriesMLabel} list={parseSerieListToTable(seriesListFiltered)}/>
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
  margging: 0,
  width: '100%',
  height: '100vh'
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  margging: 0,
  width: '100%',
  alignItems: 'center',
    '@bp1': {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
    paddingRight: 32,
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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 360,
  borderRadius: 2,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default SeriesManagement