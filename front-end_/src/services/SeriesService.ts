import Api from '../utils/Api';
import { getSession } from '../utils/SessionHandler';
const session = getSession();

export const createSeries = async (form : any) => {
    try {
        const {data} = await Api.post('/series/create',{...form});
        alert('Série criada com sucesso!')
        window.location.reload()
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }

export const readAllManagerSeries= async () => {
    try {
        const {data} = await Api.post('/series/tipo/gerente',{_id : session._id, perfil: session.perfil});
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }

  export const readAllSellerSeries= async () => {
    try {
        const {data} = await Api.post('/series/tipo/vendedor',{_id : session._id, perfil: session.perfil});
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }

