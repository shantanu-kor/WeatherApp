import React, { useState } from "react";
import CityContext from "./cityContext";

const CityProvider = (props) => {
    const [city, setCity] = useState("");

    const changeCityHandler = (name) => {
        setCity(name);
    }

    const cityContext = {
        city: city,
        changeCity: changeCityHandler,
    }

    return (
        <CityContext.Provider value={cityContext}>{props.children}</CityContext.Provider>
    );
};

export default CityProvider;