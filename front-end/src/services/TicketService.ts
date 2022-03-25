import Api from '../utils/Api';
import { gererateRegexpStringForTicketSearchByNumbers } from '../utils/Utils';

export const findByNumbers = async (numbers : number[]) => {
    try {
        const {data} = await Api.post('/cartelas/encontrar-por-numeros',{regexpString  : gererateRegexpStringForTicketSearchByNumbers(numbers)});
        return data;
    } catch (err) {
        console.log(err);
        alert("Algo deu errado!");
    }
  }