import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "./routePaths";
import EntryRoute from "./EntryRoute";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import DashboardLayout from "@/shared/layouts/DashboardLayout";
import DashboardPage from "@/features/user/pages/DashboardPage";
import VoicePage from "@/features/voice/pages/VoicePage";
import HistoryPage from "@/features/history/pages/HistoryPage";
import ProfilePage from "@/features/user/pages/ProfilePage";
import OAuth2SuccessPage from "../features/auth/pages/OAuth2SuccessPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Website entry point */}
        <Route path={ROUTES.HOME} element={<EntryRoute />} />

        {/* Authentication */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        <Route path={ROUTES.OAUTH} element={<OAuth2SuccessPage />} />

        {/* Protected application */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

            <Route path={ROUTES.VOICE} element={<VoicePage />} />

            <Route path={ROUTES.HISTORY} element={<HistoryPage />} />

            <Route path={ROUTES.USER} element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Unknown URLs */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
