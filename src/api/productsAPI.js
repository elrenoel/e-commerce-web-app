import { api } from "./config";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const getAllProducts = async () => {
  const res = await api.get("/products/admin");
  return res.data.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.patch(`/products/${id}`, data);
  return res.data.data;
};
