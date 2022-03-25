import UserModel from "./UserModel";

export default interface SerieModel {
    data?: Date,
    status?: boolean,
    tamanhoInicial: number,
    listaCartelasId?: [],
    vendedorId?: UserModel,
    gerenteId?: UserModel,
    numero?: number,
    printNumber?: number,
    tipo?: string
  }