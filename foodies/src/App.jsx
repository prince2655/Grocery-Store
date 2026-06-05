import React, { useContext } from 'react'
import Menubar from './componets/Menuber/Menubar'
import Footer from './componets/footer/footer'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import Contact from './pages/Contact/Contact'
import FoodDetails from './pages/FoodDetails/FoodDetails'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './Login/Login'
import Register from './Register/Register'
import { ToastContainer, toast } from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders'
import { StoreContext } from './contex/StoreContex'  

const App = () => {
  const { token } = useContext(StoreContext);
  return (
    <div>
      <Menubar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={token ? <PlaceOrder /> : <Login />} />
        <Route path='/login' element={token ? <Home/>:<Login />} />
        <Route path='/register' element={token ? <Home/>:<Register />} />
        <Route path='/myorders' element={token ? <MyOrders /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App