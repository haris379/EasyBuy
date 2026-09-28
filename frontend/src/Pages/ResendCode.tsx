import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ResendCode = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/re-send", form);
      setMsg(response.data.message);
      if (response.status === 403) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      setTimeout(() => {
        navigate("/verify");
      }, 1000);
    } catch (error: any) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Verify your Email
            </h1>

            <p className="text-gray-500 mt-2">Please enter your email</p>
          </div>

          {msg && (
            <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-center text-sm text-blue-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                id="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResendCode;
