interface Session {
    nome: string;
    tutorId: string;
    email: string;
    endereco: string;
    perfil: string;
    status: boolean;
    telefone: string;
    _id: string;
}

const existSession  = () : boolean  =>  { 
    return window.localStorage.getItem('fdsession')? true : false
 } 

export const setSession = (data : Object) => {
    window.localStorage.setItem('fdsession', JSON.stringify(data))
}

export const updateSession = (data : Object) => {
    const session : Session = {...getSession(),...data}
    window.localStorage.setItem('fdsession', JSON.stringify(session))
}

export const getSession  = () : Session  =>  { 
   return existSession() ? JSON.parse(window.localStorage.getItem('fdsession')|| '') : ''
} 



export const clearSession  = ()  =>  { 
    window.localStorage.removeItem('fdsession')
    alert('Logout!')
    window.location.href = '/sign-in'
 } 