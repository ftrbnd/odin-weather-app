const WEATHER_API_KEY = 'e4cd1a6a35cd41f0af7221457233003';

async function getWeather(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}?q=${location}`, { mode: 'cors' });
    const data = await response.json();
    console.log(data);
}

const search = document.querySelector('#search');
search.addEventListener('search', () => {
    getWeather(search.value);
});