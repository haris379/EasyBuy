import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

interface FormObj {
  name: string;
  email: string;
  password: string;
}
const inputStyle =
  "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-[#5E162F] focus:ring-2 focus:ring-[#5E162F]/20";

const Signup = () => {
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();
  const [form, setForm] = useState<FormObj>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
      setTimeout(() => {
        navigate("/verify");
      }, 500);
    } catch (error: any) {
      console.log(error);

      setMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

            <p className="text-gray-500 mt-2">Sign up to get started</p>
          </div>

          {msg && (
            <div className="mb-5 rounded-lg bg-[#FBECEF] border border-[#E8B8C3] px-4 py-3 text-center text-sm text-[#8B2635]">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>

              <input
                id="name"
                className={inputStyle}
                type="text"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                className={inputStyle}
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
                className={inputStyle}
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
              Create Account
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <span>Already have an account? </span>

            <Link
              to="/login"
              className="text-[#8B2635] hover:text-[#A83A48] font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
