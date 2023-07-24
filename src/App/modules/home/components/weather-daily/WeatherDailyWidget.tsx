import { Paper, Skeleton } from "@mui/material";
import { WeatherDailyInfo } from "App/shared/interfaces/weather.interface";
import React, { useState } from "react";
import "./WeatherDailyWidget.scss";
import { WidgetContainer } from "App/shared/components/widget-container/WidgetContainer";
import { WeatherIcons } from "App/shared/constants/icons";

type SelectWeather = (arg: WeatherDailyInfo, key: number) => void;

export const WeatherDailyWidget = (props: { weatherDaily: WeatherDailyInfo[], select: SelectWeather }) => {
    const [activeItem, setActiveItem] = useState(0);

    const clickHandler = (key: number): void => {
        setActiveItem(key);
        props.select(props.weatherDaily[key], key)
    }

    return (
        props.weatherDaily.length ? (
            <WidgetContainer icon="calendar_month" title="Daily forecast">
                <div className="weather-daily-widget">
                    {props.weatherDaily.map((item, key) =>
                        <div key={key} className={`wether-daily-card ${key === activeItem && "active"}`} onClick={() => clickHandler(key)}>
                            {key ? new Date(item.date).toLocaleTimeString("en-US", {
                                weekday: 'short'
                            }).slice(0, 3) : "Today"}
                            <img className="icon" src={WeatherIcons[item.symbol]} alt="icon" />
                            {item.maxTemp}°
                        </div>
                    )}
                </div>
            </WidgetContainer>) : (
            <Skeleton variant="rectangular" width={600} height={200} />
        )
    );
}