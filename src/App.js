import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Navbar from "./components/Navbar"
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Products from './components/Products';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
