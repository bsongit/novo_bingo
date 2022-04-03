import { Checkbox, Divider, FormControl, InputLabel, ListSubheader, TextareaAutosize, Typography} from '@mui/material';
import { createStitches} from '@stitches/react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList'
import TextField from '@mui/material/TextField';
import placeholder from '../assets/images/placeholder.png'
import { ChangeEvent, useState, useEffect } from 'react';
import { readParams, updateParams } from '../services/ParameterService';
import { getSession } from '../utils/SessionHandler';

interface Form {
  _id?: string,
  __v?: number,
  vendaBloqueada?: boolean;
  urlLiveStream?: string;
  regulamento?: string;
  mensagemPremios?: string;
  banner?: string;
  baseComissaoGerente?: number;
  baseComissaoVendedor?: number;
  gerentesDoGiro?: Array<any>,
  valorLinha?:  number;
  valorColuna?:  number;
  valorCruz?:  number;
  valorCantos?:  number;
  valorCheia?:  number;
  valorL?:  number;
  valorX?:  number;
  valorJanelinha?:  number;
  valorJanelao?:  number;
  valorGiro?:  number;
  valorSuperGiro?:  number;
}


export default function Settings(){
  useEffect(() => {
    // Atualiza o titulo do documento usando a API do browser
   initializeParams()
  }, []);

  const [form, setForm] = useState<Form>(
    {
      _id: '',
      gerentesDoGiro: [],
      vendaBloqueada: false,
      urlLiveStream: '',
      regulamento: '',
      mensagemPremios: '',
      banner: '',
      baseComissaoGerente: 0,
      baseComissaoVendedor: 0,
      valorLinha: 0,
      valorColuna:  0,
      valorCruz:  0,
      valorCantos:  0,
      valorCheia:  0,
      valorL:  0,
      valorX:  0,
      valorJanelinha:  0,
      valorJanelao:   0,
      valorGiro:  0,
      valorSuperGiro: 0,
    }
  );

  const handlerChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    
    setForm({...form,[e.target.name] : 
      isNaN(parseFloat(e.target.value))? e.target.value : parseFloat(e.target.value)
    });
    console.clear()
    console.log(form)
  }

  const handlerChangeCheck = (e : ChangeEvent<HTMLInputElement> ) => {
    
    setForm({...form,[e.target.name] : 
      e.target.checked
    });
    console.clear()
    console.log(form)
  }

  const setBanner = (e : ChangeEvent<HTMLInputElement>) =>  {
    if (FileReader && e.target.files && e.target.files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            setForm({...form,[e.target.name] : fr.result});
        }
        fr.readAsDataURL(e.target.files[0]);
    }
    else {
        console.log('não suportado')
    }
  }

  const submitParams = async () => {
    const result = await updateParams(form)
    if(result)
      alert("Parametro atualizado com sucesso!");
}

  const initializeParams = async () => {
    const result = await readParams();
    setForm({...result})
  }
  return (
    <Container>
        <SideBar backgroundColor="white" title="Painel de configurações" secondaryListItems={menuList}>
            <Container>
              <Row>
              <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="input1" sx={{padding: 1}} >
                  URL PARA TRANSMISSÃO DO SORTEIO
                </InputLabel>
                <InputTx placeholder="https://youtube.com/" variant="filled" id="input1" name="urlLiveStream" onChange={handlerChange} value={form.urlLiveStream} />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="input2" sx={{padding: 1}}>
                  COM. BASE GERENTE (REAIS)
                </InputLabel>
                <InputTx placeholder="0.0" type="number" variant="filled" id="input2" name="baseComissaoGerente" onChange={handlerChange} value={form.baseComissaoGerente} />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="input3" sx={{padding: 1}}>
                  COM. BASE VENDEDOR (REAIS)
                </InputLabel>
                <InputTx placeholder="0.0" type="number"   variant="filled" id="input3"  name="baseComissaoVendedor" onChange={handlerChange} value={form.baseComissaoVendedor} />
              </FormCrtl>
              </Row>
              <Row css={{flexDirection: 'row'}} >
              <Checkbox name="vendaBloqueada"  onChange={handlerChangeCheck} checked={form.vendaBloqueada}  />
                <InputLabel sx={{padding: 1,color: '#595d64', fontWeight: '400'}}>
                  Bloquear vendas
                </InputLabel>
              </Row>
              <Divider variant="middle" />
              <Row>
              <input accept="image/*" type="file" name="banner" onChange={setBanner}></input>
              <Img width='100' height='100' src={form.banner != ''? form.banner : placeholder} />
              </Row>
              <Divider variant="middle" />
              <Row css={{flexDirection: 'column'}}>
              <Typography
              component="h1"
              variant="h6"
              color="GrayText"
              noWrap
              sx={{ flexGrow: 1 }}
            >
             Tabela de Premios
            </Typography>
                <TextArea id="input5"
                        maxRows={25}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        name="mensagemPremios" onChange={handlerChange} value={form.mensagemPremios}  
                  />
              </Row>
              <Divider variant="middle" />
              <Row css={{flexDirection: 'column'}}>
              <Typography
              component="h1"
              variant="h6"
              color="GrayText"
              noWrap
              sx={{ flexGrow: 1 }}
            >
             Regulamento
            </Typography>
                <TextArea id="input5"
                        maxRows={25}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua."
                        name="regulamento" onChange={handlerChange}    value={form.regulamento}  
                  />
              </Row>
              <Divider variant="middle" />
              <br/>
              <Divider variant="middle" />
              <Row >
              <Typography
                component="h1"
                variant="h6"
                color="GrayText"
                noWrap
                sx={{ flexGrow: 1 }}
              >
              Batidas do sorteio
            </Typography>
              <Row >
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="linha" sx={{padding: 1}}>
                  Valor da batida Linha
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="linha" name="valorLinha" onChange={handlerChange} value={form.valorLinha}  />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="coluna" sx={{padding: 1}}>
                  Valor da batida Coluna
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="coluna" name="valorColuna" onChange={handlerChange} value={form.valorColuna}  />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="ele" sx={{padding: 1}}>
                  Valor da batida L
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="ele" name="valorL" onChange={handlerChange} value={form.valorL} />
              </FormCrtl>
              </Row>
              <Row >
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="cruz" sx={{padding: 1}}>
                  Valor da batida Cruz
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="cruz" name="valorCruz" onChange={handlerChange} value={form.valorCruz} />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="cheia" sx={{padding: 1}}>
                  Valor da batida Cheia
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="cheia" name="valorCheia" onChange={handlerChange} value={form.valorCheia} />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="xis" sx={{padding: 1}}>
                  Valor da batida X
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="xis" name="valorX" onChange={handlerChange}  value={form.valorX} />
              </FormCrtl>
              </Row>

              <Row >
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="janelinha" sx={{padding: 1}}>
                  Valor da batida Janelinha
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="janelinha" name="valorJanelinha" onChange={handlerChange} value={form.valorJanelinha} />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="janelao" sx={{padding: 1}}>
                  Valor da batida Janelão
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="janelao" name="valorJanelao" onChange={handlerChange} value={form.valorJanelao}  />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="cantos" sx={{padding: 1}}>
                  Valor da batida Cantos
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="cantos" name="valorCantos" onChange={handlerChange}  value={form.valorCantos} />
              </FormCrtl>
              </Row>

              <Row >
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="giro" sx={{padding: 1}}>
                  Valor da batida Giro
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="giro" name="valorGiro" onChange={handlerChange}  value={form.valorGiro}   />
              </FormCrtl>
              <FormCrtl variant="standard" >
                <InputLabel shrink htmlFor="supergiro" sx={{padding: 1}}>
                  Valor da batida Super Giro
                </InputLabel>
                <InputTx placeholder="0.0" type="number"  variant="filled" id="supergiro" name="valorSuperGiro" onChange={handlerChange}  value={form.valorSuperGiro}   />
              </FormCrtl>
              </Row>
            </Row>
            <Row css={{justifyContent: 'end'}}>
              <Button color="success" onClick={submitParams}>Salvar</Button>
            </Row>
            </Container>
        </SideBar>
    </Container>)
  }

const {styled, css}  = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});


const menuList = (
  <div>
    <ListSubheader  sx={{backgroundColor : 'transparent', color:'#64a0fa', fontWeight: 'bold'}} inset>{getSession().nome}</ListSubheader>
    {menuArray}
  </div>
);

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margging: 0,
  width: '100%',
  height: '100%'
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  margging: 0,
  width: '100%',
  flexWrap: 'wrap',
  padding: 24,
  '@bp1': {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 8,
    paddingRight: 32,
  },
});
const InputTx = styled(TextField, {
  width: 320,
  '@bp1': {
    width: '100%'
  },
});

const FormCrtl = styled(FormControl, {
  marginLeft: '20px !important',
  '@bp1': {
    width: '100%',
    marginLeft: 0,
    marginTop: '20px !important'
  },
});

const Img = styled('img', {
  marginLeft: '24px',
  '@bp1': {
    marginLeft: 0,
    marginTop: '20px !important'
  },
});


const TextArea = styled(TextareaAutosize, {
 width: '100%', 
 height: '100%',
  '@bp1': {
    width: '100%',
    height: '100%',
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
    marginTop: 12,
    height: '4em',
  },

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});