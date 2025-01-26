import axios from "axios";
import { Cart, CartItem } from "../types/cart";

export const getUserCart = async (userId: number): Promise<Cart> => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/carts/user/${userId}`
    );
    return response.data[0];
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user cart: ${error.message}`);
    }
    throw new Error("Failed to fetch user cart");
  }
};

export const addToCart = async (userId: number, product: CartItem) => {
  try {
    const response = await axios.post("https://fakestoreapi.com/carts", {
      userId,
      products: [product],
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to add product to cart: ${error.message}`);
    }
    throw new Error("Failed to add product to cart");
  }
};
