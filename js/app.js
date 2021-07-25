import { checkDayLight, weatherConditions, locationDetails } from "./ui.js";

// change the api key if the request limit is reached
const apiKey = "D5W4u1XUoMM5tML5uAGO6RowKtPdXzKf";
const searchCity = document.querySelector("form input");
const searchForm = document.querySelector(".container form")

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let cityName = searchCity.value;
  handleRequest(cityName);

  searchCity.value = "";
  document.querySelector(".weather-box").style.display = "block";
});

const handleRequest = (name) => {
  // get data for the search city location
  let getCityData = async () => {
    try {
      let response = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${name}`,
        { cache: "no-cache" }
      );
      if (response.ok) {
        let jsonResponse = await response.json();
        getCityResponse(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getCityResponse = (datas) => {
    let cityName = datas[0]["EnglishName"];
    let countryName = datas[0]["Country"]["EnglishName"];
    let locationKey = datas[0]["Key"];
    getCurrentData(locationKey);
    locationDetails(cityName, countryName);
  };

  // get data for the current condition for searched city
  let getCurrentData = async (locationKey) => {
    try {
      let currentResponse = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`,
        { cache: "no-cache" }
      );
      if (currentResponse.ok) {
        let jsonResponse = await currentResponse.json();
        getCurrentResponse(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getCurrentResponse = (datas) => {
    let weatherIcon = datas[0]["WeatherIcon"];
    let weatherText = datas[0]["WeatherText"];
    let temperature = `${datas[0]["Temperature"]["Metric"]["Value"]} &deg;${datas[0]["Temperature"]["Metric"]["Unit"]}`;
    checkDayLight(datas[0]["IsDayTime"]);
    weatherConditions(weatherIcon, weatherText, temperature);
  };

  getCityData();
};
