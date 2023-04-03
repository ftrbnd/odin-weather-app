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
    date.textContent = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentDate, "dddd, mmmm dS, yyyy");
    
    const time = document.querySelector('.time');
    time.textContent = (0,dateformat__WEBPACK_IMPORTED_MODULE_0__["default"])(currentDate, "h:MM TT");
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
function loadHours(day, localtime) {
    const hoursContainer = document.querySelector('.hours');

    while (hoursContainer.firstChild) {
        hoursContainer.removeChild(hoursContainer.firstChild);
    }

    const currentHour = new Date(localtime).getHours();

    for (let i = 0; i < day.length; i++) {
        const hour = day[i];

        const hourNum = new Date(hour.time).getHours();
        if (hourNum < currentHour) continue; // only display hours after current hour

        let time = hourNum % 12 == 0 ? 12 : hourNum % 12;
        time += hourNum > 11 ? 'PM' : 'AM';
        const timeText = document.createElement('p');
        timeText.classList.add('time');
        timeText.textContent = time;

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
    (0,_ui_hours__WEBPACK_IMPORTED_MODULE_2__["default"])(forecast.forecastday[0].hour, location.localtime);
    (0,_ui_days__WEBPACK_IMPORTED_MODULE_0__["default"])(forecast.forecastday);
}

function registerEventListeners(forecastData) {
    const searchField = document.querySelector('#search');
    searchField.addEventListener('search', async () => {
        forecastData = await getForecast(searchField.value);
        if (forecastData) {
            loadUI(forecastData);
            localStorage.setItem('SEARCH_DISPLAYED', 'true');
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
            searchField.focus();
            e.preventDefault();
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

    const curLocationImage = document.querySelector('img.current');
    curLocationImage.src = 'assets/crosshairs-gps-custom.png';
    curLocationImage.style.width = '24px';
    curLocationImage.style.height = '24px';
    curLocationImage.addEventListener('mouseover', () => {
        curLocationImage.style.cursor = 'pointer';
        curLocationImage.src = 'assets/crosshairs-gps-hover.png';
    });
    curLocationImage.addEventListener('mouseout', () => {
        curLocationImage.style.cursor = 'default';
        curLocationImage.src = 'assets/crosshairs-gps-custom.png';
    });
    curLocationImage.addEventListener('mousedown', () => {
        curLocationImage.src = 'assets/crosshairs-gps-click.png';

        localStorage.setItem('SEARCH_DISPLAYED', 'false');
        loadPageData();

        console.log('Current location image was clicked');
    });
    curLocationImage.addEventListener('mouseup', () => {
        curLocationImage.src = 'assets/crosshairs-gps-custom.png';
    });
}

async function setUserLocation() {
    async function success(position) {
        console.log(`Updated current coordinates: ${position.coords.latitude},${position.coords.longitude}`);
        localStorage.setItem('LOCATION', `${position.coords.latitude},${position.coords.longitude}`);
        
        if (localStorage.getItem('SEARCH_DISPLAYED') == 'false') { // user hasn't searched for something - don't override their search
            await loadPageData();
        }
    }

    function error() {
        console.log("Unable to retrieve user's location - setting default to Los Angeles");
        localStorage.setItem('LOCATION', 'Los Angeles');
    }

    if (!navigator.geolocation) {
        console.log('Geolocation unavailable - setting default location to Los Angeles');
        localStorage.setItem('LOCATION', 'Los Angeles');
    } else {
        document.querySelector('h3.location').textContent = 'Locating...';
        localStorage.setItem('SEARCH_DISPLAYED', 'false');

        navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 10000
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9ELHlCQUF5QixHQUFHLDBCQUEwQjtBQUMxRyw0Q0FBNEMseUJBQXlCLEdBQUcsMEJBQTBCO0FBQ2xHO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL3VpL2RheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9ob3Vycy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2RhdGVmb3JtYXQvbGliL2RhdGVmb3JtYXQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWREYXlzKHdlZWspIHtcbiAgICBjb25zdCBkYXlzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmRheXMnKTtcblxuICAgIHdoaWxlIChkYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZGF5c0NvbnRhaW5lci5yZW1vdmVDaGlsZChkYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWsubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF5ID0gd2Vla1tpXTtcblxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBuZXcgRGF0ZShkYXkuZGF0ZSkuZ2V0RGF5KCk7IC8vIDAtNlxuICAgICAgICBjb25zdCBkYXlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBkYXlUZXh0LmNsYXNzTGlzdC5hZGQoJ2RheS1uYW1lJyk7XG4gICAgICAgIGRheVRleHQudGV4dENvbnRlbnQgPSBpID09IDAgPyAnVG9kYXknIDogZ2V0RGF5T2ZXZWVrKChkYXlPZldlZWsgKyAxKSAlIDcpO1xuXG4gICAgICAgIGNvbnN0IGljb25VcmwgPSBkYXkuZGF5LmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgaWNvbkltYWdlLnNyYyA9IGljb25Vcmw7XG5cbiAgICAgICAgY29uc3QgbG93ID0gYCR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGRheS5kYXkubWludGVtcF9mIDogZGF5LmRheS5taW50ZW1wX2N9wrBgXG4gICAgICAgIGNvbnN0IGxvd1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGxvd1RleHQuY2xhc3NMaXN0LmFkZCgnbG93Jyk7XG4gICAgICAgIGxvd1RleHQudGV4dENvbnRlbnQgPSBsb3c7XG5cbiAgICAgICAgY29uc3QgaGlnaCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyAgZGF5LmRheS5tYXh0ZW1wX2YgOiBkYXkuZGF5Lm1heHRlbXBfY33CsGBcbiAgICAgICAgY29uc3QgaGlnaFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGhpZ2hUZXh0LmNsYXNzTGlzdC5hZGQoJ2hpZ2gnKTtcbiAgICAgICAgaGlnaFRleHQudGV4dENvbnRlbnQgPSBoaWdoO1xuXG4gICAgICAgIGNvbnN0IGRheURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkYXlEaXYuY2xhc3NMaXN0LmFkZCgnZGF5Jyk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChkYXlUZXh0KTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGljb25JbWFnZSk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChsb3dUZXh0KTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGhpZ2hUZXh0KTtcblxuICAgICAgICBkYXlzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRheURpdik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXlPZldlZWsobnVtKSB7XG4gICAgY29uc3QgZGF5cyA9IG5ldyBNYXAoW1xuICAgICAgICBbMCwgJ1N1biddLFxuICAgICAgICBbMSwgJ01vbiddLFxuICAgICAgICBbMiwgJ1R1ZSddLFxuICAgICAgICBbMywgJ1dlZCddLFxuICAgICAgICBbNCwgJ1RodSddLFxuICAgICAgICBbNSwgJ0ZyaSddLFxuICAgICAgICBbNiwgJ1NhdCddLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGRheXMuZ2V0KG51bSk7XG59IiwiaW1wb3J0IGRhdGVGb3JtYXQgZnJvbSBcImRhdGVmb3JtYXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZEhlYWRlcihsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RUb2RheSkge1xuICAgIGNvbnN0IGxvY2F0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzLmxvY2F0aW9uJyk7XG4gICAgbG9jYXRpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ubmFtZTtcblxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMS50ZW1wJyk7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9mKSA6IE1hdGgucm91bmQoY3VycmVudC50ZW1wX2MpfcKwYDtcblxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AuY29uZGl0aW9uJyk7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gY3VycmVudC5jb25kaXRpb24udGV4dDtcblxuICAgIGNvbnN0IGhpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLmhpZ2gnKTtcbiAgICBoaWdoLnRleHRDb250ZW50ID0gYEg6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGZvcmVjYXN0VG9kYXkubWF4dGVtcF9mIDogZm9yZWNhc3RUb2RheS5tYXh0ZW1wX2N9wrBgO1xuXG4gICAgY29uc3QgbG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncC5sb3cnKTtcbiAgICBsb3cudGV4dENvbnRlbnQgPSBgTDogJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gZm9yZWNhc3RUb2RheS5taW50ZW1wX2YgOiBmb3JlY2FzdFRvZGF5Lm1pbnRlbXBfY33CsGA7XG5cbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGxvY2F0aW9uLmxvY2FsdGltZSk7XG5cbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhdGUnKTtcbiAgICBkYXRlLnRleHRDb250ZW50ID0gZGF0ZUZvcm1hdChjdXJyZW50RGF0ZSwgXCJkZGRkLCBtbW1tIGRTLCB5eXl5XCIpO1xuICAgIFxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xuICAgIHRpbWUudGV4dENvbnRlbnQgPSBkYXRlRm9ybWF0KGN1cnJlbnREYXRlLCBcImg6TU0gVFRcIik7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZEhvdXJzKGRheSwgbG9jYWx0aW1lKSB7XG4gICAgY29uc3QgaG91cnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG91cnMnKTtcblxuICAgIHdoaWxlIChob3Vyc0NvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGhvdXJzQ29udGFpbmVyLnJlbW92ZUNoaWxkKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRIb3VyID0gbmV3IERhdGUobG9jYWx0aW1lKS5nZXRIb3VycygpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaG91ciA9IGRheVtpXTtcblxuICAgICAgICBjb25zdCBob3VyTnVtID0gbmV3IERhdGUoaG91ci50aW1lKS5nZXRIb3VycygpO1xuICAgICAgICBpZiAoaG91ck51bSA8IGN1cnJlbnRIb3VyKSBjb250aW51ZTsgLy8gb25seSBkaXNwbGF5IGhvdXJzIGFmdGVyIGN1cnJlbnQgaG91clxuXG4gICAgICAgIGxldCB0aW1lID0gaG91ck51bSAlIDEyID09IDAgPyAxMiA6IGhvdXJOdW0gJSAxMjtcbiAgICAgICAgdGltZSArPSBob3VyTnVtID4gMTEgPyAnUE0nIDogJ0FNJztcbiAgICAgICAgY29uc3QgdGltZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRpbWVUZXh0LmNsYXNzTGlzdC5hZGQoJ3RpbWUnKTtcbiAgICAgICAgdGltZVRleHQudGV4dENvbnRlbnQgPSB0aW1lO1xuXG4gICAgICAgIGNvbnN0IGljb25VcmwgPSBob3VyLmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgaWNvbkltYWdlLnNyYyA9IGljb25Vcmw7XG5cbiAgICAgICAgY29uc3QgdGVtcCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBob3VyLnRlbXBfZiA6IGhvdXIudGVtcF9jO1xuICAgICAgICBjb25zdCB0ZW1wVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgdGVtcFRleHQuY2xhc3NMaXN0LmFkZCgnaG91ci10ZW1wJyk7XG4gICAgICAgIHRlbXBUZXh0LnRleHRDb250ZW50ID0gYCR7dGVtcH3CsGA7XG5cbiAgICAgICAgY29uc3QgaG91ckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXInKTtcbiAgICAgICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0aW1lVGV4dCk7XG4gICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQoaWNvbkltYWdlKTtcbiAgICAgICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0ZW1wVGV4dCk7XG5cbiAgICAgICAgaG91cnNDb250YWluZXIuYXBwZW5kQ2hpbGQoaG91ckRpdik7XG4gICAgfVxufSIsInZhciB0b2tlbj0vZHsxLDR9fER7Myw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFd7MSwyfXxbTGxvcFNaTl18XCJbXlwiXSpcInwnW14nXSonL2c7dmFyIHRpbWV6b25lPS9cXGIoPzpbQS1aXXsxLDN9W0EtWl1bVENdKSg/OlstK11cXGR7NH0pP3woKD86QXVzdHJhbGlhbiApPyg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lKVxcYi9nO3ZhciB0aW1lem9uZUNsaXA9L1teLStcXGRBLVpdL2c7ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLG1hc2ssdXRjLGdtdCl7aWYoYXJndW1lbnRzLmxlbmd0aD09PTEmJnR5cGVvZiBkYXRlPT09XCJzdHJpbmdcIiYmIS9cXGQvLnRlc3QoZGF0ZSkpe21hc2s9ZGF0ZTtkYXRlPXVuZGVmaW5lZH1kYXRlPWRhdGV8fGRhdGU9PT0wP2RhdGU6bmV3IERhdGU7aWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpe2RhdGU9bmV3IERhdGUoZGF0ZSl9aWYoaXNOYU4oZGF0ZSkpe3Rocm93IFR5cGVFcnJvcihcIkludmFsaWQgZGF0ZVwiKX1tYXNrPVN0cmluZyhtYXNrc1ttYXNrXXx8bWFza3x8bWFza3NbXCJkZWZhdWx0XCJdKTt2YXIgbWFza1NsaWNlPW1hc2suc2xpY2UoMCw0KTtpZihtYXNrU2xpY2U9PT1cIlVUQzpcInx8bWFza1NsaWNlPT09XCJHTVQ6XCIpe21hc2s9bWFzay5zbGljZSg0KTt1dGM9dHJ1ZTtpZihtYXNrU2xpY2U9PT1cIkdNVDpcIil7Z210PXRydWV9fXZhciBfPWZ1bmN0aW9uIF8oKXtyZXR1cm4gdXRjP1wiZ2V0VVRDXCI6XCJnZXRcIn07dmFyIF9kPWZ1bmN0aW9uIGQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXRlXCJdKCl9O3ZhciBEPWZ1bmN0aW9uIEQoKXtyZXR1cm4gZGF0ZVtfKCkrXCJEYXlcIl0oKX07dmFyIF9tPWZ1bmN0aW9uIG0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNb250aFwiXSgpfTt2YXIgeT1mdW5jdGlvbiB5KCl7cmV0dXJuIGRhdGVbXygpK1wiRnVsbFllYXJcIl0oKX07dmFyIF9IPWZ1bmN0aW9uIEgoKXtyZXR1cm4gZGF0ZVtfKCkrXCJIb3Vyc1wiXSgpfTt2YXIgX009ZnVuY3Rpb24gTSgpe3JldHVybiBkYXRlW18oKStcIk1pbnV0ZXNcIl0oKX07dmFyIF9zPWZ1bmN0aW9uIHMoKXtyZXR1cm4gZGF0ZVtfKCkrXCJTZWNvbmRzXCJdKCl9O3ZhciBfTD1mdW5jdGlvbiBMKCl7cmV0dXJuIGRhdGVbXygpK1wiTWlsbGlzZWNvbmRzXCJdKCl9O3ZhciBfbz1mdW5jdGlvbiBvKCl7cmV0dXJuIHV0Yz8wOmRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKX07dmFyIF9XPWZ1bmN0aW9uIFcoKXtyZXR1cm4gZ2V0V2VlayhkYXRlKX07dmFyIF9OPWZ1bmN0aW9uIE4oKXtyZXR1cm4gZ2V0RGF5T2ZXZWVrKGRhdGUpfTt2YXIgZmxhZ3M9e2Q6ZnVuY3Rpb24gZCgpe3JldHVybiBfZCgpfSxkZDpmdW5jdGlvbiBkZCgpe3JldHVybiBwYWQoX2QoKSl9LGRkZDpmdW5jdGlvbiBkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCldfSxEREQ6ZnVuY3Rpb24gREREKCl7cmV0dXJuIGdldERheU5hbWUoe3k6eSgpLG06X20oKSxkOl9kKCksXzpfKCksZGF5TmFtZTppMThuLmRheU5hbWVzW0QoKV0sc2hvcnQ6dHJ1ZX0pfSxkZGRkOmZ1bmN0aW9uIGRkZGQoKXtyZXR1cm4gaTE4bi5kYXlOYW1lc1tEKCkrN119LEREREQ6ZnVuY3Rpb24gRERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCkrN119KX0sbTpmdW5jdGlvbiBtKCl7cmV0dXJuIF9tKCkrMX0sbW06ZnVuY3Rpb24gbW0oKXtyZXR1cm4gcGFkKF9tKCkrMSl9LG1tbTpmdW5jdGlvbiBtbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCldfSxtbW1tOmZ1bmN0aW9uIG1tbW0oKXtyZXR1cm4gaTE4bi5tb250aE5hbWVzW19tKCkrMTJdfSx5eTpmdW5jdGlvbiB5eSgpe3JldHVybiBTdHJpbmcoeSgpKS5zbGljZSgyKX0seXl5eTpmdW5jdGlvbiB5eXl5KCl7cmV0dXJuIHBhZCh5KCksNCl9LGg6ZnVuY3Rpb24gaCgpe3JldHVybiBfSCgpJTEyfHwxMn0saGg6ZnVuY3Rpb24gaGgoKXtyZXR1cm4gcGFkKF9IKCklMTJ8fDEyKX0sSDpmdW5jdGlvbiBIKCl7cmV0dXJuIF9IKCl9LEhIOmZ1bmN0aW9uIEhIKCl7cmV0dXJuIHBhZChfSCgpKX0sTTpmdW5jdGlvbiBNKCl7cmV0dXJuIF9NKCl9LE1NOmZ1bmN0aW9uIE1NKCl7cmV0dXJuIHBhZChfTSgpKX0sczpmdW5jdGlvbiBzKCl7cmV0dXJuIF9zKCl9LHNzOmZ1bmN0aW9uIHNzKCl7cmV0dXJuIHBhZChfcygpKX0sbDpmdW5jdGlvbiBsKCl7cmV0dXJuIHBhZChfTCgpLDMpfSxMOmZ1bmN0aW9uIEwoKXtyZXR1cm4gcGFkKE1hdGguZmxvb3IoX0woKS8xMCkpfSx0OmZ1bmN0aW9uIHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1swXTppMThuLnRpbWVOYW1lc1sxXX0sdHQ6ZnVuY3Rpb24gdHQoKXtyZXR1cm4gX0goKTwxMj9pMThuLnRpbWVOYW1lc1syXTppMThuLnRpbWVOYW1lc1szXX0sVDpmdW5jdGlvbiBUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNF06aTE4bi50aW1lTmFtZXNbNV19LFRUOmZ1bmN0aW9uIFRUKCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbNl06aTE4bi50aW1lTmFtZXNbN119LFo6ZnVuY3Rpb24gWigpe3JldHVybiBnbXQ/XCJHTVRcIjp1dGM/XCJVVENcIjpmb3JtYXRUaW1lem9uZShkYXRlKX0sbzpmdW5jdGlvbiBvKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApKjEwMCtNYXRoLmFicyhfbygpKSU2MCw0KX0scDpmdW5jdGlvbiBwKCl7cmV0dXJuKF9vKCk+MD9cIi1cIjpcIitcIikrcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMoX28oKSkvNjApLDIpK1wiOlwiK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpJTYwKSwyKX0sUzpmdW5jdGlvbiBTKCl7cmV0dXJuW1widGhcIixcInN0XCIsXCJuZFwiLFwicmRcIl1bX2QoKSUxMD4zPzA6KF9kKCklMTAwLV9kKCklMTAhPTEwKSpfZCgpJTEwXX0sVzpmdW5jdGlvbiBXKCl7cmV0dXJuIF9XKCl9LFdXOmZ1bmN0aW9uIFdXKCl7cmV0dXJuIHBhZChfVygpKX0sTjpmdW5jdGlvbiBOKCl7cmV0dXJuIF9OKCl9fTtyZXR1cm4gbWFzay5yZXBsYWNlKHRva2VuLGZ1bmN0aW9uKG1hdGNoKXtpZihtYXRjaCBpbiBmbGFncyl7cmV0dXJuIGZsYWdzW21hdGNoXSgpfXJldHVybiBtYXRjaC5zbGljZSgxLG1hdGNoLmxlbmd0aC0xKX0pfWV4cG9ydCB2YXIgbWFza3M9e2RlZmF1bHQ6XCJkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3NcIixzaG9ydERhdGU6XCJtL2QveXlcIixwYWRkZWRTaG9ydERhdGU6XCJtbS9kZC95eXl5XCIsbWVkaXVtRGF0ZTpcIm1tbSBkLCB5eXl5XCIsbG9uZ0RhdGU6XCJtbW1tIGQsIHl5eXlcIixmdWxsRGF0ZTpcImRkZGQsIG1tbW0gZCwgeXl5eVwiLHNob3J0VGltZTpcImg6TU0gVFRcIixtZWRpdW1UaW1lOlwiaDpNTTpzcyBUVFwiLGxvbmdUaW1lOlwiaDpNTTpzcyBUVCBaXCIsaXNvRGF0ZTpcInl5eXktbW0tZGRcIixpc29UaW1lOlwiSEg6TU06c3NcIixpc29EYXRlVGltZTpcInl5eXktbW0tZGQnVCdISDpNTTpzc29cIixpc29VdGNEYXRlVGltZTpcIlVUQzp5eXl5LW1tLWRkJ1QnSEg6TU06c3MnWidcIixleHBpcmVzSGVhZGVyRm9ybWF0OlwiZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaXCJ9O2V4cG9ydCB2YXIgaTE4bj17ZGF5TmFtZXM6W1wiU3VuXCIsXCJNb25cIixcIlR1ZVwiLFwiV2VkXCIsXCJUaHVcIixcIkZyaVwiLFwiU2F0XCIsXCJTdW5kYXlcIixcIk1vbmRheVwiLFwiVHVlc2RheVwiLFwiV2VkbmVzZGF5XCIsXCJUaHVyc2RheVwiLFwiRnJpZGF5XCIsXCJTYXR1cmRheVwiXSxtb250aE5hbWVzOltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIixcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSx0aW1lTmFtZXM6W1wiYVwiLFwicFwiLFwiYW1cIixcInBtXCIsXCJBXCIsXCJQXCIsXCJBTVwiLFwiUE1cIl19O3ZhciBwYWQ9ZnVuY3Rpb24gcGFkKHZhbCl7dmFyIGxlbj1hcmd1bWVudHMubGVuZ3RoPjEmJmFyZ3VtZW50c1sxXSE9PXVuZGVmaW5lZD9hcmd1bWVudHNbMV06MjtyZXR1cm4gU3RyaW5nKHZhbCkucGFkU3RhcnQobGVuLFwiMFwiKX07dmFyIGdldERheU5hbWU9ZnVuY3Rpb24gZ2V0RGF5TmFtZShfcmVmKXt2YXIgeT1fcmVmLnksbT1fcmVmLm0sZD1fcmVmLmQsXz1fcmVmLl8sZGF5TmFtZT1fcmVmLmRheU5hbWUsX3JlZiRzaG9ydD1fcmVmW1wic2hvcnRcIl0sX3Nob3J0PV9yZWYkc2hvcnQ9PT12b2lkIDA/ZmFsc2U6X3JlZiRzaG9ydDt2YXIgdG9kYXk9bmV3IERhdGU7dmFyIHllc3RlcmRheT1uZXcgRGF0ZTt5ZXN0ZXJkYXkuc2V0RGF0ZSh5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKS0xKTt2YXIgdG9tb3Jyb3c9bmV3IERhdGU7dG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvd1tfK1wiRGF0ZVwiXSgpKzEpO3ZhciB0b2RheV9kPWZ1bmN0aW9uIHRvZGF5X2QoKXtyZXR1cm4gdG9kYXlbXytcIkRhdGVcIl0oKX07dmFyIHRvZGF5X209ZnVuY3Rpb24gdG9kYXlfbSgpe3JldHVybiB0b2RheVtfK1wiTW9udGhcIl0oKX07dmFyIHRvZGF5X3k9ZnVuY3Rpb24gdG9kYXlfeSgpe3JldHVybiB0b2RheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHllc3RlcmRheV9kPWZ1bmN0aW9uIHllc3RlcmRheV9kKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRGF0ZVwiXSgpfTt2YXIgeWVzdGVyZGF5X209ZnVuY3Rpb24geWVzdGVyZGF5X20oKXtyZXR1cm4geWVzdGVyZGF5W18rXCJNb250aFwiXSgpfTt2YXIgeWVzdGVyZGF5X3k9ZnVuY3Rpb24geWVzdGVyZGF5X3koKXtyZXR1cm4geWVzdGVyZGF5W18rXCJGdWxsWWVhclwiXSgpfTt2YXIgdG9tb3Jyb3dfZD1mdW5jdGlvbiB0b21vcnJvd19kKCl7cmV0dXJuIHRvbW9ycm93W18rXCJEYXRlXCJdKCl9O3ZhciB0b21vcnJvd19tPWZ1bmN0aW9uIHRvbW9ycm93X20oKXtyZXR1cm4gdG9tb3Jyb3dbXytcIk1vbnRoXCJdKCl9O3ZhciB0b21vcnJvd195PWZ1bmN0aW9uIHRvbW9ycm93X3koKXtyZXR1cm4gdG9tb3Jyb3dbXytcIkZ1bGxZZWFyXCJdKCl9O2lmKHRvZGF5X3koKT09PXkmJnRvZGF5X20oKT09PW0mJnRvZGF5X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUZHlcIjpcIlRvZGF5XCJ9ZWxzZSBpZih5ZXN0ZXJkYXlfeSgpPT09eSYmeWVzdGVyZGF5X20oKT09PW0mJnllc3RlcmRheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiWXNkXCI6XCJZZXN0ZXJkYXlcIn1lbHNlIGlmKHRvbW9ycm93X3koKT09PXkmJnRvbW9ycm93X20oKT09PW0mJnRvbW9ycm93X2QoKT09PWQpe3JldHVybiBfc2hvcnQ/XCJUbXdcIjpcIlRvbW9ycm93XCJ9cmV0dXJuIGRheU5hbWV9O3ZhciBnZXRXZWVrPWZ1bmN0aW9uIGdldFdlZWsoZGF0ZSl7dmFyIHRhcmdldFRodXJzZGF5PW5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSxkYXRlLmdldE1vbnRoKCksZGF0ZS5nZXREYXRlKCkpO3RhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpLSh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSs2KSU3KzMpO3ZhciBmaXJzdFRodXJzZGF5PW5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksMCw0KTtmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCktKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZHM9dGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKS1maXJzdFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCk7dGFyZ2V0VGh1cnNkYXkuc2V0SG91cnModGFyZ2V0VGh1cnNkYXkuZ2V0SG91cnMoKS1kcyk7dmFyIHdlZWtEaWZmPSh0YXJnZXRUaHVyc2RheS1maXJzdFRodXJzZGF5KS8oODY0ZTUqNyk7cmV0dXJuIDErTWF0aC5mbG9vcih3ZWVrRGlmZil9O3ZhciBnZXREYXlPZldlZWs9ZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKGRhdGUpe3ZhciBkb3c9ZGF0ZS5nZXREYXkoKTtpZihkb3c9PT0wKXtkb3c9N31yZXR1cm4gZG93fTtleHBvcnQgdmFyIGZvcm1hdFRpbWV6b25lPWZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lKGRhdGUpe3JldHVybihTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpfHxbXCJcIl0pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLFwiXCIpLnJlcGxhY2UoL0dNVFxcKzAwMDAvZyxcIlVUQ1wiKX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZERheXMgZnJvbSBcIi4vdWkvZGF5c1wiO1xuaW1wb3J0IGxvYWRIZWFkZXIgZnJvbSBcIi4vdWkvaGVhZGVyXCI7XG5pbXBvcnQgbG9hZEhvdXJzIGZyb20gXCIuL3VpL2hvdXJzXCI7XG5cbmNvbnN0IFdFQVRIRVJfQVBJX0tFWSA9ICdmZGNkMDQ5MWRmYTI0OTc0OTBiMjE1MjQ5MjMzMDAzJztcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke1dFQVRIRVJfQVBJX0tFWX0mcT0ke2xvY2F0aW9ufSZkYXlzPTdgLCB7IG1vZGU6ICdjb3JzJyB9KTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdGb3JlY2FzdCBkYXRhOiAnLCBkYXRhKTtcbiAgICByZXR1cm4gZGF0YS5lcnJvciA/IG51bGwgOiBkYXRhO1xufVxuXG5mdW5jdGlvbiBsb2FkVUkoZm9yZWNhc3REYXRhKSB7XG4gICAgY29uc3QgW2xvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdF0gPSBbZm9yZWNhc3REYXRhLmxvY2F0aW9uLCBmb3JlY2FzdERhdGEuY3VycmVudCwgZm9yZWNhc3REYXRhLmZvcmVjYXN0XTtcblxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJywgSlNPTi5zdHJpbmdpZnkoZm9yZWNhc3REYXRhKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgZm9yZWNhc3REYXRhLmxvY2F0aW9uLm5hbWUpO1xuICAgIFxuICAgIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheSk7XG4gICAgbG9hZEhvdXJzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIsIGxvY2F0aW9uLmxvY2FsdGltZSk7XG4gICAgbG9hZERheXMoZm9yZWNhc3QuZm9yZWNhc3RkYXkpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckV2ZW50TGlzdGVuZXJzKGZvcmVjYXN0RGF0YSkge1xuICAgIGNvbnN0IHNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpO1xuICAgIHNlYXJjaEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ3NlYXJjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0Rm9yZWNhc3Qoc2VhcmNoRmllbGQudmFsdWUpO1xuICAgICAgICBpZiAoZm9yZWNhc3REYXRhKSB7XG4gICAgICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdTRUFSQ0hfRElTUExBWUVEJywgJ3RydWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlYXJjaEZpZWxkLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICBjb25zdCB1bml0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpO1xuICAgIGNvbnN0IHRvZ2dsZVVuaXRzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnRvZ2dsZScpO1xuICAgIHRvZ2dsZVVuaXRzQnRuLnRleHRDb250ZW50ID0gYMKwJHt1bml0fWA7XG4gICAgdG9nZ2xlVW5pdHNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRVbml0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpO1xuICAgICAgICBpZiAoY3VycmVudFVuaXQgPT0gJ0YnKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0MnKTtcbiAgICAgICAgZWxzZSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnVEVNUF9VTklUJywgJ0YnKTtcblxuICAgICAgICB0b2dnbGVVbml0c0J0bi50ZXh0Q29udGVudCA9IGDCsCR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpfWA7XG4gICAgICAgIGxvYWRVSShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTsgLy8gZm9yZWNhc3REYXRhIG1heSBiZSBudWxsIG9uIHNlYXJjaGVzIHJlc3VsdGluZyBpbiBudWxsXG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xuICAgICAgICBpZiAoZS5rZXkgPT0gJy8nICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gc2VhcmNoRmllbGQpIHtcbiAgICAgICAgICAgIHNlYXJjaEZpZWxkLmZvY3VzKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS5rZXkgPT0gJ0VzY2FwZScgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgc2VhcmNoRmllbGQuYmx1cigpO1xuICAgICAgICAgICAgc2VhcmNoRmllbGQudmFsdWUgPSAnJztcbiAgICAgICAgfSBlbHNlIGlmICgoZS5rZXkgPT0gJ2YnIHx8IGUua2V5ID09ICdjJykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgaWYgKGUua2V5LnRvVXBwZXJDYXNlKCkgPT0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpKSByZXR1cm47XG5cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCBlLmtleS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgIHRvZ2dsZVVuaXRzQnRuLnRleHRDb250ZW50ID0gYMKwJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyl9YDtcbiAgICAgICAgICAgIGxvYWRVSShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgY3VyTG9jYXRpb25JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZy5jdXJyZW50Jyk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLWN1c3RvbS5wbmcnO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUud2lkdGggPSAnMjRweCc7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtaG92ZXIucG5nJztcbiAgICB9KTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLWN1c3RvbS5wbmcnO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY2xpY2sucG5nJztcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnU0VBUkNIX0RJU1BMQVlFRCcsICdmYWxzZScpO1xuICAgICAgICBsb2FkUGFnZURhdGEoKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnQ3VycmVudCBsb2NhdGlvbiBpbWFnZSB3YXMgY2xpY2tlZCcpO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zcmMgPSAnYXNzZXRzL2Nyb3NzaGFpcnMtZ3BzLWN1c3RvbS5wbmcnO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXRVc2VyTG9jYXRpb24oKSB7XG4gICAgYXN5bmMgZnVuY3Rpb24gc3VjY2Vzcyhwb3NpdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlZCBjdXJyZW50IGNvb3JkaW5hdGVzOiAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfWApO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCBgJHtwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGV9LCR7cG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZX1gKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnU0VBUkNIX0RJU1BMQVlFRCcpID09ICdmYWxzZScpIHsgLy8gdXNlciBoYXNuJ3Qgc2VhcmNoZWQgZm9yIHNvbWV0aGluZyAtIGRvbid0IG92ZXJyaWRlIHRoZWlyIHNlYXJjaFxuICAgICAgICAgICAgYXdhaXQgbG9hZFBhZ2VEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gcmV0cmlldmUgdXNlcidzIGxvY2F0aW9uIC0gc2V0dGluZyBkZWZhdWx0IHRvIExvcyBBbmdlbGVzXCIpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCAnTG9zIEFuZ2VsZXMnKTtcbiAgICB9XG5cbiAgICBpZiAoIW5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gdW5hdmFpbGFibGUgLSBzZXR0aW5nIGRlZmF1bHQgbG9jYXRpb24gdG8gTG9zIEFuZ2VsZXMnKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0xPQ0FUSU9OJywgJ0xvcyBBbmdlbGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDMubG9jYXRpb24nKS50ZXh0Q29udGVudCA9ICdMb2NhdGluZy4uLic7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdTRUFSQ0hfRElTUExBWUVEJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oc3VjY2VzcywgZXJyb3IsIHtcbiAgICAgICAgICAgIGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDEwMDAwXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2VEYXRhKCkge1xuICAgIGxldCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTE9DQVRJT04nKSk7XG4gICAgaWYgKGZvcmVjYXN0RGF0YSkge1xuICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnLCBKU09OLnN0cmluZ2lmeShmb3JlY2FzdERhdGEpKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xuICAgIGF3YWl0IHNldFVzZXJMb2NhdGlvbigpO1xuICAgIGF3YWl0IGxvYWRQYWdlRGF0YSgpO1xuXG4gICAgcmVnaXN0ZXJFdmVudExpc3RlbmVycyhKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdGT1JFQ0FTVF9EQVRBJykpKTtcbn1cblxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==