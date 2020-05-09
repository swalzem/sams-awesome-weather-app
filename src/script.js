let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();
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
let month = months[now.getMonth()];
let date = now.getDate();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let hour = now.getHours();
let minute = now.getMinutes();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minute}`;

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

window.addEventListener("load", showPortoTemperature);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#main-temp-value");
  showTemp.innerHTML = `${temperature}°C`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let high = document.querySelector("#main-high");
  high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  let low = document.querySelector("#main-low");
  low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
}

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", citySearch);

function currentLocationTemperature() {
  function locationSearch(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "c99a8d499a1f61b742240fa4afade60a";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemperature);
  }

  function showLocationTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let showTemp = document.querySelector("#main-temp-value");
    showTemp.innerHTML = `${temperature}°C`;
    let h1 = document.querySelector("h1");
    h1.innerHTML = response.data.name;
    let description = document.querySelector("#weather-description");
    description.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
    let high = document.querySelector("#main-high");
    high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
    let low = document.querySelector("#main-low");
    low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  }
  navigator.geolocation.getCurrentPosition(locationSearch);
}
let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", currentLocationTemperature);

function tempConvertFahrenheit(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let fahrenheitConvertedTemp = document.querySelector("#main-temp-value");
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML =
    Math.round((fahrenheitConvertedTemp.value, 14) / 5) * 9 + 32;
  mainTempScale.innerHTML = "°F";
}

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", tempConvertFahrenheit);

function tempConvertCelsius(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let celsiusConvertedTemp = document.querySelector("#main-temp-value");
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML = Math.round(celsiusConvertedTemp.value, 14);
  mainTempScale.innerHTML = "°C";
}

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", tempConvertCelsius);
