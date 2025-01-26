import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/product";
import { useCartContext } from "../context/CartContext"; // Import the context

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>(); // Get the category from the URL
  const { addItemToCart } = useCartContext(); // Access addItemToCart from context

  // Filter products by category
  const filteredProducts = category
    ? products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    addItemToCart(cartItem); // Add product to cart using context
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col h-full border p-4 rounded-lg shadow hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain mb-4"
          />
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4 flex-grow">
            {product.category}
          </p>
          <button
            className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
