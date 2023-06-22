import React, { ReactElement } from "react";
import "./WeatherWidget.scss"
import { WeatherInfo } from "App/shared/interfaces/weather.interface";
import { LocationInfo } from "App/shared/interfaces/location.interface";

export const WeatherWidget = (props: { weather: WeatherInfo; location: LocationInfo }): ReactElement => {
    const imageUrl = `./assets/partly-cloudy-day.svg`;
    return (
        <div className="weather-widget">
            { props.weather?.symbol && <img className="icon" src={imageUrl} alt="weather-icon" />}
            <span className="country">{props.location.country}</span>
            <span className="temperature">{props.weather.temperature}°</span>
        </div>
    );
}