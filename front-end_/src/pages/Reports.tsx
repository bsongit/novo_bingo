import { Autocomplete, ListSubheader, TextField} from '@mui/material';
import { createStitches} from '@stitches/react';
import GenericTable from '../components/GenericTable';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList'
import { getSession } from '../utils/SessionHandler';
import { groupOrderByClient, groupOrderByManager, groupOrderBySeller, ticketSomatory } from '../utils/Utils';
import { useEffect, useState } from 'react';
import { readAllManagers, readAllSellers } from '../services/UserService';
import UserModel from '../models/UserModel';
import IntervalModel from '../models/IntervalModel';
import { readAllIntervals } from '../services/IntervalService';
import format from 'date-fns/format';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { readAllActiveOrders, readOrdersByInterval } from '../services/OrderService';
import OrderModel from '../models/OrderModel';
import { readLimitedParams } from '../services/ParameterService';
import ParamsModel from '../models/ParamsModel';

interface Information{
  gerenteNome? : string;
  vendedorNome? : string;
  clienteNome? : string;
  cartelas?: number; 
  faturado?: number;
  comissaoVendedores?: number;
  comissaoGerentes?: number;
  comissaoGerente?: number;
  premios?: number;
  saldoFinal?: number;
}


function Reports() {

  const [tableReportLabel, setTableReportLabel] = useState<Object[]>(
    [
      {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
      {id: 'faturado', label: 'Faturado', minWidth: 96 },
      {id: 'comissaoVendedores', label: 'Comissão de vendedores', minWidth: 96 },
      {id: 'comissaoGerentes', label: 'Comissão de gerentes', minWidth: 96 },
      {id: 'premios', label: 'Total em premios', minWidth: 96 },
      {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
  ]  
  )

  const [tableReportMLabel, setTableReportMLabel] = useState<Object[]>(
    [
      {id: 'gerenteNome', label: 'Gerente', minWidth: 96 },
      {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
      {id: 'faturado', label: 'Faturado', minWidth: 96 },
      {id: 'comissaoGerente', label: 'Comissão do gerente', minWidth: 96 },
      {id: 'comissaoVendedores', label: 'Comissão dos vendedores', minWidth: 96 },
      {id: 'premios', label: 'Total em premios', minWidth: 96 },
      {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
    ]
  )
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [geralInformations, setGeralInformations] = useState<Information>({
    cartelas: 0, 
    faturado: 0,
    comissaoVendedores: 0,
    comissaoGerentes: 0,
    premios: 0,
    saldoFinal: 0
  }
  );

  const [detailInformationsList, setDetailInformationsList] = useState<Information[]>([{
    gerenteNome: 'Deafult',
    vendedorNome: 'Default',
    clienteNome: 'Default',
    cartelas: 0, 
    faturado: 0,
    comissaoVendedores: 0,
    comissaoGerentes: 0,
    comissaoGerente: 0,
    premios: 0,
    saldoFinal: 0
  }]
  );
  const [params, setParams] = useState<ParamsModel>({
    baseComissaoGerente: 0,
    baseComissaoVendedor: 0,
    valorCartelaAtual: 0,
    valorLinha:  0,
    valorColuna:  0,
    valorCruz:  0,
    valorCantos:  0,
    valorCheia:  0,
    valorL:  0,
    valorX:  0,
    valorJanelinha:  0,
    valorJanelao:  0,
    valorGiro:  0,
    valorSuperGiro:  0,
  });

  const [managerList, setManagerList] = useState<UserModel[]>([]);
  const [sellerList, setSellerList] = useState<UserModel[]>([]);

  const [selectedManager, setSelectedManager] = useState<any>(getSession().perfil == 'GERENTE' ? getSession() : getSession().perfil == 'VENDEDOR' ? {_id: getSession().tutorId} : undefined);
  const [selectedSeller, setSelectedSeller] = useState<any>(getSession().perfil == 'VENDEDOR' ? getSession() : undefined);;

  const [intervalList, setIntervalList] = useState<IntervalModel[]>([]);
  const [selectedInterval, setSelectedInterval] = useState<IntervalModel>();

  useEffect(() => {
    getParams()
    getManagersList()
    getSellerList()
    getIntervalList()
  } , []);

  const parseMyTableBalance = () => {
    const cartelas = ticketSomatory(orders);
    return {
      pedidos: orders.length,
      cartelas: cartelas,
      faturado: 0,
      comissao: 0,
      valorPrestado: 0
    }
  }

  const handlerChangeFilterManager = (event : any, value : any ) => {
    setSelectedManager(value.item)
    console.clear()
    console.log(value.item)
   }
  const handlerChangeFilterSeller = (event : any, value : any ) => {
    setSelectedSeller(value.item)
    console.clear()
    console.log(value.item)
   }
   const handlerChangeFilterInterval = (event : any, value : any ) => {
    setSelectedInterval(value.item)
    console.clear()
    console.log(value.item)
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

  const parseACInterval = (data : IntervalModel[]) => {
    let autoComplete: Object[] = [];
    data.map(item => {
      autoComplete.push({
        label: `${format(new Date(item.dataInicial),'dd/MM/yyyy')} => ${item.dataFinal ? format(new Date(item.dataFinal),'dd/MM/yyyy') : '...em aberto'} `, item
      })
    })
    return autoComplete;
  }
  
  const getParams= async () => {
    const result = await readLimitedParams();
    setParams(result)
  }


  const getManagersList= async () => {
    const result = await readAllManagers();
    setManagerList(result)
  }

  const getSellerList= async () => {
    const result = await readAllSellers();
    setSellerList(result)
  }

  const getIntervalList = async () => {
    const result = await readAllIntervals();
    setIntervalList(result);
  }

  const getOrdersListByInterval = async () => {
    const result = await readOrdersByInterval({
      gerenteId : selectedManager?._id, 
      vendedorId: selectedSeller?._id, 
      dataInicial : selectedInterval?.dataInicial, 
      dataFinal: selectedInterval?.dataFinal
    });
    return result;
  }

  const generateReport = async () => {

    if(!selectedInterval)
      {
        alert('Você precisa selecionar algum intervalo');
        return;
      }

    const intervalOrders = await getOrdersListByInterval();
    const ticketSum = ticketSomatory(intervalOrders)
    let detailInfoList : Information[] = [];
    setGeralInformations( {
      cartelas: ticketSum, 
      faturado: ticketSum * params.valorCartelaAtual, 
      comissaoVendedores: ticketSum * params.baseComissaoVendedor,
      comissaoGerentes: ticketSum * params.baseComissaoGerente,
      premios: 0,
      saldoFinal: 0
    })

    if(selectedInterval && !selectedManager && !selectedSeller){
      setTableReportLabel(
        [
          {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
          {id: 'faturado', label: 'Faturado', minWidth: 96 },
          {id: 'comissaoVendedores', label: 'Comissão de vendedores', minWidth: 96 },
          {id: 'comissaoGerentes', label: 'Comissão dos gerentes', minWidth: 96 },
          {id: 'premios', label: 'Total em premios', minWidth: 96 },
          {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
      ]  
    ) 
      setTableReportMLabel([
        {id: 'gerenteNome', label: 'Gerente', minWidth: 96 },
        {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
        {id: 'faturado', label: 'Faturado', minWidth: 96 },
        {id: 'comissaoGerente', label: 'Comissão do gerente', minWidth: 96 },
        {id: 'comissaoVendedores', label: 'Comissão dos vendedores', minWidth: 96 },
        {id: 'premios', label: 'Total em premios', minWidth: 96 },
        {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
      ])
      groupOrderByManager(intervalOrders).map(managerOrders => {
        let defailtTicketSum = ticketSomatory(managerOrders)
        detailInfoList.push({
          gerenteNome: managerOrders[0].gerenteId.nome,
          cartelas: defailtTicketSum, 
          faturado: defailtTicketSum * params.valorCartelaAtual, 
          comissaoVendedores: defailtTicketSum * params.baseComissaoVendedor,
          comissaoGerente: defailtTicketSum * params.baseComissaoGerente,
          premios: 0,
          saldoFinal: 0
        })
       })
       setDetailInformationsList(detailInfoList)  
    }
    else if(selectedInterval && selectedManager  && !selectedSeller){
      setTableReportLabel([
        {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
        {id: 'faturado', label: 'Faturado', minWidth: 96 },
        {id: 'comissaoVendedores', label: 'Comissão dos vendedores', minWidth: 96 },
        {id: 'comissaoGerentes', label: 'Comissão do gerente', minWidth: 96 },
        {id: 'premios', label: 'Total em premios', minWidth: 96 },
        {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
    ]) 
      setTableReportMLabel([
        {id: 'vendedorNome', label: 'Vendedor', minWidth: 96 },
        {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
        {id: 'faturado', label: 'Faturado', minWidth: 96 },
        {id: 'comissaoGerente', label: 'Comissão do gerente', minWidth: 96 },
        {id: 'comissaoVendedores', label: 'Comissão dos vendedores', minWidth: 96 },
        {id: 'premios', label: 'Total em premios', minWidth: 96 },
        {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
      ])
      groupOrderBySeller(intervalOrders).map(sellerOrders => {
        let defailtTicketSum = ticketSomatory(sellerOrders)
        detailInfoList.push({
          vendedorNome: sellerOrders[0].vendedorId.nome,
          cartelas: defailtTicketSum, 
          faturado: defailtTicketSum * params.valorCartelaAtual, 
          comissaoVendedores: defailtTicketSum * params.baseComissaoVendedor,
          comissaoGerente: defailtTicketSum * params.baseComissaoGerente,
          premios: 0,
          saldoFinal: 0
        })
       })
       setDetailInformationsList(detailInfoList)  
    }
    else if(selectedInterval && selectedManager && selectedSeller){
      setTableReportLabel([
        {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
        {id: 'faturado', label: 'Faturado', minWidth: 96 },
        {id: 'comissaoVendedores', label: 'Comissão do vendedor', minWidth: 96 },
        {id: 'comissaoGerentes', label: 'Comissão do gerente', minWidth: 96 },
        {id: 'premios', label: 'Total em premios', minWidth: 96 },
        {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
    ]) 
      setTableReportMLabel([
        {id: 'clienteNome', label: 'Cliente', minWidth: 96 },
        {id: 'cartelas', label: 'Nº Cartelas', minWidth: 96 },
        {id: 'faturado', label: 'Faturado', minWidth: 96 },
        {id: 'comissaoGerente', label: 'Comissão do gerente', minWidth: 96 },
        {id: 'comissaoVendedores', label: 'Comissão do vendedor', minWidth: 96 },
        {id: 'premios', label: 'Total em premios', minWidth: 96 },
        {id: 'saldoFinal', label: 'Saldo final', minWidth: 96 }
      ])
      groupOrderByClient(intervalOrders).map(clientOrders => {
        let defailtTicketSum = ticketSomatory(clientOrders)
        detailInfoList.push({
          clienteNome: clientOrders[0].clienteNome,
          cartelas: defailtTicketSum, 
          faturado: defailtTicketSum * params.valorCartelaAtual, 
          comissaoVendedores: defailtTicketSum * params.baseComissaoVendedor,
          comissaoGerente: defailtTicketSum * params.baseComissaoGerente,
          premios: 0,
          saldoFinal: 0
        })
       })
       setDetailInformationsList(detailInfoList)  
    }
  }
  
  return (
    <Container>
        <SideBar backgroundColor="white" title="Visualização de relatórios" secondaryListItems={menuList}>
        <Container>
            <Row>
               <MyAutoComplete
                    disablePortal
                    id="search-intervalo"
                    onChange={(event, value) => handlerChangeFilterInterval(event,value)}
                    options={parseACInterval(intervalList)}
                    renderInput={(params) => <TextField {...params} label="Intervalos" />}
                  />
                <MyAutoComplete
                    sx={getSession().perfil == 'GERENTE' || getSession().perfil == 'VENDEDOR' ? {display: 'none'} : {}}
                    disablePortal
                    id="search-gerente"
                    onChange={(event, value) => handlerChangeFilterManager(event,value)}
                    options={parseListToAutoComplete(managerList)}
                    renderInput={(params) => <TextField {...params} label="Gerente" />}
                  />
                  <MyAutoComplete
                    sx={getSession().perfil == 'VENDEDOR' ? {display: 'none'} : {}}
                    disablePortal
                    id="search-vendedor"
                    onChange={(event, value) => handlerChangeFilterSeller(event,value)}
                    options={parseListToAutoComplete(sellerList)}
                    renderInput={(params) => <TextField {...params} label="Vendedor" />}
                  />
                  <Button onClick={generateReport}>GERAR RELATÓRIO</Button>
                </Row>
                <GenericTable Labels={tableReportLabel} list={[geralInformations]}/>
                <GenericTable Labels={tableReportMLabel}list={detailInformationsList}/>
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
  marging: 0,
  width: '100%',
  height: '100vh'
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

const MyAutoComplete = styled(Autocomplete, {
  width: '25%',
  marginTop: '12px',
  marginLeft: '6px',
  backgroundColor: 'white',
  '@bp1': {
    width:'100%'
  }
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
  width: 128,
  height: 'auto',
  textDecoration: 'none',
  fontWeight: '400',
  marginTop: '12px',
  marginLeft: '6px',
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

export default Reports;