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
  let temperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector(".actualTemp");
  actualTemperature.innerHTML = `${temperature}`;

  let desctiption = response.data.weather[0].main;
  let actualDesctiption = document.querySelector(".description");
  actualDesctiption.innerHTML = `${desctiption}`;

  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${response.data.name}`;
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
