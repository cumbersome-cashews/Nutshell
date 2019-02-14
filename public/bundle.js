(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const eventsApiManager = {
  getEvents() {
    return fetch("http://localhost:8088/events").then(r = r.json());
  }

};
const eventsManager = {
  addEvent: () => {
    document.querySelector("#events-container");
  }
};
var _default = eventsApiManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _eventsApiManager = _interopRequireDefault(require("./events/eventsApiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _eventsApiManager.default)(r => console.log(r));

},{"./events/eventsApiManager":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudHNBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsTUFBTSxnQkFBZ0IsR0FBRztBQUNyQixFQUFBLFNBQVMsR0FBRztBQUNSLFdBQU8sS0FBSyxDQUFDLDhCQUFELENBQUwsQ0FDRixJQURFLENBQ0csQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFGLEVBRFAsQ0FBUDtBQUVIOztBQUpvQixDQUF6QjtBQU9BLE1BQU0sYUFBYSxHQUFHO0FBQ2xCLEVBQUEsUUFBUSxFQUFFLE1BQUs7QUFDWCxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG1CQUF2QjtBQUNIO0FBSGlCLENBQXRCO2VBTWUsZ0I7Ozs7OztBQ2JmOzs7O0FBRUEsK0JBQWlCLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVosQ0FBdEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBldmVudHNBcGlNYW5hZ2VyID0ge1xyXG4gICAgZ2V0RXZlbnRzKCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIilcclxuICAgICAgICAgICAgLnRoZW4ociA9IHIuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBldmVudHNNYW5hZ2VyID0ge1xyXG4gICAgYWRkRXZlbnQ6ICgpPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRzLWNvbnRhaW5lclwiKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudHNBcGlNYW5hZ2VyIiwiaW1wb3J0IGV2ZW50c0FwaU1hbmFnZXIgZnJvbSBcIi4vZXZlbnRzL2V2ZW50c0FwaU1hbmFnZXJcIjtcclxuXHJcbmV2ZW50c0FwaU1hbmFnZXIociA9PiBjb25zb2xlLmxvZyhyKSkiXX0=
