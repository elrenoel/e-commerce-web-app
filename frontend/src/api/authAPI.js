import { api } from "./config";

export const login = async (formData) => {
  try {
    const res = await api.post("/auth/login", formData);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user_role", user.role);

    return { success: true, user };
  } catch (err) {
    const message =
      err.response?.data?.message ||
      (err.request ? "Server tidak merespons" : "Terjadi kesalahan sistem");

    throw new Error(message);
  }
};

export const register = async (formData) => {
  try {
    const res = await api.post("/auth/register", formData);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message ||
      (err.request ? "Server tidak merespons" : "Terjadi kesalahan sistem");

    throw new Error(message);
  }
};
