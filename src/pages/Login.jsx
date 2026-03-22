import { useRef, useState, useEffect } from "react";
import { login } from "../api/authAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData, setErrMsg, navigate);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="h-full py-[5%]">
        <form
          className="px-10 flex flex-col gap-2 min-w-112.5"
          onSubmit={handleLogin}
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
          {errMsg !== "" ? (
            <p className="text-center text-red-500">{errMsg}</p>
          ) : null}
          <button
            className="mt-3 bg-black min-h-10 rounded text-white"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p 
          className="hover:underline text-blue-600 text-center mt-2"
          onClick={() => navigate('/register')}
        >
          Create an account
        </p>
      </div>
    </div>
  );
};

export default Login;
