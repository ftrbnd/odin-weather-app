const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';

async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`, { mode: 'cors' });
    const data = await response.json();
    console.log(data);
}

const search = document.querySelector('#search');
search.addEventListener('search', () => {
    getWeather(search.value);
});