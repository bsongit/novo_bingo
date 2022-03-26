export default interface UserModel {
    _id?: string,
    tutorId?: string,
    data?: Date,
    perfil?: string,
    endereco?: string,
    comissao?: number,
    nome?: string,
    email?: string,
    senha?: string,
    telefone?: string,
    changePassword?: boolean,
    confirmSenha?: string
  }