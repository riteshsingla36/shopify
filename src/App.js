import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './sellerComponents/Signup';
import Navbar from "./sellerComponents/Navbar"
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

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Navbars />
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


        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
