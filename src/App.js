
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './HomeComponent/Home';
import './App.css';
import FarmerHome from './FarmerComponent/FarmerHome';
import ConsultantHome from './ConsultantComponent/ConsultantHome';
import WarehouseOperatorHome from './WarehouseOperatorComponent/WarehouseOperatorHome';
import AdminHome from './AdminComponent/AdminHome';
import Login from './LoginComponent/Login';
import FarmerRegister from './FarmerComponent/FarmerRegister';
import DeliverPersonHome from './DeliverPersonComponent/DeliverPersonHome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<FarmerRegister />} />
      <Route path='/farmer' element={<FarmerHome />} />
      <Route path='/consultant' element={<ConsultantHome />} />
      <Route path='/warehouseoperator' element={<WarehouseOperatorHome />} />
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/deliverperson' element={<DeliverPersonHome />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
