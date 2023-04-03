import loadDays from "./ui/days";
import loadHeader from "./ui/header";
import loadHours from "./ui/hours";

const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';

async function getForecast(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });
    const data = await response.json();
    
    console.log(data);
    return data.error ? null : data;
}

function loadUI(forecastData) {
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];

    loadHeader(location, current, forecast.forecastday[0].day);
    loadHours(forecast.forecastday[0].hour);
    loadDays(forecast.forecastday);
}

function registerEventListeners(forecastData) {
    const searchField = document.querySelector('#search');
    searchField.addEventListener('search', async () => {
        forecastData = await getForecast(searchField.value);
        if (forecastData) {
            loadUI(forecastData);
            localStorage.setItem('FORECAST_DATA', JSON.stringify(forecastData));
            localStorage.setItem('LOCATION', forecastData.location.name);
        }

        searchField.value = '';
    });

    const unit = localStorage.getItem('TEMP_UNIT');
    const toggleUnitsBtn = document.querySelector('button.toggle');
    toggleUnitsBtn.textContent = `°${unit}`;
    toggleUnitsBtn.addEventListener('click', () => {
        const currentUnit = localStorage.getItem('TEMP_UNIT');
        if (currentUnit == 'F') localStorage.setItem('TEMP_UNIT', 'C');
        else localStorage.setItem('TEMP_UNIT', 'F');

        toggleUnitsBtn.textContent = `°${localStorage.getItem('TEMP_UNIT')}`;
        loadUI(JSON.parse(localStorage.getItem('FORECAST_DATA'))); // forecastData may be null on searches resulting in null
    });

    window.addEventListener('keydown', e => {
        if (e.key == '/' && document.activeElement != searchField) {
            searchField.focus(); // figure out how to delete the '/' entered on search bar
        } else if (e.key == 'Escape' && document.activeElement == searchField) {
            searchField.blur();
            searchField.value = '';
        } else if ((e.key == 'f' || e.key == 'c') && document.activeElement != searchField) {
            if (e.key.toUpperCase() == localStorage.getItem('TEMP_UNIT')) return;

            localStorage.setItem('TEMP_UNIT', e.key.toUpperCase());
            toggleUnitsBtn.textContent = `°${localStorage.getItem('TEMP_UNIT')}`;
            loadUI(JSON.parse(localStorage.getItem('FORECAST_DATA')));
        }
    });
}

async function setUserLocation() {
    async function success(position) {
        console.log(`Current coordinates: ${position.coords.latitude},${position.coords.longitude}`);
        localStorage.setItem('LOCATION', `${position.coords.latitude},${position.coords.longitude}`);

        await loadPage();
    }

    async function error() {
        console.log("Unable to retrieve user's location - setting default to Los Angeles");
        localStorage.setItem('LOCATION', 'Los Angeles');

        await loadPage();
    }

    if (!navigator.geolocation) {
        localStorage.setItem('LOCATION', 'Los Angeles');
        await loadPage();
    } else {
        document.querySelector('h3.location').textContent = 'Locating...';
        navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 10000
        });
    }
}

async function loadPage() {
    let forecastData = await getForecast(localStorage.getItem('LOCATION'));
    if (forecastData) {
        loadUI(forecastData);
        localStorage.setItem('FORECAST_DATA', JSON.stringify(forecastData));
    }

    registerEventListeners(forecastData);
}

async function main() {
    if (!localStorage.getItem('TEMP_UNIT')) localStorage.setItem('TEMP_UNIT', 'F');
    await setUserLocation();
}

main();