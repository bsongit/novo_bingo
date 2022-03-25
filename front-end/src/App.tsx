import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home"
import Regulation from "./pages/Regulation";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import SeriesManagement from "./pages/SeriesManagement";
import LoteManagement from "./pages/LoteManagement";
import WinnersManagement from "./pages/WinnersManagement";
import ManagerBalance from "./pages/ManagerBalance";
import SellerBalance from "./pages/SellerBalance";
import Reports from "./pages/Reports";
import Orders from "./pages/Orders";
import MyProfile from "./pages/MyProfile";
import Raffle from "./pages/Raffle";
import Teste from "./pages/Teste";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path={'/teste'} element={<Teste/>}></Route>
      <Route path={'/'} element={<Home/>}></Route>
      <Route path={'/sign-in'} element={<SignIn/>}></Route>
      <Route path={'/sign-up'} element={<SignUp/>}></Route>
      <Route path={'/regulation'} element={<Regulation/>}></Route>
      
      <Route path={'/admin/settings'} element={<Settings/>}></Route>
      <Route path={'/admin/series'} element={<SeriesManagement/>}></Route>
      <Route path={'/admin/lote'} element={<LoteManagement/>}></Route>
      <Route path={'/admin/winners'} element={<WinnersManagement/>}></Route>
      <Route path={'/admin/managerbalance'} element={<ManagerBalance/>}></Route>
      <Route path={'/admin/sellerbalance'} element={<SellerBalance/>}></Route>
      <Route path={'/admin/reports'} element={<Reports/>}></Route>
      <Route path={'/admin/orders'} element={<Orders/>}></Route>

      <Route path={'/subadmin/raffle'} element={<Raffle/>}></Route>

      <Route path={'/manager/printseries'} element={<SeriesManagement/>}></Route>
      <Route path={'/manager/winners'} element={<WinnersManagement/>}></Route>
      <Route path={'/manager/orders'} element={<Orders/>}></Route>
      <Route path={'/manager/reports'} element={<Reports/>}></Route>
      <Route path={'/manager/sellerbalance'} element={<SellerBalance/>}></Route>
      <Route path={'/manager/profile'} element={<MyProfile/>}></Route>

      <Route path={'/seller/series'} element={<SeriesManagement/>}></Route>
      <Route path={'/seller/tickets'} element={<SeriesManagement/>}></Route>
      <Route path={'/seller/winners'} element={<WinnersManagement/>}></Route>
      <Route path={'/seller/orders'} element={<Orders/>}></Route>
      <Route path={'/seller/reports'} element={<Reports/>}></Route>
      <Route path={'/seller/profile'} element={<MyProfile/>}></Route>

    </Routes>
  </BrowserRouter>)
}

export default App
