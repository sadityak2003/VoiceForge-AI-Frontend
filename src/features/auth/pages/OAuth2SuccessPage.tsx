import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/shared/context/AuthContext";

const OAuth2SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login: authenticate } = useAuth();

    const [error, setError] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (!token) {
            setError("Google login failed. No token received.");
            return;
        }

        try {
            authenticate(token);
            navigate("/dashboard", { replace: true });
        } catch {
            setError("Unable to complete Google login.");
        }
    }, [location.search, authenticate, navigate]);

    if (error) {
        return (
            <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center">

                    <div className="text-4xl mb-4">
                        ⚠️
                    </div>

                    <h1 className="text-xl font-semibold text-gray-900">
                        Login failed
                    </h1>

                    <p className="text-sm text-red-500 mt-3">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 px-5 py-2.5 bg-[#111827]
                                   text-white rounded-lg text-sm
                                   font-medium hover:bg-[#1f2937]
                                   transition"
                    >
                        Back to Login
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center">

            <div className="text-center">

                <div className="w-10 h-10 border-4 border-gray-200
                                border-t-gray-900 rounded-full
                                animate-spin mx-auto">
                </div>

                <p className="text-sm text-gray-500 mt-4">
                    Completing Google login...
                </p>

            </div>

        </div>
    );
};

export default OAuth2SuccessPage;