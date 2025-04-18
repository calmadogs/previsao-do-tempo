import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()

  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value;
    const key = "6c7108b69a4bc532d81efe7d1e34e666";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;


    const apiInfo= await axios.get(url);
    const apiInfo5Days = await axios.get(url5Days)

    setWeather5Days(apiInfo5Days.data)  
    
    setWeather(apiInfo.data)

    
  }

  
  return (
    <div className="conteiner">
      <h1>PREVISÃO DO TEMPO</h1>
      <div>
        <input ref={inputRef} type="text" placeholder="DIGITE SUA CIDADE" />
        <button onClick={searchCity}> buscar </button>

        {weather && <WeatherInformations weather={weather}/>}
        {weather5Days && <WeatherInformations5Days weather5Days={weather5Days}/>}

      </div>
    </div>
  );
}

export default App;


