import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import HomePage from "../pages/home-page";
// import LoginPage from "../pages/login-page";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: HomePage},
            {path: "login", Component: LoginPage},
            {path: "register", Component: RegisterPage}
        ]
    }
]);
