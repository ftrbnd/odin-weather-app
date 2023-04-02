import dateFormat from "dateformat";

export default function loadHeader(location, current, forecastToday) {
    const locationName = document.querySelector('h3.location');
    locationName.textContent = location.name;

    const temp = document.querySelector('h1.temp');
    temp.textContent = `${localStorage.getItem('TEMP_UNIT') == 'F' ? Math.round(current.temp_f) : Math.round(current.temp_c)}°`;

    const condition = document.querySelector('p.condition');
    condition.textContent = current.condition.text;

    const high = document.querySelector('p.high');
    high.textContent = `H: ${localStorage.getItem('TEMP_UNIT') == 'F' ? forecastToday.maxtemp_f : forecastToday.maxtemp_c}°`;

    const low = document.querySelector('p.low');
    low.textContent = `L: ${localStorage.getItem('TEMP_UNIT') == 'F' ? forecastToday.mintemp_f : forecastToday.mintemp_c}°`;

    const currentDate = new Date(location.localtime);

    const date = document.querySelector('.date');
    date.textContent = dateFormat(currentDate, "dddd, mmmm dS, yyyy");
    
    const time = document.querySelector('.time');
    time.textContent = dateFormat(currentDate, "h:MM TT");
}