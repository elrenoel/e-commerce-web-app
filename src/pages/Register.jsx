import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { register } from "../api/authAPI";

const Register = () => {
  const userRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(register, formData);

      navigate("/login", { replace: true });
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

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="h-full py-[5%]">
        <form
          className="px-10 flex flex-col gap-2 min-w-112.5"
          onSubmit={handleRegister}
        >
          <h1 className="text-center text-4xl font-bold">Cocoa</h1>
          <p className="text-center">Sign in to your account</p>
          <label className="flex flex-col gap-2 mt-8">Email Address</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            autoComplete="off"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label className="flex flex-col gap-2 mt-3">Name</label>
          <input
            type="text"
            id="name"
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            autoComplete="off"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label className="flex flex-col gap-2 mt-3">Phone Number</label>
          <input
            type="number"
            id="phone"
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            autoComplete="off"
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: toString(e.target.value) })
            }
          />
          <label className="flex flex-col gap-2 mt-3">Password</label>
          <input
            type="password"
            id="password"
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            autoComplete="off"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errMsg !== "" ? (
            <p className="text-center text-red-500">{errMsg}</p>
          ) : null}
          <button
            className="mt-3 bg-black min-h-10 rounded text-white"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <p
          className="hover:underline text-blue-600 text-center mt-2"
          onClick={() => navigate("/login")}
        >
          Login
        </p>
      </div>
    </div>
  );
};

export default Register;
