export interface CurrentWeatherInfoDTO {
    current: WeatherInfo;
}

export interface WeatherInfo {
    time: string;
    symbol: string;
    symbolPhrase: string;
    temperature: number;
    feelsLikeTemp: number;
    relHumidity: number;
    dewPoint: number;
    windSpeed: number;
    windDir: number;
    windDirString: string;
    windGust: number;
    precipProb: number;
    precipRate: number;
    cloudiness: number;
    thunderProb: number;
    uvIndex: number;
    pressure: number;
    visibility: number;
}