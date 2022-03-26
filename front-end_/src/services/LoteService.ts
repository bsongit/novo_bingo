import Api from '../utils/Api';

export const createLote = async (form: any) => {
    try {
        const {data} = await Api.post('/lotes/create',{qtdCartelas : form.qtdCartelas});
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }
