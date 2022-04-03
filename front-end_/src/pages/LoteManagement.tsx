import {Box, Divider, FormControl, InputAdornment, InputLabel, ListSubheader, MenuItem, OutlinedInput, TextField, TextFieldProps} from '@mui/material';
import { ChangeEvent } from 'react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList';
import { createStitches} from '@stitches/react';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR'
import {useEffect, useState} from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LinearProgress from '@mui/material/LinearProgress';
import IntervalModel from '../models/IntervalModel';
import format from 'date-fns/format';
import GenericTable from '../components/GenericTable';
import { createLote } from '../services/LoteService';
import { createInterval, readAllIntervals, readCurrentInterval } from '../services/IntervalService';
import { updateParams } from '../services/ParameterService';
import { getSession } from '../utils/SessionHandler';

interface Form {
  qtdCartelas: number,
  data : Date,
  value: number
}

function LoteManagement() {
  useEffect(() => {
    getCurrentInterval()
    getIntervalList()
  } , []);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [intervalList, setIntervalList] = useState<IntervalModel[]>([]);
  const [isDisabledElements, setDisabled] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    qtdCartelas: 0,
    data : new Date(9,9,2009),
    value: 0
  });



  const handlerChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> ) => {  
    setForm({...form,[e.target.name] : 
      isNaN(parseFloat(e.target.value))? e.target.value : parseFloat(e.target.value)
    });
    console.clear()
    console.log(form)
  }

  const handlerChangeData = (date: unknown, keyboardInputValue?: string | undefined) => {  
    setForm({...form, data: date as Date });
    console.clear()
    console.log(form)
  }

  const parseIntervalToTable = (list : IntervalModel[]) : Object[] => {
    let newList : Object[] = []
    list.map(item => {
      newList.push({dataInicial: format(new Date(item.dataInicial),'dd/MM/yyyy'), tamanhoInicial: item.qtdGerada, tamanhoAtual: 0, dataFinal: item.dataFinal || '????'})
    })
    return newList;
  }


  const submitLote = async () => {createLote(form)}

  const submitInterval = async () => {createInterval(form)}

  const updateTicketValue = async () => {
    const result = await updateParams({valorCartelaAtual : form.value});
    if(result){
      setLoading(false)
      setDisabled(true)
    }
  }

  const getCurrentInterval = async () => {
    const result = await readCurrentInterval();
    result? setDisabled(true) : setDisabled(false) 
  }

  const getIntervalList = async () => {
    const result = await readAllIntervals();
    setIntervalList(result);
  }

  const onSubmitForm = () => {
    if(form.qtdCartelas <= 0){
      alert('Escolha uma quantidade para ser gerada!');
      return;
    }
    else if(form.data == new Date(9,9,2009) ){
      alert('Escolha uma data valida para o sorteio!');
      return;
    }
    else if(form.value <= 0){
      alert('Escolha um valor valido para cartelas!');
      return;
    }
      submitInterval()
      updateTicketValue()
      submitLote() 
      setLoading(true)
      return;
  }

  const tableLoteLabel =
    [
        {id: 'dataInicial', label: 'Data inicial', minWidth: 170 },
        {id: 'tamanhoInicial', label: 'Tamanho inicial', minWidth: 170 },
        {id: 'tamanhoAtual', label: 'Tamanho atual', minWidth: 170 },
        {id: 'dataFinal', label: 'Data final', minWidth: 170 }
    ]

  return (
    <Container >

        <SideBar backgroundColor="none" title="Gerenciamento do Lote atual" secondaryListItems={menuList}>
              <Container>
              {isLoading?  <Box sx={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 6000,
                padding: '25%',
                alignItems: 'center',
                backgroundColor: 'rgba(1,1,1,0.3)',
              }}>
                    <LinearProgress  />
                </Box> : ''}

            <Row >
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
              <DatePicker
                disabled={isDisabledElements}
                label="Data do sorteio"
                onChange={handlerChangeData}
                value={form.data}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField sx={{ backgroundColor: 'white', width :'256px' }} {...params} />}/>
            </LocalizationProvider>
            <FormControl sx={{width: '256px' , m: 1}}>
        <InputLabel id="demo-simple-select-label">Quantidade</InputLabel>
            <Select
              disabled={isDisabledElements}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Quantidade"
              name="qtdCartelas"
              onChange={handlerChange}
            >
          <MenuItem value={10000}>10.000</MenuItem>
          <MenuItem value={50000}>50.000</MenuItem>
          <MenuItem value={100000}>100.000</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{width: '256px' , m: 1}}>
          <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
          <OutlinedInput
            disabled={isDisabledElements}
            name="value"
            onChange={handlerChange}
            type='number'
            inputMode='numeric'
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment  position="start">R$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
            <Button  color={isDisabledElements? 'danger': 'success'} disabled={isDisabledElements} css={{marginLeft: 5}}  onClick={onSubmitForm}>{isDisabledElements? 'Cancelar Lote' : 'Criar Lote'}</Button>
            </Row>
            <Divider sx={{marginTop: 5}} variant="middle" />
            <GenericTable Labels={tableLoteLabel} list={parseIntervalToTable(intervalList)}/>

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

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  width: '100%',
  height: '100vh'
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
  margin: 0,
  marginTop: 20,
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
  padding: '18px 24px',
  fontSize: 16,
  borderRadius: 4,
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#228aff',
  color: 'white',
  width: 190,
  textDecoration: 'none',
  fontWeight: '400',
  '@bp1': {
    width: '256px',
    marginTop: 12
  },

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});

export default LoteManagement