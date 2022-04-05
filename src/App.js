import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './sellerComponents/Signup';

import PrivateRoute from './sellerComponents/PrivateRoute';
import Login from './sellerComponents/Login';
import Products from './sellerComponents/Products';
import AddProduct from './sellerComponents/AddProduct';
import EditProduct from './sellerComponents/EditProduct';
import EditProfile from './sellerComponents/EditProfile';

import Home from "./clientcomponents/Home"
import Navbars from './clientcomponents/Navbars';
import UserLogin from './clientcomponents/UserLogin';
import UserSignup from './clientcomponents/UserSignup';
import Cart from './clientcomponents/Cart';
import UserPrivateRoute from './clientcomponents/UserPrivateRoute';
import CreateAddress from './clientcomponents/CreateAddress';
import Address from './clientcomponents/Address';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Navbars /> */}
      <Routes>
        {/* seller routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/seller" element={<Products />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/edit-product/:id" element={<EditProduct />} />
          <Route path="/seller/edit-profile/:id" element={<EditProfile />} />
        </Route>
        <Route path='/seller/signup' element={<Signup />} />
        <Route path='/seller/login' element={<Login />} />
        {/* seller routes end */}


        <Route element={<UserPrivateRoute />} >
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/create-address' element={<CreateAddress />} />
          <Route path='/address' element={<Address />} />
        </Route>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
      </Routes>
    </div>
  );
}

export default App;
