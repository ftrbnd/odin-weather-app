import dateFormat from "dateformat";

export default function loadHeader(location, current, forecastToday) {
    const locationName = document.querySelector('.location');
    locationName.textContent = location.name;

    const regionName = document.querySelector('.region');
    regionName.textContent = location.region;

    const temp = document.querySelector('.temp');
    temp.textContent = `${localStorage.getItem('TEMP_UNIT') == 'F' ? Math.round(current.temp_f) : Math.round(current.temp_c)}°`;
    
    const tempIcon = document.querySelector('.temp-container .today-icon');
    tempIcon.src = current.condition.icon;

    const condition = document.querySelector('.condition');
    condition.textContent = current.condition.text;

    const high = document.querySelector('.high');
    high.textContent = `H: ${localStorage.getItem('TEMP_UNIT') == 'F' ? forecastToday.maxtemp_f : forecastToday.maxtemp_c}°`;

    const low = document.querySelector('.low');
    low.textContent = `L: ${localStorage.getItem('TEMP_UNIT') == 'F' ? forecastToday.mintemp_f : forecastToday.mintemp_c}°`;

    const currentDate = new Date(location.localtime);

    const date = document.querySelector('.date');
    date.textContent = dateFormat(currentDate, "dddd, mmmm dS, yyyy");
    
    const time = document.querySelector('.time');
    time.textContent = dateFormat(currentDate, "h:MM TT");

    // more details (wind, precip, pressure)
    const directions = new Map([
        ['N', 'north'],
        ['E', 'east'],
        ['S', 'south'],
        ['W', 'west']
    ]);
    const wind = document.querySelector('.wind');
    wind.textContent = `Wind: ${localStorage.getItem('TEMP_UNIT') == 'F' ? current.wind_mph : current.wind_kph} ${localStorage.getItem('TEMP_UNIT') == 'F' ? 'mph' : 'kmh'} ${directions.get(current.wind_dir)}`;

    const precipitation = document.querySelector('.precipitation');
    precipitation.textContent = `Precipitation: ${localStorage.getItem('TEMP_UNIT') == 'F' ? current.precip_in : current.precip_mm} ${localStorage.getItem('TEMP_UNIT') == 'F' ? 'in' : 'mm'}`;

    const pressure = document.querySelector('.pressure');
    pressure.textContent = `Pressure: ${localStorage.getItem('TEMP_UNIT') == 'F' ? current.pressure_in : current.pressure_mb} ${localStorage.getItem('TEMP_UNIT') == 'F' ? 'in' : 'mb'}`;
}