/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("const WEATHER_API_KEY = 'fdcd0491dfa2497490b215249233003';\r\nconst USER_LOCATION = 'Los Angeles';\r\n\r\nasync function getForecast(location) {\r\n    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=7`, { mode: 'cors' });\r\n    const data = await response.json();\r\n    return data;\r\n}\r\n\r\nconst search = document.querySelector('#search');\r\nsearch.addEventListener('search', async () => {\r\n    const forecastData = await getForecast(search.value);\r\n    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];\r\n    console.log(location, current, forecast);\r\n});\r\n\r\nasync function loadUI(location, current, forecast) {\r\n    const locationName = document.querySelector('h3.location');\r\n    locationName.textContent = location.name;\r\n\r\n    const temp = document.querySelector('h1.temp');\r\n    temp.textContent = current.temp_f;\r\n}\r\n\r\nasync function main() {\r\n    const forecastData = await getForecast(USER_LOCATION);\r\n    const [location, current, forecast] = [forecastData.location, forecastData.current, forecastData.forecast];\r\n\r\n    await loadUI(location, current, forecast);\r\n}\r\n\r\nmain();\n\n//# sourceURL=webpack://odin-weather-app/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;