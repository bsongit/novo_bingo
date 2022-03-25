import Api from '../utils/Api';

export const updateParams = async (form : any) => {
    try {
        const {data} = await Api.put('/parametro/update',{...form})
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
}

export const readParams = async () => {
    try {
        const {data} = await Api.get('/parametro/');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
  }

  export const readLimitedParams = async () => {
    try {
        const {data} = await Api.get('/parametro/limitado');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
  }