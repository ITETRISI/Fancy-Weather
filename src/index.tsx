import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./App/AppRouter";

createRoot(document.getElementById("app") as HTMLElement).render(<RouterProvider router={AppRouter} />);
