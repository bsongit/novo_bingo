function userNameValidation(nome: string){
    if(nome.toLowerCase() == 'null') return false;
    if(nome.length < 3 || nome.length > 27) return false;
    if(/[0-9]/.test(nome)) return false;
    if(!/[a-zA-Z_][a-zA-Z_]*/.test(nome)) return false;
    return true;
}
function userTelefoneValidation(telefone: string){
    if(telefone.length < 10) return false;
    return true;
}

function emailValidation(email: string){
    if(email.toLowerCase() == 'null') return false;
    if(email.length < 3 || email.length > 96) return false;
    if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) return false;
    return true;
}

function passwordValidation(senha: string){
    if(senha.length < 8 || senha.length > 256) return false;
    return true;
}

export function validateUserFormWithPass(form: any){
    if(!userNameValidation(form.nome)) return 'Esse nome de usuário é invalido!';
    if(!userTelefoneValidation(form.telefone)) return 'Esse telefone é invalido!';
    if(!emailValidation(form.email)) return 'O email informado não é valido!';
    if(!passwordValidation(form.senha)) return 'Senha invalida!';

    return 'Valid form';
}

export function validateUserFormWithouttPass(form: any){
    if(!userNameValidation(form.nome)) return 'Esse nome de usuário é invalido!';
    if(!userTelefoneValidation(form.telefone)) return 'Esse telefone é invalido!';
    if(!emailValidation(form.email)) return 'O email informado não é valido!';

    return 'Valid form';
}