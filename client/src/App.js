import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VehiclesQuery from './pages/VehiclesQuery'
import Navbar from './Components/Navbar'
import LoginUser from './Components/LoginUser';
import RegisterUser from './Components/RegisterUser'
import LoginAdmin from './Components/LoginAdmin';
import RegisterAdmin from './Components/RegisterAdmin'
import RegisterVehicle from './Components/RegisterVehicle';
import UpdateVehicle from './Components/UpdateVehicle'
import DeleteVehicle from './Components/DeleteVehicle';
import LogoutUser from './Components/LogoutUser';
import SingleVehicle from './Components/SingleVehicle'
import About from './pages/About'
import Cart from './Components/Cart'
import CheckoutSuccess from './Components/CheckoutSuccess'
import SingleReservation from './Components/SingleReservation'
import './App.css';

function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<VehiclesQuery />} />
        <Route path='/register' caseSensitive={true} element={<RegisterUser />} />
        <Route path='/login' caseSensitive={true} element={<LoginUser />} />
        <Route path='/register-admin' caseSensitive={true} element={<RegisterAdmin />} />
        <Route path='/login-admin' caseSensitive={true} element={<LoginAdmin />} />
        <Route path='/logout' caseSensitive={true} element={<LogoutUser />} />
        <Route path='/register-vehicle' caseSensitive={true} element={<RegisterVehicle />} />
        <Route path='/update-vehicle/:id' caseSensitive={true} element={<UpdateVehicle />} />
        <Route path='/delete-vehicle/:id' caseSensitive={true} element={<DeleteVehicle />} />
        <Route path='/single-vehicle/:id' caseSensitive={true} element={<SingleVehicle />} />
        <Route path='/cart' caseSensitive={true} element={<Cart />} />
        <Route path='/single-reservation/:id/:index' caseSensitive={true} element={<SingleReservation />} />
        <Route path='/about' caseSensitive={true} element={<About />} />
        <Route path='/checkout-success' caseSensitive={true} element={<CheckoutSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
