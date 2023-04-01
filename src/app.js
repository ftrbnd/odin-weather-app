import loadDays from "./ui/days";
import loadHeader from "./ui/header";
import loadHours from "./ui/hours";

const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';

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
    if (!localStorage.getItem('TEMP_UNIT')) localStorage.setItem('TEMP_UNIT', 'F');
    const unit = localStorage.getItem('TEMP_UNIT');
    if (!localStorage.getItem('LOCATION')) localStorage.setItem('LOCATION', 'Los Angeles');
    const location = localStorage.getItem('LOCATION');

    let forecastData = await getForecast(location);
    loadUI(forecastData);

    console.log(forecastData);

    const search = document.querySelector('#search');
    search.addEventListener('search', async () => {
        forecastData = await getForecast(search.value);
        loadUI(forecastData);
    });

    const toggleUnitsBtn = document.querySelector('button.toggle');
    toggleUnitsBtn.textContent = `°${unit}`;
    toggleUnitsBtn.addEventListener('click', () => {
        const currentUnit = localStorage.getItem('TEMP_UNIT');
        if (currentUnit == 'F') localStorage.setItem('TEMP_UNIT', 'C');
        else localStorage.setItem('TEMP_UNIT', 'F');

        toggleUnitsBtn.textContent = `°${localStorage.getItem('TEMP_UNIT')}`;

        loadUI(forecastData);
    });
}

main();