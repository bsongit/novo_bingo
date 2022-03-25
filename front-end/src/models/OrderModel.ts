import UserModel from "./UserModel";

export default interface OrderModel {
  _id: string,
  data: Date,
  status?:  boolean,
  codigo: string,
  valorCadaCartela: 0,
  listaCartelasId: string[],
  clienteNome?: string,
  vendedorId?: UserModel,
  gerenteId?: UserModel,
  transacaoId?: string,
  tipo?: string
  }