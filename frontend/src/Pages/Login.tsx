import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
// import loadingAuthBar from "../assets/loadingAuth.gif";
import LoadingBar from "../components/LoadingBar";

interface FormObj {
  email: string;
  password: string;
}

const Login = () => {
  const [form, setForm] = useState<FormObj>({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("role", response.data.user.role);

      navigate("/");
      window.dispatchEvent(new Event("authChanged"));
    } catch (error: any) {
      console.log(error);
      setMsg(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Login</h1>

              <p className="text-gray-500 mt-2">Login to get started</p>
            </div>
            {loading ? (
              <div className="flex justify-center">
                {/* <img src={loadingAuthBar} alt="Loading" /> */}
                <LoadingBar/>
              </div>
            ) : (
              <>
                {msg && (
                  <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
                    {msg}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#8B2635] hover:bg-[#A83A48] text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-6 text-sm text-gray-600">
                  <span>Don't have an account? </span>

                  <Link
                    to="/signup"
                    className="text-[#8B2635] hover:text-[#A83A48] font-semibold"
                  >
                    Signup
                  </Link>
                </div>
                <div className="text-center mt-2 text-sm text-gray-600">
                  <span>Account not Verify? </span>

                  <Link
                    to="/re-send-otp"
                    className="text-[#8B2635] hover:text-[#A83A48] font-semibold"
                  >
                    Verify
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
