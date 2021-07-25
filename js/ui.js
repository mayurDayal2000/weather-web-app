// check the daylight
const isDay = document.querySelector(".isDayLight");
const weatherText = document.querySelector(".weather-text");
const temperatureValue = document.querySelector(".temperature-value");
const location = document.querySelector(".location");

let checkDayLight = (light) => {
  if (light) {
    isDay.style.backgroundImage = "url('img/day.jpg')";
    weatherText.style.color = "black";
    temperatureValue.style.color = "#035397";
    location.style.color = "black";
  } else {
    isDay.style.backgroundImage = "url('img/night.jpg')";
    weatherText.style.color = "white";
    temperatureValue.style.color = "#ffaa4c";
    location.style.color = "white";
  }
};

let weatherConditions = (icon, text, value) => {
  document.querySelector(".weather-icon img").src = `img/icons/${icon}.svg`;
  weatherText.innerHTML = `<span>${text}</span>`;
  temperatureValue.innerHTML = `<span>${value}</span>`;
};

let locationDetails = (city, country) => {
  location.innerHTML = `<h4>${city}, ${country}</h4>`;
};

export { checkDayLight, weatherConditions, locationDetails };
