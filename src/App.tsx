import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getAllProducts } from "./api/fetchProducts";
import { Product } from "./types/product";
import ProductCard from "./components/ProductCard";

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
    <div>
      <Header />
      {/* Pass products to ProductCard as a prop */}
      <ProductCard products={products} />
    </div>
  );
};

export default App;
