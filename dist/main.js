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

        const low = `${day.day.mintemp_f}°`
        const lowText = document.createElement('p');
        lowText.classList.add('low');
        lowText.textContent = low;

        const high = `${day.day.maxtemp_f}°`
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
function loadHeader(location, current, forecast) {
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

        const temp = hour.temp_f;
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
const USER_LOCATION = 'Los Angeles';
const DEFAULT_UNIT = 'F';

async function getForecast(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });
    const data = await response.json();
    return data;
}

function loadUI(forecastData) {
    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];

    (0,_ui_header__WEBPACK_IMPORTED_MODULE_1__["default"])(location, current, forecast);
    (0,_ui_hours__WEBPACK_IMPORTED_MODULE_2__["default"])(forecast.forecastday[0].hour);
    (0,_ui_days__WEBPACK_IMPORTED_MODULE_0__["default"])(forecast.forecastday);
}

async function main() {
    const forecastData = await getForecast(USER_LOCATION);
    loadUI(forecastData);

    const search = document.querySelector('#search');
    search.addEventListener('search', async () => {
        const forecastData = await getForecast(search.value);
        loadUI(forecastData);
    });

    const toggleUnitsBtn = document.querySelector('button.toggle');
    toggleUnitsBtn.textContent = `°${DEFAULT_UNIT}`;
    toggleUnitsBtn.addEventListener('click', () => {

    });
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JEZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixzQ0FBc0M7QUFDbkU7QUFDQTtBQUNBLDRCQUE0QixzQ0FBc0M7QUFDbEU7Ozs7Ozs7Ozs7Ozs7O0FDZmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsS0FBSztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDbkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNJO0FBQ0Y7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGdCQUFnQixLQUFLLFNBQVMsWUFBWSxjQUFjO0FBQzVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBVTtBQUNkLElBQUkscURBQVM7QUFDYixJQUFJLG9EQUFRO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFDQUFxQyxhQUFhO0FBQ2xEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwLy4vc3JjL3VpL2RheXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9ob3Vycy5qcyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZERheXMod2Vlaykge1xyXG4gICAgY29uc3QgZGF5c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5kYXlzJyk7XHJcblxyXG4gICAgd2hpbGUgKGRheXNDb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIGRheXNDb250YWluZXIucmVtb3ZlQ2hpbGQoZGF5c0NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWVrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZGF5ID0gd2Vla1tpXTtcclxuXHJcbiAgICAgICAgY29uc3QgZGF5T2ZXZWVrID0gbmV3IERhdGUoZGF5LmRhdGUpLmdldERheSgpOyAvLyAwLTZcclxuICAgICAgICBjb25zdCBkYXlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGRheVRleHQuY2xhc3NMaXN0LmFkZCgnZGF5LW5hbWUnKTtcclxuICAgICAgICBkYXlUZXh0LnRleHRDb250ZW50ID0gaSA9PSAwID8gJ1RvZGF5JyA6IGdldERheU9mV2VlaygoZGF5T2ZXZWVrICsgMSkgJSA3KTtcclxuXHJcbiAgICAgICAgY29uc3QgaWNvblVybCA9IGRheS5kYXkuY29uZGl0aW9uLmljb247XHJcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcclxuICAgICAgICBpY29uSW1hZ2Uuc3JjID0gaWNvblVybDtcclxuXHJcbiAgICAgICAgY29uc3QgbG93ID0gYCR7ZGF5LmRheS5taW50ZW1wX2Z9wrBgXHJcbiAgICAgICAgY29uc3QgbG93VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBsb3dUZXh0LmNsYXNzTGlzdC5hZGQoJ2xvdycpO1xyXG4gICAgICAgIGxvd1RleHQudGV4dENvbnRlbnQgPSBsb3c7XHJcblxyXG4gICAgICAgIGNvbnN0IGhpZ2ggPSBgJHtkYXkuZGF5Lm1heHRlbXBfZn3CsGBcclxuICAgICAgICBjb25zdCBoaWdoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBoaWdoVGV4dC5jbGFzc0xpc3QuYWRkKCdoaWdoJyk7XHJcbiAgICAgICAgaGlnaFRleHQudGV4dENvbnRlbnQgPSBoaWdoO1xyXG5cclxuICAgICAgICBjb25zdCBkYXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBkYXlEaXYuY2xhc3NMaXN0LmFkZCgnZGF5Jyk7XHJcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGRheVRleHQpO1xyXG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChpY29uSW1hZ2UpO1xyXG4gICAgICAgIGRheURpdi5hcHBlbmRDaGlsZChsb3dUZXh0KTtcclxuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRleHQpO1xyXG5cclxuICAgICAgICBkYXlzQ29udGFpbmVyLmFwcGVuZENoaWxkKGRheURpdik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheU9mV2VlayhudW0pIHtcclxuICAgIGNvbnN0IGRheXMgPSBuZXcgTWFwKFtcclxuICAgICAgICBbMCwgJ1N1biddLFxyXG4gICAgICAgIFsxLCAnTW9uJ10sXHJcbiAgICAgICAgWzIsICdUdWUnXSxcclxuICAgICAgICBbMywgJ1dlZCddLFxyXG4gICAgICAgIFs0LCAnVGh1J10sXHJcbiAgICAgICAgWzUsICdGcmknXSxcclxuICAgICAgICBbNiwgJ1NhdCddLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcmV0dXJuIGRheXMuZ2V0KG51bSk7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdCkge1xyXG4gICAgY29uc3QgbG9jYXRpb25OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDMubG9jYXRpb24nKTtcclxuICAgIGxvY2F0aW9uTmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uLm5hbWU7XHJcblxyXG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxLnRlbXAnKTtcclxuICAgIHRlbXAudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50LnRlbXBfZn3CsGA7XHJcblxyXG4gICAgY29uc3QgY29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigncC5jb25kaXRpb24nKTtcclxuICAgIGNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnQuY29uZGl0aW9uLnRleHQ7XHJcblxyXG4gICAgY29uc3QgaGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AuaGlnaCcpO1xyXG4gICAgaGlnaC50ZXh0Q29udGVudCA9IGBIOiAke2ZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Z9wrBgO1xyXG5cclxuICAgIGNvbnN0IGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AubG93Jyk7XHJcbiAgICBsb3cudGV4dENvbnRlbnQgPSBgTDogJHtmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfcKwYDtcclxufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIb3VycyhkYXkpIHtcclxuICAgIGNvbnN0IGhvdXJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJzJyk7XHJcblxyXG4gICAgd2hpbGUgKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICBob3Vyc0NvbnRhaW5lci5yZW1vdmVDaGlsZChob3Vyc0NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBkYXlbaV07XHJcblxyXG4gICAgICAgIGNvbnN0IGhvdXJOdW0gPSBuZXcgRGF0ZShob3VyLnRpbWUpLmdldEhvdXJzKCk7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBob3VyTnVtICUgMTIgPT0gMCA/IDEyIDogaG91ck51bSAlIDEyO1xyXG4gICAgICAgIHRpbWUgKz0gaG91ck51bSA+IDExID8gJ1BNJyA6ICdBTSc7XHJcbiAgICAgICAgY29uc3QgdGltZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgdGltZVRleHQuY2xhc3NMaXN0LmFkZCgndGltZScpO1xyXG4gICAgICAgIHRpbWVUZXh0LnRleHRDb250ZW50ID0gdGltZTtcclxuXHJcbiAgICAgICAgY29uc3QgaWNvblVybCA9IGhvdXIuY29uZGl0aW9uLmljb247XHJcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcclxuICAgICAgICBpY29uSW1hZ2Uuc3JjID0gaWNvblVybDtcclxuXHJcbiAgICAgICAgY29uc3QgdGVtcCA9IGhvdXIudGVtcF9mO1xyXG4gICAgICAgIGNvbnN0IHRlbXBUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIHRlbXBUZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdXItdGVtcCcpO1xyXG4gICAgICAgIHRlbXBUZXh0LnRleHRDb250ZW50ID0gYCR7dGVtcH3CsGA7XHJcblxyXG4gICAgICAgIGNvbnN0IGhvdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBob3VyRGl2LmNsYXNzTGlzdC5hZGQoJ2hvdXInKTtcclxuICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKHRpbWVUZXh0KTtcclxuICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKGljb25JbWFnZSk7XHJcbiAgICAgICAgaG91ckRpdi5hcHBlbmRDaGlsZCh0ZW1wVGV4dCk7XHJcblxyXG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJEaXYpO1xyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgbG9hZERheXMgZnJvbSBcIi4vdWkvZGF5c1wiO1xyXG5pbXBvcnQgbG9hZEhlYWRlciBmcm9tIFwiLi91aS9oZWFkZXJcIjtcclxuaW1wb3J0IGxvYWRIb3VycyBmcm9tIFwiLi91aS9ob3Vyc1wiO1xyXG5cclxuY29uc3QgV0VBVEhFUl9BUElfS0VZID0gJ2ZkY2QwNDkxZGZhMjQ5NzQ5MGIyMTUyNDkyMzMwMDMnO1xyXG5jb25zdCBVU0VSX0xPQ0FUSU9OID0gJ0xvcyBBbmdlbGVzJztcclxuY29uc3QgREVGQVVMVF9VTklUID0gJ0YnO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QobG9jYXRpb24pIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7V0VBVEhFUl9BUElfS0VZfSZxPSR7bG9jYXRpb259JmRheXM9N2AsIHsgbW9kZTogJ2NvcnMnIH0pO1xyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkVUkoZm9yZWNhc3REYXRhKSB7XHJcbiAgICBjb25zdCBbbG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0XSA9IFtmb3JlY2FzdERhdGEubG9jYXRpb24sIGZvcmVjYXN0RGF0YS5jdXJyZW50LCBmb3JlY2FzdERhdGEuZm9yZWNhc3RdO1xyXG5cclxuICAgIGxvYWRIZWFkZXIobG9jYXRpb24sIGN1cnJlbnQsIGZvcmVjYXN0KTtcclxuICAgIGxvYWRIb3Vycyhmb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyKTtcclxuICAgIGxvYWREYXlzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGNvbnN0IGZvcmVjYXN0RGF0YSA9IGF3YWl0IGdldEZvcmVjYXN0KFVTRVJfTE9DQVRJT04pO1xyXG4gICAgbG9hZFVJKGZvcmVjYXN0RGF0YSk7XHJcblxyXG4gICAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaCcpO1xyXG4gICAgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ3NlYXJjaCcsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChzZWFyY2gudmFsdWUpO1xyXG4gICAgICAgIGxvYWRVSShmb3JlY2FzdERhdGEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdG9nZ2xlVW5pdHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24udG9nZ2xlJyk7XHJcbiAgICB0b2dnbGVVbml0c0J0bi50ZXh0Q29udGVudCA9IGDCsCR7REVGQVVMVF9VTklUfWA7XHJcbiAgICB0b2dnbGVVbml0c0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==