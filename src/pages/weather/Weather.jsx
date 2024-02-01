import "./weather.css";
import { useState } from "react";

const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  base: import.meta.env.VITE_WEATHER_BASE,
};

function Weather() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState("");
  const [advice, setAdvice] = useState("");

  function temperatureAdvice(temp) {
    if (temp===""){
        return "Please enter the region";
    }else if (temp < 0) {
        return "It's freezing! Bundle up warmly.";
    } else if (temp >= 0 && temp < 5) {
        return "It's extremely cold. Layer up with thermal clothing.";
    } else if (temp >= 5 && temp < 10) {
        return "It's very cold. Wear a heavy coat and a hat.";
    } else if (temp >= 10 && temp < 15) {
        return "It's cold. Grab a warm jacket.";
    } else if (temp >= 15 && temp < 20) {
        return "It's chilly. A sweater or hoodie is recommended.";
    } else if (temp >= 20 && temp < 25) {
        return "It's mild. A light jacket should do.";
    } else if (temp >= 25 && temp < 30) {
        return "It's warm. Enjoy the pleasant weather.";
    } else if (temp >= 30 && temp < 35) {
        return "It's hot. Dress lightly and stay hydrated.";
    } else if (temp >= 35 && temp < 40) {
        return "It's very hot. Stay in the shade and drink plenty of water.";
    } else {
        return "It's scorching! Take extreme precautions to avoid heat-related issues.";
    }
}

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setTemperature(result.main.temp);
        //getImages(temperature)
        console.log(temperature)
      }).catch(error => {
        if (error.message === 'result.main is undefined') {
          alert('Wrong City or Town!!!');
        } else if(error.message === 'NetworkError when attempting to fetch resource.') {
         alert("No Internet Connection!!!");
        }
      });;
  };
  const handleTemperatureChange = (r) => {
    console.log(temperature)
    // Update advice based on the new temperature
    setAdvice(temperatureAdvice(temperature));
  };
  //console.log(search)
  const getImages = (temperature) => {
    if (temperature !== null) {
      if (temperature < 0) {
        return (
          <>
            <img src="assets/weather/4.png" alt="" width={50} height={50}/>
          </>
        );
      } else if (temperature >= 0 && temperature < 5) {
        return (
          <>
            <img src="assets/weather/2.png" alt="" width={50} height={50}/>
          </>
        );
        
      } else if(temperature >= 5 && temperature < 10){
        return (
          <>
            <img src="assets/weather/3.png" alt="" width={50} height={50}/>
          </>
        );
      } 
      else if(temperature >= 10 && temperature < 15){
        return (
          <>
            <img src="assets/weather/6.png" alt="" width={50} height={50}/>
          </>
        );
      } 
      else if(temperature >= 15 && temperature < 20){
        return (
          <>
            <img src="assets/weather/5.png" alt="" width={50} height={50}/>
          </>
        );
      }
      else if(temperature >= 20 && temperature < 25){
        return (
          <>
            <img src="assets/weather/2.png" alt="" width={50} height={50}/>
          </>
        );
      }
      else if(temperature >= 25 && temperature < 30){
        return (
          <>
            <img src="assets/weather/7.png" alt="" width={50} height={50}/>
          </>
        );
      }
      else if(temperature >= 30 && temperature < 35){
        return (
          <>
            <img src="assets/weather/8.png" alt="" width={50} height={50}/>
          </>
        );
      }
      else if(temperature >= 35 && temperature < 40){
        return (
          <>
            <img src="assets/weather/9.png" alt="" width={50} height={50}/>
          </>
        );
      }
      else {
        return (
          <>
            <img src="low-temperature-image-1.jpg" alt="" />
          </>
        );
      }
    }
    return null; // Default: No images
  };


  return (
      <header className="w-card">
        <h1>Let me give you advice about climate</h1>
        <img className="rotating-image" src="assets/weather.png" alt="" />
        <div className="info">
          <input
            className="w-input"
            type="text"
            placeholder="Enter city/town..."
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 350 }}
          />
          <button className="w-btn" onClick={searchPressed}>Search</button>
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className="w-info">
                        {getImages(temperature)}
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
            
          </div>
        ) : (
          ""
        )}
        <div className="ad-info">
            <button className="w-btn" onClick={handleTemperatureChange}>Give me advice</button>
            <p className="advise">{advice}</p>
        </div>
           
      </header>
  
  );
}

export default Weather;
