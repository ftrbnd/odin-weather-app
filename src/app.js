import loadDays from "./ui/days";
import loadHeader from "./ui/header";
import loadHours from "./ui/hours";

const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';
const USER_LOCATION = 'Los Angeles';
const DEFAULT_UNIT = 'F';

async function getForecast(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });
    const data = await response.json();
    return data;
}

function loadUI(forecastData) {
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];

    loadHeader(location, current, forecast);
    loadHours(forecast.forecastday[0].hour);
    loadDays(forecast.forecastday);
}

async function main() {
    const forecastData = await getForecast(USER_LOCATION);
    loadUI(forecastData);

    const search = document.querySelector('#search');
    search.addEventListener('search', async () => {
        const forecastData = await getForecast(search.value);
        loadUI(forecastData);
    });

    const toggleUnitsBtn = document.querySelector('button.toggle');
    toggleUnitsBtn.textContent = `°${DEFAULT_UNIT}`;
    toggleUnitsBtn.addEventListener('click', () => {

    });
}

main();