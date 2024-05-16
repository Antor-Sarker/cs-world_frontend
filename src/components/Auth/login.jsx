import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthData } from "../../utils/auth";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handelSubmit(event) {
    event.preventDefault();

    fetch("https://cs-world-backend.vercel.app/login", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserInfo({ email: "", password: "" });
        if (result.status === false) {
          toast.error("Invalid email or password", {
            position: "top-center",
          });
        } else {
          setAuthData(result);
          navigate("/");
        }
      });
  }

  function handelOnChangeInput(event) {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  }

  return (
    <div className="bg-slate-900 h-screen pt-20">
      <div className="text-white w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md shadow-2xl shadow-slate-950">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handelSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
              required
              onChange={handelOnChangeInput}
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don{`'`}t have an account?{" "}
            <span
              className="hover:underline text-indigo-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              {" Register"}
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
