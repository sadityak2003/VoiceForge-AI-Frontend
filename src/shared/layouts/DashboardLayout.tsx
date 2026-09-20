import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { ROUTES } from "../../routes/routePaths";

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          🎙️ VoiceForge AI
        </div>

        <nav className="sidebar-nav">
          <a href={ROUTES.DASHBOARD}>Dashboard</a>
          <a href={ROUTES.VOICE}>Generate Voice</a>
          <a href={ROUTES.HISTORY}>History</a>
          <a href={ROUTES.USER}>Profile</a>
        </nav>

        <button
          className="sidebar-logout"
          onClick={logout}
        >
          Logout
        </button>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
          </div>

          <div className="header-user">
            <span>
              {user?.fullName || "User"}
            </span>

            <span className="header-credits">
              {user?.credits ?? 0} credits
            </span>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;