import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { register } from "@/features/auth/services/authService";
import type { RegisterRequest } from "@/features/auth/types/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.message;

  const [formData, setFormData] = useState<RegisterRequest>({
    fullName: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (formData.fullName.trim().length < 2) {
      setError("Full name must contain at least 2 characters.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      navigate("/login", {
        state: {
          message: "Account created successfully. Please login.",
        },
      });
    } catch (error: any) {
      console.log("REGISTER ERROR:", error);
      console.log("STATUS:", error?.response?.status);
      console.log("DATA:", error?.response?.data);

      setError(
        error?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div
            className="flex items-center justify-center
                                    gap-2 mb-3"
          >
            <span className="text-3xl">🎙️</span>

            <h1 className="text-2xl font-bold text-[#111827]">VoiceForge AI</h1>
          </div>

          <p className="text-sm text-gray-500">
            Create your account and start generating voices.
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white border border-gray-200
                                rounded-2xl shadow-sm p-8"
        >
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create an account
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Get started with VoiceForge AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium
                                           text-gray-700 mb-2"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="w-full px-4 py-3
                                           border border-gray-300
                                           rounded-lg text-sm
                                           outline-none
                                           transition
                                           focus:border-gray-900
                                           focus:ring-2
                                           focus:ring-gray-900/10"
              />
            </div>

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
                                           outline-none
                                           transition
                                           focus:border-gray-900
                                           focus:ring-2
                                           focus:ring-gray-900/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium
                                           text-gray-700 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3
                                           border border-gray-300
                                           rounded-lg text-sm
                                           outline-none
                                           transition
                                           focus:border-gray-900
                                           focus:ring-2
                                           focus:ring-gray-900/10"
              />

              <p className="text-xs text-gray-400 mt-2">
                Use at least 6 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium
                                           text-gray-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="w-full px-4 py-3
                                           border border-gray-300
                                           rounded-lg text-sm
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

            {successMessage && (
              <div
                className="px-4 py-3 rounded-lg
                    bg-green-50 border border-green-100
                    text-green-600 text-sm"
              >
                {successMessage}
              </div>
            )}

            {/* Register */}
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
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <div
            className="mt-7 pt-6 border-t border-gray-100
                                    text-center"
          >
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-gray-900
                                           hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 VoiceForge AI
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
