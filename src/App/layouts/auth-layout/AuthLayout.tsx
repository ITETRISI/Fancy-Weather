import React from "react";
import "./AuthLayout.scss"
import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";

export const AuthLayout = () => {
    const imageUrl = `./assets/weather-icons/partly-cloudy-day.svg`;
    return (
        <div className="auth-layout">
            <div className="left-content">
                <img className="icon" src={imageUrl} alt="icon" />
                <h1 className="title"><span className="light">Weather</span> <br></br> Forecast App.</h1>
            </div>
            <Paper elevation={3} className="right-content">
                <Outlet />
            </Paper>
        </div>
    );
};