window.addEventListener("load", showPortoTemperature);

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", citySearch);

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", currentLocationTemperature);

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", tempConvertFahrenheit);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", tempConvertCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#main-temp-value");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let high = document.querySelector("#main-high");
  let low = document.querySelector("#main-low");
  let date = document.querySelector("#current-date");
  let time = document.querySelector("#current-time");
  let icon = document.querySelector("#icon");

  showTemp.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  time.innerHTML = formatTime(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function currentLocationTemperature() {
  navigator.geolocation.getCurrentPosition(locationSearch);
}

function citySearch(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let citySearchInput = document.querySelector("#input-city");
  h1.innerHTML = citySearchInput.value;
  let city = citySearchInput.value;
  let apiKey = "c99a8d499a1f61b742240fa4afade60a";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showPortoTemperature(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = "Porto";
  h1.innerHTML = city;
  let apiKey = "c99a8d499a1f61b742240fa4afade60a";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function locationSearch(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c99a8d499a1f61b742240fa4afade60a";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationCity);
  function showLocationCity(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
    showTemperature(response);
  }
}

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  return `Last updated:<br> ${day}, ${month} ${date}, ${year}`;
}

function formatTime(timestamp) {
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function tempConvertCelsius(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let celsiusConvertedTemp = document.querySelector("#main-temp-value");
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML = Math.round(celsiusConvertedTemp.value, 14);
  mainTempScale.innerHTML = "°C";
}

function tempConvertFahrenheit(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let fahrenheitConvertedTemp = document.querySelector("#main-temp-value");
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML =
    Math.round((fahrenheitConvertedTemp.value, 14) / 5) * 9 + 32;
  mainTempScale.innerHTML = "°F";
}
