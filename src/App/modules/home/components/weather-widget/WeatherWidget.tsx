import React, { ReactElement } from "react";
import "./WeatherWidget.scss"
import { WeatherInfo } from "App/shared/interfaces/weather.interface";
import { LocationInfo } from "App/shared/interfaces/location.interface";
import { Skeleton } from "@mui/material";
import { WeatherIcons } from "App/shared/constants/icons";

export const WeatherWidget = (props: { weather: WeatherInfo; location: LocationInfo }): ReactElement => {
    return (
        props.weather.temperature ?
            (
                <div className="weather-widget">
                    {props.weather?.symbol && <img className="icon" src={WeatherIcons[props.weather?.symbol]} alt="weather-icon" />}
                    <span className="country">{props.location.country}</span>
                    <span className="temperature">{props.weather.temperature}°</span>
                </div>
            )
            :
            (
                <Skeleton
                    variant="circular"
                    width={300}
                    height={300}>
                </Skeleton>
            )
    );
}