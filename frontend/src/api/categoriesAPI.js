import { api } from "./config";

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data.data;
};
