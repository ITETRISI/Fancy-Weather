import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
// import { AuthService } from "./services/auth.service";
import { Home } from "./portal/home/Home";
import { Login } from "./auth/login/Login";
import { PortalLayout } from "./portal/portal-layout/PortalLayout";
import { AuthLayout } from "./auth/auth-layout/AuthLayout";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        // loader: async () => {
        //     return AuthService.auth();
        // },
        element: (
            <App />
        ),
        children: [
            {
                element: (
                    <AuthLayout />
                ),
                children: [
                    {
                        path: "/",
                        element: (
                            <Login />
                        ),
                    }
                ]
            },
            {
                element: (
                    <PortalLayout />
                ),
                children: [
                    {
                        path: "home",
                        element: (
                            <Home />
                        ),
                    }
                ]
            },
        ]
    }
]);
