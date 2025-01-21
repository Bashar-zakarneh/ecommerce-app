import axios from "axios";
import { Product } from "../types/product";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.message);
    }
    throw new Error("Failed to fetch products");
  }
};

// get a product by ID
export const getProductById = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return response.json();
};