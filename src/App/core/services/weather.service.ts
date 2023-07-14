import { WeatherDailyInfo, WeatherDailyInfoDTO, WeatherInfo } from "App/shared/interfaces/weather.interface";
import { AuthService } from "./auth.service";
import { LocationInfo, LocationsDTO } from "App/shared/interfaces/location.interface";

export class WeatherServices {
    static currentUserLocation: string;

    static getWeatherData = async (location: string): Promise<WeatherInfo> => {
        if (!location) return {} as WeatherInfo;

        const res = await fetch(`/proxy/api/v1/current/${location}?lang=en`, {
            headers: {
                Authorization: `Bearer ${AuthService.getTokenData()?.access_token}`
            }
        });
        const data = await res.json();
        const currentWeather = data.current;
        return currentWeather;
    };

    static getUserLocationInfo = async (location: string): Promise<LocationInfo> => {
        if (!location) return {} as LocationInfo;

        const res = await fetch(`/proxy/api/v1/location/${location}?lang=en`, {
            headers: {
                Authorization: `Bearer ${AuthService.getTokenData()?.access_token}`
            }
        });
        const data = await res.json();
        return data;
    };

    static getLocations = async (value: string): Promise<LocationInfo[]> => {
        if (!value) return [] as LocationInfo[];

        const res = await fetch(`/proxy/api/v1/location/search/${value}?lang=en`, {
            headers: {
                Authorization: `Bearer ${AuthService.getTokenData()?.access_token}`
            }
        });
        const data: LocationsDTO = await res.json();
        return data.locations;
    };

    static getWeatherDaily = async (value: string): Promise<WeatherDailyInfo[]> => {
        if (!value) return [] as WeatherDailyInfo[];

        const res = await fetch(`/proxy/api/v1/forecast/daily/${value}?dataset=full`, {
            headers: {
                Authorization: `Bearer ${AuthService.getTokenData()?.access_token}`
            }
        });

        const data: WeatherDailyInfoDTO = await res.json();
        return data.forecast;
    };
}
