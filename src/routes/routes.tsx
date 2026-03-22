import { createBrowserRouter } from "react-router";
import App from "../App";
import { LoginPage } from "../pages/login.page";
import RegisterPage from "../pages/register.page";
import HomePage from "../pages/home.page";
import DashboardLayout from "../layouts/dashboard.layout";
import DashboardPages from "../pages/dashboard/dashboard.page";
import NotFoundPage from "../pages/notfound.page";
import PasswordResetPage from "../pages/password-reset.page";
import DownloadPage from "../pages/download.page";
import AuthRouteProtected from "../middlewares/auth.middleware";
import PatchNotesPage from "../pages/patch-notes.page";
import GuestRoute from "../middlewares/guest.middleware";
import ShopCashPage from "../pages/dashboard/shop-cash.page";
import ShopMedalPage from "../pages/dashboard/shop-medal.page";
import ShopWeaponPage from "../pages/dashboard/shop-weapon.page";
import ChangeEmailPage from "../pages/dashboard/change-email.page";
import ChangePasswordPage from "../pages/dashboard/change-password.page";
import ErrorBoundary, { ErrorFallbackPage } from "../pages/error.page";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        errorElement: <ErrorFallbackPage />,
        children: [
            { index: true, Component: HomePage },
            {
                path: "login", element: (<GuestRoute>
                    <LoginPage />
                </GuestRoute>)
            },
            {
                path: "register", element: (<GuestRoute>
                    <RegisterPage />
                </GuestRoute>)
            },
            { path: "download", Component: DownloadPage },
            { path: "patch-notes", Component: PatchNotesPage },
            { path: "password-reset", Component: PasswordResetPage }
        ]

    },
    {
        path: "/dashboard",
        element: (<ErrorBoundary>
            <AuthRouteProtected>
                <DashboardLayout />
            </AuthRouteProtected>
        </ErrorBoundary>),
        children: [
            { index: true, Component: DashboardPages },
            { path: "/dashboard/shop-cash", Component: ShopCashPage },
            { path: "/dashboard/shop-medal", Component: ShopMedalPage },
            { path: "/dashboard/shop-weapon", Component: ShopWeaponPage },
            { path: "/dashboard/change-email", Component: ChangeEmailPage },
            { path: "/dashboard/change-password", Component: ChangePasswordPage }
        ]

    },
    {
        path: "*", element: <NotFoundPage />
    }
]);
