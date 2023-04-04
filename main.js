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

async function loadPageData() {
    let forecastData = await getForecast(localStorage.getItem('LOCATION'));
    if (forecastData) {
        loadUI(forecastData);
        localStorage.setItem('FORECAST_DATA', JSON.stringify(forecastData));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlDO0FBQ25GOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUU7QUFDbkUsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsaUNBQWlDO0FBQy9FOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCx5QkFBeUIsR0FBRywwQkFBMEI7QUFDMUcsNENBQTRDLHlCQUF5QixHQUFHLDBCQUEwQjtBQUNsRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG9DQUFvQyxRQUFRO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9kYXlzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaG91cnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRGF5cyh3ZWVrKSB7XG4gICAgY29uc3QgZGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5kYXlzJyk7XG5cbiAgICB3aGlsZSAoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGRheXNDb250YWluZXIucmVtb3ZlQ2hpbGQoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRheSA9IHdlZWtbaV07XG5cbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbmV3IERhdGUoZGF5LmRhdGUpLmdldERheSgpOyAvLyAwLTZcbiAgICAgICAgY29uc3QgZGF5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGF5VGV4dC5jbGFzc0xpc3QuYWRkKCdkYXktbmFtZScpO1xuICAgICAgICBkYXlUZXh0LnRleHRDb250ZW50ID0gaSA9PSAwID8gJ1RvZGF5JyA6IGdldERheU9mV2VlaygoZGF5T2ZXZWVrICsgMSkgJSA3KTtcblxuICAgICAgICBjb25zdCBpY29uVXJsID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgICAgIGNvbnN0IGxvdyA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBkYXkuZGF5Lm1pbnRlbXBfZiA6IGRheS5kYXkubWludGVtcF9jfcKwYFxuICAgICAgICBjb25zdCBsb3dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsb3dUZXh0LmNsYXNzTGlzdC5hZGQoJ2xvdycpO1xuICAgICAgICBsb3dUZXh0LnRleHRDb250ZW50ID0gbG93O1xuXG4gICAgICAgIGNvbnN0IGhpZ2ggPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gIGRheS5kYXkubWF4dGVtcF9mIDogZGF5LmRheS5tYXh0ZW1wX2N9wrBgXG4gICAgICAgIGNvbnN0IGhpZ2hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBoaWdoVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWdoJyk7XG4gICAgICAgIGhpZ2hUZXh0LnRleHRDb250ZW50ID0gaGlnaDtcblxuICAgICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF5RGl2LmNsYXNzTGlzdC5hZGQoJ2RheScpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoZGF5VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQobG93VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChoaWdoVGV4dCk7XG5cbiAgICAgICAgZGF5c0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlEaXYpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKG51bSkge1xuICAgIGNvbnN0IGRheXMgPSBuZXcgTWFwKFtcbiAgICAgICAgWzAsICdTdW4nXSxcbiAgICAgICAgWzEsICdNb24nXSxcbiAgICAgICAgWzIsICdUdWUnXSxcbiAgICAgICAgWzMsICdXZWQnXSxcbiAgICAgICAgWzQsICdUaHUnXSxcbiAgICAgICAgWzUsICdGcmknXSxcbiAgICAgICAgWzYsICdTYXQnXSxcbiAgICBdKTtcblxuICAgIHJldHVybiBkYXlzLmdldChudW0pO1xufSIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0VG9kYXkpIHtcbiAgICBjb25zdCBsb2NhdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24nKTtcbiAgICBsb2NhdGlvbk5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5uYW1lO1xuXG4gICAgY29uc3QgcmVnaW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZWdpb24nKTtcbiAgICByZWdpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ucmVnaW9uO1xuXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wJyk7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9mKSA6IE1hdGgucm91bmQoY3VycmVudC50ZW1wX2MpfcKwYDtcblxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb25kaXRpb24nKTtcbiAgICBjb25kaXRpb24udGV4dENvbnRlbnQgPSBjdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuXG4gICAgY29uc3QgaGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWdoJyk7XG4gICAgaGlnaC50ZXh0Q29udGVudCA9IGBIOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBmb3JlY2FzdFRvZGF5Lm1heHRlbXBfZiA6IGZvcmVjYXN0VG9kYXkubWF4dGVtcF9jfcKwYDtcblxuICAgIGNvbnN0IGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb3cnKTtcbiAgICBsb3cudGV4dENvbnRlbnQgPSBgTDogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZm9yZWNhc3RUb2RheS5taW50ZW1wX2YgOiBmb3JlY2FzdFRvZGF5Lm1pbnRlbXBfY33CsGA7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGxvY2F0aW9uLmxvY2FsdGltZSk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcbiAgICBkYXRlLnRleHRDb250ZW50ID0gZGF0ZUZvcm1hdChjdXJyZW50RGF0ZSwgXCJkZGRkLCBtbW1tIGRTLCB5eXl5XCIpO1xuICAgIFxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xuICAgIHRpbWUudGV4dENvbnRlbnQgPSBkYXRlRm9ybWF0KGN1cnJlbnREYXRlLCBcImg6TU0gVFRcIik7XG5cbiAgICAvLyBtb3JlIGRldGFpbHMgKHdpbmQsIHByZWNpcCwgcHJlc3N1cmUpXG4gICAgY29uc3QgZGlyZWN0aW9ucyA9IG5ldyBNYXAoW1xuICAgICAgICBbJ04nLCAnbm9ydGgnXSxcbiAgICAgICAgWydFJywgJ2Vhc3QnXSxcbiAgICAgICAgWydTJywgJ3NvdXRoJ10sXG4gICAgICAgIFsnVycsICd3ZXN0J11cbiAgICBdKTtcbiAgICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGN1cnJlbnQud2luZF9tcGggOiBjdXJyZW50LndpbmRfa3BofSAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnbXBoJyA6ICdrbWgnfSAke2RpcmVjdGlvbnMuZ2V0KGN1cnJlbnQud2luZF9kaXIpfWA7XG5cbiAgICBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWNpcGl0YXRpb24nKTtcbiAgICBwcmVjaXBpdGF0aW9uLnRleHRDb250ZW50ID0gYFByZWNpcGl0YXRpb246ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGN1cnJlbnQucHJlY2lwX2luIDogY3VycmVudC5wcmVjaXBfbW19ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdpbicgOiAnbW0nfWA7XG5cbiAgICBjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzc3VyZScpO1xuICAgIHByZXNzdXJlLnRleHRDb250ZW50ID0gYFByZXNzdXJlOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBjdXJyZW50LnByZXNzdXJlX2luIDogY3VycmVudC5wcmVzc3VyZV9tYn0gJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2luJyA6ICdtYid9YDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSG91cnModG9kYXksIHRvbW9ycm93LCBsb2NhbHRpbWUpIHtcbiAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VycycpO1xuXG4gICAgd2hpbGUgKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgaG91cnNDb250YWluZXIucmVtb3ZlQ2hpbGQoaG91cnNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudEhvdXIgPSBuZXcgRGF0ZShsb2NhbHRpbWUpLmdldEhvdXJzKCk7XG5cbiAgICBmb3IgKGxldCBpID0gY3VycmVudEhvdXI7IGkgPCB0b2RheS5sZW5ndGg7IGkrKykgeyAvLyByZXN0IG9mIHRvZGF5XG4gICAgICAgIGNyZWF0ZUhvdXJEaXYodG9kYXlbaV0sIGN1cnJlbnRIb3VyLCBob3Vyc0NvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SG91cjsgaSsrKSB7IC8vIHRvbW9ycm93IHVudGlsIDI0IGhvdXJzIGFmdGVyIGN1cnJlbnQgaG91clxuICAgICAgICBjcmVhdGVIb3VyRGl2KHRvbW9ycm93W2ldLCBjdXJyZW50SG91ciwgaG91cnNDb250YWluZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlSG91ckRpdihob3VyLCBjdXJyZW50SG91ciwgaG91cnNDb250YWluZXIpIHtcbiAgICBjb25zdCBob3VyTnVtID0gbmV3IERhdGUoaG91ci50aW1lKS5nZXRIb3VycygpO1xuICAgIGxldCB0aW1lID0gaG91ck51bSAlIDEyID09IDAgPyAxMiA6IGhvdXJOdW0gJSAxMjtcbiAgICB0aW1lICs9IGhvdXJOdW0gPiAxMSA/ICdQTScgOiAnQU0nO1xuICAgIGNvbnN0IHRpbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRpbWVUZXh0LmNsYXNzTGlzdC5hZGQoJ3RpbWUnKTtcbiAgICB0aW1lVGV4dC50ZXh0Q29udGVudCA9IGhvdXJOdW0gPT0gY3VycmVudEhvdXIgPyAnTm93JyA6IHRpbWU7XG5cbiAgICBjb25zdCBpY29uVXJsID0gaG91ci5jb25kaXRpb24uaWNvbjtcbiAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpY29uSW1hZ2UuY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgY29uc3QgdGVtcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBob3VyLnRlbXBfZiA6IGhvdXIudGVtcF9jO1xuICAgIGNvbnN0IHRlbXBUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHRlbXBUZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdXItdGVtcCcpO1xuICAgIHRlbXBUZXh0LnRleHRDb250ZW50ID0gYCR7dGVtcH3CsGA7XG5cbiAgICBjb25zdCBob3VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaG91ckRpdi5jbGFzc0xpc3QuYWRkKCdob3VyJyk7XG4gICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0aW1lVGV4dCk7XG4gICAgaG91ckRpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xuICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGVtcFRleHQpO1xuXG4gICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91ckRpdik7XG59IiwidmFyIHRva2VuPS9kezEsNH18RHszLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98V3sxLDJ9fFtMbG9wU1pOXXxcIlteXCJdKlwifCdbXiddKicvZzt2YXIgdGltZXpvbmU9L1xcYig/OltBLVpdezEsM31bQS1aXVtUQ10pKD86Wy0rXVxcZHs0fSk/fCgoPzpBdXN0cmFsaWFuICk/KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWUpXFxiL2c7dmFyIHRpbWV6b25lQ2xpcD0vW14tK1xcZEEtWl0vZztleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRlRm9ybWF0KGRhdGUsbWFzayx1dGMsZ210KXtpZihhcmd1bWVudHMubGVuZ3RoPT09MSYmdHlwZW9mIGRhdGU9PT1cInN0cmluZ1wiJiYhL1xcZC8udGVzdChkYXRlKSl7bWFzaz1kYXRlO2RhdGU9dW5kZWZpbmVkfWRhdGU9ZGF0ZXx8ZGF0ZT09PTA/ZGF0ZTpuZXcgRGF0ZTtpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSl7ZGF0ZT1uZXcgRGF0ZShkYXRlKX1pZihpc05hTihkYXRlKSl7dGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBkYXRlXCIpfW1hc2s9U3RyaW5nKG1hc2tzW21hc2tdfHxtYXNrfHxtYXNrc1tcImRlZmF1bHRcIl0pO3ZhciBtYXNrU2xpY2U9bWFzay5zbGljZSgwLDQpO2lmKG1hc2tTbGljZT09PVwiVVRDOlwifHxtYXNrU2xpY2U9PT1cIkdNVDpcIil7bWFzaz1tYXNrLnNsaWNlKDQpO3V0Yz10cnVlO2lmKG1hc2tTbGljZT09PVwiR01UOlwiKXtnbXQ9dHJ1ZX19dmFyIF89ZnVuY3Rpb24gXygpe3JldHVybiB1dGM/XCJnZXRVVENcIjpcImdldFwifTt2YXIgX2Q9ZnVuY3Rpb24gZCgpe3JldHVybiBkYXRlW18oKStcIkRhdGVcIl0oKX07dmFyIEQ9ZnVuY3Rpb24gRCgpe3JldHVybiBkYXRlW18oKStcIkRheVwiXSgpfTt2YXIgX209ZnVuY3Rpb24gbSgpe3JldHVybiBkYXRlW18oKStcIk1vbnRoXCJdKCl9O3ZhciB5PWZ1bmN0aW9uIHkoKXtyZXR1cm4gZGF0ZVtfKCkrXCJGdWxsWWVhclwiXSgpfTt2YXIgX0g9ZnVuY3Rpb24gSCgpe3JldHVybiBkYXRlW18oKStcIkhvdXJzXCJdKCl9O3ZhciBfTT1mdW5jdGlvbiBNKCl7cmV0dXJuIGRhdGVbXygpK1wiTWludXRlc1wiXSgpfTt2YXIgX3M9ZnVuY3Rpb24gcygpe3JldHVybiBkYXRlW18oKStcIlNlY29uZHNcIl0oKX07dmFyIF9MPWZ1bmN0aW9uIEwoKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaWxsaXNlY29uZHNcIl0oKX07dmFyIF9vPWZ1bmN0aW9uIG8oKXtyZXR1cm4gdXRjPzA6ZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpfTt2YXIgX1c9ZnVuY3Rpb24gVygpe3JldHVybiBnZXRXZWVrKGRhdGUpfTt2YXIgX049ZnVuY3Rpb24gTigpe3JldHVybiBnZXREYXlPZldlZWsoZGF0ZSl9O3ZhciBmbGFncz17ZDpmdW5jdGlvbiBkKCl7cmV0dXJuIF9kKCl9LGRkOmZ1bmN0aW9uIGRkKCl7cmV0dXJuIHBhZChfZCgpKX0sZGRkOmZ1bmN0aW9uIGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKV19LERERDpmdW5jdGlvbiBEREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpXSxzaG9ydDp0cnVlfSl9LGRkZGQ6ZnVuY3Rpb24gZGRkZCgpe3JldHVybiBpMThuLmRheU5hbWVzW0QoKSs3XX0sRERERDpmdW5jdGlvbiBEREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKSs3XX0pfSxtOmZ1bmN0aW9uIG0oKXtyZXR1cm4gX20oKSsxfSxtbTpmdW5jdGlvbiBtbSgpe3JldHVybiBwYWQoX20oKSsxKX0sbW1tOmZ1bmN0aW9uIG1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKV19LG1tbW06ZnVuY3Rpb24gbW1tbSgpe3JldHVybiBpMThuLm1vbnRoTmFtZXNbX20oKSsxMl19LHl5OmZ1bmN0aW9uIHl5KCl7cmV0dXJuIFN0cmluZyh5KCkpLnNsaWNlKDIpfSx5eXl5OmZ1bmN0aW9uIHl5eXkoKXtyZXR1cm4gcGFkKHkoKSw0KX0saDpmdW5jdGlvbiBoKCl7cmV0dXJuIF9IKCklMTJ8fDEyfSxoaDpmdW5jdGlvbiBoaCgpe3JldHVybiBwYWQoX0goKSUxMnx8MTIpfSxIOmZ1bmN0aW9uIEgoKXtyZXR1cm4gX0goKX0sSEg6ZnVuY3Rpb24gSEgoKXtyZXR1cm4gcGFkKF9IKCkpfSxNOmZ1bmN0aW9uIE0oKXtyZXR1cm4gX00oKX0sTU06ZnVuY3Rpb24gTU0oKXtyZXR1cm4gcGFkKF9NKCkpfSxzOmZ1bmN0aW9uIHMoKXtyZXR1cm4gX3MoKX0sc3M6ZnVuY3Rpb24gc3MoKXtyZXR1cm4gcGFkKF9zKCkpfSxsOmZ1bmN0aW9uIGwoKXtyZXR1cm4gcGFkKF9MKCksMyl9LEw6ZnVuY3Rpb24gTCgpe3JldHVybiBwYWQoTWF0aC5mbG9vcihfTCgpLzEwKSl9LHQ6ZnVuY3Rpb24gdCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzBdOmkxOG4udGltZU5hbWVzWzFdfSx0dDpmdW5jdGlvbiB0dCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzJdOmkxOG4udGltZU5hbWVzWzNdfSxUOmZ1bmN0aW9uIFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s0XTppMThuLnRpbWVOYW1lc1s1XX0sVFQ6ZnVuY3Rpb24gVFQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1s2XTppMThuLnRpbWVOYW1lc1s3XX0sWjpmdW5jdGlvbiBaKCl7cmV0dXJuIGdtdD9cIkdNVFwiOnV0Yz9cIlVUQ1wiOmZvcm1hdFRpbWV6b25lKGRhdGUpfSxvOmZ1bmN0aW9uIG8oKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCkqMTAwK01hdGguYWJzKF9vKCkpJTYwLDQpfSxwOmZ1bmN0aW9uIHAoKXtyZXR1cm4oX28oKT4wP1wiLVwiOlwiK1wiKStwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKS82MCksMikrXCI6XCIrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSklNjApLDIpfSxTOmZ1bmN0aW9uIFMoKXtyZXR1cm5bXCJ0aFwiLFwic3RcIixcIm5kXCIsXCJyZFwiXVtfZCgpJTEwPjM/MDooX2QoKSUxMDAtX2QoKSUxMCE9MTApKl9kKCklMTBdfSxXOmZ1bmN0aW9uIFcoKXtyZXR1cm4gX1coKX0sV1c6ZnVuY3Rpb24gV1coKXtyZXR1cm4gcGFkKF9XKCkpfSxOOmZ1bmN0aW9uIE4oKXtyZXR1cm4gX04oKX19O3JldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sZnVuY3Rpb24obWF0Y2gpe2lmKG1hdGNoIGluIGZsYWdzKXtyZXR1cm4gZmxhZ3NbbWF0Y2hdKCl9cmV0dXJuIG1hdGNoLnNsaWNlKDEsbWF0Y2gubGVuZ3RoLTEpfSl9ZXhwb3J0IHZhciBtYXNrcz17ZGVmYXVsdDpcImRkZCBtbW0gZGQgeXl5eSBISDpNTTpzc1wiLHNob3J0RGF0ZTpcIm0vZC95eVwiLHBhZGRlZFNob3J0RGF0ZTpcIm1tL2RkL3l5eXlcIixtZWRpdW1EYXRlOlwibW1tIGQsIHl5eXlcIixsb25nRGF0ZTpcIm1tbW0gZCwgeXl5eVwiLGZ1bGxEYXRlOlwiZGRkZCwgbW1tbSBkLCB5eXl5XCIsc2hvcnRUaW1lOlwiaDpNTSBUVFwiLG1lZGl1bVRpbWU6XCJoOk1NOnNzIFRUXCIsbG9uZ1RpbWU6XCJoOk1NOnNzIFRUIFpcIixpc29EYXRlOlwieXl5eS1tbS1kZFwiLGlzb1RpbWU6XCJISDpNTTpzc1wiLGlzb0RhdGVUaW1lOlwieXl5eS1tbS1kZCdUJ0hIOk1NOnNzb1wiLGlzb1V0Y0RhdGVUaW1lOlwiVVRDOnl5eXktbW0tZGQnVCdISDpNTTpzcydaJ1wiLGV4cGlyZXNIZWFkZXJGb3JtYXQ6XCJkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFpcIn07ZXhwb3J0IHZhciBpMThuPXtkYXlOYW1lczpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIixcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLG1vbnRoTmFtZXM6W1wiSmFuXCIsXCJGZWJcIixcIk1hclwiLFwiQXByXCIsXCJNYXlcIixcIkp1blwiLFwiSnVsXCIsXCJBdWdcIixcIlNlcFwiLFwiT2N0XCIsXCJOb3ZcIixcIkRlY1wiLFwiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLHRpbWVOYW1lczpbXCJhXCIsXCJwXCIsXCJhbVwiLFwicG1cIixcIkFcIixcIlBcIixcIkFNXCIsXCJQTVwiXX07dmFyIHBhZD1mdW5jdGlvbiBwYWQodmFsKXt2YXIgbGVuPWFyZ3VtZW50cy5sZW5ndGg+MSYmYXJndW1lbnRzWzFdIT09dW5kZWZpbmVkP2FyZ3VtZW50c1sxXToyO3JldHVybiBTdHJpbmcodmFsKS5wYWRTdGFydChsZW4sXCIwXCIpfTt2YXIgZ2V0RGF5TmFtZT1mdW5jdGlvbiBnZXREYXlOYW1lKF9yZWYpe3ZhciB5PV9yZWYueSxtPV9yZWYubSxkPV9yZWYuZCxfPV9yZWYuXyxkYXlOYW1lPV9yZWYuZGF5TmFtZSxfcmVmJHNob3J0PV9yZWZbXCJzaG9ydFwiXSxfc2hvcnQ9X3JlZiRzaG9ydD09PXZvaWQgMD9mYWxzZTpfcmVmJHNob3J0O3ZhciB0b2RheT1uZXcgRGF0ZTt2YXIgeWVzdGVyZGF5PW5ldyBEYXRlO3llc3RlcmRheS5zZXREYXRlKHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpLTEpO3ZhciB0b21vcnJvdz1uZXcgRGF0ZTt0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93W18rXCJEYXRlXCJdKCkrMSk7dmFyIHRvZGF5X2Q9ZnVuY3Rpb24gdG9kYXlfZCgpe3JldHVybiB0b2RheVtfK1wiRGF0ZVwiXSgpfTt2YXIgdG9kYXlfbT1mdW5jdGlvbiB0b2RheV9tKCl7cmV0dXJuIHRvZGF5W18rXCJNb250aFwiXSgpfTt2YXIgdG9kYXlfeT1mdW5jdGlvbiB0b2RheV95KCl7cmV0dXJuIHRvZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgeWVzdGVyZGF5X2Q9ZnVuY3Rpb24geWVzdGVyZGF5X2QoKXtyZXR1cm4geWVzdGVyZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfbT1mdW5jdGlvbiB5ZXN0ZXJkYXlfbSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfeT1mdW5jdGlvbiB5ZXN0ZXJkYXlfeSgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB0b21vcnJvd19kPWZ1bmN0aW9uIHRvbW9ycm93X2QoKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkRhdGVcIl0oKX07dmFyIHRvbW9ycm93X209ZnVuY3Rpb24gdG9tb3Jyb3dfbSgpe3JldHVybiB0b21vcnJvd1tfK1wiTW9udGhcIl0oKX07dmFyIHRvbW9ycm93X3k9ZnVuY3Rpb24gdG9tb3Jyb3dfeSgpe3JldHVybiB0b21vcnJvd1tfK1wiRnVsbFllYXJcIl0oKX07aWYodG9kYXlfeSgpPT09eSYmdG9kYXlfbSgpPT09bSYmdG9kYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRkeVwiOlwiVG9kYXlcIn1lbHNlIGlmKHllc3RlcmRheV95KCk9PT15JiZ5ZXN0ZXJkYXlfbSgpPT09bSYmeWVzdGVyZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJZc2RcIjpcIlllc3RlcmRheVwifWVsc2UgaWYodG9tb3Jyb3dfeSgpPT09eSYmdG9tb3Jyb3dfbSgpPT09bSYmdG9tb3Jyb3dfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIlRtd1wiOlwiVG9tb3Jyb3dcIn1yZXR1cm4gZGF5TmFtZX07dmFyIGdldFdlZWs9ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKXt2YXIgdGFyZ2V0VGh1cnNkYXk9bmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLGRhdGUuZ2V0TW9udGgoKSxkYXRlLmdldERhdGUoKSk7dGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCktKHRhcmdldFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGZpcnN0VGh1cnNkYXk9bmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwwLDQpO2ZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKS0oZmlyc3RUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBkcz10YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpLWZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTt0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpLWRzKTt2YXIgd2Vla0RpZmY9KHRhcmdldFRodXJzZGF5LWZpcnN0VGh1cnNkYXkpLyg4NjRlNSo3KTtyZXR1cm4gMStNYXRoLmZsb29yKHdlZWtEaWZmKX07dmFyIGdldERheU9mV2Vlaz1mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSl7dmFyIGRvdz1kYXRlLmdldERheSgpO2lmKGRvdz09PTApe2Rvdz03fXJldHVybiBkb3d9O2V4cG9ydCB2YXIgZm9ybWF0VGltZXpvbmU9ZnVuY3Rpb24gZm9ybWF0VGltZXpvbmUoZGF0ZSl7cmV0dXJuKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSl8fFtcIlwiXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsXCJcIikucmVwbGFjZSgvR01UXFwrMDAwMC9nLFwiVVRDXCIpfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkRGF5cyBmcm9tIFwiLi91aS9kYXlzXCI7XG5pbXBvcnQgbG9hZEhlYWRlciBmcm9tIFwiLi91aS9oZWFkZXJcIjtcbmltcG9ydCBsb2FkSG91cnMgZnJvbSBcIi4vdWkvaG91cnNcIjtcblxuY29uc3QgV0VBVEhFUl9BUElfS0VZID0gJ2ZkY2QwNDkxZGZhMjQ5NzQ5MGIyMTUyNDkyMzMwMDMnO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChsb2NhdGlvbikge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7V0VBVEhFUl9BUElfS0VZfSZxPSR7bG9jYXRpb259JmRheXM9N2AsIHsgbW9kZTogJ2NvcnMnIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ0ZvcmVjYXN0IGRhdGE6ICcsIGRhdGEpO1xuICAgIHJldHVybiBkYXRhLmVycm9yID8gbnVsbCA6IGRhdGE7XG59XG5cbmZ1bmN0aW9uIGxvYWRVSShmb3JlY2FzdERhdGEpIHtcbiAgICBjb25zdCBbbG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0XSA9IFtmb3JlY2FzdERhdGEubG9jYXRpb24sIGZvcmVjYXN0RGF0YS5jdXJyZW50LCBmb3JlY2FzdERhdGEuZm9yZWNhc3RdO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnLCBKU09OLnN0cmluZ2lmeShmb3JlY2FzdERhdGEpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCBmb3JlY2FzdERhdGEubG9jYXRpb24ubmFtZSk7XG4gICAgXG4gICAgbG9hZEhlYWRlcihsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5KTtcbiAgICBsb2FkSG91cnMoZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91ciwgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uaG91ciwgbG9jYXRpb24ubG9jYWx0aW1lKTtcbiAgICBsb2FkRGF5cyhmb3JlY2FzdC5mb3JlY2FzdGRheSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoZm9yZWNhc3REYXRhKSB7XG4gICAgY29uc3Qgc2VhcmNoRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJyk7XG4gICAgc2VhcmNoRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChzZWFyY2hGaWVsZC52YWx1ZSk7XG4gICAgICAgIGlmIChmb3JlY2FzdERhdGEpIHtcbiAgICAgICAgICAgIGxvYWRVSShmb3JlY2FzdERhdGEpO1xuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJykpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYENsZWFyZWQgd2F0Y2ggbW9uaXRvciAjJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnV0FUQ0hfSUQnKX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlYXJjaEZpZWxkLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bml0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpO1xuICAgIGNvbnN0IHRvZ2dsZVVuaXRzSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcudG9nZ2xlJyk7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSB1bml0ID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLnBuZyc7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS53aWR0aCA9ICcyNHB4JztcbiAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLmhlaWdodCA9ICcyNHB4JztcblxuICAgIHRvZ2dsZVVuaXRzSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LWhvdmVyLnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMtaG92ZXIucG5nJztcbiAgICB9KTtcbiAgICB0b2dnbGVVbml0c0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMucG5nJztcbiAgICB9KTtcbiAgICB0b2dnbGVVbml0c0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFVuaXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyk7XG4gICAgICAgIGlmIChjdXJyZW50VW5pdCA9PSAnRicpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnQycpO1xuICAgICAgICBlbHNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xuXG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC1jbGljay5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLWNsaWNrLnBuZyc7XG4gICAgICAgIGxvYWRVSShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTsgLy8gZm9yZWNhc3REYXRhIG1heSBiZSBudWxsIG9uIHNlYXJjaGVzIHJlc3VsdGluZyBpbiBudWxsXG4gICAgfSk7XG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09ICcvJyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHNlYXJjaEZpZWxkKSB7XG4gICAgICAgICAgICBzZWFyY2hGaWVsZC5mb2N1cygpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09ICdFc2NhcGUnICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT0gc2VhcmNoRmllbGQpIHtcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLmJsdXIoKTtcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLnZhbHVlID0gJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoKGUua2V5ID09ICdmJyB8fCBlLmtleSA9PSAnYycpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gc2VhcmNoRmllbGQpIHtcbiAgICAgICAgICAgIGlmIChlLmtleS50b1VwcGVyQ2FzZSgpID09IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgZS5rZXkudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xuICAgICAgICAgICAgbG9hZFVJKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXJMb2NhdGlvbkltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nLmN1cnJlbnQnKTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMucG5nJztcbiAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLndpZHRoID0gJzI0cHgnO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gJzI0cHgnO1xuICAgIFxuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLWhvdmVyLnBuZyc7XG4gICAgfSk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy5wbmcnO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY2xpY2sucG5nJztcblxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnV0FUQ0hfSUQnKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBDbGVhcmVkIHdhdGNoIG1vbml0b3IgIyR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJyl9YCk7XG4gICAgICAgIHNldFVzZXJMb2NhdGlvbigpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IGxvY2F0aW9uIGltYWdlIHdhcyBjbGlja2VkJyk7XG4gICAgfSk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMucG5nJztcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0VXNlckxvY2F0aW9uKCkge1xuICAgIGFzeW5jIGZ1bmN0aW9uIHN1Y2Nlc3MocG9zaXRpb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZWQgY3VycmVudCBjb29yZGluYXRlczogJHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9LCR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgYCR7cG9zaXRpb24uY29vcmRzLmxhdGl0dWRlfSwke3Bvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9YCk7XG4gICAgICAgIFxuICAgICAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBlcnJvcihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byByZXRyaWV2ZSB1c2VyJ3MgbG9jYXRpb24gLSBzZXR0aW5nIGRlZmF1bHQgdG8gTG9zIEFuZ2VsZXNcIiwgZXJyb3IpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCAnTG9zIEFuZ2VsZXMnKTtcblxuICAgICAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcbiAgICB9XG5cbiAgICBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gdW5hdmFpbGFibGUgLSBzZXR0aW5nIGRlZmF1bHQgbG9jYXRpb24gdG8gTG9zIEFuZ2VsZXMnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgJ0xvcyBBbmdlbGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDMubG9jYXRpb24nKS50ZXh0Q29udGVudCA9ICdMb2NhdGluZy4uLic7XG5cbiAgICAgICAgY29uc3Qgd2F0Y2hJZCA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yLCB7XG4gICAgICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXG4gICAgICAgICAgICB0aW1lb3V0OiAyMDAwMFxuICAgICAgICB9KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1dBVENIX0lEJywgd2F0Y2hJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBOZXcgd2F0Y2hJZDogJHt3YXRjaElkfWApO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VEYXRhKCkge1xuICAgIGxldCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9DQVRJT04nKSk7XG4gICAgaWYgKGZvcmVjYXN0RGF0YSkge1xuICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnLCBKU09OLnN0cmluZ2lmeShmb3JlY2FzdERhdGEpKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xuICAgIGF3YWl0IHNldFVzZXJMb2NhdGlvbigpO1xuICAgIGF3YWl0IGxvYWRQYWdlRGF0YSgpO1xuXG4gICAgcmVnaXN0ZXJFdmVudExpc3RlbmVycyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTtcbn1cblxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==