import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "../../convex/_generated/api";
import { getUser, logout as localLogout, getToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const { isAuthenticated: isConvexAuth, isLoading: isAuthLoading } = useConvexAuth();
    const { signOut } = useAuthActions();
    const convexUser = useQuery(api.auth.currentUser);
    const navigate = useNavigate();

    const localUser = getUser();
    const token = getToken() || "";

    const user = (isConvexAuth && convexUser) ? {
        _id: convexUser._id,
        email: convexUser.email || "",
        name: convexUser.name || "User",
    } : localUser;

    const isAuthenticated = isConvexAuth || !!localUser;

    const logout = async () => {
        if (isConvexAuth) {
            await signOut();
        }
        localLogout(navigate);
    };

    return {
        user,
        token,
        isAuthenticated,
        isConvexAuth,
        isLoading: isAuthLoading || (isConvexAuth && (convexUser === undefined || convexUser === null)),
        logout,
    };
}
