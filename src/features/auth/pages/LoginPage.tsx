import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "@/features/auth/services/authService";
import type { LoginRequest } from "@/features/auth/types/auth";
import { useAuth } from "@/shared/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authenticate } = useAuth();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await login(formData);

      authenticate(response.token);

      navigate("/dashboard");
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);
      console.log("URL:", error?.config?.url);

      setError(error?.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-3xl">🎙️</span>

            <h1 className="text-2xl font-bold text-[#111827]">VoiceForge AI</h1>
          </div>

          <p className="text-sm text-gray-500">
            Turn your words into powerful voices.
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white border border-gray-200
                                rounded-2xl shadow-sm p-8"
        >
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Login to continue to VoiceForge AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium
                                           text-gray-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="w-full px-4 py-3
                                           border border-gray-300
                                           rounded-lg text-sm
                                           text-gray-900
                                           outline-none
                                           transition
                                           focus:border-gray-900
                                           focus:ring-2
                                           focus:ring-gray-900/10"
              />
            </div>

            {/* Password */}
            <div>
              <div
                className="flex items-center
                                            justify-between mb-2"
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium
                                               text-gray-700"
                >
                  Password
                </label>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3
                                           border border-gray-300
                                           rounded-lg text-sm
                                           text-gray-900
                                           outline-none
                                           transition
                                           focus:border-gray-900
                                           focus:ring-2
                                           focus:ring-gray-900/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg
                                            bg-red-50 border
                                            border-red-100
                                            text-red-600 text-sm"
              >
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3
                                       bg-[#111827]
                                       hover:bg-[#1f2937]
                                       text-white
                                       rounded-lg
                                       text-sm font-medium
                                       transition
                                       disabled:opacity-60
                                       disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">OR</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "https://voiceforge-auth.onrender.com/oauth2/authorization/google";
            }}
            className="w-full py-3 border border-gray-300
               rounded-lg text-sm font-medium
               text-gray-700 bg-white
               hover:bg-gray-50 transition
               flex items-center justify-center gap-3"
          >
            <span className="text-lg font-semibold">G</span>
            Continue with Google
          </button>

          {/* Register */}
          <div
            className="mt-7 pt-6 border-t border-gray-100
                                    text-center"
          >
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-gray-900
                                           hover:underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 VoiceForge AI
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
