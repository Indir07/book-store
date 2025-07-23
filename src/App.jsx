import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import CartProvider from "./context/CartContext";
import Cart from "./components/Cart";
import BookDetails from "./components/BookDetails";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <CartProvider>
      <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/book/:id" element={<BookDetails />} />
            </Routes>
      <Footer/>
    </CartProvider>
  );
}

export default App;
