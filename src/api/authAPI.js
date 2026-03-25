import { api } from "./config";

export const login = async (formData, setErrMsg, navigate) => {
  try {
    const res = await api.post('/auth/login', formData);

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
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

export const register = async () =>{};
