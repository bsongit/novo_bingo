import Api from '../utils/Api';

export const readAllActiveOrders = async () => {
    try {
        const {data} = await Api.get('/pedidos/ativos');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }

export const readOrdersByInterval= async (form : any) => {
    try {
        const {data} = await Api.post('/pedidos/intervalo',{...form});
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return [];
    }
  }

export const adminCreateOrder = async (ticket : any) => {
    try {
        const {data} = await Api.post('/pedidos/admin/create', {...ticket});
        alert(data)
        window.location.reload()
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }

export const disableOrder = async (_id: string ) => {
    try {
        const {data} = await Api.put('/pedidos/desative', {_id : _id});
        alert('Pedido removido!')
        window.location.reload()
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }


  export const readTicketList = async (_id : string) => {
    try {
        const {data} = await Api.post('/pedidos/populate/cartelas', {_id : _id});
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
  }

  export const listAllValidOrdersPopulated = async () => {
    try {
        const {data} = await Api.post('/pedidos/validos-populados');
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
        return null;
    }
  }


  