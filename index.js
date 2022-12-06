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
  console.log(coordinates);
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

function convertF(event) {
  event.preventDefault();

  let temperature = document.querySelector(".actualTemp");
  temperature.innerHTML = Math.round(celsiusTemp * 1.8 + 32);
}

function convertC(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actualTemp");
  temperature.innerHTML = Math.round(celsiusTemp);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemp = null;

let form = document.querySelector("#location");
form.addEventListener("submit", search);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", convertF);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", convertC);

findCity("Bratislava");
displayForecast();

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
