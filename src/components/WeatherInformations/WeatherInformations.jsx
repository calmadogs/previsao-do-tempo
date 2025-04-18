import './WeatherInformations.css'

function WeatherInformations({ weather }) {
  console.log(weather);

  if (!weather || !weather.weather || weather.weather.length === 0) {
    return;
  }

  return (
    <div className='weather-conteiner'>
      
      <h2>{weather.name}</h2>

      <div className='weather-info'>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        />
        <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
      </div>

      <p className='description'>{weather.weather[0].description}</p>

      <div className='datails'>
        <p>Sensação térmica:{Math.round(weather.main.feels_like)}</p>
        <p>Umidade:{Math.round(weather.main.humidity)}</p>
        <p>Pressão:{Math.round(weather.main.pressure)}</p>
      </div>
    </div>
  );
}

export default WeatherInformations;
