import { Paper, Skeleton } from "@mui/material";
import { WeatherDailyInfo } from "App/shared/interfaces/weather.interface";
import React, { useState } from "react";
import "./WeatherDailyWidget.scss";

type SelectWeather = (arg: WeatherDailyInfo, key: number) => void;

export const WeatherDailyWidget = (props: { weatherDaily: WeatherDailyInfo[], select: SelectWeather }) => {
    const [activeItem, setActiveItem] = useState(0);

    const clickHandler = (key: number): void => {
        setActiveItem(key);
        props.select(props.weatherDaily[key], key)
    }

    return (
        props.weatherDaily.length ? (
            <div className="weather-hourly-widget">
                {props.weatherDaily.map((item, key) =>
                    <Paper elevation={3} key={key} className={`wether-hourly-card ${key === activeItem && "active"}`} onClick={() => clickHandler(key)}>
                        {key ? new Date(item.date).toLocaleTimeString("en-US", {
                            weekday: 'short'
                        }).slice(0, 3) : "Today"}
                        <img className="icon" src="./assets/partly-cloudy-day.svg" alt="icon" />
                        {item.maxTemp}°
                    </Paper>
                )}
            </div>) : (
            <div className="weather-hourly-widget">
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
                <Skeleton variant="rectangular" width={70} height={114} />
            </div>
        )
    );
}