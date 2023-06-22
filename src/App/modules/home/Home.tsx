import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.scss"
import { TimeWidget } from "./components/time-widget/TimeWidget";
import { WeatherInfo } from "App/shared/interfaces/weather.interface";
import { LocationInfo } from "App/shared/interfaces/location.interface";
import { WeatherServices } from "App/core/services/weather.service";
import { WeatherWidget } from "./components/weather-widget/WeatherWidget";

export const Home = () => {

    const [weather, setWeather] = useState<WeatherInfo>({} as WeatherInfo);
    const [location, setLocation] = useState<LocationInfo>({} as LocationInfo);
    const [locations, setLocations] = useState<LocationInfo[]>([] as LocationInfo[]);
    const [userLocation, setUserLocation] = useState<string>("");

    useEffect(() => {
        WeatherServices.getUserLocationInfo(userLocation).then(selectLocation);
    }, [userLocation]);

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(position => {
            setUserLocation(`${position.coords.longitude},${position.coords.latitude}`);
        });
    }, []);

    const getLocation = (location: string): void => {
        WeatherServices.getLocations(location).then(sortLocations).then(setLocations);
    };

    const sortLocations = (locations: LocationInfo[]) => {
        return locations.sort((x: LocationInfo, y: LocationInfo) => {
            if (x.country + x?.adminArea < y.country + y?.adminArea) {
                return -1;
            }
            if (x.country + x.adminArea > y.country + y.adminArea) {
                return 1;
            }
            return 0;
        });
    };

    const selectLocation = (value: LocationInfo): void => {
        WeatherServices.getWeatherData(value.id).then(setWeather);
        setLocation(value);
    };

    return (
        <>
            <div className="left-content">
                <WeatherWidget weather={weather} location={location} />
            </div>
            <Paper elevation={3} className="right-content">
                <TimeWidget />
            </Paper>
        </>
    );
}