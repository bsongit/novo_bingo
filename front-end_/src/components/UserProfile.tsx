import { Autocomplete, ListSubheader, TextField, FormControl, InputLabel, Checkbox} from '@mui/material';
import { createStitches} from '@stitches/react';
import { IMaskInput } from 'react-imask';
import { ChangeEvent, useEffect, useState } from 'react';
import {validateUserFormWithPass, validateUserFormWithouttPass}  from '../utils/Validations';
import Api from '../utils/Api';
import UserModel from '../models/UserModel'
import { updateSession,getSession } from '../utils/SessionHandler';


type Props = {
  _userForm  : UserModel;
  isMySelf? : boolean;
}

function UserProfile({_userForm, isMySelf} : Props) {

  useEffect(() => {
    if(_userForm.perfil == 'VENDEDOR') {
       getManagers()
    }
  }, []);

  const [managerList, setManagerList] = useState<UserModel[]>([])
  const [selectedManager, setSelectedManager] = useState<UserModel | undefined>()
  const [form, setForm] = useState<UserModel>(
    {
      _id: _userForm._id,
      data: new Date(),
      perfil: _userForm.perfil,
      endereco: _userForm.endereco,
      comissao: 0,
      nome: _userForm.nome,
      email: _userForm.email,
      senha: '',
      telefone: _userForm.telefone,
      confirmSenha: '',
      changePassword: true,
      tutorId: _userForm.tutorId || getSession()._id
      
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

  const handlerChangeFilter =  (event : any, obj : any ) => {
    setForm({...form, tutorId: obj.item._id})
    selectManager(managerList, obj.item._id)
   }
 

  const  formValidation = () => {
    const message = form.changePassword ? validateUserFormWithPass(form) : validateUserFormWithouttPass(form) ;
    if(form.senha !== form.confirmSenha){
        alert("A confirmação de senha não é igual!")
    }
    else if(message === 'Valid form'){
      form._id ? update() : create()
    }
    else{
        alert(message);
    }
}


  const create = async () => {

    try {
        const response = await Api.post('/usuarios/create', {...form});

        if(response.data.keyValue){
          alert(JSON.stringify(response.data.keyValue) + ' já está cadastrado!')
        }
        else{
          alert('Usuário registrado com sucesso!')
          window.location.reload()
        }
    } catch (err) {
        console.log(err)
        alert('Algo deu errado!')
    }
  }

  const update = async () => {
    delete form.senha;
    delete form.confirmSenha;
    try {
        const response = await Api.put('/usuarios/update', {...form});

        if(response.data.keyValue){
          alert(JSON.stringify(response.data.keyValue) + ' já existe!')
        }
        else{
          isMySelf? updateSession(form) : console.log('')
          alert('Usuário atualizado com sucesso!')
          window.location.reload()
        }
    } catch (err) {
        console.log(err)
        alert('Algo deu errado!')
    }
  }


  const getManagers= async () => {
    try {
        const {data} = await Api.post('/usuarios/gerentes');
        setManagerList(data)
        selectManager(data, form.tutorId || '')
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }


  const parseListToAutoComplete = (data : UserModel[]) => {
    let autoComplete: Object[] = [];
    data.map(item => {
      autoComplete.push({
        label: item.nome, item : item
      })
    })
    return autoComplete;
  }

  const selectManager = (data : UserModel[], _id : string) => {
    setSelectedManager(data.find(manager => manager._id == _id))
    console.clear()
    console.log(data.find(manager => manager._id == _id))
    console.log(form)
  }


  return (
    <Container>
            <Row>
            <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="nome" sx={{padding: 1}} >
                   Nome
                </InputLabel>
                  <InputTx placeholder="Apenas o nome de usuário" type="text" required  id="nome" name="nome"  inputProps={{maxLength: 20}} onChange={handlerChange} value={form.nome}  />
              </FormCrtl>
              <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="telefone" sx={{padding: 1}} >
                   Telefone
                </InputLabel>
                <InputMask overwrite  definitions={{'#': /[1-9]/,}} mask="(00) 00000-0000" placeholder="(99) 99999-9999" type="tel" required   id="telefone" name="telefone"  onChange={handlerChange} value={form.telefone}  />
              </FormCrtl>
            </Row>
            <Row>
            <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="email" sx={{padding: 1}} >
                   Email
                </InputLabel>
                <InputTx placeholder="exemplo@email.com" type="email" required id="email" name="email" inputProps={{maxLength: 27}} onChange={handlerChange} value={form.email} />
              </FormCrtl>
              <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="endereco" sx={{padding: 1}} >
                   Endereço
                </InputLabel>
                <InputTx placeholder="Rua 12 curitiba - PA" type="//#endregion" id="endereco" name="endereco" onChange={handlerChange} value={form.endereco}  />
              </FormCrtl>
            </Row>
            {form.perfil == 'VENDEDOR' ?
            <Row css={{marginTop: '12px'}}>
              <MyAutocomplete
                disabled={getSession().perfil == 'GERENTE'}
                disablePortal
                autoComplete={false}
                selectOnFocus
                componentName="hidden"
                id="search-gerente"
                value={selectedManager?.nome || 'Selecione'}
                onChange={(event, item) => handlerChangeFilter(event,item)}
                options={parseListToAutoComplete(managerList)}
                renderInput={(params) => <TextField  name="hidden" autoComplete={'off'} {...params} label="Gerentes"/>}
              />
              </Row> : ''}
            {form._id?  <Row css={{marginTop: '12px', flexDirection: 'row', justifyContent: 'flex-start'}} >
              <Checkbox name="changePassword"  onChange={handlerChangeCheck} checked={form.changePassword}  />
                <InputLabel sx={{padding: 1,color: '#595d64', fontWeight: '400'}}>
                  Mudar senhar
                </InputLabel>
              </Row> : ''}
              {form.changePassword? 
            <Row>
            <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="senha" sx={{padding: 1}} >
                   Senha
                </InputLabel>
                <InputTx placeholder="*********" type="password" id="senha" name="senha"  onChange={handlerChange} value={form.senha} />
              </FormCrtl>
              <FormCrtl variant="standard">
                <InputLabel shrink htmlFor="confirmSenha" sx={{padding: 1}} >
                   Confirmar enha
                </InputLabel>
                <InputTx placeholder="*********" type="password" id="confirmSenha" name="confirmSenha" onChange={handlerChange} value={form.confirmSenha}/>
              </FormCrtl>
            </Row>  : ''}
            <Row>
              <Button color="danger" onClick={() => window.location.reload()}>Cencelar</Button>
              <Button color="success" onClick={formValidation}>Registrar</Button>
            </Row>
    </Container>)
}

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
  alignItems: 'center',
  padding: 0,
  marging: 0,
  width: '100%',
  height: '100%'
});


const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marging: 0,
  width: '90%',
  flexWrap: 'wrap',
  '@bp1': {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const MyAutocomplete = styled(Autocomplete, {
  width: '48%',
  backgroundColor: 'white',
  '@bp1': {
    width: '100%'
  },
});

const FormCrtl = styled(FormControl, {
  marginTop: '32px !important',
  width: '48%',
  '@bp1': {
    width: '100%',
    marginTop: '20px !important'
  },
});


const InputTx = styled(TextField, {
  width: '100%',
  '@bp1': {
    width: '100%'
  },
});

const InputMask = styled(IMaskInput, {
  width: '100%',
  height: '100%',
  borderRadius: 4,
  border: '1px solid #bdbfbf',
  '@bp1': {
    width: '100%',
    height: 56
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
  marginTop: 20,
  '@bp1': {
    width: '100%',
    marginTop: 12,
    height: 32
  },

  variants: {
    color: {
      success: { backgroundColor: '#09cc8e'},
      danger:  { backgroundColor: '#ff223e'},
    },
  },
});




export default UserProfile;
