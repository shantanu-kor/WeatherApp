import React, { useContext } from "react";
import Form from "./components/WeatherForm";
import TodaysWeather from "./components/TodaysWeather";
import CityContext from "./store/cityContext";
import FiveDayWeather from "./components/FiveDayWeather";

function App() {
  const cityCtx = useContext(CityContext);

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center", backgroundColor: "blue", color: "white", padding: "1%" }}>Get Your Weather</h1>
      <Form />
      {cityCtx.city && <TodaysWeather />}
      // {cityCtx.city && <FiveDayWeather />}
    </React.Fragment>
  );
}

export default App;
