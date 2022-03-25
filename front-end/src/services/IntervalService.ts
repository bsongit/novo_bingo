import Api from '../utils/Api';

export const createInterval = async (form: any) => {
    try {
        const {data} = await Api.post('/intervalos/create',{dataInicial: new Date(), qtdGerada : form.qtdCartelas});
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }

export const readCurrentInterval = async () => {
    try {
        const {data} = await Api.post('/intervalos/current');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
  }

export const readAllIntervals = async () => {
    try {
        const {data} = await Api.get('/intervalos/');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }
