const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';
const USER_LOCATION = 'Los Angeles';

async function getForecast(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });
    const data = await response.json();
    return data;
}

const search = document.querySelector('#search');
search.addEventListener('search', async () => {
    const forecastData = await getForecast(search.value);
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];
    console.log(location, current, forecast);
});

async function loadUI(location, current, forecast) {
    const locationName = document.querySelector('h3.location');
    locationName.textContent = location.name;

    const temp = document.querySelector('h1.temp');
    temp.textContent = current.temp_f;
}

async function main() {
    const forecastData = await getForecast(USER_LOCATION);
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];

    await loadUI(location, current, forecast);
}

main();