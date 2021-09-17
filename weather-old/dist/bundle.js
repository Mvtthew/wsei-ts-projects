/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.ts":
/*!*******************!*\
  !*** ./src/UI.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nexports.__esModule = true;\r\nvar UI = /** @class */ (function () {\r\n    function UI(weatherApi) {\r\n        this.weatherApi = weatherApi;\r\n        this.inputEl = document.getElementById('city-input');\r\n        this.initInput();\r\n        this.buttonEl = document.getElementById('get-weather-button');\r\n        this.initButton();\r\n    }\r\n    UI.prototype.initInput = function () {\r\n        var _this = this;\r\n        this.inputEl.addEventListener('keyup', function (e) {\r\n            _this.weatherApi.city = e.target.value;\r\n        });\r\n    };\r\n    UI.prototype.initButton = function () {\r\n        var _this = this;\r\n        this.buttonEl.addEventListener('click', function () {\r\n            _this.weatherApi.getWeather().then(function () {\r\n                _this.renderData();\r\n            });\r\n        });\r\n    };\r\n    UI.prototype.renderData = function () {\r\n        var data = this.weatherApi.data;\r\n        document.getElementById('city-name').innerHTML = data.name;\r\n        document.getElementById('temp').innerHTML = data.main.temp.toFixed(1) + '°C';\r\n        document.getElementById('text').innerHTML = data.weather[0].main;\r\n        document.getElementById('visibility').innerHTML = 'Visibility: ' + data.visibility.toString() + 'm';\r\n        document.getElementById('min').innerHTML = 'min ' + data.main.temp_min.toString() + '°C';\r\n        document.getElementById('max').innerHTML = 'max ' + data.main.temp_max.toString() + '°C';\r\n    };\r\n    return UI;\r\n}());\r\nexports.default = UI;\r\n\n\n//# sourceURL=webpack://weather/./src/UI.ts?");

/***/ }),

/***/ "./src/WeatherApi.ts":
/*!***************************!*\
  !*** ./src/WeatherApi.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nexports.__esModule = true;\r\nvar WeatherApi = /** @class */ (function () {\r\n    function WeatherApi() {\r\n        this.apiKey = 'f054371b11ebe3fa19fbcb60969b8b97';\r\n        this.city = '';\r\n        this.city = 'Krakow';\r\n    }\r\n    WeatherApi.prototype.getWeather = function () {\r\n        return __awaiter(this, void 0, void 0, function () {\r\n            var url, res, data;\r\n            return __generator(this, function (_a) {\r\n                switch (_a.label) {\r\n                    case 0:\r\n                        url = \"http://api.openweathermap.org/data/2.5/weather?q=\" + this.city + \"&APPID=\" + this.apiKey + \"&units=metric\";\r\n                        return [4 /*yield*/, fetch(url)];\r\n                    case 1:\r\n                        res = _a.sent();\r\n                        return [4 /*yield*/, res.json()];\r\n                    case 2:\r\n                        data = _a.sent();\r\n                        this.data = data;\r\n                        return [2 /*return*/];\r\n                }\r\n            });\r\n        });\r\n    };\r\n    return WeatherApi;\r\n}());\r\nexports.default = WeatherApi;\r\n\n\n//# sourceURL=webpack://weather/./src/WeatherApi.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nexports.__esModule = true;\r\nvar UI_1 = __webpack_require__(/*! ./UI */ \"./src/UI.ts\");\r\nvar WeatherApi_1 = __webpack_require__(/*! ./WeatherApi */ \"./src/WeatherApi.ts\");\r\nvar weather = new WeatherApi_1[\"default\"]();\r\nvar ui = new UI_1[\"default\"](weather);\r\nweather.getWeather().then(function () {\r\n    ui.renderData();\r\n});\r\n\n\n//# sourceURL=webpack://weather/./src/app.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;