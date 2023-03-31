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
}

main();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDOztBQUVBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JEZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsZUFBZTs7QUFFekM7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixzQ0FBc0M7O0FBRW5FO0FBQ0EsNEJBQTRCLHNDQUFzQztBQUNsRTs7Ozs7Ozs7Ozs7Ozs7QUNmZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsS0FBSzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7OztVQ25DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDSTtBQUNGOztBQUVuQztBQUNBOztBQUVBO0FBQ0Esb0ZBQW9GLGdCQUFnQixLQUFLLFNBQVMsWUFBWSxjQUFjO0FBQzVJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUksc0RBQVU7QUFDZCxJQUFJLHFEQUFTO0FBQ2IsSUFBSSxvREFBUTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC8uL3NyYy91aS9kYXlzLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaGVhZGVyLmpzIiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvdWkvaG91cnMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXdlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi13ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4td2VhdGhlci1hcHAvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWREYXlzKHdlZWspIHtcbiAgICBjb25zdCBkYXlzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmRheXMnKTtcblxuICAgIHdoaWxlIChkYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZGF5c0NvbnRhaW5lci5yZW1vdmVDaGlsZChkYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlZWsubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF5ID0gd2Vla1tpXTtcblxuICAgICAgICBjb25zdCBkYXlPZldlZWsgPSBuZXcgRGF0ZShkYXkuZGF0ZSkuZ2V0RGF5KCk7IC8vIDAtNlxuICAgICAgICBjb25zdCBkYXlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBkYXlUZXh0LmNsYXNzTGlzdC5hZGQoJ2RheS1uYW1lJyk7XG4gICAgICAgIGRheVRleHQudGV4dENvbnRlbnQgPSBpID09IDAgPyAnVG9kYXknIDogZ2V0RGF5T2ZXZWVrKChkYXlPZldlZWsgKyAxKSAlIDcpO1xuXG4gICAgICAgIGNvbnN0IGljb25VcmwgPSBkYXkuZGF5LmNvbmRpdGlvbi5pY29uO1xuICAgICAgICBjb25zdCBpY29uSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgaWNvbkltYWdlLmNsYXNzTGlzdC5hZGQoJ2ljb24nKTtcbiAgICAgICAgaWNvbkltYWdlLnNyYyA9IGljb25Vcmw7XG5cbiAgICAgICAgY29uc3QgbG93ID0gYCR7ZGF5LmRheS5taW50ZW1wX2Z9wrBgXG4gICAgICAgIGNvbnN0IGxvd1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGxvd1RleHQuY2xhc3NMaXN0LmFkZCgnbG93Jyk7XG4gICAgICAgIGxvd1RleHQudGV4dENvbnRlbnQgPSBsb3c7XG5cbiAgICAgICAgY29uc3QgaGlnaCA9IGAke2RheS5kYXkubWF4dGVtcF9mfcKwYFxuICAgICAgICBjb25zdCBoaWdoVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgaGlnaFRleHQuY2xhc3NMaXN0LmFkZCgnaGlnaCcpO1xuICAgICAgICBoaWdoVGV4dC50ZXh0Q29udGVudCA9IGhpZ2g7XG5cbiAgICAgICAgY29uc3QgZGF5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRheURpdi5jbGFzc0xpc3QuYWRkKCdkYXknKTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGRheVRleHQpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaWNvbkltYWdlKTtcbiAgICAgICAgZGF5RGl2LmFwcGVuZENoaWxkKGxvd1RleHQpO1xuICAgICAgICBkYXlEaXYuYXBwZW5kQ2hpbGQoaGlnaFRleHQpO1xuXG4gICAgICAgIGRheXNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGF5RGl2KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERheU9mV2VlayhudW0pIHtcbiAgICBjb25zdCBkYXlzID0gbmV3IE1hcChbXG4gICAgICAgIFswLCAnU3VuJ10sXG4gICAgICAgIFsxLCAnTW9uJ10sXG4gICAgICAgIFsyLCAnVHVlJ10sXG4gICAgICAgIFszLCAnV2VkJ10sXG4gICAgICAgIFs0LCAnVGh1J10sXG4gICAgICAgIFs1LCAnRnJpJ10sXG4gICAgICAgIFs2LCAnU2F0J10sXG4gICAgXSk7XG5cbiAgICByZXR1cm4gZGF5cy5nZXQobnVtKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdCkge1xuICAgIGNvbnN0IGxvY2F0aW9uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzLmxvY2F0aW9uJyk7XG4gICAgbG9jYXRpb25OYW1lLnRleHRDb250ZW50ID0gbG9jYXRpb24ubmFtZTtcblxuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMS50ZW1wJyk7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnQudGVtcF9mfcKwYDtcblxuICAgIGNvbnN0IGNvbmRpdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AuY29uZGl0aW9uJyk7XG4gICAgY29uZGl0aW9uLnRleHRDb250ZW50ID0gY3VycmVudC5jb25kaXRpb24udGV4dDtcblxuICAgIGNvbnN0IGhpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLmhpZ2gnKTtcbiAgICBoaWdoLnRleHRDb250ZW50ID0gYEg6ICR7Zm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn3CsGA7XG5cbiAgICBjb25zdCBsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdwLmxvdycpO1xuICAgIGxvdy50ZXh0Q29udGVudCA9IGBMOiAke2ZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Z9wrBgO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRIb3VycyhkYXkpIHtcbiAgICBjb25zdCBob3Vyc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VycycpO1xuXG4gICAgd2hpbGUgKGhvdXJzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgaG91cnNDb250YWluZXIucmVtb3ZlQ2hpbGQoaG91cnNDb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaG91ciA9IGRheVtpXTtcblxuICAgICAgICBjb25zdCBob3VyTnVtID0gbmV3IERhdGUoaG91ci50aW1lKS5nZXRIb3VycygpO1xuICAgICAgICBsZXQgdGltZSA9IGhvdXJOdW0gJSAxMiA9PSAwID8gMTIgOiBob3VyTnVtICUgMTI7XG4gICAgICAgIHRpbWUgKz0gaG91ck51bSA+IDExID8gJ1BNJyA6ICdBTSc7XG4gICAgICAgIGNvbnN0IHRpbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICB0aW1lVGV4dC5jbGFzc0xpc3QuYWRkKCd0aW1lJyk7XG4gICAgICAgIHRpbWVUZXh0LnRleHRDb250ZW50ID0gdGltZTtcblxuICAgICAgICBjb25zdCBpY29uVXJsID0gaG91ci5jb25kaXRpb24uaWNvbjtcbiAgICAgICAgY29uc3QgaWNvbkltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGljb25JbWFnZS5jbGFzc0xpc3QuYWRkKCdpY29uJyk7XG4gICAgICAgIGljb25JbWFnZS5zcmMgPSBpY29uVXJsO1xuXG4gICAgICAgIGNvbnN0IHRlbXAgPSBob3VyLnRlbXBfZjtcbiAgICAgICAgY29uc3QgdGVtcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRlbXBUZXh0LmNsYXNzTGlzdC5hZGQoJ2hvdXItdGVtcCcpO1xuICAgICAgICB0ZW1wVGV4dC50ZXh0Q29udGVudCA9IGAke3RlbXB9wrBgO1xuXG4gICAgICAgIGNvbnN0IGhvdXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaG91ckRpdi5jbGFzc0xpc3QuYWRkKCdob3VyJyk7XG4gICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGltZVRleHQpO1xuICAgICAgICBob3VyRGl2LmFwcGVuZENoaWxkKGljb25JbWFnZSk7XG4gICAgICAgIGhvdXJEaXYuYXBwZW5kQ2hpbGQodGVtcFRleHQpO1xuXG4gICAgICAgIGhvdXJzQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJEaXYpO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkRGF5cyBmcm9tIFwiLi91aS9kYXlzXCI7XG5pbXBvcnQgbG9hZEhlYWRlciBmcm9tIFwiLi91aS9oZWFkZXJcIjtcbmltcG9ydCBsb2FkSG91cnMgZnJvbSBcIi4vdWkvaG91cnNcIjtcblxuY29uc3QgV0VBVEhFUl9BUElfS0VZID0gJ2ZkY2QwNDkxZGZhMjQ5NzQ5MGIyMTUyNDkyMzMwMDMnO1xuY29uc3QgVVNFUl9MT0NBVElPTiA9ICdMb3MgQW5nZWxlcyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGxvY2F0aW9uKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHtXRUFUSEVSX0FQSV9LRVl9JnE9JHtsb2NhdGlvbn0mZGF5cz03YCwgeyBtb2RlOiAnY29ycycgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gbG9hZFVJKGZvcmVjYXN0RGF0YSkge1xuICAgIGNvbnN0IFtsb2NhdGlvbiwgY3VycmVudCwgZm9yZWNhc3RdID0gW2ZvcmVjYXN0RGF0YS5sb2NhdGlvbiwgZm9yZWNhc3REYXRhLmN1cnJlbnQsIGZvcmVjYXN0RGF0YS5mb3JlY2FzdF07XG5cbiAgICBsb2FkSGVhZGVyKGxvY2F0aW9uLCBjdXJyZW50LCBmb3JlY2FzdCk7XG4gICAgbG9hZEhvdXJzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXIpO1xuICAgIGxvYWREYXlzKGZvcmVjYXN0LmZvcmVjYXN0ZGF5KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChVU0VSX0xPQ0FUSU9OKTtcbiAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcblxuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gnKTtcbiAgICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignc2VhcmNoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JlY2FzdERhdGEgPSBhd2FpdCBnZXRGb3JlY2FzdChzZWFyY2gudmFsdWUpO1xuICAgICAgICBsb2FkVUkoZm9yZWNhc3REYXRhKTtcbiAgICB9KTtcbn1cblxubWFpbigpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==