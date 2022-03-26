import {ListSubheader} from '@mui/material';
import { createStitches} from '@stitches/react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList'
import { getSession } from '../utils/SessionHandler';
import ParamsModel from '../models/ParamsModel';
import { useEffect, useState } from 'react';
import { readLimitedParams, updateParams } from '../services/ParameterService';
import { listAllValidOrdersPopulated } from '../services/OrderService';
import OrderModel from '../models/OrderModel';
import { lineOrderMarkers } from '../utils/RaffleMethods';

function Raffle() {
  // NOTA O MAILSON DEVE ARRUMAR O TAMANHO DA FONTE ATRAVES DO ZOOM DA PAGINA
  const titleSize = '1rem';
  const fontSize = '0.7rem';
  let arrNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,
  36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75]


  useEffect(() => {
    getParams()
    getAllValidOrdersPopulated()
  } , []);

  const [ordersList, setOrdersList] = useState<OrderModel[]>([]);
  const [panelList, setPanelList] = useState<any[]>([]);
  const getParams= async () => {
    const result = await readLimitedParams();
    generatePanel(result)
    setParamsNumbers(result.raffleNumbers)
  }

  const updateParamsNumbers= async (numbers : number[]) => {
    const result = await updateParams({raffleNumbers : numbers});
  }

  const getAllValidOrdersPopulated = async () => {
    const result = await listAllValidOrdersPopulated();
    setOrdersList(result)
  }


  const [paramsNumbers, setParamsNumbers] = useState<number[]>([]);
  const handleParamsNumbers = (e : any) => {
    const selectedNumber = parseInt(e.target.name);
    e.target.style.backgroundColor = paramsNumbers.includes(selectedNumber)? 'black' :  'green';
    paramsNumbers.includes(selectedNumber) ? paramsNumbers.splice(paramsNumbers.indexOf(selectedNumber),1) : paramsNumbers.push(selectedNumber);
    updateParamsNumbers(paramsNumbers);
    setParamsNumbers(paramsNumbers);
    console.log(lineOrderMarkers(ordersList,paramsNumbers))
  }


  const generatePanel = (params : ParamsModel) => {
    let panelArr = [];
    if(params.valorLinha > 0){
      panelArr.push({batida: 'LINHA', valor:  params.valorLinha})
    }
    if(params.valorColuna > 0){
      panelArr.push({batida: 'COLUNA', valor:  params.valorColuna})
    }
    if(params.valorCruz > 0){
      panelArr.push({batida: 'CRUZ', valor:  params.valorCruz})
    }
    if(params.valorCantos > 0){
      panelArr.push({batida: 'CANTOS', valor:  params.valorCantos})
    }
    if(params.valorCheia > 0){
      panelArr.push({batida: 'CHEIA', valor:  params.valorCheia})
    }
    if(params.valorJanelinha > 0){
      panelArr.push({batida: 'JANELINHA', valor:  params.valorJanelinha})
    }
    if(params.valorJanelao > 0){
      panelArr.push({batida: 'JANELÃO', valor:  params.valorJanelao})
    }
    if(params.valorL > 0){
      panelArr.push({batida: 'L', valor:  params.valorL})
    }
    if(params.valorX > 0){
      panelArr.push({batida: 'X', valor:  params.valorX})
    }
    setPanelList(panelArr)
  } 




  return (
    <Container>
        <SideBar backgroundColor="white" title="Sorteio" secondaryListItems={menuList}>
        <Container>

          <div style={{border: '1px solid black' , width: '100%', height: '70%', display: 'flex'}}>
            <div style={{border: '1px solid black' , width: '75%', height: '100%'}}></div>
            <div style={{border: '1px solid black' , width: '25%', height: '100%', display: 'flex', flexWrap:'wrap', alignContent: 'flex-start'}}>
              {arrNumbers.map(n => <button style={{border: '1px solid white' , width: '20%', height: '6.7%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: paramsNumbers.includes(n)? 'green' : 'black' , color: 'white', cursor: 'pointer'}} onClick={handleParamsNumbers}  name={String(n)} >{n}</button>)}
            </div>
          </div>
          <div style={{border: '1px solid black' , width: '100%', height: '30%', display: 'flex'}}>
              {panelList.map(item => <div style={{border: '1px solid black' , width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{borderBottom: '2px solid black' , width: '100%', height: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <h4 style={{fontSize: titleSize}}>{item.batida} R$ {item.valor}</h4>
                  </div>
                <span style={{fontSize: fontSize, width: '100%', color: 'white', backgroundColor: 'green'}}>Temos 1 cartela premiada!</span>
                <span style={{fontSize: fontSize}}>Total de 2 cartelas fantando 1 numero</span>
                <span style={{fontSize: fontSize}}>Total de 10 cartelas fantando 2 numeros</span>
                <span style={{fontSize: fontSize}}>Total de 256 cartelas fantando 3 numeros</span>
              </div>
              )}
          </div>  
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
  marging: 0,
  width: '100%',
  height: '76vh'
});


export default Raffle;