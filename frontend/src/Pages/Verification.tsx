import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoadingBar from "../components/LoadingBar";

const inputStyle =
  "w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none transition focus:border-[#5E162F] focus:ring-2 focus:ring-[#5E162F]/20";

const Verification = () => {
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMsg("");
    }, 1000);
    try {
      await api.post("/auth/verifyemail", form);
      navigate("/");
    } catch (error: any) {
      setMsg(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
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

            <p className="text-gray-500 mt-2">Please enter your OTP</p>
          </div>
          {loading ? (
            <div className="flex justify-center">
              <LoadingBar />
            </div>
          ) : (
            <>
              {msg && (
                <div className="mb-5 rounded-lg bg-[#FBECEF] border border-[#E8B8C3] px-4 py-3 text-center text-sm text-[#8B2635]">
                  {msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <input
                    id="code"
                    className={inputStyle}
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#8B2635] hover:bg-[#A83A48] text-white font-semibold rounded-lg transition duration-200 cursor-pointer"
                >
                  Verify
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
