import {ListSubheader} from '@mui/material';
import { createStitches} from '@stitches/react';
import SideBar from '../components/SideBars'
import {menuArray} from '../components/ProfileMenuList'
import { getSession } from '../utils/SessionHandler';
import UserProfile from '../components/UserProfile';

function MyProfile() {
  return (
    <Container>
        <SideBar backgroundColor="white" title="Meu perfil" secondaryListItems={menuList}>
        <Container>
                <UserProfile _userForm={getSession()} isMySelf={true}></UserProfile>
            </Container>
        </SideBar>
    </Container>)
}

const menuList = (
  <div>
    <ListSubheader  sx={{backgroundColor : 'transparent', color:'#64a0fa', fontWeight: 'bold'}} inset>{getSession().nome}</ListSubheader>
    {menuArray}
  </div>
);
const {styled}  = createStitches({
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  marging: 0,
  width: '100%',
  height: '100vh'
});


export default MyProfile;