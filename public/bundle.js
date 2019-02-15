(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const eventApiManager = {
  getEvents: () => {
    return fetch("http://localhost:8088/events").then(res => res.json());
  }
};
var _default = eventApiManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const printEvents = events => {
  document.querySelector("#eventsContainer").innerHTML = events;
};

var _default = printEvents;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _eventApiManager = _interopRequireDefault(require("./events/eventApiManager"));

var _eventPrint = _interopRequireDefault(require("./events/eventPrint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventApiManager.default.getEvents().then(eventsData => (0, _eventPrint.default)(eventsData));

},{"./events/eventApiManager":1,"./events/eventPrint":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEFwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudFByaW50LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxlQUFlLEdBQUc7QUFDcEIsRUFBQSxTQUFTLEVBQUUsTUFBTTtBQUNiLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFKLEVBRFYsQ0FBUDtBQUVIO0FBSm1CLENBQXhCO2VBT2UsZTs7Ozs7Ozs7Ozs7QUNQZixNQUFNLFdBQVcsR0FBSSxNQUFELElBQVk7QUFDNUIsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixrQkFBdkIsRUFBMkMsU0FBM0MsR0FBdUQsTUFBdkQ7QUFDSCxDQUZEOztlQUllLFc7Ozs7OztBQ0pmOztBQUNBOzs7O0FBR0EseUJBQWdCLFNBQWhCLEdBQ0ssSUFETCxDQUNVLFVBQVUsSUFBSSx5QkFBWSxVQUFaLENBRHhCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgZXZlbnRBcGlNYW5hZ2VyID0ge1xyXG4gICAgZ2V0RXZlbnRzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2V2ZW50c1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRBcGlNYW5hZ2VyIiwiY29uc3QgcHJpbnRFdmVudHMgPSAoZXZlbnRzKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50c0NvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBldmVudHNcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRFdmVudHMiLCJpbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldmVudEFwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50RXZlbnRzIGZyb20gXCIuL2V2ZW50cy9ldmVudFByaW50XCI7XHJcblxyXG5cclxuZXZlbnRBcGlNYW5hZ2VyLmdldEV2ZW50cygpXHJcbiAgICAudGhlbihldmVudHNEYXRhID0+IHByaW50RXZlbnRzKGV2ZW50c0RhdGEpKSJdfQ==
