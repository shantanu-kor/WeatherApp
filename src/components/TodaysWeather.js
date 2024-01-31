import React, { useContext, useEffect, useState } from 'react';
import classes from './TodaysWeather.module.css';
import CityContext from '../store/cityContext';


const TodaysWeather = () => {
    const cityCtx = useContext(CityContext);
    const [degree, setDegree] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityCtx.city}&appid=${process.env.REACT_APP_API_KEY}`);
            const dat = await response.json();
            setData(dat);
        }
        getWeather();
    }, [cityCtx.city]);
    if (data !== null) {
        if (data.cod === "404") {
            return (
                <React.Fragment>
                    <h2 style={{ textAlign: "center" }}>Today's Weather</h2>
                    <h2 style={{ textAlign: "center" }}>Enter a different City (City Not Found)</h2>
                    <h3 style={{ textAlign: "center" }}>City: {cityCtx.city}</h3>
                </React.Fragment>
            )
        } else {
            const temp = data.main.temp;
            const tempC = (temp - 273.15).toFixed(2);
            const tempF = ((tempC * (9 / 5)) + 32).toFixed(2);
            const maxTemp = data.main.temp_max;
            const maxTempC = (maxTemp - 273.15).toFixed(2);
            const maxTempF = ((maxTempC * (9 / 5)) + 32).toFixed(2);
            const minTemp = data.main.temp_min;
            const minTempC = (minTemp - 273.15).toFixed(2);
            const minTempF = ((minTempC * (9 / 5)) + 32).toFixed(2);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const windGust = data.wind.gust;
            const windDeg = data.wind.deg;
            const weather = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            const weatherIconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            const toggleDegree = () => {
                setDegree(prev => !prev);
            }
            return (
                <React.Fragment>
                    <h2 style={{ textAlign: "center" }}>Today's Weather</h2>
                    <h3 style={{ textAlign: "center" }}>City: {cityCtx.city}</h3>
                    <div style={{ textAlign: "center", backgroundColor: "black", color: "white" }}>
                        <img src={weatherIconURL} alt={weather} />
                        <br />
                        <button onClick={toggleDegree} style={{ fontSize: '20px' }}>{degree ? "Farenheit" : "Celcius"}</button>
                        <table style={{ fontSize: "20px", padding: "25px", marginLeft: "auto", marginRight: "auto" }}>
                            <tbody>
                                <tr><th className={classes.tableTitles}>Temperature : </th><td className={classes.tableValues}>{degree ? `${tempC} °C` : `${tempF} °F`}</td></tr>
                                <tr><th className={classes.tableTitles}>Min Temp. : </th><td className={classes.tableValues}>{degree ? `${minTempC} °C` : `${minTempF} °F`}</td></tr>
                                <tr><th className={classes.tableTitles}>Max Temp. : </th><td className={classes.tableValues}>{degree ? `${maxTempC} °C` : `${maxTempF} °F`}</td></tr>
                                <tr><th className={classes.tableTitles}>Humidity : </th><td className={classes.tableValues}>{humidity} %</td></tr>
                                <tr><th className={classes.tableTitles}>Wind-Direction : </th><td className={classes.tableValues}>{windDeg} °</td></tr>
                                <tr><th className={classes.tableTitles}>Wind-Speed : </th><td className={classes.tableValues}>{windSpeed} m/s</td></tr>
                                <tr><th className={classes.tableTitles}>Wind-Gust : </th><td className={classes.tableValues}>{windGust} m/s</td></tr>
                                <tr><th className={classes.tableTitles}>Weather : </th><td className={classes.tableValues}>{weather} - {weatherDescription}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            );
        }
    } else {
        return <h2 style={{ textAlign: "center" }}>Searching...</h2>
    }

};

export default TodaysWeather;