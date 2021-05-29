/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/Game */ \"./scripts/Game.ts\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/style.css */ \"./css/style.css\");\n\n\nconst canvas = document.getElementById('GameFieldID');\nlet isGame = false;\n\nfunction ready() {\n  if (!isGame) {\n    const game = new _scripts_Game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n    isGame = true;\n  }\n}\n\nlet startGameButton = document.getElementById(\"StartButton\").addEventListener(\"click\", ready);\nlet game = new _scripts_Game__WEBPACK_IMPORTED_MODULE_0__.default(canvas);\n\nwindow.onload = function () {\n  window.setInterval(function () {\n    game.setTimeOfTimer(game.getTimeOfTimer() - 1);\n    document.getElementById(\"time\").innerHTML = game.getTimeOfTimer().toString(); //Эта функция для отображения таймера,не идеальна и из-за нее\n    // не получился некоторый функционал\n  }, game.getInterval());\n};\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./scripts/Game.ts":
/*!*************************!*\
  !*** ./scripts/Game.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Game; }\n/* harmony export */ });\n/* harmony import */ var _entity_Monster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/Monster */ \"./scripts/entity/Monster.ts\");\n/* harmony import */ var _entity_Soldier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity/Soldier */ \"./scripts/entity/Soldier.ts\");\n/* harmony import */ var _entity_GameField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity/GameField */ \"./scripts/entity/GameField.ts\");\n/* harmony import */ var _entity_Double__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entity/Double */ \"./scripts/entity/Double.ts\");\n\n\n\n\nclass Game {\n  constructor(canvas) {\n    this.context = canvas.getContext('2d');\n    this.canvass = canvas;\n    this.monsterMas = [];\n    this.slow = new _entity_Double__WEBPACK_IMPORTED_MODULE_3__.default(canvas);\n    this.soldier = new _entity_Soldier__WEBPACK_IMPORTED_MODULE_1__.default(canvas);\n    this.gameField = new _entity_GameField__WEBPACK_IMPORTED_MODULE_2__.default(canvas);\n    this.box = 64;\n    this.interval = 1000;\n    this.monsterCount = 4;\n    this.amountOfMonster = 0;\n    this.scoreNeed = this.monsterCount;\n    this.timeOfTimer = 10;\n\n    if (localStorage.getItem(\"key\") != null) {\n      this.maxScore = parseInt(localStorage.getItem(\"key\"));\n    } else {\n      this.maxScore = 0;\n    }\n\n    this.roundTime = 10000;\n    this.finalScore = 0;\n    this.start();\n    this.lose();\n  }\n\n  countOfMonster(size) {\n    for (let i = 0; i < size; i++) {\n      this.monsterMas[i] = new _entity_Monster__WEBPACK_IMPORTED_MODULE_0__.default(this.canvass);\n      this.monsterMas[i].draw();\n    }\n  }\n\n  getInterval() {\n    return this.interval;\n  }\n\n  setTimeOfTimer(time) {\n    this.timeOfTimer = time;\n  }\n\n  getTimeOfTimer() {\n    return this.timeOfTimer;\n  }\n\n  restartGame() {\n    this.gameField.draw();\n\n    for (let i = 0; i < this.monsterCount; i++) {\n      this.monsterMas[i].newMonster();\n    }\n\n    this.slow.newDouble();\n    this.scoreNeed += this.monsterCount;\n    this.soldier.draw();\n    this.lose();\n  }\n\n  scoreUpdateByKill() {\n    for (let i = 0; i < this.monsterCount; i++) {\n      if (!this.monsterMas[i].getCondition()) {\n        if (this.monsterMas[i].getX() == this.soldier.getX() && this.monsterMas[i].getY() == this.soldier.getY()) {\n          this.monsterMas[i].removeMonster();\n          this.monsterMas[i].murdered(true);\n\n          if (this.slow.getMurdered()) {\n            this.finalScore += 2;\n          } else if (!this.slow.getMurdered()) {\n            this.finalScore++;\n          }\n\n          this.amountOfMonster++;\n\n          if (this.finalScore > this.maxScore) {\n            localStorage.setItem(\"key\", this.finalScore.toString());\n          }\n\n          document.getElementById(\"score\").innerHTML = this.finalScore.toString();\n          let audio = new Audio();\n          audio.src = '../source/sounds/Eaten.mp3';\n          audio.autoplay = true;\n        }\n      }\n    }\n  }\n\n  slowKill() {\n    if (!this.slow.getMurdered()) {\n      if (this.slow.getX() == this.soldier.getX() && this.slow.getY() == this.soldier.getY()) {\n        this.slow.removeSlow();\n        this.slow.setMurdered(true);\n        let audio = new Audio();\n        audio.src = '../source/sounds/Eaten.mp3';\n        audio.autoplay = true;\n      }\n    }\n  }\n\n  refresh() {\n    this.gameField.draw();\n    this.soldier.draw();\n    this.slow.draw();\n\n    for (let i = 0; i < this.monsterCount; i++) {\n      this.monsterMas[i].draw();\n    }\n  }\n\n  attachKeyboard() {\n    document.addEventListener('keydown', e => {\n      this.checkKeyEndMove(e.code);\n    });\n  }\n\n  checkKeyEndMove(e) {\n    switch (e) {\n      case \"KeyW\":\n        if (this.soldier.getY() != 0) {\n          this.soldier.remove();\n          this.soldier.setY(this.soldier.getY() - this.box);\n          this.scoreUpdateByKill();\n          this.slowKill();\n          this.refresh();\n        }\n\n        break;\n\n      case \"KeyS\":\n        if (this.soldier.getY() != this.soldier.getMaxY() - this.box) {\n          this.soldier.remove();\n          this.soldier.setY(this.soldier.getY() + this.box);\n          this.scoreUpdateByKill();\n          this.slowKill();\n          this.refresh();\n        }\n\n        break;\n\n      case \"KeyA\":\n        if (this.soldier.getX() != 0) {\n          this.soldier.remove();\n          this.soldier.setX(this.soldier.getX() - this.box);\n          this.scoreUpdateByKill();\n          this.slowKill();\n          this.refresh();\n        }\n\n        break;\n\n      case \"KeyD\":\n        if (this.soldier.getX() != this.soldier.getMaxX() - this.box) {\n          this.soldier.remove();\n          this.soldier.setX(this.soldier.getX() + this.box);\n          this.scoreUpdateByKill();\n          this.slowKill();\n          this.refresh();\n        }\n\n        break;\n    }\n  }\n\n  start() {\n    document.getElementById(\"score\").innerHTML = this.amountOfMonster.toString();\n    this.gameField.draw();\n    this.soldier.draw();\n    this.slow.draw();\n    this.attachKeyboard();\n    this.countOfMonster(this.monsterCount);\n  }\n\n  lose() {\n    setTimeout(() => {\n      if (this.soldier.getX() == 6 * this.box && this.soldier.getY() == 10 * this.box && this.amountOfMonster == this.scoreNeed) {\n        this.timeOfTimer = 10;\n        this.interval = 1000;\n        this.roundTime = 10000;\n        this.restartGame();\n      } else {\n        alert(\"You lose!\");\n        alert(\"Ваш счет:\" + this.finalScore + \"\\n\" + \"Ваш максимальный счет:\" + this.maxScore);\n        window.location.reload();\n      }\n    }, this.roundTime);\n  }\n\n}\n\n//# sourceURL=webpack:///./scripts/Game.ts?");

/***/ }),

/***/ "./scripts/entity/Double.ts":
/*!**********************************!*\
  !*** ./scripts/entity/Double.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Double; }\n/* harmony export */ });\nconst box = 64;\nconst slow = new Image();\nslow.src = \"../source/img/can.png\";\nclass Double {\n  constructor(canvas) {\n    this.context = canvas.getContext('2d');\n    this.dead = false;\n    this.x = Math.floor(Math.random() * 13) * box;\n    this.y = Math.floor(Math.random() * 13) * box;\n  }\n\n  draw() {\n    if (!this.dead) {\n      this.context.drawImage(slow, this.x, this.y);\n    }\n  }\n\n  newDouble() {\n    this.dead = false;\n    this.x = Math.floor(Math.random() * 13) * box;\n    this.y = Math.floor(Math.random() * 13) * box;\n    this.draw();\n  }\n\n  removeSlow() {\n    this.context.clearRect(this.x, this.y, box, box);\n  }\n\n  getMurdered() {\n    return this.dead;\n  }\n\n  getX() {\n    return this.x;\n  }\n\n  getY() {\n    return this.y;\n  }\n\n  setMurdered(died) {\n    this.dead = died;\n  }\n\n}\n\n//# sourceURL=webpack:///./scripts/entity/Double.ts?");

/***/ }),

/***/ "./scripts/entity/GameField.ts":
/*!*************************************!*\
  !*** ./scripts/entity/GameField.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GameField; }\n/* harmony export */ });\nconst baseImg = new Image();\nbaseImg.src = \"../source/img/base.png\";\nconst nightImg = new Image();\nnightImg.src = \"../source/img/Night.png\";\nclass GameField {\n  x = 0;\n  y = 0;\n\n  constructor(canvas) {\n    this.context = canvas.getContext('2d');\n    this.img = nightImg;\n  }\n\n  draw() {\n    this.context.drawImage(this.img, this.x, this.y);\n    this.context.drawImage(baseImg, 384, 640);\n  }\n\n}\n\n//# sourceURL=webpack:///./scripts/entity/GameField.ts?");

/***/ }),

/***/ "./scripts/entity/Monster.ts":
/*!***********************************!*\
  !*** ./scripts/entity/Monster.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Monster; }\n/* harmony export */ });\nconst box = 64;\nlet monsterImg = new Image();\nmonsterImg.src = \"../source/img/monster.png\";\nclass Monster {\n  constructor(canvas) {\n    this.context = canvas.getContext('2d');\n    this.dead = false;\n    this.x = Math.floor(Math.random() * 13) * box;\n    this.y = Math.floor(Math.random() * 13) * box;\n  }\n\n  draw() {\n    if (!this.dead) {\n      this.context.drawImage(monsterImg, this.x, this.y);\n    }\n  }\n\n  newMonster() {\n    this.dead = false;\n    this.x = Math.floor(Math.random() * 13) * box;\n    this.y = Math.floor(Math.random() * 13) * box;\n    this.draw();\n  }\n\n  murdered(died) {\n    this.dead = died;\n  }\n\n  getCondition() {\n    return this.dead;\n  }\n\n  getX() {\n    return this.x;\n  }\n\n  getY() {\n    return this.y;\n  }\n\n  removeMonster() {\n    this.context.clearRect(this.x, this.y, box, box);\n  }\n\n}\n\n//# sourceURL=webpack:///./scripts/entity/Monster.ts?");

/***/ }),

/***/ "./scripts/entity/Soldier.ts":
/*!***********************************!*\
  !*** ./scripts/entity/Soldier.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Soldier; }\n/* harmony export */ });\nconst soldierImg = new Image();\nsoldierImg.src = \"../source/img/gun.png\";\nclass Soldier {\n  maxX = 832;\n  maxY = 832;\n  box = 64;\n  x = 6 * this.box;\n  y = 10 * this.box;\n\n  constructor(canvas) {\n    this.context = canvas.getContext('2d');\n  }\n\n  draw() {\n    this.context.drawImage(soldierImg, this.x, this.y);\n  }\n\n  getX() {\n    return this.x;\n  }\n\n  getY() {\n    return this.y;\n  }\n\n  getMaxX() {\n    return this.maxX;\n  }\n\n  getMaxY() {\n    return this.maxY;\n  }\n\n  setX(x) {\n    this.x = x;\n  }\n\n  remove() {\n    this.context.clearRect(this.x, this.y, this.box, this.box);\n  }\n\n  setY(y) {\n    this.y = y;\n  }\n\n}\n\n//# sourceURL=webpack:///./scripts/entity/Soldier.ts?");

/***/ }),

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./css/style.css?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;