function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;

  findCity(city);
}

function findCity(city) {
  let units = "metric";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=4f6484d9a7c6987f3133d7c6fd4bd3b8`;
  axios.get(apiCall).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);

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

  let actualPressure = document.querySelector("#pressure");
  actualPressure.innerHTML = response.data.main.pressure;

  let actualVisibility = document.querySelector("#visibility");
  actualVisibility.innerHTML = response.data.visibility;
}

let form = document.querySelector("#location");
form.addEventListener("submit", search);

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
