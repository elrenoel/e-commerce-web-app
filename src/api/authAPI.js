import axios from "axios";

const baseURL = import.meta.env.VITE_URL_API;

export const login = async (formData, setErrMsg, navigate) => {
  const endPoint = `${baseURL}/auth/login`;

  try {
    const res = await axios.post(endPoint, formData);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);

      navigate("/", { replace: true });
    }
  } catch (err) {
    if (err.response) {
      setErrMsg(err.response.data.message);
    } else if (err.request) {
      setErrMsg("No server response. Please try again later.");
    } else {
      setErrMsg("An error occurred. Please try again.");
    }
  }
};
export const register = `${baseURL}/auth/register`;
