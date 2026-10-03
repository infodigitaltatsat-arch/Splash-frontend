import { Navigate, Route, Routes } from "react-router-dom"
import Splash from './pages/Splash/Splash';
import Login from './pages/Login/Login';
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import PlaceholderPage from "./pages/PlaceholderPage";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Address from "./pages/Address/Address";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderTracking from "./pages/OrderTracking/OrderTracking";

const App = () => {
  return (
   <Routes>
    <Route path="/" element={<Splash/>}/>
     <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
       <Route path="/categories" element={<Categories/>}/>
        <Route path="/profile" element={<PlaceholderPage title="Profile" active="profile"/>}/>
        <Route path="/products/:category" element={<Products/>}/>
        <Route path="/product/:productId" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>

         <Route path="/checkout" element={<Checkout/>}/>

          <Route path="/orders" element={<Orders/>}/>

          <Route path="/address" element={<Address/>}/>

          <Route path="/order-success" element={<OrderSuccess/>}/>

          <Route path="/orders/:orderId" element={<OrderTracking/>}/>


     {/* temporary */}
    
     <Route path="*" element={<Navigate to='/' replace/>}/>

   </Routes>
  )
}

export default App
