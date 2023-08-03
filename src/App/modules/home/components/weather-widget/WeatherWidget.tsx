import React, { ReactElement } from "react";
import "./WeatherWidget.scss"
import { WeatherInfo } from "../../../../shared/interfaces/weather.interface";
import { LocationInfo } from "../../../../shared/interfaces/location.interface";
import { Skeleton } from "@mui/material";
import { WeatherIcons } from "../../../../shared/constants/icons";

export const WeatherWidget = (props: { weather: WeatherInfo; location: LocationInfo }): ReactElement => {
    return (
        props.weather.temperature ?
            (
                <div className="weather-widget">
                    {props.weather?.symbol && <img className="icon" src={WeatherIcons[props.weather?.symbol]} alt="weather-icon" />}
                    <div className="weather-widget-info">
                        <span className="country">{props.location.country}</span>
                        <span className="temperature">{props.weather.temperature}°</span>
                    </div>
                </div>
            )
            :
            (
                <div className="weather-widget">
                    <Skeleton
                        sx={{ margin: "20px" }}
                        variant="circular"
                        width={120}
                        height={120}>
                    </Skeleton>
                </div>
            )
    );
}