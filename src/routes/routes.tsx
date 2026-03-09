import { createBrowserRouter } from "react-router";
import App from "../App";
import { LoginPage } from "../pages/login.page";
import RegisterPage from "../pages/register.page";
import HomePage from "../pages/home.page";
import DashboardLayout from "../layouts/dashboard.layout";
import DashboardPages from "../pages/dashboard.page";
import NotFoundPage from "../pages/notfound.page";
import PasswordResetPage from "../pages/password-reset.page";
import DownloadPage from "../pages/download.page";
import AuthRouteProtected from "../middlewares/auth.middlewares";
import PatchNotesPage from "../pages/patch-notes.page";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
            { path: "download", Component: DownloadPage },
            { path: "patch-notes", Component: PatchNotesPage },
            { path: "password-reset", Component: PasswordResetPage }
        ]

    },
    {
        path: "/dashboard",
        element: (<AuthRouteProtected>
            <DashboardLayout />
        </AuthRouteProtected>),
        children: [
            { index: true, Component: DashboardPages },
        ]

    },
    {
        path: "*", element: <NotFoundPage />
    }
]);
