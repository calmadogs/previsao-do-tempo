import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isInitial, setIsInitial] = useState(true);

  const inputRef = useRef();
  const key = "6c7108b69a4bc532d81efe7d1e34e666";

  // Ao abrir a página, busca uma cidade aleatória
  useEffect(() => {
    const cidades = [
      "São Paulo",
      "Rio de Janeiro",
      "Recife",
      "Belo Horizonte",
      "Salvador",
    ];
    const cidadeAleatoria = cidades[Math.floor(Math.random() * cidades.length)];

    buscarCidade(cidadeAleatoria);
  }, []);

  // Função principal para buscar a cidade
  async function buscarCidade(cidadeDigitada) {
    const cidade = cidadeDigitada || inputRef.current.value;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;
      const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`;

      const apiInfo = await axios.get(url);
      const apiInfo5Days = await axios.get(url5Days);

      setWeather(apiInfo.data);
      setWeather5Days(apiInfo5Days.data);
      setErrorMessage("");
      setIsInitial(false);

      if (!cidadeDigitada) {
        inputRef.current.value = "";
      }

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setWeather(null);
      setWeather5Days(null);
      setErrorMessage("Cidade não encontrada. Por favor, tente novamente.");

      if (!cidadeDigitada) {
        inputRef.current.value = "";
      }
    }
  }

  // Ativa ao apertar Enter ou clicar no botão
  function handleSubmit(e) {
    e.preventDefault();
    buscarCidade();
  }

  return (
    <div className="conteiner">
      <h1>PREVISÃO DO TEMPO</h1>

      <form onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" placeholder="DIGITE SUA CIDADE" />
        <button type="submit">buscar</button>
      </form>

      {errorMessage && (
        <p
          style={{
            color: " white",
            marginTop: "10px",
            fontWeight: "bold",
            borderBottom: "2px solid  #f57c00",
            display: "inline-block",
            paddingTop: "100px",
            fontSize: "35px",
          }}
        >
          {errorMessage}
        </p>
      )}

      {weather && <WeatherInformations weather={weather} />}
      {weather5Days && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
