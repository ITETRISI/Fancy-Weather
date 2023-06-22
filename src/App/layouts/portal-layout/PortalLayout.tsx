import React from "react";
import { Outlet } from "react-router-dom";
import "./PortalLayout.scss";

export const PortalLayout = () => {
    return (
        <div className="portal-layout">
            <Outlet />
        </div>
    );
};