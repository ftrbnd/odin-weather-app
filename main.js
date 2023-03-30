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

eval("const WEATHER_API_KEY = 'e4cd1a6a35cd41f0af7221457233003';\n\nasync function getWeather(location) {\n    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}?q=${location}`, { mode: 'cors' });\n    const data = await response.json();\n    console.log(data);\n}\n\nconst search = document.querySelector('#search');\nsearch.addEventListener('search', () => {\n    getWeather(search.value);\n});\n\n//# sourceURL=webpack://odin-weather-app/./src/app.js?");

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