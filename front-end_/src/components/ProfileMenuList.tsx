import {ListItem, ListItemIcon, ListItemText } from "@mui/material"
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import ListIcon from '@mui/icons-material/List';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { getSession } from "../utils/SessionHandler";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const  CLIENTE  = [
      <ListItem button>
        <ListItemIcon sx={{color: 'white'}}>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Minhas cartelas" />
      </ListItem>,
      <ListItem button>
        <ListItemIcon sx={{color: 'white'}}>
          <StorefrontIcon />
        </ListItemIcon>
        <ListItemText primary="Loja" />
      </ListItem>,
      <ListItem button>
        <ListItemIcon sx={{color: 'white'}}>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="Ganhadores" />
      </ListItem>,
      <ListItem button>
        <ListItemIcon sx={{color: 'white'}}>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>]
 const  VENDEDOR = [
  <ListItem button>
  <ListItemIcon sx={{color: 'white'}}>
    <DensitySmallIcon />
  </ListItemIcon>
  <ListItemText primary="Séries" />
</ListItem>,
  <ListItem button>
    <ListItemIcon sx={{color: 'white'}}>
      <AutoAwesomeMotionIcon />
    </ListItemIcon>
    <ListItemText primary="Pedidos" />
  </ListItem>,
  <ListItem button>
    <ListItemIcon sx={{color: 'white'}}>
      <PlagiarismIcon />
    </ListItemIcon>
    <ListItemText primary="Relatórios" />
  </ListItem>,
  <ListItem button>
    <ListItemIcon sx={{color: 'white'}}>
      <StorefrontIcon />
    </ListItemIcon>
    <ListItemText primary="Loja" />
  </ListItem>,
  <ListItem button>
    <ListItemIcon sx={{color: 'white'}}>
      <ListIcon />
    </ListItemIcon>
    <ListItemText primary="Gerenciar clientes" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/seller/profile'}>
    <ListItemIcon sx={{color: 'white'}}>
      <FaceIcon />
    </ListItemIcon>
    <ListItemText primary="Perfil" />
  </ListItem>]

 const GERENTE =[
  <ListItem button onClick={() => window.location.href = '/manager/printseries'}>
    <ListItemIcon sx={{color: 'white'}}>
      <ListAltIcon />
    </ListItemIcon>
    <ListItemText primary="Imprimir séries" />
  </ListItem>,
    <ListItem button onClick={() => window.location.href = '/manager/winners'}>
    <ListItemIcon sx={{color: 'white'}}>
      <EmojiEventsIcon />
    </ListItemIcon>
    <ListItemText primary="Ganhadores" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/manager/orders'}>
    <ListItemIcon sx={{color: 'white'}}>
      <AutoAwesomeMotionIcon />
    </ListItemIcon>
    <ListItemText primary="Pedidos" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/manager/reports'}>
  <ListItemIcon sx={{color: 'white'}}>
    <PlagiarismIcon />
  </ListItemIcon>
  <ListItemText primary="Relatórios" />
</ListItem>,
<ListItem button onClick={() => window.location.href = '/manager/sellerbalance'}>
  <ListItemIcon sx={{color: 'white'}}>
    <GroupIcon />
  </ListItemIcon>
  <ListItemText primary="Vendedores" />
</ListItem>,
  <ListItem button onClick={() => window.location.href = '/manager/profile'}>
    <ListItemIcon sx={{color: 'white'}}>
      <FaceIcon />
    </ListItemIcon>
    <ListItemText primary="Perfil" />
  </ListItem>]

const SUBADMIN = [
  <ListItem button onClick={() => window.location.href = '/subadmin/raffle'}>
  <ListItemIcon sx={{color: 'white'}}>
    <DeveloperBoardOffIcon />
  </ListItemIcon>
  <ListItemText primary="Sorteio" />
</ListItem>]

  const ADMIN = [
    <ListItem button onClick={() => window.location.href = '/admin/orders'}>
    <ListItemIcon sx={{color: 'white'}}>
      <AutoAwesomeMotionIcon />
    </ListItemIcon>
    <ListItemText primary="Pedidos" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/admin/reports'}>
    <ListItemIcon sx={{color: 'white'}}>
      <PlagiarismIcon />
    </ListItemIcon>
    <ListItemText primary="Relatórios" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/admin/sellerbalance'}>
    <ListItemIcon sx={{color: 'white'}}>
      <GroupIcon />
    </ListItemIcon>
    <ListItemText primary="Vendedores" />
  </ListItem>,
    <ListItem button onClick={() => window.location.href = '/admin/managerbalance'}>
    <ListItemIcon sx={{color: 'white'}}>
      <GroupIcon />
    </ListItemIcon>
    <ListItemText primary="Gerentes" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/admin/winners'}>
    <ListItemIcon sx={{color: 'white'}}>
      <EmojiEventsIcon />
    </ListItemIcon>
    <ListItemText primary="Ganhadores" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/admin/lote'}>
  <ListItemIcon sx={{color: 'white'}}>
    <ViewInArIcon />
  </ListItemIcon>
  <ListItemText primary="Gerar lote" />
</ListItem>,
    <ListItem button onClick={() => window.location.href = '/admin/series'} >
    <ListItemIcon sx={{color: 'white'}}>
      <AssignmentIcon />
    </ListItemIcon>
    <ListItemText primary="Gerenciar séries" />
  </ListItem>,
  <ListItem button onClick={() => window.location.href = '/admin/settings'}>
    <ListItemIcon sx={{color: 'white'}}>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText primary="Configurações" />
  </ListItem>]

const getMenu = () => {
  if(getSession().perfil == 'ADMIN')
    return ADMIN;
  else if(getSession().perfil == 'SUBADMIN')
    return SUBADMIN;
  else if(getSession().perfil == 'GERENTE')
    return GERENTE;
  else if(getSession().perfil == 'VENDEDOR')
    return VENDEDOR;

  return CLIENTE;
}
export const menuArray = getMenu();