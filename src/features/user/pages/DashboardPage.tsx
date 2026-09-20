import { useAuth } from "../../../features/auth/hooks/useAuth";

const DashboardPage = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <p>Loading user...</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome, {user.fullName}
                </h1>

                <p className="text-gray-600">
                    Manage your AI voice generations from here.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-5">
                    <p className="text-sm text-gray-500">
                        Email
                    </p>

                    <p className="mt-2 font-medium">
                        {user.email}
                    </p>
                </div>

                <div className="rounded-lg border p-5">
                    <p className="text-sm text-gray-500">
                        credits
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        {user.credits}
                    </p>
                </div>

                <div className="rounded-lg border p-5">
                    <p className="text-sm text-gray-500">
                        Subscription
                    </p>

                    <p className="mt-2 font-medium">
                        {user.subscriptionPlan}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <h2 className="text-xl font-semibold">
                        Generate voice
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Convert your text into AI-generated speech.
                    </p>

                    <button 
                       type="button"
                       className="mt-4 rounded-lg bg-black px-5 py-2.5 text-white"
                    >
                        Generate Voice
                    </button>
                </div>

                <button
                   type="button"
                   onClick={logout}
                   className="rounded-lg border px-5 py-2.5"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;