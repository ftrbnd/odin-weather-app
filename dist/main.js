/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui/days.js":
/*!************************!*\
  !*** ./src/ui/days.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadDays)
/* harmony export */ });
function loadDays(week) {
    const daysContainer = document.querySelector('div.days');

    while (daysContainer.firstChild) {
        daysContainer.removeChild(daysContainer.firstChild);
    }
    
    for (let i = 0; i < week.length; i++) {
        const day = week[i];

        const dayOfWeek = new Date(day.date).getDay(); // 0-6
        const dayText = document.createElement('p');
        dayText.classList.add('day-name');
        dayText.textContent = i == 0 ? 'Today' : getDayOfWeek((dayOfWeek + 1) % 7);

        const iconUrl = day.day.condition.icon;
        const iconImage = document.createElement('img');
        iconImage.classList.add('icon');
        iconImage.src = iconUrl;

        const low = `${localStorage.getItem('TEMP_UNIT') == 'F' ? day.day.mintemp_f : day.day.mintemp_c}°`
        const lowText = document.createElement('p');
        lowText.classList.add('low');
        lowText.textContent = low;

        const high = `${localStorage.getItem('TEMP_UNIT') == 'F' ?  day.day.maxtemp_f : day.day.maxtemp_c}°`
        const highText = document.createElement('p');
        highText.classList.add('high');
        highText.textContent = high;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.appendChild(dayText);
        dayDiv.appendChild(iconImage);
        dayDiv.appendChild(lowText);
        dayDiv.appendChild(highText);

        daysContainer.appendChild(dayDiv);
    }
}

function getDayOfWeek(num) {
    const days = new Map([
        [0, 'Sun'],
        [1, 'Mon'],
        [2, 'Tue'],
        [3, 'Wed'],
        [4, 'Thu'],
        [5, 'Fri'],
        [6, 'Sat'],
    ]);

    return days.get(num);
}

/***/ }),

/***/ "./src/ui/header.js":
/*!**************************!*\
  !*** ./src/ui/header.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadHeader)
/* harmony export */ });
/* harmony import */ var dateformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dateformat */ "./node_modules/dateformat/lib/dateformat.js");


function loadHeader(location, current, forecastToday) {
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
    date.textContent = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentDate, "dddd, mmmm dS, yyyy");
    
    const time = document.querySelector('.time');
    time.textContent = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentDate, "h:MM TT");

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

/***/ }),

/***/ "./src/ui/hours.js":
/*!*************************!*\
  !*** ./src/ui/hours.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadHours)
/* harmony export */ });
function loadHours(today, tomorrow, localtime) {
    const hoursContainer = document.querySelector('.hours');

    while (hoursContainer.firstChild) {
        hoursContainer.removeChild(hoursContainer.firstChild);
    }

    const currentHour = new Date(localtime).getHours();

    for (let i = currentHour; i < today.length; i++) { // rest of today
        createHourDiv(today[i], currentHour, hoursContainer);
    }

    for (let i = 0; i < currentHour; i++) { // tomorrow until 24 hours after current hour
        createHourDiv(tomorrow[i], currentHour, hoursContainer);
    }
}

function createHourDiv(hour, currentHour, hoursContainer) {
    const hourNum = new Date(hour.time).getHours();
    let time = hourNum % 12 == 0 ? 12 : hourNum % 12;
    time += hourNum > 11 ? 'PM' : 'AM';
    const timeText = document.createElement('p');
    timeText.classList.add('time');
    timeText.textContent = hourNum == currentHour ? 'Now' : time;

    const iconUrl = hour.condition.icon;
    const iconImage = document.createElement('img');
    iconImage.classList.add('icon');
    iconImage.src = iconUrl;

    const temp = localStorage.getItem('TEMP_UNIT') == 'F' ? hour.temp_f : hour.temp_c;
    const tempText = document.createElement('p');
    tempText.classList.add('hour-temp');
    tempText.textContent = `${temp}°`;

    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');
    hourDiv.appendChild(timeText);
    hourDiv.appendChild(iconImage);
    hourDiv.appendChild(tempText);

    hoursContainer.appendChild(hourDiv);
}

/***/ }),

/***/ "./node_modules/dateformat/lib/dateformat.js":
/*!***************************************************!*\
  !*** ./node_modules/dateformat/lib/dateformat.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dateFormat),
/* harmony export */   "formatTimezone": () => (/* binding */ formatTimezone),
/* harmony export */   "i18n": () => (/* binding */ i18n),
/* harmony export */   "masks": () => (/* binding */ masks)
/* harmony export */ });
var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;var timezoneClip=/[^-+\dA-Z]/g;function dateFormat(date,mask,utc,gmt){if(arguments.length===1&&typeof date==="string"&&!/\d/.test(date)){mask=date;date=undefined}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date)}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(masks[mask]||mask||masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()],short:true})},dddd:function dddd(){return i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return i18n.monthNames[_m()]},mmmm:function mmmm(){return i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?i18n.timeNames[0]:i18n.timeNames[1]},tt:function tt(){return _H()<12?i18n.timeNames[2]:i18n.timeNames[3]},T:function T(){return _H()<12?i18n.timeNames[4]:i18n.timeNames[5]},TT:function TT(){return _H()<12?i18n.timeNames[6]:i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":formatTimezone(date)},o:function o(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return(_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}var masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};var i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val){var len=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return String(val).padStart(len,"0")};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7}return dow};var formatTimezone=function formatTimezone(date){return(String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_days__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/days */ "./src/ui/days.js");
/* harmony import */ var _ui_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/header */ "./src/ui/header.js");
/* harmony import */ var _ui_hours__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/hours */ "./src/ui/hours.js");




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
    
    (0,_ui_header__WEBPACK_IMPORTED_MODULE_1__["default"])(location, current, forecast.forecastday[0].day);
    (0,_ui_hours__WEBPACK_IMPORTED_MODULE_2__["default"])(forecast.forecastday[0].hour, forecast.forecastday[1].hour, location.localtime);
    (0,_ui_days__WEBPACK_IMPORTED_MODULE_0__["default"])(forecast.forecastday);
    setBackground(location, current);
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

function setBackground(location, current) {
    const conditionCode = current.condition.code;
    const currentTemp = current.temp_c;
    const currentHour = new Date(location.localtime).getHours();
    // day: 6am - 6pm, night: 7pm - 5am
    console.table(conditionCode, currentHour, currentTemp);

    switch (true) { // calculated with Celsius - doesn't matter since user doesn't read this
        case currentTemp < 0:
            setColor('navy', 'gray');
            break;
        case 0 <= currentTemp && currentTemp < 15:
            setColor('lightblue', 'white');
            break;
        case 15 <= currentTemp && currentHour < 20:
            setColor('green', 'gray');
            break;
        case 20 <= currentTemp && currentHour < 25:
            setColor('yellow', 'darkgray');
            break;
        case 25 <= currentTemp && currentHour < 30:
            setColor('orange', 'white');
            break;
        case 30 <= currentTemp:
            setColor('red', 'beige');
            break;
        default:
            console.log('hi');
    }
    
    function setColor(textColor, backgroundColor) {
        console.log(`textColor: ${textColor}, backgroundColor: ${backgroundColor}`);
        // start setting colors accordingly
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTs7QUFFQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9kYXlzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaG91cnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRGF5cyh3ZWVrKSB7XG4gICAgY29uc3QgZGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5kYXlzJyk7XG5cbiAgICB3aGlsZSAoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGRheXNDb250YWluZXIucmVtb3ZlQ2hpbGQoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRheSA9IHdlZWtbaV07XG5cbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbmV3IERhdGUoZGF5LmRhdGUpLmdldERheSgpOyAvLyAwLTZcbiAgICAgICAgY29uc3QgZGF5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGF5VGV4dC5jbGFzc0xpc3QuYWRkKCdkYXktbmFtZScpO1xuICAgICAgICBkYXlUZXh0LnRleHRDb250ZW50ID0gaSA9PSAwID8gJ1RvZGF5JyA6IGdldERheU9mV2VlaygoZGF5T2ZXZWVrICsgMSkgJSA3KTtcblxuICAgICAgICBjb25zdCBpY29uVXJsID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgICAgIGNvbnN0IGxvdyA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBkYXkuZGF5Lm1pbnRlbXBfZiA6IGRheS5kYXkubWludGVtcF9jfcKwYFxuICAgICAgICBjb25zdCBsb3dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsb3dUZXh0LmNsYXNzTGlzdC5hZGQoJ2xvdycpO1xuICAgICAgICBsb3dUZXh0LnRleHRDb250ZW50ID0gbG93O1xuXG4gICAgICAgIGNvbnN0IGhpZ2ggPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gIGRheS5kYXkubWF4dGVtcF9mIDogZGF5LmRheS5tYXh0ZW1wX2N9wrBgXG4gICAgICAgIGNvbnN0IGhpZ2hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBoaWdoVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWdoJyk7XG4gICAgICAgIGhpZ2hUZXh0LnRleHRDb250ZW50ID0gaGlnaDtcblxuICAgICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF5RGl2LmNsYXNzTGlzdC5hZGQoJ2RheScpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoZGF5VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQobG93VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChoaWdoVGV4dCk7XG5cbiAgICAgICAgZGF5c0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlEaXYpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKG51bSkge1xuICAgIGNvbnN0IGRheXMgPSBuZXcgTWFwKFtcbiAgICAgICAgWzAsICdTdW4nXSxcbiAgICAgICAgWzEsICdNb24nXSxcbiAgICAgICAgWzIsICdUdWUnXSxcbiAgICAgICAgWzMsICdXZWQnXSxcbiAgICAgICAgWzQsICdUaHUnXSxcbiAgICAgICAgWzUsICdGcmknXSxcbiAgICAgICAgWzYsICdTYXQnXSxcbiAgICBdKTtcblxuICAgIHJldHVybiBkYXlzLmdldChudW0pO1xufSIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0VG9kYXkpIHtcbiAgICBjb25zdCBsb2NhdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbiAgICBsb2NhdGlvbk5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5uYW1lO1xuXG4gICAgY29uc3QgcmVnaW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWdpb24nKTtcbiAgICByZWdpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ucmVnaW9uO1xuXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9mKSA6IE1hdGgucm91bmQoY3VycmVudC50ZW1wX2MpfcKwYDtcbiAgICBcbiAgICBjb25zdCB0ZW1wSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wLWNvbnRhaW5lciAudG9kYXktaWNvbicpO1xuICAgIHRlbXBJY29uLnNyYyA9IGN1cnJlbnQuY29uZGl0aW9uLmljb247XG5cbiAgICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZGl0aW9uJyk7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gY3VycmVudC5jb25kaXRpb24udGV4dDtcblxuICAgIGNvbnN0IGhpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlnaCcpO1xuICAgIGhpZ2gudGV4dENvbnRlbnQgPSBgSDogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZm9yZWNhc3RUb2RheS5tYXh0ZW1wX2YgOiBmb3JlY2FzdFRvZGF5Lm1heHRlbXBfY33CsGA7XG5cbiAgICBjb25zdCBsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG93Jyk7XG4gICAgbG93LnRleHRDb250ZW50ID0gYEw6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGZvcmVjYXN0VG9kYXkubWludGVtcF9mIDogZm9yZWNhc3RUb2RheS5taW50ZW1wX2N9wrBgO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShsb2NhdGlvbi5sb2NhbHRpbWUpO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGRhdGVGb3JtYXQoY3VycmVudERhdGUsIFwiZGRkZCwgbW1tbSBkUywgeXl5eVwiKTtcbiAgICBcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbiAgICB0aW1lLnRleHRDb250ZW50ID0gZGF0ZUZvcm1hdChjdXJyZW50RGF0ZSwgXCJoOk1NIFRUXCIpO1xuXG4gICAgLy8gbW9yZSBkZXRhaWxzICh3aW5kLCBwcmVjaXAsIHByZXNzdXJlKVxuICAgIGNvbnN0IGRpcmVjdGlvbnMgPSBuZXcgTWFwKFtcbiAgICAgICAgWydOJywgJ25vcnRoJ10sXG4gICAgICAgIFsnRScsICdlYXN0J10sXG4gICAgICAgIFsnUycsICdzb3V0aCddLFxuICAgICAgICBbJ1cnLCAnd2VzdCddXG4gICAgXSk7XG4gICAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kJyk7XG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBjdXJyZW50LndpbmRfbXBoIDogY3VycmVudC53aW5kX2twaH0gJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ21waCcgOiAna21oJ30gJHtkaXJlY3Rpb25zLmdldChjdXJyZW50LndpbmRfZGlyKX1gO1xuXG4gICAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVjaXBpdGF0aW9uJyk7XG4gICAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBjdXJyZW50LnByZWNpcF9pbiA6IGN1cnJlbnQucHJlY2lwX21tfSAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnaW4nIDogJ21tJ31gO1xuXG4gICAgY29uc3QgcHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc3N1cmUnKTtcbiAgICBwcmVzc3VyZS50ZXh0Q29udGVudCA9IGBQcmVzc3VyZTogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gY3VycmVudC5wcmVzc3VyZV9pbiA6IGN1cnJlbnQucHJlc3N1cmVfbWJ9ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdpbicgOiAnbWInfWA7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZEhvdXJzKHRvZGF5LCB0b21vcnJvdywgbG9jYWx0aW1lKSB7XG4gICAgY29uc3QgaG91cnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKTtcblxuICAgIHdoaWxlIChob3Vyc0NvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRIb3VyID0gbmV3IERhdGUobG9jYWx0aW1lKS5nZXRIb3VycygpO1xuXG4gICAgZm9yIChsZXQgaSA9IGN1cnJlbnRIb3VyOyBpIDwgdG9kYXkubGVuZ3RoOyBpKyspIHsgLy8gcmVzdCBvZiB0b2RheVxuICAgICAgICBjcmVhdGVIb3VyRGl2KHRvZGF5W2ldLCBjdXJyZW50SG91ciwgaG91cnNDb250YWluZXIpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudEhvdXI7IGkrKykgeyAvLyB0b21vcnJvdyB1bnRpbCAyNCBob3VycyBhZnRlciBjdXJyZW50IGhvdXJcbiAgICAgICAgY3JlYXRlSG91ckRpdih0b21vcnJvd1tpXSwgY3VycmVudEhvdXIsIGhvdXJzQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhvdXJEaXYoaG91ciwgY3VycmVudEhvdXIsIGhvdXJzQ29udGFpbmVyKSB7XG4gICAgY29uc3QgaG91ck51bSA9IG5ldyBEYXRlKGhvdXIudGltZSkuZ2V0SG91cnMoKTtcbiAgICBsZXQgdGltZSA9IGhvdXJOdW0gJSAxMiA9PSAwID8gMTIgOiBob3VyTnVtICUgMTI7XG4gICAgdGltZSArPSBob3VyTnVtID4gMTEgPyAnUE0nIDogJ0FNJztcbiAgICBjb25zdCB0aW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0aW1lVGV4dC5jbGFzc0xpc3QuYWRkKCd0aW1lJyk7XG4gICAgdGltZVRleHQudGV4dENvbnRlbnQgPSBob3VyTnVtID09IGN1cnJlbnRIb3VyID8gJ05vdycgOiB0aW1lO1xuXG4gICAgY29uc3QgaWNvblVybCA9IGhvdXIuY29uZGl0aW9uLmljb247XG4gICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICBpY29uSW1hZ2Uuc3JjID0gaWNvblVybDtcblxuICAgIGNvbnN0IHRlbXAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gaG91ci50ZW1wX2YgOiBob3VyLnRlbXBfYztcbiAgICBjb25zdCB0ZW1wVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZW1wVGV4dC5jbGFzc0xpc3QuYWRkKCdob3VyLXRlbXAnKTtcbiAgICB0ZW1wVGV4dC50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuXG4gICAgY29uc3QgaG91ckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhvdXJEaXYuY2xhc3NMaXN0LmFkZCgnaG91cicpO1xuICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGltZVRleHQpO1xuICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQoaWNvbkltYWdlKTtcbiAgICBob3VyRGl2LmFwcGVuZENoaWxkKHRlbXBUZXh0KTtcblxuICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJEaXYpO1xufSIsInZhciB0b2tlbj0vZHsxLDR9fER7Myw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFd7MSwyfXxbTGxvcFNaTl18XCJbXlwiXSpcInwnW14nXSonL2c7dmFyIHRpbWV6b25lPS9cXGIoPzpbQS1aXXsxLDN9W0EtWl1bVENdKSg/OlstK11cXGR7NH0pP3woKD86QXVzdHJhbGlhbiApPyg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lKVxcYi9nO3ZhciB0aW1lem9uZUNsaXA9L1teLStcXGRBLVpdL2c7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLG1hc2ssdXRjLGdtdCl7aWYoYXJndW1lbnRzLmxlbmd0aD09PTEmJnR5cGVvZiBkYXRlPT09XCJzdHJpbmdcIiYmIS9cXGQvLnRlc3QoZGF0ZSkpe21hc2s9ZGF0ZTtkYXRlPXVuZGVmaW5lZH1kYXRlPWRhdGV8fGRhdGU9PT0wP2RhdGU6bmV3IERhdGU7aWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpe2RhdGU9bmV3IERhdGUoZGF0ZSl9aWYoaXNOYU4oZGF0ZSkpe3Rocm93IFR5cGVFcnJvcihcIkludmFsaWQgZGF0ZVwiKX1tYXNrPVN0cmluZyhtYXNrc1ttYXNrXXx8bWFza3x8bWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCldfSxEREQ6ZnVuY3Rpb24gREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKV0sc2hvcnQ6dHJ1ZX0pfSxkZGRkOmZ1bmN0aW9uIGRkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCkrN119KX0sbTpmdW5jdGlvbiBtKCl7cmV0dXJuIF9tKCkrMX0sbW06ZnVuY3Rpb24gbW0oKXtyZXR1cm4gcGFkKF9tKCkrMSl9LG1tbTpmdW5jdGlvbiBtbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCldfSxtbW1tOmZ1bmN0aW9uIG1tbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1swXTppMThuLnRpbWVOYW1lc1sxXX0sdHQ6ZnVuY3Rpb24gdHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1syXTppMThuLnRpbWVOYW1lc1szXX0sVDpmdW5jdGlvbiBUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNF06aTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNl06aTE4bi50aW1lTmFtZXNbN119LFo6ZnVuY3Rpb24gWigpe3JldHVybiBnbXQ/XCJHTVRcIjp1dGM/XCJVVENcIjpmb3JtYXRUaW1lem9uZShkYXRlKX0sbzpmdW5jdGlvbiBvKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApKjEwMCtNYXRoLmFicyhfbygpKSU2MCw0KX0scDpmdW5jdGlvbiBwKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApLDIpK1wiOlwiK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpJTYwKSwyKX0sUzpmdW5jdGlvbiBTKCl7cmV0dXJuW1widGhcIixcInN0XCIsXCJuZFwiLFwicmRcIl1bX2QoKSUxMD4zPzA6KF9kKCklMTAwLV9kKCklMTAhPTEwKSpfZCgpJTEwXX0sVzpmdW5jdGlvbiBXKCl7cmV0dXJuIF9XKCl9LFdXOmZ1bmN0aW9uIFdXKCl7cmV0dXJuIHBhZChfVygpKX0sTjpmdW5jdGlvbiBOKCl7cmV0dXJuIF9OKCl9fTtyZXR1cm4gbWFzay5yZXBsYWNlKHRva2VuLGZ1bmN0aW9uKG1hdGNoKXtpZihtYXRjaCBpbiBmbGFncyl7cmV0dXJuIGZsYWdzW21hdGNoXSgpfXJldHVybiBtYXRjaC5zbGljZSgxLG1hdGNoLmxlbmd0aC0xKX0pfWV4cG9ydCB2YXIgbWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2V4cG9ydCB2YXIgaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCl7dmFyIGxlbj1hcmd1bWVudHMubGVuZ3RoPjEmJmFyZ3VtZW50c1sxXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMV06MjtyZXR1cm4gU3RyaW5nKHZhbCkucGFkU3RhcnQobGVuLFwiMFwiKX07dmFyIGdldERheU5hbWU9ZnVuY3Rpb24gZ2V0RGF5TmFtZShfcmVmKXt2YXIgeT1fcmVmLnksbT1fcmVmLm0sZD1fcmVmLmQsXz1fcmVmLl8sZGF5TmFtZT1fcmVmLmRheU5hbWUsX3JlZiRzaG9ydD1fcmVmW1wic2hvcnRcIl0sX3Nob3J0PV9yZWYkc2hvcnQ9PT12b2lkIDA/ZmFsc2U6X3JlZiRzaG9ydDt2YXIgdG9kYXk9bmV3IERhdGU7dmFyIHllc3RlcmRheT1uZXcgRGF0ZTt5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKS0xKTt2YXIgdG9tb3Jyb3c9bmV3IERhdGU7dG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvd1tfK1wiRGF0ZVwiXSgpKzEpO3ZhciB0b2RheV9kPWZ1bmN0aW9uIHRvZGF5X2QoKXtyZXR1cm4gdG9kYXlbXytcIkRhdGVcIl0oKX07dmFyIHRvZGF5X209ZnVuY3Rpb24gdG9kYXlfbSgpe3JldHVybiB0b2RheVtfK1wiTW9udGhcIl0oKX07dmFyIHRvZGF5X3k9ZnVuY3Rpb24gdG9kYXlfeSgpe3JldHVybiB0b2RheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHllc3RlcmRheV9kPWZ1bmN0aW9uIHllc3RlcmRheV9kKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpfTt2YXIgeWVzdGVyZGF5X209ZnVuY3Rpb24geWVzdGVyZGF5X20oKXtyZXR1cm4geWVzdGVyZGF5W18rXCJNb250aFwiXSgpfTt2YXIgeWVzdGVyZGF5X3k9ZnVuY3Rpb24geWVzdGVyZGF5X3koKXtyZXR1cm4geWVzdGVyZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgdG9tb3Jyb3dfZD1mdW5jdGlvbiB0b21vcnJvd19kKCl7cmV0dXJuIHRvbW9ycm93W18rXCJEYXRlXCJdKCl9O3ZhciB0b21vcnJvd19tPWZ1bmN0aW9uIHRvbW9ycm93X20oKXtyZXR1cm4gdG9tb3Jyb3dbXytcIk1vbnRoXCJdKCl9O3ZhciB0b21vcnJvd195PWZ1bmN0aW9uIHRvbW9ycm93X3koKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkZ1bGxZZWFyXCJdKCl9O2lmKHRvZGF5X3koKT09PXkmJnRvZGF5X20oKT09PW0mJnRvZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUZHlcIjpcIlRvZGF5XCJ9ZWxzZSBpZih5ZXN0ZXJkYXlfeSgpPT09eSYmeWVzdGVyZGF5X20oKT09PW0mJnllc3RlcmRheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiWXNkXCI6XCJZZXN0ZXJkYXlcIn1lbHNlIGlmKHRvbW9ycm93X3koKT09PXkmJnRvbW9ycm93X20oKT09PW0mJnRvbW9ycm93X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUbXdcIjpcIlRvbW9ycm93XCJ9cmV0dXJuIGRheU5hbWV9O3ZhciBnZXRXZWVrPWZ1bmN0aW9uIGdldFdlZWsoZGF0ZSl7dmFyIHRhcmdldFRodXJzZGF5PW5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO3RhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpLSh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBmaXJzdFRodXJzZGF5PW5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksMCw0KTtmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCktKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZHM9dGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKS1maXJzdFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCk7dGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKS1kcyk7dmFyIHdlZWtEaWZmPSh0YXJnZXRUaHVyc2RheS1maXJzdFRodXJzZGF5KS8oODY0ZTUqNyk7cmV0dXJuIDErTWF0aC5mbG9vcih3ZWVrRGlmZil9O3ZhciBnZXREYXlPZldlZWs9ZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpe3ZhciBkb3c9ZGF0ZS5nZXREYXkoKTtpZihkb3c9PT0wKXtkb3c9N31yZXR1cm4gZG93fTtleHBvcnQgdmFyIGZvcm1hdFRpbWV6b25lPWZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKGRhdGUpe3JldHVybihTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpfHxbXCJcIl0pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLFwiXCIpLnJlcGxhY2UoL0dNVFxcKzAwMDAvZyxcIlVUQ1wiKX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZERheXMgZnJvbSBcIi4vdWkvZGF5c1wiO1xuaW1wb3J0IGxvYWRIZWFkZXIgZnJvbSBcIi4vdWkvaGVhZGVyXCI7XG5pbXBvcnQgbG9hZEhvdXJzIGZyb20gXCIuL3VpL2hvdXJzXCI7XG5cbmNvbnN0IFdFQVRIRVJfQVBJX0tFWSA9ICdmZGNkMDQ5MWRmYTI0OTc0OTBiMjE1MjQ5MjMzMDAzJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke1dFQVRIRVJfQVBJX0tFWX0mcT0ke2xvY2F0aW9ufSZkYXlzPTdgLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdGb3JlY2FzdCBkYXRhOiAnLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YS5lcnJvciA/IG51bGwgOiBkYXRhO1xufVxuXG5mdW5jdGlvbiBsb2FkVUkoZm9yZWNhc3REYXRhKSB7XG4gICAgY29uc3QgW2xvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdF0gPSBbZm9yZWNhc3REYXRhLmxvY2F0aW9uLCBmb3JlY2FzdERhdGEuY3VycmVudCwgZm9yZWNhc3REYXRhLmZvcmVjYXN0XTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJywgSlNPTi5zdHJpbmdpZnkoZm9yZWNhc3REYXRhKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgZm9yZWNhc3REYXRhLmxvY2F0aW9uLm5hbWUpO1xuICAgIFxuICAgIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheSk7XG4gICAgbG9hZEhvdXJzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIsIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmhvdXIsIGxvY2F0aW9uLmxvY2FsdGltZSk7XG4gICAgbG9hZERheXMoZm9yZWNhc3QuZm9yZWNhc3RkYXkpO1xuICAgIHNldEJhY2tncm91bmQobG9jYXRpb24sIGN1cnJlbnQpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50TGlzdGVuZXJzKGZvcmVjYXN0RGF0YSkge1xuICAgIGNvbnN0IHNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpO1xuICAgIHNlYXJjaEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NlYXJjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3Qoc2VhcmNoRmllbGQudmFsdWUpO1xuICAgICAgICBpZiAoZm9yZWNhc3REYXRhKSB7XG4gICAgICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdXQVRDSF9JRCcpKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDbGVhcmVkIHdhdGNoIG1vbml0b3IgIyR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJyl9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWFyY2hGaWVsZC52YWx1ZSA9ICcnO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdW5pdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKTtcbiAgICBjb25zdCB0b2dnbGVVbml0c0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nLnRvZ2dsZScpO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gdW5pdCA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3R5bGUud2lkdGggPSAnMjRweCc7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XG5cbiAgICB0b2dnbGVVbml0c0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC1ob3Zlci5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLWhvdmVyLnBuZyc7XG4gICAgfSk7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLnBuZyc7XG4gICAgfSk7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVbml0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpO1xuICAgICAgICBpZiAoY3VycmVudFVuaXQgPT0gJ0YnKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0MnKTtcbiAgICAgICAgZWxzZSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0YnKTtcblxuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQtY2xpY2sucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy1jbGljay5wbmcnO1xuICAgICAgICBsb2FkVUkoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRk9SRUNBU1RfREFUQScpKSk7IC8vIGZvcmVjYXN0RGF0YSBtYXkgYmUgbnVsbCBvbiBzZWFyY2hlcyByZXN1bHRpbmcgaW4gbnVsbFxuICAgIH0pO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMucG5nJztcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PSAnLycgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgc2VhcmNoRmllbGQuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PSAnRXNjYXBlJyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IHNlYXJjaEZpZWxkKSB7XG4gICAgICAgICAgICBzZWFyY2hGaWVsZC5ibHVyKCk7XG4gICAgICAgICAgICBzZWFyY2hGaWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKChlLmtleSA9PSAnZicgfHwgZS5rZXkgPT0gJ2MnKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHNlYXJjaEZpZWxkKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9VcHBlckNhc2UoKSA9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIHJldHVybjtcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RFTVBfVU5JVCcsIGUua2V5LnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMucG5nJztcbiAgICAgICAgICAgIGxvYWRVSShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VyTG9jYXRpb25JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZy5jdXJyZW50Jyk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLnBuZyc7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS53aWR0aCA9ICcyNHB4JztcbiAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLmhlaWdodCA9ICcyNHB4JztcbiAgICBcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy1ob3Zlci5wbmcnO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMucG5nJztcbiAgICB9KTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLWNsaWNrLnBuZyc7XG5cbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJykpO1xuICAgICAgICBjb25zb2xlLmxvZyhgQ2xlYXJlZCB3YXRjaCBtb25pdG9yICMke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdXQVRDSF9JRCcpfWApO1xuICAgICAgICBzZXRVc2VyTG9jYXRpb24oKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBsb2NhdGlvbiBpbWFnZSB3YXMgY2xpY2tlZCcpO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLnBuZyc7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldFVzZXJMb2NhdGlvbigpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBzdWNjZXNzKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGVkIGN1cnJlbnQgY29vcmRpbmF0ZXM6ICR7cG9zaXRpb24uY29vcmRzLmxhdGl0dWRlfSwke3Bvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsIGAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfWApO1xuICAgICAgICBcbiAgICAgICAgYXdhaXQgbG9hZFBhZ2VEYXRhKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZXJyb3IoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlcidzIGxvY2F0aW9uIC0gc2V0dGluZyBkZWZhdWx0IHRvIExvcyBBbmdlbGVzXCIsIGVycm9yKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgJ0xvcyBBbmdlbGVzJyk7XG5cbiAgICAgICAgYXdhaXQgbG9hZFBhZ2VEYXRhKCk7XG4gICAgfVxuXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIHVuYXZhaWxhYmxlIC0gc2V0dGluZyBkZWZhdWx0IGxvY2F0aW9uIHRvIExvcyBBbmdlbGVzJyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsICdMb3MgQW5nZWxlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzLmxvY2F0aW9uJykudGV4dENvbnRlbnQgPSAnTG9jYXRpbmcuLi4nO1xuXG4gICAgICAgIGNvbnN0IHdhdGNoSWQgPSBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihzdWNjZXNzLCBlcnJvciwge1xuICAgICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgICAgICAgICAgdGltZW91dDogMjAwMDBcbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdXQVRDSF9JRCcsIHdhdGNoSWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhgTmV3IHdhdGNoSWQ6ICR7d2F0Y2hJZH1gKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldEJhY2tncm91bmQobG9jYXRpb24sIGN1cnJlbnQpIHtcbiAgICBjb25zdCBjb25kaXRpb25Db2RlID0gY3VycmVudC5jb25kaXRpb24uY29kZTtcbiAgICBjb25zdCBjdXJyZW50VGVtcCA9IGN1cnJlbnQudGVtcF9jO1xuICAgIGNvbnN0IGN1cnJlbnRIb3VyID0gbmV3IERhdGUobG9jYXRpb24ubG9jYWx0aW1lKS5nZXRIb3VycygpO1xuICAgIC8vIGRheTogNmFtIC0gNnBtLCBuaWdodDogN3BtIC0gNWFtXG4gICAgY29uc29sZS50YWJsZShjb25kaXRpb25Db2RlLCBjdXJyZW50SG91ciwgY3VycmVudFRlbXApO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7IC8vIGNhbGN1bGF0ZWQgd2l0aCBDZWxzaXVzIC0gZG9lc24ndCBtYXR0ZXIgc2luY2UgdXNlciBkb2Vzbid0IHJlYWQgdGhpc1xuICAgICAgICBjYXNlIGN1cnJlbnRUZW1wIDwgMDpcbiAgICAgICAgICAgIHNldENvbG9yKCduYXZ5JywgJ2dyYXknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDAgPD0gY3VycmVudFRlbXAgJiYgY3VycmVudFRlbXAgPCAxNTpcbiAgICAgICAgICAgIHNldENvbG9yKCdsaWdodGJsdWUnLCAnd2hpdGUnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE1IDw9IGN1cnJlbnRUZW1wICYmIGN1cnJlbnRIb3VyIDwgMjA6XG4gICAgICAgICAgICBzZXRDb2xvcignZ3JlZW4nLCAnZ3JheScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjAgPD0gY3VycmVudFRlbXAgJiYgY3VycmVudEhvdXIgPCAyNTpcbiAgICAgICAgICAgIHNldENvbG9yKCd5ZWxsb3cnLCAnZGFya2dyYXknKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI1IDw9IGN1cnJlbnRUZW1wICYmIGN1cnJlbnRIb3VyIDwgMzA6XG4gICAgICAgICAgICBzZXRDb2xvcignb3JhbmdlJywgJ3doaXRlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzMCA8PSBjdXJyZW50VGVtcDpcbiAgICAgICAgICAgIHNldENvbG9yKCdyZWQnLCAnYmVpZ2UnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpJyk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldENvbG9yKHRleHRDb2xvciwgYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGB0ZXh0Q29sb3I6ICR7dGV4dENvbG9yfSwgYmFja2dyb3VuZENvbG9yOiAke2JhY2tncm91bmRDb2xvcn1gKTtcbiAgICAgICAgLy8gc3RhcnQgc2V0dGluZyBjb2xvcnMgYWNjb3JkaW5nbHlcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlRGF0YSgpIHtcbiAgICBsZXQgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQ0FUSU9OJykpO1xuICAgIGlmIChmb3JlY2FzdERhdGEpIHtcbiAgICAgICAgbG9hZFVJKGZvcmVjYXN0RGF0YSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0YnKTtcbiAgICBhd2FpdCBzZXRVc2VyTG9jYXRpb24oKTtcbiAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcblxuICAgIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRk9SRUNBU1RfREFUQScpKSk7XG59XG5cbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=