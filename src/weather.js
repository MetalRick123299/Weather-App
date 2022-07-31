const weatherText = document.querySelector('#weatherText');
const currentTemp = document.querySelector('#currentTemp');
const feelsLike = document.querySelector('#feelsLike');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');

const inputPlace = document.querySelector('#inputPlace');
const weatherButton = document.querySelector('#weatherButton');
const unitButton = document.querySelector('#unitChange');
const error = document.querySelector('#error');

let units = 'imperial';

inputPlace.value = 'Miami';
changeData();

export async function weather(city, units) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=011427f50ff4734991646a7070537ded`
  );

  if (response.status === 404) {
    console.log('City Not Found');
    error.style = 'visibility: visible';
    return false;
  }

  const weatherData = await response.json();
  console.log(weatherData);

  return weatherData;
}

async function changeData() {
  console.log(inputPlace.value);
  const weatherData = await weather(inputPlace.value, units);
  if (!weatherData) return;
  console.log(weatherData.cod);

  error.style = 'visibility: hidden';

  weatherText.firstElementChild.textContent =
    weatherData.weather[0].description;

  weatherText.lastElementChild.textContent = weatherData.name;

  currentTemp.textContent = Math.round(weatherData.main.temp);

  feelsLike.textContent = Math.round(weatherData.main.feels_like);

  wind.textContent =
    units === 'imperial'
      ? `Wind: ${Math.round(weatherData.wind.speed)} MPH`
      : `Wind: ${Math.round(weatherData.wind.speed)} MPS`;

  humidity.textContent = `Humidity: ${Math.round(weatherData.main.humidity)}%`;
}

weatherButton.addEventListener('click', changeData);

function changeUnit() {
  if (units === 'imperial') {
    units = 'metric';
    unitButton.innerHTML = '&#8451;';
  } else {
    units = 'imperial';
    unitButton.innerHTML = '&#8457;';
  }
  console.log(units);
  inputPlace.value = weatherText.lastElementChild.textContent;
  changeData();
}

unitButton.addEventListener('click', changeUnit);
