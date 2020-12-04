let now = new Date();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfWeek[now.getDay()];
let currentDate = now.getDate();
let monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let currentMonth = monthsOfYear[now.getMonth()];
let currentYear = now.getFullYear();

let exactTime = document.querySelector("#current-hour");
exactTime.innerHTML = `${currentHour}:${currentMinutes}`;
let exactDay = document.querySelector("#current-day");
exactDay.innerHTML = `${currentDay}`;
let exactDate = document.querySelector("#current-date");
exactDate.innerHTML = `${currentYear}-${currentMonth}-${currentDate}`;

function currentResults(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
}

function searchCity(city) {
  let apiKey = "9d4f2f9151655a44f6aecb18ab033ab8";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let cityUrl = document.querySelector("#city-input").value;
  let units = "metric";
  let apiUrl = `${apiEndpoint}${cityUrl}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentResults);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function showCurrentLocation(position) {
  let apiKey = "9d4f2f9151655a44f6aecb18ab033ab8";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentResults); 
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
  }

let currentTempButton = document.querySelector("#current-location-button");
currentTempButton.addEventListener("click", getCurrentLocation);

searchCity("Warsaw");