export function sortByName({a,b} : any){
    if (a.nome > b.nome) {
        return 1;
      }
    else if (a.nome < b.nome) {
        return -1;
      }
      return 0
}

export function sortByNumber(a: number, b : number){
  if (a > b) {
      return 1;
    }
  else if (a < b) {
      return -1;
    }
    return 0
}



export function ticketSomatory( array: any[]){
  let sum = 0;
  array.map(item => {
    sum += item.listaCartelasId.length
  })
  return sum;
}


export function groupOrderByManager( array: any[]){
  let group: any = {};
  let arrayGroup: any[] = []

  array.map(item => {
    if(!group[item.gerenteId._id])
      group[item.gerenteId._id] = [];
    group[item.gerenteId._id].push(item);
  })

  Object.entries(group).map(item => {
    arrayGroup.push(item[1])
  })
  console.log(arrayGroup)
  return arrayGroup;
}


export function groupOrderBySeller( array: any[]){
  let group: any = {};
  let arrayGroup: any[] = []

  array.map(item => {
    if(!group[item.vendedorId._id])
      group[item.vendedorId._id] = [];
    group[item.vendedorId._id].push(item);
  })

  Object.entries(group).map(item => {
    arrayGroup.push(item[1])
  })
  console.log(arrayGroup)
  return arrayGroup;
}

export function groupOrderByClient( array: any[]){
  let group: any = {};
  let arrayGroup: any[] = []

  array.map(item => {
    if(!group[item.clienteNome])
      group[item.clienteNome] = [];
    group[item.clienteNome].push(item);
  })

  Object.entries(group).map(item => {
    arrayGroup.push(item[1])
  })
  console.log(arrayGroup)
  return arrayGroup;
}

export function gererateRegexpStringForTicketSearchByNumbers( array: number[]){
  let sortedArray = array.sort(sortByNumber)
  let regexpString = '';
  sortedArray.map(item => {
    regexpString += `,(${item}),*`
  })
  return regexpString;
}

export function splitTicketNumbers( numbers: string){
  let newArray: number[] = [];
  numbers.split(',').map(n => {
    newArray.push(parseInt(n))
  })
  return newArray;
}