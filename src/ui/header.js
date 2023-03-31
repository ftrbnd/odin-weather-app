export default function loadHeader(location, current, forecast) {
    const locationName = document.querySelector('h3.location');
    locationName.textContent = location.name;

    const temp = document.querySelector('h1.temp');
    temp.textContent = `${current.temp_f}°`;

    const condition = document.querySelector('p.condition');
    condition.textContent = current.condition.text;

    const high = document.querySelector('p.high');
    high.textContent = `H: ${forecast.forecastday[0].day.maxtemp_f}°`;

    const low = document.querySelector('p.low');
    low.textContent = `L: ${forecast.forecastday[0].day.mintemp_f}°`;
}