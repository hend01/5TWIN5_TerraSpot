import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import DetailProduit from "./components/home/detailProduit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./NotFound";
import { CartProvider } from "./contexte/CartContext";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Reclamation from "./components/reclamation/addReclamation";
import HomeRes from "./components/home/HomeRes";

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<HomeRes />} />
          <Route path="/:produitId" element={<DetailProduit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reclamation" element={<Reclamation />} />
          <Route path="/Notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} /> {/* Route générique pour toutes les autres URL */}
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
