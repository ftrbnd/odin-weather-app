import loadDays from "./ui/days";
import loadHeader from "./ui/header";
import loadHours from "./ui/hours";

const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';

async function getForecast(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });
    const data = await response.json();
    
    console.log('Forecast data: ', data);
    return data.error ? null : data;
}

function loadUI(forecastData) {
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];

    localStorage.setItem('FORECAST_DATA', JSON.stringify(forecastData));
    localStorage.setItem('LOCATION', forecastData.location.name);
    
    loadHeader(location, current, forecast.forecastday[0].day);
    loadHours(forecast.forecastday[0].hour, forecast.forecastday[1].hour, location.localtime);
    loadDays(forecast.forecastday);
    setColors(location.localtime, current.condition.code);
}

function registerEventListeners(forecastData) {
    const searchField = document.querySelector('#search');
    searchField.addEventListener('search', async () => {
        forecastData = await getForecast(searchField.value);
        if (forecastData) {
            loadUI(forecastData);
            navigator.geolocation.clearWatch(localStorage.getItem('WATCH_ID'));
            console.log(`Cleared watch monitor #${localStorage.getItem('WATCH_ID')}`);
        }

        searchField.value = '';
    });

    const unit = localStorage.getItem('TEMP_UNIT');
    const toggleUnitsImage = document.querySelector('img.toggle');
    toggleUnitsImage.src = unit == 'F' ? 'assets/temperature-fahrenheit.png' : 'assets/temperature-celsius.png';
    toggleUnitsImage.style.width = '24px';
    toggleUnitsImage.style.height = '24px';

    toggleUnitsImage.addEventListener('mouseover', () => {
        toggleUnitsImage.style.cursor = 'pointer';
        toggleUnitsImage.src = localStorage.getItem('TEMP_UNIT') == 'F' ? 'assets/temperature-fahrenheit-hover.png' : 'assets/temperature-celsius-hover.png';
    });
    toggleUnitsImage.addEventListener('mouseout', () => {
        toggleUnitsImage.style.cursor = 'default';
        toggleUnitsImage.src = localStorage.getItem('TEMP_UNIT') == 'F' ? 'assets/temperature-fahrenheit.png' : 'assets/temperature-celsius.png';
    });
    toggleUnitsImage.addEventListener('mousedown', () => {
        const currentUnit = localStorage.getItem('TEMP_UNIT');
        if (currentUnit == 'F') localStorage.setItem('TEMP_UNIT', 'C');
        else localStorage.setItem('TEMP_UNIT', 'F');

        toggleUnitsImage.src = localStorage.getItem('TEMP_UNIT') == 'F' ? 'assets/temperature-fahrenheit-click.png' : 'assets/temperature-celsius-click.png';
        loadUI(JSON.parse(localStorage.getItem('FORECAST_DATA'))); // forecastData may be null on searches resulting in null
    });
    toggleUnitsImage.addEventListener('mouseup', () => {
        toggleUnitsImage.src = localStorage.getItem('TEMP_UNIT') == 'F' ? 'assets/temperature-fahrenheit.png' : 'assets/temperature-celsius.png';
    });

    window.addEventListener('keydown', e => {
        if (e.key == '/' && document.activeElement != searchField) {
            searchField.focus();
            e.preventDefault();
        } else if (e.key == 'Escape' && document.activeElement == searchField) {
            searchField.blur();
            searchField.value = '';
        } else if ((e.key == 'f' || e.key == 'c') && document.activeElement != searchField) {
            if (e.key.toUpperCase() == localStorage.getItem('TEMP_UNIT')) return;

            localStorage.setItem('TEMP_UNIT', e.key.toUpperCase());
            toggleUnitsImage.src = localStorage.getItem('TEMP_UNIT') == 'F' ? 'assets/temperature-fahrenheit.png' : 'assets/temperature-celsius.png';
            loadUI(JSON.parse(localStorage.getItem('FORECAST_DATA')));
        }
    });

    const curLocationImage = document.querySelector('img.current');
    curLocationImage.src = 'assets/crosshairs-gps.png';
    curLocationImage.style.width = '24px';
    curLocationImage.style.height = '24px';
    
    curLocationImage.addEventListener('mouseover', () => {
        curLocationImage.style.cursor = 'pointer';
        curLocationImage.src = 'assets/crosshairs-gps-hover.png';
    });
    curLocationImage.addEventListener('mouseout', () => {
        curLocationImage.style.cursor = 'default';
        curLocationImage.src = 'assets/crosshairs-gps.png';
    });
    curLocationImage.addEventListener('mousedown', () => {
        curLocationImage.src = 'assets/crosshairs-gps-click.png';

        navigator.geolocation.clearWatch(localStorage.getItem('WATCH_ID'));
        console.log(`Cleared watch monitor #${localStorage.getItem('WATCH_ID')}`);
        setUserLocation();

        console.log('Current location image was clicked');
    });
    curLocationImage.addEventListener('mouseup', () => {
        curLocationImage.src = 'assets/crosshairs-gps.png';
    });
}

async function setUserLocation() {
    async function success(position) {
        console.log(`Updated current coordinates: ${position.coords.latitude},${position.coords.longitude}`);
        localStorage.setItem('LOCATION', `${position.coords.latitude},${position.coords.longitude}`);
        
        await loadPageData();
    }

    async function error(error) {
        console.log("Unable to retrieve user's location - setting default to Los Angeles", error);
        localStorage.setItem('LOCATION', 'Los Angeles');

        await loadPageData();
    }

    if (!navigator.geolocation) {
        console.log('Geolocation unavailable - setting default location to Los Angeles');
        localStorage.setItem('LOCATION', 'Los Angeles');
    } else {
        document.querySelector('h3.location').textContent = 'Locating...';

        const watchId = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 20000
        });
        localStorage.setItem('WATCH_ID', watchId);
        console.log(`New watchId: ${watchId}`);
    }
}

function setColors(localtime, conditionCode) {
    const niceDays = [1000, 1003, '#FFFFFF', '#00ABFF']; // text color, background color
    const cloudyDays = [1006, 1009, 1030, 1135, '#FFFFFF', '#B5B5B5'];
    const rainyDays = [1063, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, '#4275E9', '#878787'];
    const snowyDays = [1066, 1069, 1114, 1117, 1147, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, '#3FCDF1', '#FFFFFF'];
    const stormyDays = [1087, 1273, 1276, 1279, 1282, '#FFE400', '#878787'];

    const body = document.querySelector('body');
    if (niceDays.includes(conditionCode)) {
        const textColor = niceDays[niceDays.length - 2];
        const backgroundColor = niceDays[niceDays.length - 1];

        body.style.color = textColor;
        body.style.backgroundColor = backgroundColor;
        console.log(`text color: ${textColor}, back: ${backgroundColor}`);
        darkenColors(textColor, backgroundColor);
        console.log(`DARK: text color: ${textColor}, back: ${backgroundColor}`);
    } else if (cloudyDays.includes(conditionCode)) {
        const textColor = cloudyDays[cloudyDays.length - 2];
        const backgroundColor = cloudyDays[cloudyDays.length - 1];

        body.style.color = textColor;
        body.style.backgroundColor = backgroundColor;
        darkenColors(textColor, backgroundColor);
    } else if (rainyDays.includes(conditionCode)) {
        const textColor = rainyDays[rainyDays.length - 2];
        const backgroundColor = rainyDays[rainyDays.length - 1];

        body.style.color = textColor;
        body.style.backgroundColor = backgroundColor;
        darkenColors(textColor, backgroundColor);
    } else if (snowyDays.includes(conditionCode)) {
        const textColor = snowyDays[snowyDays.length - 2];
        const backgroundColor = snowyDays[snowyDays.length - 1];
        
        body.style.color = textColor;
        body.style.backgroundColor = backgroundColor;
        darkenColors(textColor, backgroundColor);
    } else if (stormyDays.includes(conditionCode)) {
        const textColor = stormyDays[stormyDays.length - 2];
        const backgroundColor = stormyDays[stormyDays.length - 1];
        
        body.style.color = textColor;
        body.style.backgroundColor = backgroundColor;
        darkenColors(textColor, backgroundColor);
    }

    const footer = document.querySelector('footer');
    footer.style.color = 'white';
    footer.style.backgroundColor = 'rgb(127, 127, 127)';

    function darkenColors(textColor, backgroundColor) {
        const currentHour = new Date(localtime).getHours();
        if (18 < currentHour || currentHour < 6) { // darken colors during nighttime
            body.style.color = LightenDarkenColor(textColor)
            body.style.backgroundColor = LightenDarkenColor(backgroundColor, -20)
        }
    }

    // https://css-tricks.com/snippets/javascript/lighten-darken-color/
    function LightenDarkenColor(col, amt) {
        if (col == '#FFFFFF') return;

        let usePound = false;
    
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
    
        let num = parseInt(col,16);
    
        let r = (num >> 16) + amt;
    
        if (r > 255) r = 255;
        else if  (r < 0) r = 0;
    
        let b = ((num >> 8) & 0x00FF) + amt;
    
        if (b > 255) b = 255;
        else if  (b < 0) b = 0;
    
        let g = (num & 0x0000FF) + amt;
    
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
    
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }
}

async function loadPageData() {
    let forecastData = await getForecast(localStorage.getItem('LOCATION'));
    if (forecastData) {
        loadUI(forecastData);
    }
}

async function main() {
    if (!localStorage.getItem('TEMP_UNIT')) localStorage.setItem('TEMP_UNIT', 'F');
    await setUserLocation();
    await loadPageData();

    registerEventListeners(JSON.parse(localStorage.getItem('FORECAST_DATA')));
}

main();