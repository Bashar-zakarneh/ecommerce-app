import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-cyan-800 py-2">
      <div className="container mx-auto px-4 flex justify-between">
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl font-bold cursor-pointer">
            E-commerce
          </a>
        </div>

        {/* Links */}
        <div>
          <ul className="flex justify-between gap-6">
            <li>
              <Link to="/">Home</Link>
            </li>
            {error && <div className="text-red-500">{error}</div>}
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li key={index}>
                  <Link to={`/category/${category}`} className="text-white">
                    {category}
                  </Link>
                </li>
              ))
            ) : (
              <li>Loading Categories...</li>
            )}
            <li>
              <Link to="/cart" className="text-white">
                cart
              </Link>
            </li>

            <li>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
