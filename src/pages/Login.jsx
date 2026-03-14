import { useRef, useState, useEffect } from "react";
import { login } from "../api/authAPI";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(login, formData);
    } catch (err) {
      const msg = err.response?.data?.message;
      setErrMsg(msg);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="h-full py-[5%]">
        <form
          className="px-10 flex flex-col gap-2 min-w-112.5"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-4xl font-bold">Cocoa</h1>
          <p className="text-center">Sign in to your account</p>
          <label className="mt-8" htmlFor="email">
            Email Address
          </label>
          <input
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label className="mt-3" htmlFor="password">
            Password
          </label>
          <input
            className="min-h-11 px-3 rounded border-2 outline-blue-600"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          {errMsg.length > 0 ? <p className="text-center text-red-500">{errMsg}</p> : null}
          <button
            className="mt-3 bg-black min-h-10 rounded text-white"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="hover:underline text-blue-600 text-center mt-2">
          Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
