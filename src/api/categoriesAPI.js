import axios from "axios";

const baseURL = import.meta.env.VITE_URL_API;

export const getCategories = async (setCategories) => {
  const endPoint = `${baseURL}/categories`;

  try {
    const res = await axios.get(endPoint);

    if (res.data) {
      setCategories(res.data.data);
    }
  } catch (err) {
    console.error(err);
  }
};
