import React, { useContext, useRef } from "react";
import CityContext from "../store/cityContext";

const Form = () => {
    const cityCtx = useContext(CityContext);
    const cityRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const city = cityRef.current.value;
        cityCtx.changeCity(city);
        cityRef.current.value = '';
    }

    return (
        <form style={{ textAlign: "center" }} onSubmit={submitHandler}>
            <label htmlFor="city" style={{fontSize: "20px", fontWeight: "bold"}}>City: </label>
            <input type="text" id="city" ref={cityRef} required style={{fontSize: "20px", fontWeight: "500"}} /> <br />
            <button type="submit" style={{margin: "10px", padding: "10px", fontSize: "20px", border: "none", borderRadius: "15%", backgroundColor: "green", color: "white"}}>Get Weather</button>
        </form>
    );
};

export default Form;