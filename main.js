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
function loadHours(day) {
    const hoursContainer = document.querySelector('.hours');

    while (hoursContainer.firstChild) {
        hoursContainer.removeChild(hoursContainer.firstChild);
    }

    for (let i = 0; i < day.length; i++) {
        const hour = day[i];

        const hourNum = new Date(hour.time).getHours();
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
    (0,_ui_hours__WEBPACK_IMPORTED_MODULE_2__["default"])(forecast.forecastday[0].hour);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCx5QkFBeUIsR0FBRywwQkFBMEI7QUFDMUcsNENBQTRDLHlCQUF5QixHQUFHLDBCQUEwQjtBQUNsRztBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9kYXlzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaG91cnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkRGF5cyh3ZWVrKSB7XG4gICAgY29uc3QgZGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5kYXlzJyk7XG5cbiAgICB3aGlsZSAoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIGRheXNDb250YWluZXIucmVtb3ZlQ2hpbGQoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRheSA9IHdlZWtbaV07XG5cbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbmV3IERhdGUoZGF5LmRhdGUpLmdldERheSgpOyAvLyAwLTZcbiAgICAgICAgY29uc3QgZGF5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGF5VGV4dC5jbGFzc0xpc3QuYWRkKCdkYXktbmFtZScpO1xuICAgICAgICBkYXlUZXh0LnRleHRDb250ZW50ID0gaSA9PSAwID8gJ1RvZGF5JyA6IGdldERheU9mV2VlaygoZGF5T2ZXZWVrICsgMSkgJSA3KTtcblxuICAgICAgICBjb25zdCBpY29uVXJsID0gZGF5LmRheS5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgICAgIGNvbnN0IGxvdyA9IGAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBkYXkuZGF5Lm1pbnRlbXBfZiA6IGRheS5kYXkubWludGVtcF9jfcKwYFxuICAgICAgICBjb25zdCBsb3dUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBsb3dUZXh0LmNsYXNzTGlzdC5hZGQoJ2xvdycpO1xuICAgICAgICBsb3dUZXh0LnRleHRDb250ZW50ID0gbG93O1xuXG4gICAgICAgIGNvbnN0IGhpZ2ggPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gIGRheS5kYXkubWF4dGVtcF9mIDogZGF5LmRheS5tYXh0ZW1wX2N9wrBgXG4gICAgICAgIGNvbnN0IGhpZ2hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBoaWdoVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWdoJyk7XG4gICAgICAgIGhpZ2hUZXh0LnRleHRDb250ZW50ID0gaGlnaDtcblxuICAgICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGF5RGl2LmNsYXNzTGlzdC5hZGQoJ2RheScpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoZGF5VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQobG93VGV4dCk7XG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChoaWdoVGV4dCk7XG5cbiAgICAgICAgZGF5c0NvbnRhaW5lci5hcHBlbmRDaGlsZChkYXlEaXYpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF5T2ZXZWVrKG51bSkge1xuICAgIGNvbnN0IGRheXMgPSBuZXcgTWFwKFtcbiAgICAgICAgWzAsICdTdW4nXSxcbiAgICAgICAgWzEsICdNb24nXSxcbiAgICAgICAgWzIsICdUdWUnXSxcbiAgICAgICAgWzMsICdXZWQnXSxcbiAgICAgICAgWzQsICdUaHUnXSxcbiAgICAgICAgWzUsICdGcmknXSxcbiAgICAgICAgWzYsICdTYXQnXSxcbiAgICBdKTtcblxuICAgIHJldHVybiBkYXlzLmdldChudW0pO1xufSIsImltcG9ydCBkYXRlRm9ybWF0IGZyb20gXCJkYXRlZm9ybWF0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0VG9kYXkpIHtcbiAgICBjb25zdCBsb2NhdGlvbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMy5sb2NhdGlvbicpO1xuICAgIGxvY2F0aW9uTmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uLm5hbWU7XG5cbiAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEudGVtcCcpO1xuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gTWF0aC5yb3VuZChjdXJyZW50LnRlbXBfZikgOiBNYXRoLnJvdW5kKGN1cnJlbnQudGVtcF9jKX3CsGA7XG5cbiAgICBjb25zdCBjb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLmNvbmRpdGlvbicpO1xuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XG5cbiAgICBjb25zdCBoaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncC5oaWdoJyk7XG4gICAgaGlnaC50ZXh0Q29udGVudCA9IGBIOiAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSA9PSAnRicgPyBmb3JlY2FzdFRvZGF5Lm1heHRlbXBfZiA6IGZvcmVjYXN0VG9kYXkubWF4dGVtcF9jfcKwYDtcblxuICAgIGNvbnN0IGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AubG93Jyk7XG4gICAgbG93LnRleHRDb250ZW50ID0gYEw6ICR7bG9jYWxTdG9yYWdlLmdldEl0ZW0oJ1RFTVBfVU5JVCcpID09ICdGJyA/IGZvcmVjYXN0VG9kYXkubWludGVtcF9mIDogZm9yZWNhc3RUb2RheS5taW50ZW1wX2N9wrBgO1xuXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZShsb2NhdGlvbi5sb2NhbHRpbWUpO1xuXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXRlJyk7XG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGRhdGVGb3JtYXQoY3VycmVudERhdGUsIFwiZGRkZCwgbW1tbSBkUywgeXl5eVwiKTtcbiAgICBcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbiAgICB0aW1lLnRleHRDb250ZW50ID0gZGF0ZUZvcm1hdChjdXJyZW50RGF0ZSwgXCJoOk1NIFRUXCIpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIb3VycyhkYXkpIHtcbiAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VycycpO1xuXG4gICAgd2hpbGUgKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgaG91cnNDb250YWluZXIucmVtb3ZlQ2hpbGQoaG91cnNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaG91ciA9IGRheVtpXTtcblxuICAgICAgICBjb25zdCBob3VyTnVtID0gbmV3IERhdGUoaG91ci50aW1lKS5nZXRIb3VycygpO1xuICAgICAgICBsZXQgdGltZSA9IGhvdXJOdW0gJSAxMiA9PSAwID8gMTIgOiBob3VyTnVtICUgMTI7XG4gICAgICAgIHRpbWUgKz0gaG91ck51bSA+IDExID8gJ1BNJyA6ICdBTSc7XG4gICAgICAgIGNvbnN0IHRpbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0aW1lVGV4dC5jbGFzc0xpc3QuYWRkKCd0aW1lJyk7XG4gICAgICAgIHRpbWVUZXh0LnRleHRDb250ZW50ID0gdGltZTtcblxuICAgICAgICBjb25zdCBpY29uVXJsID0gaG91ci5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgICAgIGNvbnN0IHRlbXAgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykgPT0gJ0YnID8gaG91ci50ZW1wX2YgOiBob3VyLnRlbXBfYztcbiAgICAgICAgY29uc3QgdGVtcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRlbXBUZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdXItdGVtcCcpO1xuICAgICAgICB0ZW1wVGV4dC50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuXG4gICAgICAgIGNvbnN0IGhvdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91ckRpdi5jbGFzc0xpc3QuYWRkKCdob3VyJyk7XG4gICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGltZVRleHQpO1xuICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKGljb25JbWFnZSk7XG4gICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGVtcFRleHQpO1xuXG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJEaXYpO1xuICAgIH1cbn0iLCJ2YXIgdG9rZW49L2R7MSw0fXxEezMsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xXezEsMn18W0xsb3BTWk5dfFwiW15cIl0qXCJ8J1teJ10qJy9nO3ZhciB0aW1lem9uZT0vXFxiKD86W0EtWl17MSwzfVtBLVpdW1RDXSkoPzpbLStdXFxkezR9KT98KCg/OkF1c3RyYWxpYW4gKT8oPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZSlcXGIvZzt2YXIgdGltZXpvbmVDbGlwPS9bXi0rXFxkQS1aXS9nO2V4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZSxtYXNrLHV0YyxnbXQpe2lmKGFyZ3VtZW50cy5sZW5ndGg9PT0xJiZ0eXBlb2YgZGF0ZT09PVwic3RyaW5nXCImJiEvXFxkLy50ZXN0KGRhdGUpKXttYXNrPWRhdGU7ZGF0ZT11bmRlZmluZWR9ZGF0ZT1kYXRlfHxkYXRlPT09MD9kYXRlOm5ldyBEYXRlO2lmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKXtkYXRlPW5ldyBEYXRlKGRhdGUpfWlmKGlzTmFOKGRhdGUpKXt0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGRhdGVcIil9bWFzaz1TdHJpbmcobWFza3NbbWFza118fG1hc2t8fG1hc2tzW1wiZGVmYXVsdFwiXSk7dmFyIG1hc2tTbGljZT1tYXNrLnNsaWNlKDAsNCk7aWYobWFza1NsaWNlPT09XCJVVEM6XCJ8fG1hc2tTbGljZT09PVwiR01UOlwiKXttYXNrPW1hc2suc2xpY2UoNCk7dXRjPXRydWU7aWYobWFza1NsaWNlPT09XCJHTVQ6XCIpe2dtdD10cnVlfX12YXIgXz1mdW5jdGlvbiBfKCl7cmV0dXJuIHV0Yz9cImdldFVUQ1wiOlwiZ2V0XCJ9O3ZhciBfZD1mdW5jdGlvbiBkKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF0ZVwiXSgpfTt2YXIgRD1mdW5jdGlvbiBEKCl7cmV0dXJuIGRhdGVbXygpK1wiRGF5XCJdKCl9O3ZhciBfbT1mdW5jdGlvbiBtKCl7cmV0dXJuIGRhdGVbXygpK1wiTW9udGhcIl0oKX07dmFyIHk9ZnVuY3Rpb24geSgpe3JldHVybiBkYXRlW18oKStcIkZ1bGxZZWFyXCJdKCl9O3ZhciBfSD1mdW5jdGlvbiBIKCl7cmV0dXJuIGRhdGVbXygpK1wiSG91cnNcIl0oKX07dmFyIF9NPWZ1bmN0aW9uIE0oKXtyZXR1cm4gZGF0ZVtfKCkrXCJNaW51dGVzXCJdKCl9O3ZhciBfcz1mdW5jdGlvbiBzKCl7cmV0dXJuIGRhdGVbXygpK1wiU2Vjb25kc1wiXSgpfTt2YXIgX0w9ZnVuY3Rpb24gTCgpe3JldHVybiBkYXRlW18oKStcIk1pbGxpc2Vjb25kc1wiXSgpfTt2YXIgX289ZnVuY3Rpb24gbygpe3JldHVybiB1dGM/MDpkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCl9O3ZhciBfVz1mdW5jdGlvbiBXKCl7cmV0dXJuIGdldFdlZWsoZGF0ZSl9O3ZhciBfTj1mdW5jdGlvbiBOKCl7cmV0dXJuIGdldERheU9mV2VlayhkYXRlKX07dmFyIGZsYWdzPXtkOmZ1bmN0aW9uIGQoKXtyZXR1cm4gX2QoKX0sZGQ6ZnVuY3Rpb24gZGQoKXtyZXR1cm4gcGFkKF9kKCkpfSxkZGQ6ZnVuY3Rpb24gZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpXX0sREREOmZ1bmN0aW9uIERERCgpe3JldHVybiBnZXREYXlOYW1lKHt5OnkoKSxtOl9tKCksZDpfZCgpLF86XygpLGRheU5hbWU6aTE4bi5kYXlOYW1lc1tEKCldLHNob3J0OnRydWV9KX0sZGRkZDpmdW5jdGlvbiBkZGRkKCl7cmV0dXJuIGkxOG4uZGF5TmFtZXNbRCgpKzddfSxEREREOmZ1bmN0aW9uIEREREQoKXtyZXR1cm4gZ2V0RGF5TmFtZSh7eTp5KCksbTpfbSgpLGQ6X2QoKSxfOl8oKSxkYXlOYW1lOmkxOG4uZGF5TmFtZXNbRCgpKzddfSl9LG06ZnVuY3Rpb24gbSgpe3JldHVybiBfbSgpKzF9LG1tOmZ1bmN0aW9uIG1tKCl7cmV0dXJuIHBhZChfbSgpKzEpfSxtbW06ZnVuY3Rpb24gbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpXX0sbW1tbTpmdW5jdGlvbiBtbW1tKCl7cmV0dXJuIGkxOG4ubW9udGhOYW1lc1tfbSgpKzEyXX0seXk6ZnVuY3Rpb24geXkoKXtyZXR1cm4gU3RyaW5nKHkoKSkuc2xpY2UoMil9LHl5eXk6ZnVuY3Rpb24geXl5eSgpe3JldHVybiBwYWQoeSgpLDQpfSxoOmZ1bmN0aW9uIGgoKXtyZXR1cm4gX0goKSUxMnx8MTJ9LGhoOmZ1bmN0aW9uIGhoKCl7cmV0dXJuIHBhZChfSCgpJTEyfHwxMil9LEg6ZnVuY3Rpb24gSCgpe3JldHVybiBfSCgpfSxISDpmdW5jdGlvbiBISCgpe3JldHVybiBwYWQoX0goKSl9LE06ZnVuY3Rpb24gTSgpe3JldHVybiBfTSgpfSxNTTpmdW5jdGlvbiBNTSgpe3JldHVybiBwYWQoX00oKSl9LHM6ZnVuY3Rpb24gcygpe3JldHVybiBfcygpfSxzczpmdW5jdGlvbiBzcygpe3JldHVybiBwYWQoX3MoKSl9LGw6ZnVuY3Rpb24gbCgpe3JldHVybiBwYWQoX0woKSwzKX0sTDpmdW5jdGlvbiBMKCl7cmV0dXJuIHBhZChNYXRoLmZsb29yKF9MKCkvMTApKX0sdDpmdW5jdGlvbiB0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMF06aTE4bi50aW1lTmFtZXNbMV19LHR0OmZ1bmN0aW9uIHR0KCl7cmV0dXJuIF9IKCk8MTI/aTE4bi50aW1lTmFtZXNbMl06aTE4bi50aW1lTmFtZXNbM119LFQ6ZnVuY3Rpb24gVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzRdOmkxOG4udGltZU5hbWVzWzVdfSxUVDpmdW5jdGlvbiBUVCgpe3JldHVybiBfSCgpPDEyP2kxOG4udGltZU5hbWVzWzZdOmkxOG4udGltZU5hbWVzWzddfSxaOmZ1bmN0aW9uIFooKXtyZXR1cm4gZ210P1wiR01UXCI6dXRjP1wiVVRDXCI6Zm9ybWF0VGltZXpvbmUoZGF0ZSl9LG86ZnVuY3Rpb24gbygpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSoxMDArTWF0aC5hYnMoX28oKSklNjAsNCl9LHA6ZnVuY3Rpb24gcCgpe3JldHVybihfbygpPjA/XCItXCI6XCIrXCIpK3BhZChNYXRoLmZsb29yKE1hdGguYWJzKF9vKCkpLzYwKSwyKStcIjpcIitwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhfbygpKSU2MCksMil9LFM6ZnVuY3Rpb24gUygpe3JldHVybltcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdW19kKCklMTA+Mz8wOihfZCgpJTEwMC1fZCgpJTEwIT0xMCkqX2QoKSUxMF19LFc6ZnVuY3Rpb24gVygpe3JldHVybiBfVygpfSxXVzpmdW5jdGlvbiBXVygpe3JldHVybiBwYWQoX1coKSl9LE46ZnVuY3Rpb24gTigpe3JldHVybiBfTigpfX07cmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbixmdW5jdGlvbihtYXRjaCl7aWYobWF0Y2ggaW4gZmxhZ3Mpe3JldHVybiBmbGFnc1ttYXRjaF0oKX1yZXR1cm4gbWF0Y2guc2xpY2UoMSxtYXRjaC5sZW5ndGgtMSl9KX1leHBvcnQgdmFyIG1hc2tzPXtkZWZhdWx0OlwiZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzXCIsc2hvcnREYXRlOlwibS9kL3l5XCIscGFkZGVkU2hvcnREYXRlOlwibW0vZGQveXl5eVwiLG1lZGl1bURhdGU6XCJtbW0gZCwgeXl5eVwiLGxvbmdEYXRlOlwibW1tbSBkLCB5eXl5XCIsZnVsbERhdGU6XCJkZGRkLCBtbW1tIGQsIHl5eXlcIixzaG9ydFRpbWU6XCJoOk1NIFRUXCIsbWVkaXVtVGltZTpcImg6TU06c3MgVFRcIixsb25nVGltZTpcImg6TU06c3MgVFQgWlwiLGlzb0RhdGU6XCJ5eXl5LW1tLWRkXCIsaXNvVGltZTpcIkhIOk1NOnNzXCIsaXNvRGF0ZVRpbWU6XCJ5eXl5LW1tLWRkJ1QnSEg6TU06c3NvXCIsaXNvVXRjRGF0ZVRpbWU6XCJVVEM6eXl5eS1tbS1kZCdUJ0hIOk1NOnNzJ1onXCIsZXhwaXJlc0hlYWRlckZvcm1hdDpcImRkZCwgZGQgbW1tIHl5eXkgSEg6TU06c3MgWlwifTtleHBvcnQgdmFyIGkxOG49e2RheU5hbWVzOltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiLFwiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sbW9udGhOYW1lczpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCIsXCJKYW51YXJ5XCIsXCJGZWJydWFyeVwiLFwiTWFyY2hcIixcIkFwcmlsXCIsXCJNYXlcIixcIkp1bmVcIixcIkp1bHlcIixcIkF1Z3VzdFwiLFwiU2VwdGVtYmVyXCIsXCJPY3RvYmVyXCIsXCJOb3ZlbWJlclwiLFwiRGVjZW1iZXJcIl0sdGltZU5hbWVzOltcImFcIixcInBcIixcImFtXCIsXCJwbVwiLFwiQVwiLFwiUFwiLFwiQU1cIixcIlBNXCJdfTt2YXIgcGFkPWZ1bmN0aW9uIHBhZCh2YWwpe3ZhciBsZW49YXJndW1lbnRzLmxlbmd0aD4xJiZhcmd1bWVudHNbMV0hPT11bmRlZmluZWQ/YXJndW1lbnRzWzFdOjI7cmV0dXJuIFN0cmluZyh2YWwpLnBhZFN0YXJ0KGxlbixcIjBcIil9O3ZhciBnZXREYXlOYW1lPWZ1bmN0aW9uIGdldERheU5hbWUoX3JlZil7dmFyIHk9X3JlZi55LG09X3JlZi5tLGQ9X3JlZi5kLF89X3JlZi5fLGRheU5hbWU9X3JlZi5kYXlOYW1lLF9yZWYkc2hvcnQ9X3JlZltcInNob3J0XCJdLF9zaG9ydD1fcmVmJHNob3J0PT09dm9pZCAwP2ZhbHNlOl9yZWYkc2hvcnQ7dmFyIHRvZGF5PW5ldyBEYXRlO3ZhciB5ZXN0ZXJkYXk9bmV3IERhdGU7eWVzdGVyZGF5LnNldERhdGUoeWVzdGVyZGF5W18rXCJEYXRlXCJdKCktMSk7dmFyIHRvbW9ycm93PW5ldyBEYXRlO3RvbW9ycm93LnNldERhdGUodG9tb3Jyb3dbXytcIkRhdGVcIl0oKSsxKTt2YXIgdG9kYXlfZD1mdW5jdGlvbiB0b2RheV9kKCl7cmV0dXJuIHRvZGF5W18rXCJEYXRlXCJdKCl9O3ZhciB0b2RheV9tPWZ1bmN0aW9uIHRvZGF5X20oKXtyZXR1cm4gdG9kYXlbXytcIk1vbnRoXCJdKCl9O3ZhciB0b2RheV95PWZ1bmN0aW9uIHRvZGF5X3koKXtyZXR1cm4gdG9kYXlbXytcIkZ1bGxZZWFyXCJdKCl9O3ZhciB5ZXN0ZXJkYXlfZD1mdW5jdGlvbiB5ZXN0ZXJkYXlfZCgpe3JldHVybiB5ZXN0ZXJkYXlbXytcIkRhdGVcIl0oKX07dmFyIHllc3RlcmRheV9tPWZ1bmN0aW9uIHllc3RlcmRheV9tKCl7cmV0dXJuIHllc3RlcmRheVtfK1wiTW9udGhcIl0oKX07dmFyIHllc3RlcmRheV95PWZ1bmN0aW9uIHllc3RlcmRheV95KCl7cmV0dXJuIHllc3RlcmRheVtfK1wiRnVsbFllYXJcIl0oKX07dmFyIHRvbW9ycm93X2Q9ZnVuY3Rpb24gdG9tb3Jyb3dfZCgpe3JldHVybiB0b21vcnJvd1tfK1wiRGF0ZVwiXSgpfTt2YXIgdG9tb3Jyb3dfbT1mdW5jdGlvbiB0b21vcnJvd19tKCl7cmV0dXJuIHRvbW9ycm93W18rXCJNb250aFwiXSgpfTt2YXIgdG9tb3Jyb3dfeT1mdW5jdGlvbiB0b21vcnJvd195KCl7cmV0dXJuIHRvbW9ycm93W18rXCJGdWxsWWVhclwiXSgpfTtpZih0b2RheV95KCk9PT15JiZ0b2RheV9tKCk9PT1tJiZ0b2RheV9kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVGR5XCI6XCJUb2RheVwifWVsc2UgaWYoeWVzdGVyZGF5X3koKT09PXkmJnllc3RlcmRheV9tKCk9PT1tJiZ5ZXN0ZXJkYXlfZCgpPT09ZCl7cmV0dXJuIF9zaG9ydD9cIllzZFwiOlwiWWVzdGVyZGF5XCJ9ZWxzZSBpZih0b21vcnJvd195KCk9PT15JiZ0b21vcnJvd19tKCk9PT1tJiZ0b21vcnJvd19kKCk9PT1kKXtyZXR1cm4gX3Nob3J0P1wiVG13XCI6XCJUb21vcnJvd1wifXJldHVybiBkYXlOYW1lfTt2YXIgZ2V0V2Vlaz1mdW5jdGlvbiBnZXRXZWVrKGRhdGUpe3ZhciB0YXJnZXRUaHVyc2RheT1uZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksZGF0ZS5nZXRNb250aCgpLGRhdGUuZ2V0RGF0ZSgpKTt0YXJnZXRUaHVyc2RheS5zZXREYXRlKHRhcmdldFRodXJzZGF5LmdldERhdGUoKS0odGFyZ2V0VGh1cnNkYXkuZ2V0RGF5KCkrNiklNyszKTt2YXIgZmlyc3RUaHVyc2RheT1uZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLDAsNCk7Zmlyc3RUaHVyc2RheS5zZXREYXRlKGZpcnN0VGh1cnNkYXkuZ2V0RGF0ZSgpLShmaXJzdFRodXJzZGF5LmdldERheSgpKzYpJTcrMyk7dmFyIGRzPXRhcmdldFRodXJzZGF5LmdldFRpbWV6b25lT2Zmc2V0KCktZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO3RhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCktZHMpO3ZhciB3ZWVrRGlmZj0odGFyZ2V0VGh1cnNkYXktZmlyc3RUaHVyc2RheSkvKDg2NGU1KjcpO3JldHVybiAxK01hdGguZmxvb3Iod2Vla0RpZmYpfTt2YXIgZ2V0RGF5T2ZXZWVrPWZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKXt2YXIgZG93PWRhdGUuZ2V0RGF5KCk7aWYoZG93PT09MCl7ZG93PTd9cmV0dXJuIGRvd307ZXhwb3J0IHZhciBmb3JtYXRUaW1lem9uZT1mdW5jdGlvbiBmb3JtYXRUaW1lem9uZShkYXRlKXtyZXR1cm4oU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCxcIlwiKS5yZXBsYWNlKC9HTVRcXCswMDAwL2csXCJVVENcIil9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWREYXlzIGZyb20gXCIuL3VpL2RheXNcIjtcbmltcG9ydCBsb2FkSGVhZGVyIGZyb20gXCIuL3VpL2hlYWRlclwiO1xuaW1wb3J0IGxvYWRIb3VycyBmcm9tIFwiLi91aS9ob3Vyc1wiO1xuXG5jb25zdCBXRUFUSEVSX0FQSV9LRVkgPSAnZmRjZDA0OTFkZmEyNDk3NDkwYjIxNTI0OTIzMzAwMyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHtXRUFUSEVSX0FQSV9LRVl9JnE9JHtsb2NhdGlvbn0mZGF5cz03YCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnRm9yZWNhc3QgZGF0YTogJywgZGF0YSk7XG4gICAgcmV0dXJuIGRhdGEuZXJyb3IgPyBudWxsIDogZGF0YTtcbn1cblxuZnVuY3Rpb24gbG9hZFVJKGZvcmVjYXN0RGF0YSkge1xuICAgIGNvbnN0IFtsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RdID0gW2ZvcmVjYXN0RGF0YS5sb2NhdGlvbiwgZm9yZWNhc3REYXRhLmN1cnJlbnQsIGZvcmVjYXN0RGF0YS5mb3JlY2FzdF07XG5cbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnRk9SRUNBU1RfREFUQScsIEpTT04uc3RyaW5naWZ5KGZvcmVjYXN0RGF0YSkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsIGZvcmVjYXN0RGF0YS5sb2NhdGlvbi5uYW1lKTtcbiAgICBcbiAgICBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkpO1xuICAgIGxvYWRIb3Vycyhmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyKTtcbiAgICBsb2FkRGF5cyhmb3JlY2FzdC5mb3JlY2FzdGRheSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoZm9yZWNhc3REYXRhKSB7XG4gICAgY29uc3Qgc2VhcmNoRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoJyk7XG4gICAgc2VhcmNoRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChzZWFyY2hGaWVsZC52YWx1ZSk7XG4gICAgICAgIGlmIChmb3JlY2FzdERhdGEpIHtcbiAgICAgICAgICAgIGxvYWRVSShmb3JlY2FzdERhdGEpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1NFQVJDSF9ESVNQTEFZRUQnLCAndHJ1ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VhcmNoRmllbGQudmFsdWUgPSAnJztcbiAgICB9KTtcblxuICAgIGNvbnN0IHVuaXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyk7XG4gICAgY29uc3QgdG9nZ2xlVW5pdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24udG9nZ2xlJyk7XG4gICAgdG9nZ2xlVW5pdHNCdG4udGV4dENvbnRlbnQgPSBgwrAke3VuaXR9YDtcbiAgICB0b2dnbGVVbml0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFVuaXQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyk7XG4gICAgICAgIGlmIChjdXJyZW50VW5pdCA9PSAnRicpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnQycpO1xuICAgICAgICBlbHNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdURU1QX1VOSVQnLCAnRicpO1xuXG4gICAgICAgIHRvZ2dsZVVuaXRzQnRuLnRleHRDb250ZW50ID0gYMKwJHtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJyl9YDtcbiAgICAgICAgbG9hZFVJKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpOyAvLyBmb3JlY2FzdERhdGEgbWF5IGJlIG51bGwgb24gc2VhcmNoZXMgcmVzdWx0aW5nIGluIG51bGxcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PSAnLycgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSBzZWFyY2hGaWVsZCkge1xuICAgICAgICAgICAgc2VhcmNoRmllbGQuZm9jdXMoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLmtleSA9PSAnRXNjYXBlJyAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IHNlYXJjaEZpZWxkKSB7XG4gICAgICAgICAgICBzZWFyY2hGaWVsZC5ibHVyKCk7XG4gICAgICAgICAgICBzZWFyY2hGaWVsZC52YWx1ZSA9ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKChlLmtleSA9PSAnZicgfHwgZS5rZXkgPT0gJ2MnKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHNlYXJjaEZpZWxkKSB7XG4gICAgICAgICAgICBpZiAoZS5rZXkudG9VcHBlckNhc2UoKSA9PSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnVEVNUF9VTklUJykpIHJldHVybjtcblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RFTVBfVU5JVCcsIGUua2V5LnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgdG9nZ2xlVW5pdHNCdG4udGV4dENvbnRlbnQgPSBgwrAke2xvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKX1gO1xuICAgICAgICAgICAgbG9hZFVJKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBjdXJMb2NhdGlvbkltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nLmN1cnJlbnQnKTtcbiAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY3VzdG9tLnBuZyc7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS53aWR0aCA9ICcyNHB4JztcbiAgICBjdXJMb2NhdGlvbkltYWdlLnN0eWxlLmhlaWdodCA9ICcyNHB4JztcbiAgICBjdXJMb2NhdGlvbkltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgY3VyTG9jYXRpb25JbWFnZS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy1ob3Zlci5wbmcnO1xuICAgIH0pO1xuICAgIGN1ckxvY2F0aW9uSW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY3VzdG9tLnBuZyc7XG4gICAgfSk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgIGN1ckxvY2F0aW9uSW1hZ2Uuc3JjID0gJ2Fzc2V0cy9jcm9zc2hhaXJzLWdwcy1jbGljay5wbmcnO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdTRUFSQ0hfRElTUExBWUVEJywgJ2ZhbHNlJyk7XG4gICAgICAgIGxvYWRQYWdlRGF0YSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdDdXJyZW50IGxvY2F0aW9uIGltYWdlIHdhcyBjbGlja2VkJyk7XG4gICAgfSk7XG4gICAgY3VyTG9jYXRpb25JbWFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBjdXJMb2NhdGlvbkltYWdlLnNyYyA9ICdhc3NldHMvY3Jvc3NoYWlycy1ncHMtY3VzdG9tLnBuZyc7XG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldFVzZXJMb2NhdGlvbigpIHtcbiAgICBhc3luYyBmdW5jdGlvbiBzdWNjZXNzKHBvc2l0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVcGRhdGVkIGN1cnJlbnQgY29vcmRpbmF0ZXM6ICR7cG9zaXRpb24uY29vcmRzLmxhdGl0dWRlfSwke3Bvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGV9YCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsIGAke3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZX0sJHtwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlfWApO1xuICAgICAgICBcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdTRUFSQ0hfRElTUExBWUVEJykgPT0gJ2ZhbHNlJykgeyAvLyB1c2VyIGhhc24ndCBzZWFyY2hlZCBmb3Igc29tZXRoaW5nIC0gZG9uJ3Qgb3ZlcnJpZGUgdGhlaXIgc2VhcmNoXG4gICAgICAgICAgICBhd2FpdCBsb2FkUGFnZURhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlVuYWJsZSB0byByZXRyaWV2ZSB1c2VyJ3MgbG9jYXRpb24gLSBzZXR0aW5nIGRlZmF1bHQgdG8gTG9zIEFuZ2VsZXNcIik7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdMT0NBVElPTicsICdMb3MgQW5nZWxlcycpO1xuICAgIH1cblxuICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiB1bmF2YWlsYWJsZSAtIHNldHRpbmcgZGVmYXVsdCBsb2NhdGlvbiB0byBMb3MgQW5nZWxlcycpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTE9DQVRJT04nLCAnTG9zIEFuZ2VsZXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMy5sb2NhdGlvbicpLnRleHRDb250ZW50ID0gJ0xvY2F0aW5nLi4uJztcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1NFQVJDSF9ESVNQTEFZRUQnLCAnZmFsc2UnKTtcblxuICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbihzdWNjZXNzLCBlcnJvciwge1xuICAgICAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkUGFnZURhdGEoKSB7XG4gICAgbGV0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdMT0NBVElPTicpKTtcbiAgICBpZiAoZm9yZWNhc3REYXRhKSB7XG4gICAgICAgIGxvYWRVSShmb3JlY2FzdERhdGEpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnRk9SRUNBU1RfREFUQScsIEpTT04uc3RyaW5naWZ5KGZvcmVjYXN0RGF0YSkpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdURU1QX1VOSVQnKSkgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1RFTVBfVU5JVCcsICdGJyk7XG4gICAgYXdhaXQgc2V0VXNlckxvY2F0aW9uKCk7XG4gICAgYXdhaXQgbG9hZFBhZ2VEYXRhKCk7XG5cbiAgICByZWdpc3RlckV2ZW50TGlzdGVuZXJzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ0ZPUkVDQVNUX0RBVEEnKSkpO1xufVxuXG5tYWluKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9