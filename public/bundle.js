(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _printToDOM = _interopRequireDefault(require("./welcome/printToDOM"));

var _welcomeForms = _interopRequireDefault(require("./welcome/welcomeForms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import eventsApiManager from "./events/eventsApiManager";
(0, _printToDOM.default)(_welcomeForms.default.loginForm, "#welcomeForm"); // eventsApiManager(r => console.log(r))

},{"./welcome/printToDOM":2,"./welcome/welcomeForms":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const printToDOM = (what, where) => {
  document.querySelector(where).innerHTML = what;
};

var _default = printToDOM;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const welcomeForms = {
  registrationForm: `
        <h1>Welcome! Create an account.</h1>

        <label for="registration_username">Username</label>
        <input type="text" name="registration_username" id="registration_username">

        <label for="registration_password">Password</label>
        <input type="password" name="registration_password" id="registration_password">

        <label for="registration_firstName">First Name</label>
        <input type="text" name="registration_firstName" id="registration_firstName">

        <label for="registration_lastName">Last Name</label>
        <input type="text" name="registration_lastName" id="registration_lastName">

        <label for="registration_email">Email</label>
        <input type="text" name="registration_email" id="registration_email">

        <button id="registerBtn">Register</button>
        <button id="alreadyRegistered">Already Have An Account?</button>
    `,
  loginForm: `
        <h1>Login</h1>

        <label for="login_username">Username</label>
        <input type="text" name="login_username" id="login_username">
        <label for="login_password">Username</label>
        <input type="text" name="login_password" id="login_password">
    `
};
var _default = welcomeForms;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lRm9ybXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOzs7O0FBSEE7QUFLQSx5QkFBVyxzQkFBYSxTQUF4QixFQUFtQyxjQUFuQyxFLENBRUE7Ozs7Ozs7Ozs7QUNQQSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUQsRUFBTyxLQUFQLEtBQWlCO0FBQ2hDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsU0FBOUIsR0FBMEMsSUFBMUM7QUFDSCxDQUZEOztlQUllLFU7Ozs7Ozs7Ozs7QUNKZixNQUFNLFlBQVksR0FBRztBQUNqQixFQUFBLGdCQUFnQixFQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQURGO0FBc0JqQixFQUFBLFNBQVMsRUFBRzs7Ozs7Ozs7QUF0QkssQ0FBckI7ZUFnQ2UsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBldmVudHNBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldmVudHNBcGlNYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi93ZWxjb21lL3ByaW50VG9ET01cIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVGb3Jtc1wiO1xyXG5cclxucHJpbnRUb0RPTSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtLCBcIiN3ZWxjb21lRm9ybVwiKVxyXG5cclxuLy8gZXZlbnRzQXBpTWFuYWdlcihyID0+IGNvbnNvbGUubG9nKHIpKSIsImNvbnN0IHByaW50VG9ET00gPSAod2hhdCwgd2hlcmUpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod2hlcmUpLmlubmVySFRNTCA9IHdoYXRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RPTSIsImNvbnN0IHdlbGNvbWVGb3JtcyA9IHtcclxuICAgIHJlZ2lzdHJhdGlvbkZvcm06IGBcclxuICAgICAgICA8aDE+V2VsY29tZSEgQ3JlYXRlIGFuIGFjY291bnQuPC9oMT5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInJlZ2lzdHJhdGlvbl91c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIj5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiIGlkPVwicmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCI+Rmlyc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIj5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX2xhc3ROYW1lXCI+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJyZWdpc3RyYXRpb25fZW1haWxcIj5FbWFpbDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIGlkPVwicmVnaXN0cmF0aW9uX2VtYWlsXCI+XHJcblxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RlckJ0blwiPlJlZ2lzdGVyPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImFscmVhZHlSZWdpc3RlcmVkXCI+QWxyZWFkeSBIYXZlIEFuIEFjY291bnQ/PC9idXR0b24+XHJcbiAgICBgLFxyXG4gICAgbG9naW5Gb3JtOiBgXHJcbiAgICAgICAgPGgxPkxvZ2luPC9oMT5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3VzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsb2dpbl91c2VybmFtZVwiIGlkPVwibG9naW5fdXNlcm5hbWVcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW5fcGFzc3dvcmRcIj5Vc2VybmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxvZ2luX3Bhc3N3b3JkXCIgaWQ9XCJsb2dpbl9wYXNzd29yZFwiPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lRm9ybXMiXX0=
