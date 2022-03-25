import Api from '../utils/Api';
import { getSession } from '../utils/SessionHandler';
const session = getSession();

export const readAllManagers= async () => {
    try {
        const {data} = await Api.post('/usuarios/gerentes');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }


export const readAllSellers = async () => {
    try {
        const {data} = await Api.post('/usuarios/vendedores', {_id : session._id, perfil: session.perfil});
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }