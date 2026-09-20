import {Navigate} from "react-router-dom";

import { useAuth} from "@/features/auth/hooks/useAuth";
import { ROUTES } from "./routePaths";

import HomePage from "../features/home/pages/HomePage";

const EntryRoute = () => {
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading)  {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return (
        <HomePage />
    )
}

export default EntryRoute;