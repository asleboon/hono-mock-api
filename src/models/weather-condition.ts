import { Option } from "fp-ts/lib/Option";
import { hasOwnProperty, some } from "fp-ts/lib/ReadonlyRecord";

export enum WeatherCondition {
    ClearSky_Day = "clearsky_day",
    ClearSky_Night = "clearsky_night",
    ClearSky_PolarTwilight = "clearsky_polartwilight",
    Fair_Day = "fair_day",
    Fair_Night = "fair_night",
    Fair_PolarTwilight = "fair_polartwilight",
    PartlyCloudy_Day = "partlycloudy_day",
    PartlyCloudy_Night = "partlycloudy_night",
    PartlyCloudy_PolarTwilight = "partlycloudy_polartwilight",
    Cloudy = "cloudy",
    RainShowers_Day = "rainshowers_day",
    RainShowers_Night = "rainshowers_night",
    RainShowers_PolarTwilight = "rainshowers_polartwilight",
    RainShowersAndThunder_Day = "rainshowersandthunder_day",
    RainShowersAndThunder_Night = "rainshowersandthunder_night",
    RainShowersAndThunder_PolarTwilight = "rainshowersandthunder_polartwilight",
    SleetShowers_Day = "sleetshowers_day",
    SleetShowers_Night = "sleetshowers_night",
    SleetShowers_PolarTwilight = "sleetshowers_polartwilight",
    SnowShowers_Day = "snowshowers_day",
    SnowShowers_Night = "snowshowers_night",
    SnowShowers_PolarTwilight = "snowshowers_polartwilight",
    Rain = "rain",
    HeavyRain = "heavyrain",
    HeavyRainAndThunder = "heavyrainandthunder",
    Sleet = "sleet",
    Snow = "snow",
    SnowAndThunder = "snowandthunder",
    Fog = "fog",
    SleetShowersAndThunder_Day = "sleetshowersandthunder_day",
    SleetShowersAndThunder_Night = "sleetshowersandthunder_night",
    SleetShowersAndThunder_PolarTwilight = "sleetshowersandthunder_polartwilight",
    SnowShowersAndThunder_Day = "snowshowersandthunder_day",
    SnowShowersAndThunder_Night = "snowshowersandthunder_night",
    SnowShowersAndThunder_PolarTwilight = "snowshowersandthunder_polartwilight",
    RainAndThunder = "rainandthunder",
    SleetAndThunder = "sleetandthunder",
    LightRainShowersAndThunder_Day = "lightrainshowersandthunder_day",
    LightRainShowersAndThunder_Night = "lightrainshowersandthunder_night",
    LightRainShowersAndThunder_PolarTwilight = "lightrainshowersandthunder_polartwilight",
    HeavyRainShowersAndThunder_Day = "heavyrainshowersandthunder_day",
    HeavyRainShowersAndThunder_Night = "heavyrainshowersandthunder_night",
    HeavyRainShowersAndThunder_PolarTwilight = "heavyrainshowersandthunder_polartwilight",
    LightsSleetShowersAndThunder_Day = "lightssleetshowersandthunder_day",
    LightsSleetShowersAndThunder_Night = "lightssleetshowersandthunder_night",
    LightsSleetShowersAndThunder_PolarTwilight = "lightssleetshowersandthunder_polartwilight",
    HeavySleetShowersAndThunder_Day = "heavysleetshowersandthunder_day",
    HeavySleetShowersAndThunder_Night = "heavysleetshowersandthunder_night",
    HeavySleetShowersAndThunder_PolarTwilight = "heavysleetshowersandthunder_polartwilight",
    LightsSnowShowersAndThunder_Day = "lightssnowshowersandthunder_day",
    LightsSnowShowersAndThunder_Night = "lightssnowshowersandthunder_night",
    LightsSnowShowersAndThunder_PolarTwilight = "lightssnowshowersandthunder_polartwilight",
    HeavySnowShowersAndThunder_Day = "heavysnowshowersandthunder_day",
    HeavySnowShowersAndThunder_Night = "heavysnowshowersandthunder_night",
    HeavySnowShowersAndThunder_PolarTwilight = "heavysnowshowersandthunder_polartwilight",
    LightRainAndThunder = "lightrainandthunder",
    LightSleetAndThunder = "lightsleetandthunder",
    HeavySleetAndThunder = "heavysleetandthunder",
    LightSnowAndThunder = "lightsnowandthunder",
    HeavySnowAndThunder = "heavysnowandthunder",
    LightRainShowers_Day = "lightrainshowers_day",
    LightRainShowers_Night = "lightrainshowers_night",
    LightRainShowers_PolarTwilight = "lightrainshowers_polartwilight",
    HeavyRainShowers_Day = "heavyrainshowers_day",
    HeavyRainShowers_Night = "heavyrainshowers_night",
    HeavyRainShowers_PolarTwilight = "heavyrainshowers_polartwilight",
    LightSleetShowers_Day = "lightsleetshowers_day",
    LightSleetShowers_Night = "lightsleetshowers_night",
    LightSleetShowers_PolarTwilight = "lightsleetshowers_polartwilight",
    HeavySleetShowers_Day = "heavysleetshowers_day",
    HeavySleetShowers_Night = "heavysleetshowers_night",
    HeavySleetShowers_PolarTwilight = "heavysleetshowers_polartwilight",
    LightSnowShowers_Day = "lightsnowshowers_day",
    LightSnowShowers_Night = "lightsnowshowers_night",
    LightSnowShowers_PolarTwilight = "lightsnowshowers_polartwilight",
    HeavySnowShowers_Day = "heavysnowshowers_day",
    HeavySnowShowers_Night = "heavysnowshowers_night",
    HeavySnowShowers_PolarTwilight = "heavysnowshowers_polartwilight",
    LightRain = "lightrain",
    LightSleet = "lightsleet",
    HeavySleet = "heavysleet",
    LightSnow = "lightsnow",
    HeavySnow = "heavysnow"
}

const isWeatherConditionSymbol = (key: string): key is WeatherConditionSymbol => {
    if (weatherIconMapping[key as WeatherConditionSymbol]) {
        return true;
    }
    return false;
};

export const getIcon = (key: string): string => {
    if (isWeatherConditionSymbol(key)) {
        return weatherIconMapping[key];
    }
    return "/01d.svg";
};

export type WeatherConditionSymbol = (typeof WeatherCondition)[keyof typeof WeatherCondition];

export const weatherIconMapping: Record<WeatherConditionSymbol, string> = {
    [WeatherCondition.ClearSky_Day]: "01d.svg",
    [WeatherCondition.ClearSky_Night]: "01n.svg",
    [WeatherCondition.ClearSky_PolarTwilight]: "01m.svg",
    [WeatherCondition.Fair_Day]: "02d.svg",
    [WeatherCondition.Fair_Night]: "02n.svg",
    [WeatherCondition.Fair_PolarTwilight]: "02m.svg",
    [WeatherCondition.PartlyCloudy_Day]: "03d.svg",
    [WeatherCondition.PartlyCloudy_Night]: "03n.svg",
    [WeatherCondition.PartlyCloudy_PolarTwilight]: "03m.svg",
    [WeatherCondition.Cloudy]: "04.svg",
    [WeatherCondition.RainShowers_Day]: "05d.svg",
    [WeatherCondition.RainShowers_Night]: "05n.svg",
    [WeatherCondition.RainShowers_PolarTwilight]: "05m.svg",
    [WeatherCondition.RainShowersAndThunder_Day]: "06d.svg",
    [WeatherCondition.RainShowersAndThunder_Night]: "06n.svg",
    [WeatherCondition.RainShowersAndThunder_PolarTwilight]: "06m.svg",
    [WeatherCondition.SleetShowers_Day]: "07d.svg",
    [WeatherCondition.SleetShowers_Night]: "07n.svg",
    [WeatherCondition.SleetShowers_PolarTwilight]: "07m.svg",
    [WeatherCondition.SnowShowers_Day]: "08d.svg",
    [WeatherCondition.SnowShowers_Night]: "08n.svg",
    [WeatherCondition.SnowShowers_PolarTwilight]: "08m.svg",
    [WeatherCondition.Rain]: "09.svg",
    [WeatherCondition.HeavyRain]: "10.svg",
    [WeatherCondition.HeavyRainAndThunder]: "11.svg",
    [WeatherCondition.Sleet]: "12.svg",
    [WeatherCondition.Snow]: "13.svg",
    [WeatherCondition.SnowAndThunder]: "14.svg",
    [WeatherCondition.Fog]: "15.svg",
    [WeatherCondition.SleetShowersAndThunder_Day]: "20d.svg",
    [WeatherCondition.SleetShowersAndThunder_Night]: "20n.svg",
    [WeatherCondition.SleetShowersAndThunder_PolarTwilight]: "20m.svg",
    [WeatherCondition.SnowShowersAndThunder_Day]: "21d.svg",
    [WeatherCondition.SnowShowersAndThunder_Night]: "21n.svg",
    [WeatherCondition.SnowShowersAndThunder_PolarTwilight]: "21m.svg",
    [WeatherCondition.RainAndThunder]: "22.svg",
    [WeatherCondition.SleetAndThunder]: "23.svg",
    [WeatherCondition.LightRainShowersAndThunder_Day]: "24d.svg",
    [WeatherCondition.LightRainShowersAndThunder_Night]: "24n.svg",
    [WeatherCondition.LightRainShowersAndThunder_PolarTwilight]: "24m.svg",
    [WeatherCondition.HeavyRainShowersAndThunder_Day]: "25d.svg",
    [WeatherCondition.HeavyRainShowersAndThunder_Night]: "25n.svg",
    [WeatherCondition.HeavyRainShowersAndThunder_PolarTwilight]: "25m.svg",
    [WeatherCondition.LightsSleetShowersAndThunder_Day]: "26d.svg",
    [WeatherCondition.LightsSleetShowersAndThunder_Night]: "26n.svg",
    [WeatherCondition.LightsSleetShowersAndThunder_PolarTwilight]: "26m.svg",
    [WeatherCondition.HeavySleetShowersAndThunder_Day]: "27d.svg",
    [WeatherCondition.HeavySleetShowersAndThunder_Night]: "27n.svg",
    [WeatherCondition.HeavySleetShowersAndThunder_PolarTwilight]: "27m.svg",
    [WeatherCondition.LightsSnowShowersAndThunder_Day]: "28d.svg",
    [WeatherCondition.LightsSnowShowersAndThunder_Night]: "28n.svg",
    [WeatherCondition.LightsSnowShowersAndThunder_PolarTwilight]: "28m.svg",
    [WeatherCondition.HeavySnowShowersAndThunder_Day]: "30d.svg",
    [WeatherCondition.HeavySnowShowersAndThunder_Night]: "30n.svg",
    [WeatherCondition.HeavySnowShowersAndThunder_PolarTwilight]: "30m.svg",
    [WeatherCondition.LightRainAndThunder]: "30.svg",
    [WeatherCondition.LightSleetAndThunder]: "31.svg",
    [WeatherCondition.HeavySleetAndThunder]: "32.svg",
    [WeatherCondition.LightSnowAndThunder]: "33.svg",
    [WeatherCondition.HeavySnowAndThunder]: "34.svg",
    [WeatherCondition.LightRainShowers_Day]: "40d.svg",
    [WeatherCondition.LightRainShowers_Night]: "40n.svg",
    [WeatherCondition.LightRainShowers_PolarTwilight]: "40m.svg",
    [WeatherCondition.HeavyRainShowers_Day]: "41d.svg",
    [WeatherCondition.HeavyRainShowers_Night]: "41n.svg",
    [WeatherCondition.HeavyRainShowers_PolarTwilight]: "41m.svg",
    [WeatherCondition.LightSleetShowers_Day]: "42d.svg",
    [WeatherCondition.LightSleetShowers_Night]: "42n.svg",
    [WeatherCondition.LightSleetShowers_PolarTwilight]: "42m.svg",
    [WeatherCondition.HeavySleetShowers_Day]: "43d.svg",
    [WeatherCondition.HeavySleetShowers_Night]: "43n.svg",
    [WeatherCondition.HeavySleetShowers_PolarTwilight]: "43m.svg",
    [WeatherCondition.LightSnowShowers_Day]: "44d.svg",
    [WeatherCondition.LightSnowShowers_Night]: "44n.svg",
    [WeatherCondition.LightSnowShowers_PolarTwilight]: "44m.svg",
    [WeatherCondition.HeavySnowShowers_Day]: "45d.svg",
    [WeatherCondition.HeavySnowShowers_Night]: "45n.svg",
    [WeatherCondition.HeavySnowShowers_PolarTwilight]: "45m.svg",
    [WeatherCondition.LightRain]: "46.svg",
    [WeatherCondition.LightSleet]: "47.svg",
    [WeatherCondition.HeavySleet]: "48.svg",
    [WeatherCondition.LightSnow]: "49.svg",
    [WeatherCondition.HeavySnow]: "50.svg"
};
