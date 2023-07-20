export interface CurrentWeatherInfoDTO {
    current: WeatherInfo;
}

export interface ChartSeries {
    x: string;
    y: number;
    icon: string;
}

export interface WeatherHourlyInfoDTO {
    forecast: WeatherInfo[]
}

export interface WeatherDailyInfoDTO {
    forecast: WeatherDailyInfo[]
}

export interface WeatherDailyInfo {
    date: string;
    symbol: string;
    symbolPhrase: string;
    maxTemp: number;
    minTemp: number;
    maxFeelsLikeTemp: number;
    minFeelsLikeTemp: number;
    maxRelHumidity: number;
    minRelHumidity: number;
    maxDewPoint: number;
    minDewPoint: number;
    precipAccum: number;
    snowAccum: number;
    maxWindSpeed: number;
    windDir: number;
    maxWindGust: number;
    precipProb: number;
    cloudiness: number;
    sunrise: string;
    sunset: number;
    sunriseEpoch: number;
    sunsetEpoch: number;
    moonrise: number;
    moonset: number;
    moonPhase: number;
    uvIndex: number;
    minVisibility: number;
    pressure: number;
    confidence: string;
    solarRadiationSum: number
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