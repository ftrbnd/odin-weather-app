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
    const wind = document.querySelector('.wind');
    wind.textContent = `Wind: ${localStorage.getItem('TEMP_UNIT') == 'F' ? current.wind_mph : current.wind_kph} ${localStorage.getItem('TEMP_UNIT') == 'F' ? 'mph' : 'kmh'} ${current.wind_dir}`;

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsTyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvZGF5cy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL3VpL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL3VpL2hvdXJzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvZGF0ZWZvcm1hdC9saWIvZGF0ZWZvcm1hdC5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZERheXMod2Vlaykge1xuICAgIGNvbnN0IGRheXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZGF5cycpO1xuXG4gICAgd2hpbGUgKGRheXNDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBkYXlzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGRheXNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2Vlay5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkYXkgPSB3ZWVrW2ldO1xuXG4gICAgICAgIGNvbnN0IGRheU9mV2VlayA9IG5ldyBEYXRlKGRheS5kYXRlKS5nZXREYXkoKTsgLy8gMC02XG4gICAgICAgIGNvbnN0IGRheVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGRheVRleHQuY2xhc3NMaXN0LmFkZCgnZGF5LW5hbWUnKTtcbiAgICAgICAgZGF5VGV4dC50ZXh0Q29udGVudCA9IGkgPT0gMCA/ICdUb2RheScgOiBnZXREYXlPZldlZWsoKGRheU9mV2VlayArIDEpICUgNyk7XG5cbiAgICAgICAgY29uc3QgaWNvblVybCA9IGRheS5kYXkuY29uZGl0aW9uLmljb247XG4gICAgICAgIGNvbnN0IGljb25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpY29uSW1hZ2UuY2xhc3NMaXN0LmFkZCgnaWNvbicpO1xuICAgICAgICBpY29uSW1hZ2Uuc3JjID0gaWNvblVybDtcblxuICAgICAgICBjb25zdCBsb3cgPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZGF5LmRheS5taW50ZW1wX2YgOiBkYXkuZGF5Lm1pbnRlbXBfY33CsGBcbiAgICAgICAgY29uc3QgbG93VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbG93VGV4dC5jbGFzc0xpc3QuYWRkKCdsb3cnKTtcbiAgICAgICAgbG93VGV4dC50ZXh0Q29udGVudCA9IGxvdztcblxuICAgICAgICBjb25zdCBoaWdoID0gYCR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICBkYXkuZGF5Lm1heHRlbXBfZiA6IGRheS5kYXkubWF4dGVtcF9jfcKwYFxuICAgICAgICBjb25zdCBoaWdoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgaGlnaFRleHQuY2xhc3NMaXN0LmFkZCgnaGlnaCcpO1xuICAgICAgICBoaWdoVGV4dC50ZXh0Q29udGVudCA9IGhpZ2g7XG5cbiAgICAgICAgY29uc3QgZGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRheURpdi5jbGFzc0xpc3QuYWRkKCdkYXknKTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGRheVRleHQpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaWNvbkltYWdlKTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGxvd1RleHQpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRleHQpO1xuXG4gICAgICAgIGRheXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5RGl2KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERheU9mV2VlayhudW0pIHtcbiAgICBjb25zdCBkYXlzID0gbmV3IE1hcChbXG4gICAgICAgIFswLCAnU3VuJ10sXG4gICAgICAgIFsxLCAnTW9uJ10sXG4gICAgICAgIFsyLCAnVHVlJ10sXG4gICAgICAgIFszLCAnV2VkJ10sXG4gICAgICAgIFs0LCAnVGh1J10sXG4gICAgICAgIFs1LCAnRnJpJ10sXG4gICAgICAgIFs2LCAnU2F0J10sXG4gICAgXSk7XG5cbiAgICByZXR1cm4gZGF5cy5nZXQobnVtKTtcbn0iLCJpbXBvcnQgZGF0ZUZvcm1hdCBmcm9tIFwiZGF0ZWZvcm1hdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdFRvZGF5KSB7XG4gICAgY29uc3QgbG9jYXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uJyk7XG4gICAgbG9jYXRpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ubmFtZTtcblxuICAgIGNvbnN0IHJlZ2lvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVnaW9uJyk7XG4gICAgcmVnaW9uTmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uLnJlZ2lvbjtcblxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcCcpO1xuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gTWF0aC5yb3VuZChjdXJyZW50LnRlbXBfZikgOiBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9jKX3CsGA7XG4gICAgXG4gICAgY29uc3QgdGVtcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVtcC1jb250YWluZXIgLnRvZGF5LWljb24nKTtcbiAgICB0ZW1wSWNvbi5zcmMgPSBjdXJyZW50LmNvbmRpdGlvbi5pY29uO1xuXG4gICAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbmRpdGlvbicpO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG5cbiAgICBjb25zdCBoaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZ2gnKTtcbiAgICBoaWdoLnRleHRDb250ZW50ID0gYEg6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGZvcmVjYXN0VG9kYXkubWF4dGVtcF9mIDogZm9yZWNhc3RUb2RheS5tYXh0ZW1wX2N9wrBgO1xuXG4gICAgY29uc3QgbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvdycpO1xuICAgIGxvdy50ZXh0Q29udGVudCA9IGBMOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBmb3JlY2FzdFRvZGF5Lm1pbnRlbXBfZiA6IGZvcmVjYXN0VG9kYXkubWludGVtcF9jfcKwYDtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUobG9jYXRpb24ubG9jYWx0aW1lKTtcblxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF0ZScpO1xuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkYXRlRm9ybWF0KGN1cnJlbnREYXRlLCBcImRkZGQsIG1tbW0gZFMsIHl5eXlcIik7XG4gICAgXG4gICAgY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aW1lJyk7XG4gICAgdGltZS50ZXh0Q29udGVudCA9IGRhdGVGb3JtYXQoY3VycmVudERhdGUsIFwiaDpNTSBUVFwiKTtcblxuICAgIC8vIG1vcmUgZGV0YWlscyAod2luZCwgcHJlY2lwLCBwcmVzc3VyZSlcbiAgICBjb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQnKTtcbiAgICB3aW5kLnRleHRDb250ZW50ID0gYFdpbmQ6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGN1cnJlbnQud2luZF9tcGggOiBjdXJyZW50LndpbmRfa3BofSAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnbXBoJyA6ICdrbWgnfSAke2N1cnJlbnQud2luZF9kaXJ9YDtcblxuICAgIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlY2lwaXRhdGlvbicpO1xuICAgIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgUHJlY2lwaXRhdGlvbjogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gY3VycmVudC5wcmVjaXBfaW4gOiBjdXJyZW50LnByZWNpcF9tbX0gJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2luJyA6ICdtbSd9YDtcblxuICAgIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNzdXJlJyk7XG4gICAgcHJlc3N1cmUudGV4dENvbnRlbnQgPSBgUHJlc3N1cmU6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGN1cnJlbnQucHJlc3N1cmVfaW4gOiBjdXJyZW50LnByZXNzdXJlX21ifSAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnaW4nIDogJ21iJ31gO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIb3Vycyh0b2RheSwgdG9tb3Jyb3csIGxvY2FsdGltZSkge1xuICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJzJyk7XG5cbiAgICB3aGlsZSAoaG91cnNDb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBob3Vyc0NvbnRhaW5lci5yZW1vdmVDaGlsZChob3Vyc0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SG91ciA9IG5ldyBEYXRlKGxvY2FsdGltZSkuZ2V0SG91cnMoKTtcblxuICAgIGZvciAobGV0IGkgPSBjdXJyZW50SG91cjsgaSA8IHRvZGF5Lmxlbmd0aDsgaSsrKSB7IC8vIHJlc3Qgb2YgdG9kYXlcbiAgICAgICAgY3JlYXRlSG91ckRpdih0b2RheVtpXSwgY3VycmVudEhvdXIsIGhvdXJzQ29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRIb3VyOyBpKyspIHsgLy8gdG9tb3Jyb3cgdW50aWwgMjQgaG91cnMgYWZ0ZXIgY3VycmVudCBob3VyXG4gICAgICAgIGNyZWF0ZUhvdXJEaXYodG9tb3Jyb3dbaV0sIGN1cnJlbnRIb3VyLCBob3Vyc0NvbnRhaW5lcik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVIb3VyRGl2KGhvdXIsIGN1cnJlbnRIb3VyLCBob3Vyc0NvbnRhaW5lcikge1xuICAgIGNvbnN0IGhvdXJOdW0gPSBuZXcgRGF0ZShob3VyLnRpbWUpLmdldEhvdXJzKCk7XG4gICAgbGV0IHRpbWUgPSBob3VyTnVtICUgMTIgPT0gMCA/IDEyIDogaG91ck51bSAlIDEyO1xuICAgIHRpbWUgKz0gaG91ck51bSA+IDExID8gJ1BNJyA6ICdBTSc7XG4gICAgY29uc3QgdGltZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGltZVRleHQuY2xhc3NMaXN0LmFkZCgndGltZScpO1xuICAgIHRpbWVUZXh0LnRleHRDb250ZW50ID0gaG91ck51bSA9PSBjdXJyZW50SG91ciA/ICdOb3cnIDogdGltZTtcblxuICAgIGNvbnN0IGljb25VcmwgPSBob3VyLmNvbmRpdGlvbi5pY29uO1xuICAgIGNvbnN0IGljb25JbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgaWNvbkltYWdlLnNyYyA9IGljb25Vcmw7XG5cbiAgICBjb25zdCB0ZW1wID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGhvdXIudGVtcF9mIDogaG91ci50ZW1wX2M7XG4gICAgY29uc3QgdGVtcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGVtcFRleHQuY2xhc3NMaXN0LmFkZCgnaG91ci10ZW1wJyk7XG4gICAgdGVtcFRleHQudGV4dENvbnRlbnQgPSBgJHt0ZW1wfcKwYDtcblxuICAgIGNvbnN0IGhvdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXInKTtcbiAgICBob3VyRGl2LmFwcGVuZENoaWxkKHRpbWVUZXh0KTtcbiAgICBob3VyRGl2LmFwcGVuZENoaWxkKGljb25JbWFnZSk7XG4gICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0ZW1wVGV4dCk7XG5cbiAgICBob3Vyc0NvbnRhaW5lci5hcHBlbmRDaGlsZChob3VyRGl2KTtcbn0iLCJ2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W0EtWl17MSwzfVtBLVpdW1RDXSkoPzpbLStdXFxkezR9KT98KCg/OkF1c3RyYWxpYW4gKT8oPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZSlcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZSxtYXNrLHV0YyxnbXQpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0xJiZ0eXBlb2YgZGF0ZT09PVwic3RyaW5nXCImJiEvXFxkLy50ZXN0KGRhdGUpKXttYXNrPWRhdGU7ZGF0ZT11bmRlZmluZWR9ZGF0ZT1kYXRlfHxkYXRlPT09MD9kYXRlOm5ldyBEYXRlO2lmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKXtkYXRlPW5ldyBEYXRlKGRhdGUpfWlmKGlzTmFOKGRhdGUpKXt0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGRhdGVcIil9bWFzaz1TdHJpbmcobWFza3NbbWFza118fG1hc2t8fG1hc2tzW1wiZGVmYXVsdFwiXSk7dmFyIG1hc2tTbGljZT1tYXNrLnNsaWNlKDAsNCk7aWYobWFza1NsaWNlPT09XCJVVEM6XCJ8fG1hc2tTbGljZT09PVwiR01UOlwiKXttYXNrPW1hc2suc2xpY2UoNCk7dXRjPXRydWU7aWYobWFza1NsaWNlPT09XCJHTVQ6XCIpe2dtdD10cnVlfX12YXIgXz1mdW5jdGlvbiBfKCl7cmV0dXJuIHV0Yz9cImdldFVUQ1wiOlwiZ2V0XCJ9O3ZhciBfZD1mdW5jdGlvbiBkKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF0ZVwiXSgpfTt2YXIgRD1mdW5jdGlvbiBEKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF5XCJdKCl9O3ZhciBfbT1mdW5jdGlvbiBtKCl7cmV0dXJuIGRhdGVbXygpK1wiTW9udGhcIl0oKX07dmFyIHk9ZnVuY3Rpb24geSgpe3JldHVybiBkYXRlW18oKStcIkZ1bGxZZWFyXCJdKCl9O3ZhciBfSD1mdW5jdGlvbiBIKCl7cmV0dXJuIGRhdGVbXygpK1wiSG91cnNcIl0oKX07dmFyIF9NPWZ1bmN0aW9uIE0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaW51dGVzXCJdKCl9O3ZhciBfcz1mdW5jdGlvbiBzKCl7cmV0dXJuIGRhdGVbXygpK1wiU2Vjb25kc1wiXSgpfTt2YXIgX0w9ZnVuY3Rpb24gTCgpe3JldHVybiBkYXRlW18oKStcIk1pbGxpc2Vjb25kc1wiXSgpfTt2YXIgX289ZnVuY3Rpb24gbygpe3JldHVybiB1dGM/MDpkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCl9O3ZhciBfVz1mdW5jdGlvbiBXKCl7cmV0dXJuIGdldFdlZWsoZGF0ZSl9O3ZhciBfTj1mdW5jdGlvbiBOKCl7cmV0dXJuIGdldERheU9mV2VlayhkYXRlKX07dmFyIGZsYWdzPXtkOmZ1bmN0aW9uIGQoKXtyZXR1cm4gX2QoKX0sZGQ6ZnVuY3Rpb24gZGQoKXtyZXR1cm4gcGFkKF9kKCkpfSxkZGQ6ZnVuY3Rpb24gZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpXX0sREREOmZ1bmN0aW9uIERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpKzddfSxEREREOmZ1bmN0aW9uIEREREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpKzddfSl9LG06ZnVuY3Rpb24gbSgpe3JldHVybiBfbSgpKzF9LG1tOmZ1bmN0aW9uIG1tKCl7cmV0dXJuIHBhZChfbSgpKzEpfSxtbW06ZnVuY3Rpb24gbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpKzEyXX0seXk6ZnVuY3Rpb24geXkoKXtyZXR1cm4gU3RyaW5nKHkoKSkuc2xpY2UoMil9LHl5eXk6ZnVuY3Rpb24geXl5eSgpe3JldHVybiBwYWQoeSgpLDQpfSxoOmZ1bmN0aW9uIGgoKXtyZXR1cm4gX0goKSUxMnx8MTJ9LGhoOmZ1bmN0aW9uIGhoKCl7cmV0dXJuIHBhZChfSCgpJTEyfHwxMil9LEg6ZnVuY3Rpb24gSCgpe3JldHVybiBfSCgpfSxISDpmdW5jdGlvbiBISCgpe3JldHVybiBwYWQoX0goKSl9LE06ZnVuY3Rpb24gTSgpe3JldHVybiBfTSgpfSxNTTpmdW5jdGlvbiBNTSgpe3JldHVybiBwYWQoX00oKSl9LHM6ZnVuY3Rpb24gcygpe3JldHVybiBfcygpfSxzczpmdW5jdGlvbiBzcygpe3JldHVybiBwYWQoX3MoKSl9LGw6ZnVuY3Rpb24gbCgpe3JldHVybiBwYWQoX0woKSwzKX0sTDpmdW5jdGlvbiBMKCl7cmV0dXJuIHBhZChNYXRoLmZsb29yKF9MKCkvMTApKX0sdDpmdW5jdGlvbiB0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMF06aTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMl06aTE4bi50aW1lTmFtZXNbM119LFQ6ZnVuY3Rpb24gVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzRdOmkxOG4udGltZU5hbWVzWzVdfSxUVDpmdW5jdGlvbiBUVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzZdOmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6Zm9ybWF0VGltZXpvbmUoZGF0ZSl9LG86ZnVuY3Rpb24gbygpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSoxMDArTWF0aC5hYnMoX28oKSklNjAsNCl9LHA6ZnVuY3Rpb24gcCgpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSwyKStcIjpcIitwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKSU2MCksMil9LFM6ZnVuY3Rpb24gUygpe3JldHVybltcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdW19kKCklMTA+Mz8wOihfZCgpJTEwMC1fZCgpJTEwIT0xMCkqX2QoKSUxMF19LFc6ZnVuY3Rpb24gVygpe3JldHVybiBfVygpfSxXVzpmdW5jdGlvbiBXVygpe3JldHVybiBwYWQoX1coKSl9LE46ZnVuY3Rpb24gTigpe3JldHVybiBfTigpfX07cmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbixmdW5jdGlvbihtYXRjaCl7aWYobWF0Y2ggaW4gZmxhZ3Mpe3JldHVybiBmbGFnc1ttYXRjaF0oKX1yZXR1cm4gbWF0Y2guc2xpY2UoMSxtYXRjaC5sZW5ndGgtMSl9KX1leHBvcnQgdmFyIG1hc2tzPXtkZWZhdWx0OlwiZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzXCIsc2hvcnREYXRlOlwibS9kL3l5XCIscGFkZGVkU2hvcnREYXRlOlwibW0vZGQveXl5eVwiLG1lZGl1bURhdGU6XCJtbW0gZCwgeXl5eVwiLGxvbmdEYXRlOlwibW1tbSBkLCB5eXl5XCIsZnVsbERhdGU6XCJkZGRkLCBtbW1tIGQsIHl5eXlcIixzaG9ydFRpbWU6XCJoOk1NIFRUXCIsbWVkaXVtVGltZTpcImg6TU06c3MgVFRcIixsb25nVGltZTpcImg6TU06c3MgVFQgWlwiLGlzb0RhdGU6XCJ5eXl5LW1tLWRkXCIsaXNvVGltZTpcIkhIOk1NOnNzXCIsaXNvRGF0ZVRpbWU6XCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NvXCIsaXNvVXRjRGF0ZVRpbWU6XCJVVEM6eXl5eS1tbS1kZCdUJ0hIOk1NOnNzJ1onXCIsZXhwaXJlc0hlYWRlckZvcm1hdDpcImRkZCwgZGQgbW1tIHl5eXkgSEg6TU06c3MgWlwifTtleHBvcnQgdmFyIGkxOG49e2RheU5hbWVzOltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiLFwiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sbW9udGhOYW1lczpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCIsXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sdGltZU5hbWVzOltcImFcIixcInBcIixcImFtXCIsXCJwbVwiLFwiQVwiLFwiUFwiLFwiQU1cIixcIlBNXCJdfTt2YXIgcGFkPWZ1bmN0aW9uIHBhZCh2YWwpe3ZhciBsZW49YXJndW1lbnRzLmxlbmd0aD4xJiZhcmd1bWVudHNbMV0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzFdOjI7cmV0dXJuIFN0cmluZyh2YWwpLnBhZFN0YXJ0KGxlbixcIjBcIil9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307ZXhwb3J0IHZhciBmb3JtYXRUaW1lem9uZT1mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShkYXRlKXtyZXR1cm4oU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCxcIlwiKS5yZXBsYWNlKC9HTVRcXCswMDAwL2csXCJVVENcIil9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWREYXlzIGZyb20gXCIuL3VpL2RheXNcIjtcbmltcG9ydCBsb2FkSGVhZGVyIGZyb20gXCIuL3VpL2hlYWRlclwiO1xuaW1wb3J0IGxvYWRIb3VycyBmcm9tIFwiLi91aS9ob3Vyc1wiO1xuXG5jb25zdCBXRUFUSEVSX0FQSV9LRVkgPSAnZmRjZDA0OTFkZmEyNDk3NDkwYjIxNTI0OTIzMzAwMyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHtXRUFUSEVSX0FQSV9LRVl9JnE9JHtsb2NhdGlvbn0mZGF5cz03YCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnRm9yZWNhc3QgZGF0YTogJywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGEuZXJyb3IgPyBudWxsIDogZGF0YTtcbn1cblxuZnVuY3Rpb24gbG9hZFVJKGZvcmVjYXN0RGF0YSkge1xuICAgIGNvbnN0IFtsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RdID0gW2ZvcmVjYXN0RGF0YS5sb2NhdGlvbiwgZm9yZWNhc3REYXRhLmN1cnJlbnQsIGZvcmVjYXN0RGF0YS5mb3JlY2FzdF07XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnRk9SRUNBU1RfREFUQScsIEpTT04uc3RyaW5naWZ5KGZvcmVjYXN0RGF0YSkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsIGZvcmVjYXN0RGF0YS5sb2NhdGlvbi5uYW1lKTtcbiAgICBcbiAgICBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkpO1xuICAgIGxvYWRIb3Vycyhmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyLCBmb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5ob3VyLCBsb2NhdGlvbi5sb2NhbHRpbWUpO1xuICAgIGxvYWREYXlzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5KTtcbiAgICBzZXRDb2xvcnMobG9jYXRpb24ubG9jYWx0aW1lLCBjdXJyZW50LmNvbmRpdGlvbi5jb2RlKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudExpc3RlbmVycyhmb3JlY2FzdERhdGEpIHtcbiAgICBjb25zdCBzZWFyY2hGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcbiAgICBzZWFyY2hGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdzZWFyY2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KHNlYXJjaEZpZWxkLnZhbHVlKTtcbiAgICAgICAgaWYgKGZvcmVjYXN0RGF0YSkge1xuICAgICAgICAgICAgbG9hZFVJKGZvcmVjYXN0RGF0YSk7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnV0FUQ0hfSUQnKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgQ2xlYXJlZCB3YXRjaCBtb25pdG9yICMke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdXQVRDSF9JRCcpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VhcmNoRmllbGQudmFsdWUgPSAnJztcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuaXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyk7XG4gICAgY29uc3QgdG9nZ2xlVW5pdHNJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZy50b2dnbGUnKTtcbiAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IHVuaXQgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMucG5nJztcbiAgICB0b2dnbGVVbml0c0ltYWdlLnN0eWxlLndpZHRoID0gJzI0cHgnO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gJzI0cHgnO1xuXG4gICAgdG9nZ2xlVW5pdHNJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQtaG92ZXIucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy1ob3Zlci5wbmcnO1xuICAgIH0pO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICB0b2dnbGVVbml0c0ltYWdlLnNyYyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAnYXNzZXRzL3RlbXBlcmF0dXJlLWZhaHJlbmhlaXQucG5nJyA6ICdhc3NldHMvdGVtcGVyYXR1cmUtY2Vsc2l1cy5wbmcnO1xuICAgIH0pO1xuICAgIHRvZ2dsZVVuaXRzSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50VW5pdCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKTtcbiAgICAgICAgaWYgKGN1cnJlbnRVbml0ID09ICdGJykgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RFTVBfVU5JVCcsICdDJyk7XG4gICAgICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RFTVBfVU5JVCcsICdGJyk7XG5cbiAgICAgICAgdG9nZ2xlVW5pdHNJbWFnZS5zcmMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gJ2Fzc2V0cy90ZW1wZXJhdHVyZS1mYWhyZW5oZWl0LWNsaWNrLnBuZycgOiAnYXNzZXRzL3RlbXBlcmF0dXJlLWNlbHNpdXMtY2xpY2sucG5nJztcbiAgICAgICAgbG9hZFVJKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpOyAvLyBmb3JlY2FzdERhdGEgbWF5IGJlIG51bGwgb24gc2VhcmNoZXMgcmVzdWx0aW5nIGluIG51bGxcbiAgICB9KTtcbiAgICB0b2dnbGVVbml0c0ltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLnBuZyc7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT0gJy8nICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gc2VhcmNoRmllbGQpIHtcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLmZvY3VzKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gJ0VzY2FwZScgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgc2VhcmNoRmllbGQuYmx1cigpO1xuICAgICAgICAgICAgc2VhcmNoRmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgfSBlbHNlIGlmICgoZS5rZXkgPT0gJ2YnIHx8IGUua2V5ID09ICdjJykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgaWYgKGUua2V5LnRvVXBwZXJDYXNlKCkgPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCBlLmtleS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgIHRvZ2dsZVVuaXRzSW1hZ2Uuc3JjID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/ICdhc3NldHMvdGVtcGVyYXR1cmUtZmFocmVuaGVpdC5wbmcnIDogJ2Fzc2V0cy90ZW1wZXJhdHVyZS1jZWxzaXVzLnBuZyc7XG4gICAgICAgICAgICBsb2FkVUkoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRk9SRUNBU1RfREFUQScpKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGN1ckxvY2F0aW9uSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcuY3VycmVudCcpO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy5wbmcnO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUud2lkdGggPSAnMjRweCc7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XG4gICAgXG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtaG92ZXIucG5nJztcbiAgICB9KTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLnBuZyc7XG4gICAgfSk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy1jbGljay5wbmcnO1xuXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5jbGVhcldhdGNoKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdXQVRDSF9JRCcpKTtcbiAgICAgICAgY29uc29sZS5sb2coYENsZWFyZWQgd2F0Y2ggbW9uaXRvciAjJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnV0FUQ0hfSUQnKX1gKTtcbiAgICAgICAgc2V0VXNlckxvY2F0aW9uKCk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ0N1cnJlbnQgbG9jYXRpb24gaW1hZ2Ugd2FzIGNsaWNrZWQnKTtcbiAgICB9KTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy5wbmcnO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRVc2VyTG9jYXRpb24oKSB7XG4gICAgYXN5bmMgZnVuY3Rpb24gc3VjY2Vzcyhwb3NpdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlZCBjdXJyZW50IGNvb3JkaW5hdGVzOiAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfWApO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCBgJHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9LCR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gKTtcbiAgICAgICAgXG4gICAgICAgIGF3YWl0IGxvYWRQYWdlRGF0YSgpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVW5hYmxlIHRvIHJldHJpZXZlIHVzZXIncyBsb2NhdGlvbiAtIHNldHRpbmcgZGVmYXVsdCB0byBMb3MgQW5nZWxlc1wiLCBlcnJvcik7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsICdMb3MgQW5nZWxlcycpO1xuXG4gICAgICAgIGF3YWl0IGxvYWRQYWdlRGF0YSgpO1xuICAgIH1cblxuICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiB1bmF2YWlsYWJsZSAtIHNldHRpbmcgZGVmYXVsdCBsb2NhdGlvbiB0byBMb3MgQW5nZWxlcycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCAnTG9zIEFuZ2VsZXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMy5sb2NhdGlvbicpLnRleHRDb250ZW50ID0gJ0xvY2F0aW5nLi4uJztcblxuICAgICAgICBjb25zdCB3YXRjaElkID0gbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oc3VjY2VzcywgZXJyb3IsIHtcbiAgICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDIwMDAwXG4gICAgICAgIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnV0FUQ0hfSUQnLCB3YXRjaElkKTtcbiAgICAgICAgY29uc29sZS5sb2coYE5ldyB3YXRjaElkOiAke3dhdGNoSWR9YCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRDb2xvcnMobG9jYWx0aW1lLCBjb25kaXRpb25Db2RlKSB7XG4gICAgY29uc3QgbmljZURheXMgPSBbMTAwMCwgMTAwMywgJyNGRkZGRkYnLCAnIzAwQUJGRiddOyAvLyB0ZXh0IGNvbG9yLCBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgY29uc3QgY2xvdWR5RGF5cyA9IFsxMDA2LCAxMDA5LCAxMDMwLCAxMTM1LCAnI0ZGRkZGRicsICcjQjVCNUI1J107XG4gICAgY29uc3QgcmFpbnlEYXlzID0gWzEwNjMsIDEwNzIsIDExNTAsIDExNTMsIDExNjgsIDExNzEsIDExODAsIDExODMsIDExODYsIDExODksIDExOTIsIDExOTUsIDExOTgsIDEyMDEsIDEyNDAsIDEyNDMsIDEyNDYsICcjNDI3NUU5JywgJyM4Nzg3ODcnXTtcbiAgICBjb25zdCBzbm93eURheXMgPSBbMTA2NiwgMTA2OSwgMTExNCwgMTExNywgMTE0NywgMTIwNCwgMTIwNywgMTIxMCwgMTIxMywgMTIxNiwgMTIxOSwgMTIyMiwgMTIyNSwgMTIzNywgMTI0OSwgMTI1MiwgMTI1NSwgMTI1OCwgMTI2MSwgMTI2NCwgJyMzRkNERjEnLCAnI0ZGRkZGRiddO1xuICAgIGNvbnN0IHN0b3JteURheXMgPSBbMTA4NywgMTI3MywgMTI3NiwgMTI3OSwgMTI4MiwgJyNGRkU0MDAnLCAnIzg3ODc4NyddO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBpZiAobmljZURheXMuaW5jbHVkZXMoY29uZGl0aW9uQ29kZSkpIHtcbiAgICAgICAgY29uc3QgdGV4dENvbG9yID0gbmljZURheXNbbmljZURheXMubGVuZ3RoIC0gMl07XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IG5pY2VEYXlzW25pY2VEYXlzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBjb25zb2xlLmxvZyhgdGV4dCBjb2xvcjogJHt0ZXh0Q29sb3J9LCBiYWNrOiAke2JhY2tncm91bmRDb2xvcn1gKTtcbiAgICAgICAgZGFya2VuQ29sb3JzKHRleHRDb2xvciwgYmFja2dyb3VuZENvbG9yKTtcbiAgICAgICAgY29uc29sZS5sb2coYERBUks6IHRleHQgY29sb3I6ICR7dGV4dENvbG9yfSwgYmFjazogJHtiYWNrZ3JvdW5kQ29sb3J9YCk7XG4gICAgfSBlbHNlIGlmIChjbG91ZHlEYXlzLmluY2x1ZGVzKGNvbmRpdGlvbkNvZGUpKSB7XG4gICAgICAgIGNvbnN0IHRleHRDb2xvciA9IGNsb3VkeURheXNbY2xvdWR5RGF5cy5sZW5ndGggLSAyXTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gY2xvdWR5RGF5c1tjbG91ZHlEYXlzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBkYXJrZW5Db2xvcnModGV4dENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgIH0gZWxzZSBpZiAocmFpbnlEYXlzLmluY2x1ZGVzKGNvbmRpdGlvbkNvZGUpKSB7XG4gICAgICAgIGNvbnN0IHRleHRDb2xvciA9IHJhaW55RGF5c1tyYWlueURheXMubGVuZ3RoIC0gMl07XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHJhaW55RGF5c1tyYWlueURheXMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgYm9keS5zdHlsZS5jb2xvciA9IHRleHRDb2xvcjtcbiAgICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGRhcmtlbkNvbG9ycyh0ZXh0Q29sb3IsIGJhY2tncm91bmRDb2xvcik7XG4gICAgfSBlbHNlIGlmIChzbm93eURheXMuaW5jbHVkZXMoY29uZGl0aW9uQ29kZSkpIHtcbiAgICAgICAgY29uc3QgdGV4dENvbG9yID0gc25vd3lEYXlzW3Nub3d5RGF5cy5sZW5ndGggLSAyXTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZENvbG9yID0gc25vd3lEYXlzW3Nub3d5RGF5cy5sZW5ndGggLSAxXTtcbiAgICAgICAgXG4gICAgICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBkYXJrZW5Db2xvcnModGV4dENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgIH0gZWxzZSBpZiAoc3Rvcm15RGF5cy5pbmNsdWRlcyhjb25kaXRpb25Db2RlKSkge1xuICAgICAgICBjb25zdCB0ZXh0Q29sb3IgPSBzdG9ybXlEYXlzW3N0b3JteURheXMubGVuZ3RoIC0gMl07XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IHN0b3JteURheXNbc3Rvcm15RGF5cy5sZW5ndGggLSAxXTtcbiAgICAgICAgXG4gICAgICAgIGJvZHkuc3R5bGUuY29sb3IgPSB0ZXh0Q29sb3I7XG4gICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBkYXJrZW5Db2xvcnModGV4dENvbG9yLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgIH1cblxuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpO1xuICAgIGZvb3Rlci5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgZm9vdGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMTI3LCAxMjcsIDEyNyknO1xuXG4gICAgZnVuY3Rpb24gZGFya2VuQ29sb3JzKHRleHRDb2xvciwgYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRIb3VyID0gbmV3IERhdGUobG9jYWx0aW1lKS5nZXRIb3VycygpO1xuICAgICAgICBpZiAoMTggPCBjdXJyZW50SG91ciB8fCBjdXJyZW50SG91ciA8IDYpIHsgLy8gZGFya2VuIGNvbG9ycyBkdXJpbmcgbmlnaHR0aW1lXG4gICAgICAgICAgICBib2R5LnN0eWxlLmNvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKHRleHRDb2xvcilcbiAgICAgICAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gTGlnaHRlbkRhcmtlbkNvbG9yKGJhY2tncm91bmRDb2xvciwgLTIwKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9zbmlwcGV0cy9qYXZhc2NyaXB0L2xpZ2h0ZW4tZGFya2VuLWNvbG9yL1xuICAgIGZ1bmN0aW9uIExpZ2h0ZW5EYXJrZW5Db2xvcihjb2wsIGFtdCkge1xuICAgICAgICBpZiAoY29sID09ICcjRkZGRkZGJykgcmV0dXJuO1xuXG4gICAgICAgIGxldCB1c2VQb3VuZCA9IGZhbHNlO1xuICAgIFxuICAgICAgICBpZiAoY29sWzBdID09IFwiI1wiKSB7XG4gICAgICAgICAgICBjb2wgPSBjb2wuc2xpY2UoMSk7XG4gICAgICAgICAgICB1c2VQb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IG51bSA9IHBhcnNlSW50KGNvbCwxNik7XG4gICAgXG4gICAgICAgIGxldCByID0gKG51bSA+PiAxNikgKyBhbXQ7XG4gICAgXG4gICAgICAgIGlmIChyID4gMjU1KSByID0gMjU1O1xuICAgICAgICBlbHNlIGlmICAociA8IDApIHIgPSAwO1xuICAgIFxuICAgICAgICBsZXQgYiA9ICgobnVtID4+IDgpICYgMHgwMEZGKSArIGFtdDtcbiAgICBcbiAgICAgICAgaWYgKGIgPiAyNTUpIGIgPSAyNTU7XG4gICAgICAgIGVsc2UgaWYgIChiIDwgMCkgYiA9IDA7XG4gICAgXG4gICAgICAgIGxldCBnID0gKG51bSAmIDB4MDAwMEZGKSArIGFtdDtcbiAgICBcbiAgICAgICAgaWYgKGcgPiAyNTUpIGcgPSAyNTU7XG4gICAgICAgIGVsc2UgaWYgKGcgPCAwKSBnID0gMDtcbiAgICBcbiAgICAgICAgcmV0dXJuICh1c2VQb3VuZD9cIiNcIjpcIlwiKSArIChnIHwgKGIgPDwgOCkgfCAociA8PCAxNikpLnRvU3RyaW5nKDE2KTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlRGF0YSgpIHtcbiAgICBsZXQgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3QobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0xPQ0FUSU9OJykpO1xuICAgIGlmIChmb3JlY2FzdERhdGEpIHtcbiAgICAgICAgbG9hZFVJKGZvcmVjYXN0RGF0YSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0YnKTtcbiAgICBhd2FpdCBzZXRVc2VyTG9jYXRpb24oKTtcbiAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcblxuICAgIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnRk9SRUNBU1RfREFUQScpKSk7XG59XG5cbm1haW4oKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=