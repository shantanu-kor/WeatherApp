import { createContext } from "react";

const CityContext = createContext({
    city: "",
    changeCity: () => { },
});

export default CityContext;