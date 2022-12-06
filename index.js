function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;

  findCity(city);
}

function findCity(city) {
  let units = "metric";
  let apiKey = "4f6484d9a7c6987f3133d7c6fd4bd3b8";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiCall).then(showTemperature);
}

function getForecast(coordinates) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let actualTemperature = document.querySelector(".actualTemp");
  actualTemperature.innerHTML = Math.round(response.data.main.temp);

  let actualDesctiption = document.querySelector(".description");
  actualDesctiption.innerHTML = response.data.weather[0].main;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${response.data.name}`;

  let apparentTemp = document.querySelector("#feelsLike");
  apparentTemp.innerHTML = Math.round(response.data.main.feels_like);

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let actualHumidity = document.querySelector("#humidity");
  actualHumidity.innerHTML = response.data.main.humidity;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#location");
form.addEventListener("submit", search);

findCity("Bratislava");

let currentTime = document.querySelector(".time");
let now = new Date();
let date = now.getDate();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;
