import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ScrollToTop from "./components/ScrollToTop/scrolltotop";
import Home from "./pages/Home/home";
import Products from "./pages/Products/product";
import Cart from "./pages/Cart/cart";
import AdminOrders from "./pages/AdminOrders/admin"

import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminItems" element={<AdminOrders />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
    </>
  );
}

export default App;

