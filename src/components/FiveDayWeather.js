import React, { useContext, useState, useEffect } from "react";
import CityContext from "../store/cityContext";

const FiveDayWeather = () => {
    const cityCtx = useContext(CityContext);
    const [degree, setDegree] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityCtx.city}&days=5&key=${process.env.REACT_APP_WEATHERBIT_KEY}`);
            const dat = await response.json();
            setData(dat);
        }
        getWeather();
    }, [cityCtx.city]);
    if (data !== null) {
        const toggleDegree = () => {
            setDegree(prev => !prev);
        }
        return (
            <React.Fragment>
                <h2 style={{ textAlign: "center" }}>5 Day Forecast</h2>
                <h3 style={{ textAlign: "center" }}>City: {data.city_name}</h3>
                <div style={{textAlign: "center", backgroundColor: "black", marginLeft: "auto", marginRight: "auto" }}>
                    <button onClick={toggleDegree} style={{ fontSize: '20px', margin: "10px" }}>{degree ? "Farenheit" : "Celcius"}</button>
                    <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", backgroundColor: "black", color: "white"}}>
                        {data.data.map(item => (<li key={item.datetime} style={{ listStyle: "none", padding: "10px", border: "1px solid white", margin: "10px" }}>
                            <h3>{item.datetime}</h3>
                            <br />
                            {<img src={`https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`} alt={item.weather.description} />}
                            <table>
                                <tbody>
                                    <tr><th>Temperature : </th><td>{degree ? `${item.temp} °C` : `${((item.temp * (9 / 5)) + 32).toFixed(2)} °F`}</td></tr>
                                    <tr><th>Description : </th><td>{item.weather.description}</td></tr>
                                </tbody>
                            </table>
                        </li>))}
                    </ul>
                </div>
            </React.Fragment>
        );
    } else {
        return <></>
    }
};

export default FiveDayWeather;