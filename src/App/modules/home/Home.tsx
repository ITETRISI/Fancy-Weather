import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.scss"
import { TimeWidget } from "./components/time-widget/TimeWidget";
import { ChartSeries, WeatherDailyInfo, WeatherInfo } from "App/shared/interfaces/weather.interface";
import { LocationInfo } from "App/shared/interfaces/location.interface";
import { WeatherServices } from "App/core/services/weather.service";
import { WeatherWidget } from "./components/weather-widget/WeatherWidget";
import { Search } from "./components/search/Search";
import { Locations } from "./components/locations/Locations";
import { WeatherDailyWidget } from "./components/weather-daily/WeatherDailyWidget";
import { ApexLineChart } from "./components/chart/Chart";

export const Home = () => {

    const [weather, setWeather] = useState<WeatherInfo>({} as WeatherInfo);
    const [weatherDaily, setWeatherDaily] = useState<WeatherDailyInfo[]>([] as WeatherDailyInfo[]);
    const [location, setLocation] = useState<LocationInfo>({} as LocationInfo);
    const [locations, setLocations] = useState<LocationInfo[]>([] as LocationInfo[]);
    const [userLocation, setUserLocation] = useState<string>("");
    const [weatherHourly, setWeatherHourly] = useState<WeatherInfo[][]>([] as WeatherInfo[][]);
    const [chartData, setChartData] = useState<ChartSeries[]>([] as ChartSeries[]);

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

    const selectWeatherDaily = (weatherInfo: WeatherDailyInfo, key: number): void => {
        setChartData(mapChartDataHourly(key))
    };

    const mapChartDataHourly = (key: number, weather: WeatherInfo[][] = weatherHourly): ChartSeries[] => {
        return weather[key]?.map(item => ({ x: item.time, y: item.temperature, icon: item.symbol }))
    }

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
        WeatherServices.getWeatherDaily(value.id).then(setWeatherDaily);
        WeatherServices.getWeatherHourly(value.id).then(data => {
            let week: WeatherInfo[][] = [];
            let weatherForDay: WeatherInfo[] = [];

            data.forEach(hourly => {
                const hours = new Date(hourly.time).getHours();

                if (hours === 0) {
                    weatherForDay.push(hourly)
                } else if (weatherForDay.length) {
                    weatherForDay.push(hourly)
                }

                if (weatherForDay.length === 25) {
                    week.push(weatherForDay);
                    weatherForDay = [];
                    weatherForDay.push(hourly)
                }
            })
            setWeatherHourly(week);
            setChartData(mapChartDataHourly(0, week)) 
            return week
        })

        setLocation(value);
    };

    return (
        <>
            <div className="left-content">
                <Paper className="search-container">
                    <Search value={getLocation} />
                    {locations.length ? <Locations value={selectLocation} locations={locations} /> : ""}
                </Paper>

                <WeatherWidget weather={weather} location={location} />
            </div>
            <Paper elevation={3} className="right-content">
                <TimeWidget timezone={location?.timezone} />
                <div className="widgets-container">
                    <WeatherDailyWidget weatherDaily={weatherDaily} select={selectWeatherDaily}></WeatherDailyWidget>
                </div>
                <ApexLineChart data={chartData} />
            </Paper>
        </>
    );
}