
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = 'a1a5e6c2691974679994845fa92af559';
  const cityInput = document.querySelector('.search-box input');
  const city = cityInput.value.trim();

  if (city === '') {
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(json=>{
error404.style.display = 'none';
error404.classList.remove('fadeIn');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

switch (json.weather[0].main) {
  case 'Clear':
    image.src = 'images/clear.png';
    break;

  case 'Rain':
    image.src = 'images/rain.png';
    break;

  case 'Snow':
    image.src = 'images/snow.png';
    break;

  case 'Clouds':
    image.src = 'images/cloud.png';
    break;

  case 'Haze':
    image.src = 'images/mist.png';
    break;

  default:
    image.src = '';
}

temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
description.innerHTML = `${json.weather[0].description}`;
humidity.innerHTML = `${json.main.humidity}%`;
wind.innerHTML = `${Math.round(json.wind.speed)}Km/h`;

weatherBox.style.display = '';
weatherDetails.style.display = '';
weatherBox.classList.add('fadeIn');
weatherDetails.classList.add('fadeIn');
container.style.height = '590px';
})
.catch(error => {
container.style.height = '400px';
weatherBox.style.display = 'none';
weatherDetails.style.display = 'none';
error404.style.display = 'block';
error404.classList.add('fadeIn');
console.error(error);
});
cityInput.value = '';
});