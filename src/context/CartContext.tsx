import { createContext, useState, useContext, ReactNode } from "react";
import { Cart, CartItem } from "../types/cart";
import { addToCart as apiAddToCart } from "../api/cartApi";

interface CartContextProps {
  cart: Cart;
  addItemToCart: (product: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>({ items: [] });

  const addItemToCart = async (product: CartItem) => {
    try {
      // Check if the item already exists in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // If it exists, update its quantity
        const updatedItems = cart.items;
        updatedItems[existingItemIndex].quantity += product.quantity;
        setCart({ items: updatedItems });
      } else {
        // If it doesn't exist, add the new item
        const updatedItems = [...cart.items, product];
        setCart({ items: updatedItems });
      }

      // await apiAddToCart(1, product); // Example with userId = 1
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
