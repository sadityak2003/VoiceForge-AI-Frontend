import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routePaths";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <main className="min-h-screen">
            <section className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">
                        VoiceForge AI
                    </h1>

                    <p className="mt-4 text-lg text-gray-600">
                        Create Powerful AI-generated voices.
                    </p>

                    <button
                      className="mt-8 rounded-lg bg-black px-6 py-3 text-white cursor-pointer"
                      onClick={() => navigate(ROUTES.LOGIN)}
                    >
                        Get Started
                    </button>
                </div>
            </section>
        </main>
    );
};

export default HomePage;