import { Paper } from "@mui/material";
import { WeatherDailyInfo } from "App/shared/interfaces/weather.interface";
import React, { useState } from "react";
import "./WeatherDailyWidget.scss";

type SelectWeather = (arg: WeatherDailyInfo) => void;

export const WeatherDailyWidget = (props: { weatherDaily: WeatherDailyInfo[], select: SelectWeather }) => {
    const [activeItem, setActiveItem] = useState(0);

    const clickHandler = (key: number): void => {
        setActiveItem(key);
        props.select(props.weatherDaily[key])
    }
    console.log(props.weatherDaily)
    return (
        <div className="weather-hourly-widget">
            {props.weatherDaily.map((item, key) =>
                <Paper elevation={3} key={key} className={`wether-hourly-card ${key === activeItem && "active"}`} onClick={() => clickHandler(key)}>
                    {key ? new Date(item.date).toLocaleTimeString("en-US", {
                        weekday: 'short'
                    }).slice(0,3) : "Today"}
                    <img className="icon" src="./assets/partly-cloudy-day.svg" alt="icon" />
                    {item.maxTemp}°
                </Paper>
            )}
        </div>
    );
}