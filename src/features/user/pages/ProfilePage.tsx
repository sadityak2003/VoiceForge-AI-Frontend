import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

const ProfilePage = () => {
    const {
        user,
        loading,
        updating,
        error,
        updateProfile,
    } = useUser();

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (user) {
            setFullName(user.fullName);
            setAvatarUrl(user.avatarUrl ?? "");
        }
    }, [user]);

    const handleSave = async () => {
        try {
            await updateProfile({
                fullName: fullName.trim(),
                avatarUrl: avatarUrl.trim() || null,
            });

            setIsEditing(false);
        } catch {
            // Error handled by useUser
        }
    };

    const handleCancel = () => {
        if (!user) return;

        setFullName(user.fullName);
        setAvatarUrl(user.avatarUrl ?? "");
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">
                    Unable to load profile.
                </p>
            </div>
        );
    }

    const avatarLetter = user.fullName
        .charAt(0)
        .toUpperCase();

    return (
        <div className="p-8 max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        Profile
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage your account information
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 bg-gray-900 text-white text-sm
                                   rounded-lg hover:bg-gray-800 transition"
                    >
                        Edit Profile
                    </button>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-50
                                text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Main Card */}
            <div className="bg-white border border-gray-200 rounded-2xl
                            shadow-sm overflow-hidden">

                {/* User Header */}
                <div className="p-7 flex items-center gap-5">

                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full bg-gray-100
                                    flex items-center justify-center
                                    overflow-hidden flex-shrink-0">

                        {user.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.fullName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl font-semibold text-gray-600">
                                {avatarLetter}
                            </span>
                        )}

                    </div>

                    {/* User Info */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            {user.fullName}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {user.email}
                        </p>

                        <span className="inline-block mt-2 px-3 py-1
                                         rounded-full bg-gray-100
                                         text-gray-600 text-xs font-medium">
                            {user.subscriptionPlan}
                        </span>
                    </div>

                </div>

                {/* Stats */}
                <div className="px-7 pb-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500">
                            Available Credits
                        </p>

                        <p className="text-2xl font-semibold text-gray-900 mt-2">
                            {user.credits}
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500">
                            Subscription
                        </p>

                        <p className="text-2xl font-semibold text-gray-900 mt-2">
                            {user.subscriptionPlan}
                        </p>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Personal Information */}
                <div className="p-7">

                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Personal Information
                    </h3>

                    {/* Full Name */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium
                                          text-gray-700 mb-2">
                            Full Name
                        </label>

                        {isEditing ? (
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                placeholder="Enter your full name"
                                className="w-full px-4 py-2.5 border
                                           border-gray-300 rounded-lg
                                           text-sm outline-none
                                           focus:ring-2 focus:ring-gray-900
                                           focus:border-transparent"
                            />
                        ) : (
                            <p className="text-sm text-gray-900">
                                {user.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium
                                          text-gray-700 mb-2">
                            Email
                        </label>

                        <p className="text-sm text-gray-900">
                            {user.email}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            Email cannot be changed.
                        </p>
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label className="block text-sm font-medium
                                          text-gray-700 mb-2">
                            Avatar URL
                        </label>

                        {isEditing ? (
                            <input
                                type="text"
                                value={avatarUrl}
                                onChange={(e) =>
                                    setAvatarUrl(e.target.value)
                                }
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-4 py-2.5 border
                                           border-gray-300 rounded-lg
                                           text-sm outline-none
                                           focus:ring-2 focus:ring-gray-900
                                           focus:border-transparent"
                            />
                        ) : (
                            <p className="text-sm text-gray-500 break-all">
                                {user.avatarUrl || "No avatar set"}
                            </p>
                        )}
                    </div>

                </div>

                {/* Actions */}
                {isEditing && (
                    <>
                        <div className="border-t border-gray-100" />

                        <div className="p-7 flex justify-end gap-3">

                            <button
                                onClick={handleCancel}
                                disabled={updating}
                                className="px-5 py-2.5 border
                                           border-gray-300 rounded-lg
                                           text-sm font-medium
                                           text-gray-700
                                           hover:bg-gray-50 transition
                                           disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                disabled={
                                    updating ||
                                    !fullName.trim()
                                }
                                className="px-5 py-2.5 bg-gray-900
                                           text-white rounded-lg text-sm
                                           font-medium hover:bg-gray-800
                                           transition disabled:opacity-50"
                            >
                                {updating
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default ProfilePage;