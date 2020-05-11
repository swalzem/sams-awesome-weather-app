function showTemperature(response) {
  let city = document.querySelector("h1");
  // let temperature = Math.round(response.data.main.temp);
  let showTemp = document.querySelector("#main-temp-value");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let high = document.querySelector("#main-high");
  let low = document.querySelector("#main-low");
  let date = document.querySelector("#current-date");
  let time = document.querySelector("#current-time");
  let icon = document.querySelector("#icon");
  let mainTempScale = document.querySelector("#main-temp-scale");

  celsiusTemperature = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  showTemp.innerHTML = celsiusTemperature;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  time.innerHTML = formatTime(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  mainTempScale.innerHTML = `°C`;
}

function currentLocationTemperature() {
  navigator.geolocation.getCurrentPosition(currentLocationSearch);
}

function formatHours(timestamp) {
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

function displayForecast(response) {
  let hourlyForecast = document.querySelector("#forecast");
  hourlyForecast.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index += 1) {
    forecast = response.data.list[index];
    hourlyForecast.innerHTML += `
        <div class="col-2">
          <div class="row justify-content-center forecast-day-of-the-week">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
          </div>
          
          <div class="row justify-content-center forecast-weather-image">
            <img
              src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png"
              alt="${forecast.weather[0].description}"
            />
          </div>
          <div class="row justify-content-center forecast-high">
            <strong>${Math.round(forecast.main.temp_max)}°</strong>
          </div>
          <div class="row justify-content-center forecast-low">
            ${Math.round(forecast.main.temp_min)}°
          </div>
        </div>`;
  }
}

function search(city) {
  let apiKey = "c99a8d499a1f61b742240fa4afade60a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault;
  let searchInput = document.querySelector("#input-city");
  search(searchInput.value);
}

function currentLocationSearch(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c99a8d499a1f61b742240fa4afade60a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
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
  return `${formatHours(timestamp)}`;
}

function tempConvertCelsius(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML = Math.round(celsiusTemperature);
  mainTempScale.innerHTML = "°C";
}

function tempConvertFahrenheit(event) {
  event.preventDefault();
  let mainTempValue = document.querySelector("#main-temp-value");
  let fahrenheitConvertedTemp = (celsiusTemperature * 9) / 5 + 32;
  let mainTempScale = document.querySelector("#main-temp-scale");
  mainTempValue.innerHTML = Math.round(fahrenheitConvertedTemp);
  mainTempScale.innerHTML = "°F";
}

search("Porto");

let celsiusTemperature = null;

let searchButton = document.querySelector("#btn-search");
searchButton.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", currentLocationTemperature);

let fahrenheitConvert = document.querySelector("#fahrenheit");
fahrenheitConvert.addEventListener("click", tempConvertFahrenheit);

let celsiusConvert = document.querySelector("#celsius");
celsiusConvert.addEventListener("click", tempConvertCelsius);
