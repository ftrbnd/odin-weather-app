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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxVQUFVLHFCQUFxQixnQkFBZ0I7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9kYXlzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaG91cnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRGF5cyh3ZWVrKSB7XHJcbiAgICBjb25zdCBkYXlzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmRheXMnKTtcclxuXHJcbiAgICB3aGlsZSAoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgZGF5c0NvbnRhaW5lci5yZW1vdmVDaGlsZChkYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWsubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBkYXkgPSB3ZWVrW2ldO1xyXG5cclxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBuZXcgRGF0ZShkYXkuZGF0ZSkuZ2V0RGF5KCk7IC8vIDAtNlxyXG4gICAgICAgIGNvbnN0IGRheVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgZGF5VGV4dC5jbGFzc0xpc3QuYWRkKCdkYXktbmFtZScpO1xyXG4gICAgICAgIGRheVRleHQudGV4dENvbnRlbnQgPSBpID09IDAgPyAnVG9kYXknIDogZ2V0RGF5T2ZXZWVrKChkYXlPZldlZWsgKyAxKSAlIDcpO1xyXG5cclxuICAgICAgICBjb25zdCBpY29uVXJsID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcclxuICAgICAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpY29uSW1hZ2UuY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xyXG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xyXG5cclxuICAgICAgICBjb25zdCBsb3cgPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZGF5LmRheS5taW50ZW1wX2YgOiBkYXkuZGF5Lm1pbnRlbXBfY33CsGBcclxuICAgICAgICBjb25zdCBsb3dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGxvd1RleHQuY2xhc3NMaXN0LmFkZCgnbG93Jyk7XHJcbiAgICAgICAgbG93VGV4dC50ZXh0Q29udGVudCA9IGxvdztcclxuXHJcbiAgICAgICAgY29uc3QgaGlnaCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAgZGF5LmRheS5tYXh0ZW1wX2YgOiBkYXkuZGF5Lm1heHRlbXBfY33CsGBcclxuICAgICAgICBjb25zdCBoaWdoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBoaWdoVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWdoJyk7XHJcbiAgICAgICAgaGlnaFRleHQudGV4dENvbnRlbnQgPSBoaWdoO1xyXG5cclxuICAgICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkYXlEaXYuY2xhc3NMaXN0LmFkZCgnZGF5Jyk7XHJcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGRheVRleHQpO1xyXG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xyXG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChsb3dUZXh0KTtcclxuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRleHQpO1xyXG5cclxuICAgICAgICBkYXlzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRheURpdik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheU9mV2VlayhudW0pIHtcclxuICAgIGNvbnN0IGRheXMgPSBuZXcgTWFwKFtcclxuICAgICAgICBbMCwgJ1N1biddLFxyXG4gICAgICAgIFsxLCAnTW9uJ10sXHJcbiAgICAgICAgWzIsICdUdWUnXSxcclxuICAgICAgICBbMywgJ1dlZCddLFxyXG4gICAgICAgIFs0LCAnVGh1J10sXHJcbiAgICAgICAgWzUsICdGcmknXSxcclxuICAgICAgICBbNiwgJ1NhdCddLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIGRheXMuZ2V0KG51bSk7XHJcbn0iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZEhlYWRlcihsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RUb2RheSkge1xyXG4gICAgY29uc3QgbG9jYXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XHJcbiAgICBsb2NhdGlvbk5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbi5uYW1lO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVnaW9uJyk7XHJcbiAgICByZWdpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ucmVnaW9uO1xyXG5cclxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xyXG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9mKSA6IE1hdGgucm91bmQoY3VycmVudC50ZW1wX2MpfcKwYDtcclxuICAgIFxyXG4gICAgY29uc3QgdGVtcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcC1jb250YWluZXIgLnRvZGF5LWljb24nKTtcclxuICAgIHRlbXBJY29uLnNyYyA9IGN1cnJlbnQuY29uZGl0aW9uLmljb247XHJcblxyXG4gICAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xyXG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gY3VycmVudC5jb25kaXRpb24udGV4dDtcclxuXHJcbiAgICBjb25zdCBoaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gnKTtcclxuICAgIGhpZ2gudGV4dENvbnRlbnQgPSBgSDogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZm9yZWNhc3RUb2RheS5tYXh0ZW1wX2YgOiBmb3JlY2FzdFRvZGF5Lm1heHRlbXBfY33CsGA7XHJcblxyXG4gICAgY29uc3QgbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvdycpO1xyXG4gICAgbG93LnRleHRDb250ZW50ID0gYEw6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGZvcmVjYXN0VG9kYXkubWludGVtcF9mIDogZm9yZWNhc3RUb2RheS5taW50ZW1wX2N9wrBgO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUobG9jYXRpb24ubG9jYWx0aW1lKTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcclxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkYXRlRm9ybWF0KGN1cnJlbnREYXRlLCBcImRkZGQsIG1tbW0gZFMsIHl5eXlcIik7XHJcbiAgICBcclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xyXG4gICAgdGltZS50ZXh0Q29udGVudCA9IGRhdGVGb3JtYXQoY3VycmVudERhdGUsIFwiaDpNTSBUVFwiKTtcclxuXHJcbiAgICAvLyBtb3JlIGRldGFpbHMgKHdpbmQsIHByZWNpcCwgcHJlc3N1cmUpXHJcbiAgICBjb25zdCBkaXJlY3Rpb25zID0gbmV3IE1hcChbXHJcbiAgICAgICAgWydOJywgJ25vcnRoJ10sXHJcbiAgICAgICAgWydFJywgJ2Vhc3QnXSxcclxuICAgICAgICBbJ1MnLCAnc291dGgnXSxcclxuICAgICAgICBbJ1cnLCAnd2VzdCddXHJcbiAgICBdKTtcclxuICAgIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZCcpO1xyXG4gICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBjdXJyZW50LndpbmRfbXBoIDogY3VycmVudC53aW5kX2twaH0gJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ21waCcgOiAna21oJ30gJHtkaXJlY3Rpb25zLmdldChjdXJyZW50LndpbmRfZGlyKX1gO1xyXG5cclxuICAgIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlY2lwaXRhdGlvbicpO1xyXG4gICAgcHJlY2lwaXRhdGlvbi50ZXh0Q29udGVudCA9IGBQcmVjaXBpdGF0aW9uOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBjdXJyZW50LnByZWNpcF9pbiA6IGN1cnJlbnQucHJlY2lwX21tfSAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnaW4nIDogJ21tJ31gO1xyXG5cclxuICAgIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNzdXJlJyk7XHJcbiAgICBwcmVzc3VyZS50ZXh0Q29udGVudCA9IGBQcmVzc3VyZTogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gY3VycmVudC5wcmVzc3VyZV9pbiA6IGN1cnJlbnQucHJlc3N1cmVfbWJ9ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdpbicgOiAnbWInfWA7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSG91cnModG9kYXksIHRvbW9ycm93LCBsb2NhbHRpbWUpIHtcclxuICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJzJyk7XHJcblxyXG4gICAgd2hpbGUgKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBob3Vyc0NvbnRhaW5lci5yZW1vdmVDaGlsZChob3Vyc0NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdXJyZW50SG91ciA9IG5ldyBEYXRlKGxvY2FsdGltZSkuZ2V0SG91cnMoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gY3VycmVudEhvdXI7IGkgPCB0b2RheS5sZW5ndGg7IGkrKykgeyAvLyByZXN0IG9mIHRvZGF5XHJcbiAgICAgICAgY3JlYXRlSG91ckRpdih0b2RheVtpXSwgY3VycmVudEhvdXIsIGhvdXJzQ29udGFpbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRIb3VyOyBpKyspIHsgLy8gdG9tb3Jyb3cgdW50aWwgMjQgaG91cnMgYWZ0ZXIgY3VycmVudCBob3VyXHJcbiAgICAgICAgY3JlYXRlSG91ckRpdih0b21vcnJvd1tpXSwgY3VycmVudEhvdXIsIGhvdXJzQ29udGFpbmVyKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSG91ckRpdihob3VyLCBjdXJyZW50SG91ciwgaG91cnNDb250YWluZXIpIHtcclxuICAgIGNvbnN0IGhvdXJOdW0gPSBuZXcgRGF0ZShob3VyLnRpbWUpLmdldEhvdXJzKCk7XHJcbiAgICBsZXQgdGltZSA9IGhvdXJOdW0gJSAxMiA9PSAwID8gMTIgOiBob3VyTnVtICUgMTI7XHJcbiAgICB0aW1lICs9IGhvdXJOdW0gPiAxMSA/ICdQTScgOiAnQU0nO1xyXG4gICAgY29uc3QgdGltZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aW1lVGV4dC5jbGFzc0xpc3QuYWRkKCd0aW1lJyk7XHJcbiAgICB0aW1lVGV4dC50ZXh0Q29udGVudCA9IGhvdXJOdW0gPT0gY3VycmVudEhvdXIgPyAnTm93JyA6IHRpbWU7XHJcblxyXG4gICAgY29uc3QgaWNvblVybCA9IGhvdXIuY29uZGl0aW9uLmljb247XHJcbiAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XHJcbiAgICBpY29uSW1hZ2Uuc3JjID0gaWNvblVybDtcclxuXHJcbiAgICBjb25zdCB0ZW1wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGhvdXIudGVtcF9mIDogaG91ci50ZW1wX2M7XHJcbiAgICBjb25zdCB0ZW1wVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRlbXBUZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdXItdGVtcCcpO1xyXG4gICAgdGVtcFRleHQudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcclxuXHJcbiAgICBjb25zdCBob3VyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXInKTtcclxuICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGltZVRleHQpO1xyXG4gICAgaG91ckRpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xyXG4gICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0ZW1wVGV4dCk7XHJcblxyXG4gICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91ckRpdik7XHJcbn0iLCJ2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W0EtWl17MSwzfVtBLVpdW1RDXSkoPzpbLStdXFxkezR9KT98KCg/OkF1c3RyYWxpYW4gKT8oPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZSlcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZSxtYXNrLHV0YyxnbXQpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0xJiZ0eXBlb2YgZGF0ZT09PVwic3RyaW5nXCImJiEvXFxkLy50ZXN0KGRhdGUpKXttYXNrPWRhdGU7ZGF0ZT11bmRlZmluZWR9ZGF0ZT1kYXRlfHxkYXRlPT09MD9kYXRlOm5ldyBEYXRlO2lmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKXtkYXRlPW5ldyBEYXRlKGRhdGUpfWlmKGlzTmFOKGRhdGUpKXt0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGRhdGVcIil9bWFzaz1TdHJpbmcobWFza3NbbWFza118fG1hc2t8fG1hc2tzW1wiZGVmYXVsdFwiXSk7dmFyIG1hc2tTbGljZT1tYXNrLnNsaWNlKDAsNCk7aWYobWFza1NsaWNlPT09XCJVVEM6XCJ8fG1hc2tTbGljZT09PVwiR01UOlwiKXttYXNrPW1hc2suc2xpY2UoNCk7dXRjPXRydWU7aWYobWFza1NsaWNlPT09XCJHTVQ6XCIpe2dtdD10cnVlfX12YXIgXz1mdW5jdGlvbiBfKCl7cmV0dXJuIHV0Yz9cImdldFVUQ1wiOlwiZ2V0XCJ9O3ZhciBfZD1mdW5jdGlvbiBkKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF0ZVwiXSgpfTt2YXIgRD1mdW5jdGlvbiBEKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF5XCJdKCl9O3ZhciBfbT1mdW5jdGlvbiBtKCl7cmV0dXJuIGRhdGVbXygpK1wiTW9udGhcIl0oKX07dmFyIHk9ZnVuY3Rpb24geSgpe3JldHVybiBkYXRlW18oKStcIkZ1bGxZZWFyXCJdKCl9O3ZhciBfSD1mdW5jdGlvbiBIKCl7cmV0dXJuIGRhdGVbXygpK1wiSG91cnNcIl0oKX07dmFyIF9NPWZ1bmN0aW9uIE0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaW51dGVzXCJdKCl9O3ZhciBfcz1mdW5jdGlvbiBzKCl7cmV0dXJuIGRhdGVbXygpK1wiU2Vjb25kc1wiXSgpfTt2YXIgX0w9ZnVuY3Rpb24gTCgpe3JldHVybiBkYXRlW18oKStcIk1pbGxpc2Vjb25kc1wiXSgpfTt2YXIgX289ZnVuY3Rpb24gbygpe3JldHVybiB1dGM/MDpkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCl9O3ZhciBfVz1mdW5jdGlvbiBXKCl7cmV0dXJuIGdldFdlZWsoZGF0ZSl9O3ZhciBfTj1mdW5jdGlvbiBOKCl7cmV0dXJuIGdldERheU9mV2VlayhkYXRlKX07dmFyIGZsYWdzPXtkOmZ1bmN0aW9uIGQoKXtyZXR1cm4gX2QoKX0sZGQ6ZnVuY3Rpb24gZGQoKXtyZXR1cm4gcGFkKF9kKCkpfSxkZGQ6ZnVuY3Rpb24gZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpXX0sREREOmZ1bmN0aW9uIERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpKzddfSxEREREOmZ1bmN0aW9uIEREREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpKzddfSl9LG06ZnVuY3Rpb24gbSgpe3JldHVybiBfbSgpKzF9LG1tOmZ1bmN0aW9uIG1tKCl7cmV0dXJuIHBhZChfbSgpKzEpfSxtbW06ZnVuY3Rpb24gbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpKzEyXX0seXk6ZnVuY3Rpb24geXkoKXtyZXR1cm4gU3RyaW5nKHkoKSkuc2xpY2UoMil9LHl5eXk6ZnVuY3Rpb24geXl5eSgpe3JldHVybiBwYWQoeSgpLDQpfSxoOmZ1bmN0aW9uIGgoKXtyZXR1cm4gX0goKSUxMnx8MTJ9LGhoOmZ1bmN0aW9uIGhoKCl7cmV0dXJuIHBhZChfSCgpJTEyfHwxMil9LEg6ZnVuY3Rpb24gSCgpe3JldHVybiBfSCgpfSxISDpmdW5jdGlvbiBISCgpe3JldHVybiBwYWQoX0goKSl9LE06ZnVuY3Rpb24gTSgpe3JldHVybiBfTSgpfSxNTTpmdW5jdGlvbiBNTSgpe3JldHVybiBwYWQoX00oKSl9LHM6ZnVuY3Rpb24gcygpe3JldHVybiBfcygpfSxzczpmdW5jdGlvbiBzcygpe3JldHVybiBwYWQoX3MoKSl9LGw6ZnVuY3Rpb24gbCgpe3JldHVybiBwYWQoX0woKSwzKX0sTDpmdW5jdGlvbiBMKCl7cmV0dXJuIHBhZChNYXRoLmZsb29yKF9MKCkvMTApKX0sdDpmdW5jdGlvbiB0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMF06aTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMl06aTE4bi50aW1lTmFtZXNbM119LFQ6ZnVuY3Rpb24gVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzRdOmkxOG4udGltZU5hbWVzWzVdfSxUVDpmdW5jdGlvbiBUVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzZdOmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6Zm9ybWF0VGltZXpvbmUoZGF0ZSl9LG86ZnVuY3Rpb24gbygpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSoxMDArTWF0aC5hYnMoX28oKSklNjAsNCl9LHA6ZnVuY3Rpb24gcCgpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSwyKStcIjpcIitwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKSU2MCksMil9LFM6ZnVuY3Rpb24gUygpe3JldHVybltcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdW19kKCklMTA+Mz8wOihfZCgpJTEwMC1fZCgpJTEwIT0xMCkqX2QoKSUxMF19LFc6ZnVuY3Rpb24gVygpe3JldHVybiBfVygpfSxXVzpmdW5jdGlvbiBXVygpe3JldHVybiBwYWQoX1coKSl9LE46ZnVuY3Rpb24gTigpe3JldHVybiBfTigpfX07cmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbixmdW5jdGlvbihtYXRjaCl7aWYobWF0Y2ggaW4gZmxhZ3Mpe3JldHVybiBmbGFnc1ttYXRjaF0oKX1yZXR1cm4gbWF0Y2guc2xpY2UoMSxtYXRjaC5sZW5ndGgtMSl9KX1leHBvcnQgdmFyIG1hc2tzPXtkZWZhdWx0OlwiZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzXCIsc2hvcnREYXRlOlwibS9kL3l5XCIscGFkZGVkU2hvcnREYXRlOlwibW0vZGQveXl5eVwiLG1lZGl1bURhdGU6XCJtbW0gZCwgeXl5eVwiLGxvbmdEYXRlOlwibW1tbSBkLCB5eXl5XCIsZnVsbERhdGU6XCJkZGRkLCBtbW1tIGQsIHl5eXlcIixzaG9ydFRpbWU6XCJoOk1NIFRUXCIsbWVkaXVtVGltZTpcImg6TU06c3MgVFRcIixsb25nVGltZTpcImg6TU06c3MgVFQgWlwiLGlzb0RhdGU6XCJ5eXl5LW1tLWRkXCIsaXNvVGltZTpcIkhIOk1NOnNzXCIsaXNvRGF0ZVRpbWU6XCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NvXCIsaXNvVXRjRGF0ZVRpbWU6XCJVVEM6eXl5eS1tbS1kZCdUJ0hIOk1NOnNzJ1onXCIsZXhwaXJlc0hlYWRlckZvcm1hdDpcImRkZCwgZGQgbW1tIHl5eXkgSEg6TU06c3MgWlwifTtleHBvcnQgdmFyIGkxOG49e2RheU5hbWVzOltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiLFwiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sbW9udGhOYW1lczpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCIsXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sdGltZU5hbWVzOltcImFcIixcInBcIixcImFtXCIsXCJwbVwiLFwiQVwiLFwiUFwiLFwiQU1cIixcIlBNXCJdfTt2YXIgcGFkPWZ1bmN0aW9uIHBhZCh2YWwpe3ZhciBsZW49YXJndW1lbnRzLmxlbmd0aD4xJiZhcmd1bWVudHNbMV0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzFdOjI7cmV0dXJuIFN0cmluZyh2YWwpLnBhZFN0YXJ0KGxlbixcIjBcIil9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307ZXhwb3J0IHZhciBmb3JtYXRUaW1lem9uZT1mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShkYXRlKXtyZXR1cm4oU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCxcIlwiKS5yZXBsYWNlKC9HTVRcXCswMDAwL2csXCJVVENcIil9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWREYXlzIGZyb20gXCIuL3VpL2RheXNcIjtcclxuaW1wb3J0IGxvYWRIZWFkZXIgZnJvbSBcIi4vdWkvaGVhZGVyXCI7XHJcbmltcG9ydCBsb2FkSG91cnMgZnJvbSBcIi4vdWkvaG91cnNcIjtcclxuXHJcbmNvbnN0IFdFQVRIRVJfQVBJX0tFWSA9ICdmZGNkMDQ5MWRmYTI0OTc0OTBiMjE1MjQ5MjMzMDAzJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke1dFQVRIRVJfQVBJX0tFWX0mcT0ke2xvY2F0aW9ufSZkYXlzPTdgLCB7IG1vZGU6ICdjb3JzJyB9KTtcclxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKCdGb3JlY2FzdCBkYXRhOiAnLCBkYXRhKTtcclxuICAgIHJldHVybiBkYXRhLmVycm9yID8gbnVsbCA6IGRhdGE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRVSShmb3JlY2FzdERhdGEpIHtcclxuICAgIGNvbnN0IFtsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RdID0gW2ZvcmVjYXN0RGF0YS5sb2NhdGlvbiwgZm9yZWNhc3REYXRhLmN1cnJlbnQsIGZvcmVjYXN0RGF0YS5mb3JlY2FzdF07XHJcblxyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnLCBKU09OLnN0cmluZ2lmeShmb3JlY2FzdERhdGEpKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsIGZvcmVjYXN0RGF0YS5sb2NhdGlvbi5uYW1lKTtcclxuICAgIFxyXG4gICAgbG9hZEhlYWRlcihsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5KTtcclxuICAgIGxvYWRIb3Vycyhmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLCBmb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5ob3VyLCBsb2NhdGlvbi5sb2NhbHRpbWUpO1xyXG4gICAgbG9hZERheXMoZm9yZWNhc3QuZm9yZWNhc3RkYXkpO1xyXG4gICAgc2V0QmFja2dyb3VuZChsb2NhdGlvbiwgY3VycmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoZm9yZWNhc3REYXRhKSB7XHJcbiAgICBjb25zdCBzZWFyY2hGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcclxuICAgIHNlYXJjaEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NlYXJjaCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChzZWFyY2hGaWVsZC52YWx1ZSk7XHJcbiAgICAgICAgaWYgKGZvcmVjYXN0RGF0YSkge1xyXG4gICAgICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJykpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ2xlYXJlZCB3YXRjaCBtb25pdG9yICMke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdXQVRDSF9JRCcpfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VhcmNoRmllbGQudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHVuaXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyk7XHJcbiAgICBjb25zdCB0b2dnbGVVbml0c0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nLnRvZ2dsZScpO1xyXG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSB1bml0ID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLnBuZyc7XHJcbiAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLndpZHRoID0gJzI0cHgnO1xyXG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XHJcblxyXG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LWhvdmVyLnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMtaG92ZXIucG5nJztcclxuICAgIH0pO1xyXG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsICgpID0+IHtcclxuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcclxuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xyXG4gICAgfSk7XHJcbiAgICB0b2dnbGVVbml0c0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VW5pdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKTtcclxuICAgICAgICBpZiAoY3VycmVudFVuaXQgPT0gJ0YnKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0MnKTtcclxuICAgICAgICBlbHNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xyXG5cclxuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQtY2xpY2sucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy1jbGljay5wbmcnO1xyXG4gICAgICAgIGxvYWRVSShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTsgLy8gZm9yZWNhc3REYXRhIG1heSBiZSBudWxsIG9uIHNlYXJjaGVzIHJlc3VsdGluZyBpbiBudWxsXHJcbiAgICB9KTtcclxuICAgIHRvZ2dsZVVuaXRzSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT0gJy8nICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gc2VhcmNoRmllbGQpIHtcclxuICAgICAgICAgICAgc2VhcmNoRmllbGQuZm9jdXMoKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gJ0VzY2FwZScgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBzZWFyY2hGaWVsZCkge1xyXG4gICAgICAgICAgICBzZWFyY2hGaWVsZC5ibHVyKCk7XHJcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfSBlbHNlIGlmICgoZS5rZXkgPT0gJ2YnIHx8IGUua2V5ID09ICdjJykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBzZWFyY2hGaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkudG9VcHBlckNhc2UoKSA9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCBlLmtleS50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMucG5nJztcclxuICAgICAgICAgICAgbG9hZFVJKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGN1ckxvY2F0aW9uSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcuY3VycmVudCcpO1xyXG4gICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLnBuZyc7XHJcbiAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLndpZHRoID0gJzI0cHgnO1xyXG4gICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XHJcbiAgICBcclxuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xyXG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy1ob3Zlci5wbmcnO1xyXG4gICAgfSk7XHJcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xyXG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy5wbmcnO1xyXG4gICAgfSk7XHJcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY2xpY2sucG5nJztcclxuXHJcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2gobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJykpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBDbGVhcmVkIHdhdGNoIG1vbml0b3IgIyR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1dBVENIX0lEJyl9YCk7XHJcbiAgICAgICAgc2V0VXNlckxvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IGxvY2F0aW9uIGltYWdlIHdhcyBjbGlja2VkJyk7XHJcbiAgICB9KTtcclxuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMucG5nJztcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBzZXRVc2VyTG9jYXRpb24oKSB7XHJcbiAgICBhc3luYyBmdW5jdGlvbiBzdWNjZXNzKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZWQgY3VycmVudCBjb29yZGluYXRlczogJHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9LCR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCBgJHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9LCR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gKTtcclxuICAgICAgICBcclxuICAgICAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBlcnJvcihlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIncyBsb2NhdGlvbiAtIHNldHRpbmcgZGVmYXVsdCB0byBMb3MgQW5nZWxlc1wiLCBlcnJvcik7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgJ0xvcyBBbmdlbGVzJyk7XHJcblxyXG4gICAgICAgIGF3YWl0IGxvYWRQYWdlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIHVuYXZhaWxhYmxlIC0gc2V0dGluZyBkZWZhdWx0IGxvY2F0aW9uIHRvIExvcyBBbmdlbGVzJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgJ0xvcyBBbmdlbGVzJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzLmxvY2F0aW9uJykudGV4dENvbnRlbnQgPSAnTG9jYXRpbmcuLi4nO1xyXG5cclxuICAgICAgICBjb25zdCB3YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oc3VjY2VzcywgZXJyb3IsIHtcclxuICAgICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiAyMDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdXQVRDSF9JRCcsIHdhdGNoSWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBOZXcgd2F0Y2hJZDogJHt3YXRjaElkfWApO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRCYWNrZ3JvdW5kKGxvY2F0aW9uLCBjdXJyZW50KSB7XHJcbiAgICBjb25zdCBjb25kaXRpb25Db2RlID0gY3VycmVudC5jb25kaXRpb24uY29kZTtcclxuICAgIGNvbnN0IGN1cnJlbnRUZW1wID0gY3VycmVudC50ZW1wX2M7XHJcbiAgICBjb25zdCBjdXJyZW50SG91ciA9IG5ldyBEYXRlKGxvY2F0aW9uLmxvY2FsdGltZSkuZ2V0SG91cnMoKTtcclxuICAgIC8vIGRheTogNmFtIC0gNnBtLCBuaWdodDogN3BtIC0gNWFtXHJcbiAgICBjb25zb2xlLnRhYmxlKGNvbmRpdGlvbkNvZGUsIGN1cnJlbnRIb3VyLCBjdXJyZW50VGVtcCk7XHJcblxyXG4gICAgc3dpdGNoICh0cnVlKSB7IC8vIGNhbGN1bGF0ZWQgd2l0aCBDZWxzaXVzIC0gZG9lc24ndCBtYXR0ZXIgc2luY2UgdXNlciBkb2Vzbid0IHJlYWQgdGhpc1xyXG4gICAgICAgIGNhc2UgY3VycmVudFRlbXAgPCAwOlxyXG4gICAgICAgICAgICBzZXRDb2xvcignbmF2eScsICdncmF5Jyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMCA8PSBjdXJyZW50VGVtcCAmJiBjdXJyZW50VGVtcCA8IDE1OlxyXG4gICAgICAgICAgICBzZXRDb2xvcignbGlnaHRibHVlJywgJ3doaXRlJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMTUgPD0gY3VycmVudFRlbXAgJiYgY3VycmVudEhvdXIgPCAyMDpcclxuICAgICAgICAgICAgc2V0Q29sb3IoJ2dyZWVuJywgJ2dyYXknKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyMCA8PSBjdXJyZW50VGVtcCAmJiBjdXJyZW50SG91ciA8IDI1OlxyXG4gICAgICAgICAgICBzZXRDb2xvcigneWVsbG93JywgJ2RhcmtncmF5Jyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMjUgPD0gY3VycmVudFRlbXAgJiYgY3VycmVudEhvdXIgPCAzMDpcclxuICAgICAgICAgICAgc2V0Q29sb3IoJ29yYW5nZScsICd3aGl0ZScpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDMwIDw9IGN1cnJlbnRUZW1wOlxyXG4gICAgICAgICAgICBzZXRDb2xvcigncmVkJywgJ2JlaWdlJyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaScpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBzZXRDb2xvcih0ZXh0Q29sb3IsIGJhY2tncm91bmRDb2xvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGB0ZXh0Q29sb3I6ICR7dGV4dENvbG9yfSwgYmFja2dyb3VuZENvbG9yOiAke2JhY2tncm91bmRDb2xvcn1gKTtcclxuICAgICAgICAvLyBzdGFydCBzZXR0aW5nIGNvbG9ycyBhY2NvcmRpbmdseVxyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZURhdGEoKSB7XHJcbiAgICBsZXQgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQ0FUSU9OJykpO1xyXG4gICAgaWYgKGZvcmVjYXN0RGF0YSkge1xyXG4gICAgICAgIGxvYWRVSShmb3JlY2FzdERhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xyXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xyXG4gICAgYXdhaXQgc2V0VXNlckxvY2F0aW9uKCk7XHJcbiAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcclxuXHJcbiAgICByZWdpc3RlckV2ZW50TGlzdGVuZXJzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpO1xyXG59XHJcblxyXG5tYWluKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9