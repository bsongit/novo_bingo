import Api from '../utils/Api';
import { setSession } from '../utils/SessionHandler';

export  const doLoggin = async (form : any) => {
        try {
            const {data} = await Api.post('/auth/sign-in',{...form});
            if(data.menssage)
                alert(data.menssage)
            else{
                setSession(data)
                switch(data.perfil){
                    case 'ADMIN' : window.location.href = '/admin/settings'
                    break;
                    case 'SUBADMIN' : window.location.href = '/subadmin/raffle'
                    break;
                    case 'GERENTE' : window.location.href = '/manager/profile'
                    break;
                    case 'VENDEDOR' : window.location.href = '/seller/profile'
                    break;
                }
            }
        } catch (err) {
            console.log(err);
            alert("Algo deu errado!");
            return [];
        }
}