import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getAllProducts } from "./api/fetchProducts";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/Login";
import CartPage from "./pages/CartPage";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductCard products={products} />} />
        <Route
          path="/category/:category"
          element={<ProductCard products={products} />}
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
};

export default App;
