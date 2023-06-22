import React from "react";
import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App";
// import { AuthService } from "./services/auth.service";
import { Home } from "./modules/home/Home";
import { Login } from "./modules/login/Login";
import { PortalLayout } from "./layouts/portal-layout/PortalLayout";
import { AuthLayout } from "./layouts/auth-layout/AuthLayout";
import { AuthService } from "./core/services/auth.service";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
        children: [
            {
                loader: () => {
                    if(AuthService.isUserLoggedIn) throw redirect("/home")
                    return null
                },
                element: <AuthLayout />,
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
                loader: () => {
                    if(!AuthService.isUserLoggedIn) throw redirect("/")
                    return null
                },
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
