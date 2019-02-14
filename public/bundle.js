(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _welcome = _interopRequireDefault(require("./welcome/welcome"));

var _welcomeForms = _interopRequireDefault(require("./welcome/welcomeForms"));

var _welcomeEventHandler = _interopRequireDefault(require("./welcome/welcomeEventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import eventsApiManager from "./events/eventsApiManager";
_welcome.default.welcome(_welcomeForms.default.loginForm);

_welcomeEventHandler.default.needToRegister();

_welcomeEventHandler.default.alreadyRegistered(); // eventsApiManager(r => console.log(r))

},{"./welcome/welcome":3,"./welcome/welcomeEventHandler":5,"./welcome/welcomeForms":6}],2:[function(require,module,exports){
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

var _printToDOM = _interopRequireDefault(require("./printToDOM"));

var _welcomeForms = _interopRequireDefault(require("./welcomeForms"));

var _welcomeApiManager = _interopRequireDefault(require("./welcomeApiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import welcomeEventHandlers from "./welcomeEventHandler";
const welcome = {
  welcome: form => {
    (0, _printToDOM.default)(form, "#welcomeForm");
  },
  register: () => {
    //GET existing users
    _welcomeApiManager.default.getUsers().then(usersData => {
      //capture input values
      const newUserObject = {
        first_name: document.querySelector("#registration_firstName"),
        last_name: document.querySelector("#registration_lastName"),
        username: document.querySelector("#registration_username"),
        email: document.querySelector("#registration_email"),
        password: document.querySelector("#registration_password") //compare to make sure email and username are unique

      };
      usersData.forEach(user => {
        if (user.username === newUserObject.username) {
          alert("This username already exists.");
          welcome.welcome(_welcomeForms.default.registrationForm); //alert if not unique
        } else if (user.email === newUserObject.email) {
          alert("There is already an account associated with this email adress.");
          welcome.welcome(_welcomeForms.default.registrationForm); //POST new user object if unique
        } else {
          _welcomeApiManager.default.postUsers(newUserObject) //pass new user object into login function
          .then(user => login(user));
        }
      });
    });
  },
  login: () => {
    //GET users
    _welcomeApiManager.default.getUsers().then(userData => {
      //capture values from inputs
      const loginUsername = document.querySelector("#login_username");
      const loginPassword = document.querySelector("#login_password"); //compare id and password

      userData.forEach(user => {
        if (user.username === loginUsername && user.password === loginPassword) {} else {
          alert("Username or password incorrect");
          welcome.welcome(_welcomeForms.default.loginForm);
        }
      });
    }); //if verified, capture userId in sessionStorage
    //go to dashboard

  }
};
var _default = welcome;
exports.default = _default;

},{"./printToDOM":2,"./welcomeApiManager":4,"./welcomeForms":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const welcomeApiManager = {
  getUsers: () => {
    return fetch("http://localhost:8088/users").then(res => res.json());
  },
  postUsers: newUserObject => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserObject)
    });
  }
};
var _default = welcomeApiManager;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _welcome = _interopRequireDefault(require("./welcome"));

var _welcomeForms = _interopRequireDefault(require("./welcomeForms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const welcomeEventHandlers = {
  needToRegister: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "needToRegister") {
        _welcome.default.welcome(_welcomeForms.default.registrationForm);
      }
    });
  },
  alreadyRegistered: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "alreadyRegistered") {
        _welcome.default.welcome(_welcomeForms.default.loginForm);
      }
    });
  }
};
var _default = welcomeEventHandlers;
exports.default = _default;

},{"./welcome":3,"./welcomeForms":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const welcomeForms = {
  registrationForm: `
        <h1>Welcome! Create an account.</h1>

        <input type="text" name="registration_username" id="registration_username" placeholder="Username">

        <input type="password" name="registration_password" id="registration_password" placeholder="Password">

        <input type="text" name="registration_firstName" id="registration_firstName" placeholder="First Name">

        <input type="text" name="registration_lastName" id="registration_lastName" placeholder="Last Name">

        <input type="text" name="registration_email" id="registration_email" placeholder="Email">

        <button id="registerBtn">Register</button>
        <a id="alreadyRegistered" href="#">Already Have An Account?</a>

    `,
  loginForm: `
        <h1>Login</h1>

        <label for="login_username">Username</label>
        <input type="text" name="login_username" id="login_username">
        <label for="login_password">Password</label>
        <input type="text" name="login_password" id="login_password">

        <button id="loginBtn">Login</button>
        <a id="needToRegister" href="#">Don't Have An Account?</a>
    `
};
var _default = welcomeForms;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7QUFDQTs7QUFDQTs7OztBQUpBO0FBTUEsaUJBQVEsT0FBUixDQUFnQixzQkFBYSxTQUE3Qjs7QUFDQSw2QkFBcUIsY0FBckI7O0FBQ0EsNkJBQXFCLGlCQUFyQixHLENBR0E7Ozs7Ozs7Ozs7QUNYQSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUQsRUFBTyxLQUFQLEtBQWlCO0FBQ2hDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsU0FBOUIsR0FBMEMsSUFBMUM7QUFDSCxDQUZEOztlQUllLFU7Ozs7Ozs7Ozs7O0FDSmY7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTtBQUVBLE1BQU0sT0FBTyxHQUFHO0FBQ1osRUFBQSxPQUFPLEVBQUcsSUFBRCxJQUFVO0FBQ2YsNkJBQVcsSUFBWCxFQUFpQixjQUFqQjtBQUNILEdBSFc7QUFJWixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1o7QUFDQSwrQkFBa0IsUUFBbEIsR0FDSyxJQURMLENBQ1UsU0FBUyxJQUFJO0FBQ2Y7QUFDQSxZQUFNLGFBQWEsR0FBRztBQUNsQixRQUFBLFVBQVUsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1Qix5QkFBdkIsQ0FETTtBQUVsQixRQUFBLFNBQVMsRUFBRSxRQUFRLENBQUMsYUFBVCxDQUF1Qix3QkFBdkIsQ0FGTztBQUdsQixRQUFBLFFBQVEsRUFBRSxRQUFR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YUFBVCxDQUF1QixjQUF2QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBa0UsS0FBRCxJQUFXO0FBQ3hFLFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLEtBQW9CLG1CQUF4QixFQUE2QztBQUN6Qyx5QkFBUSxPQUFSLENBQWdCLHNCQUFhLFNBQTdCO0FBQ0g7QUFDSixLQUpEO0FBS0g7QUFkd0IsQ0FBN0I7ZUFpQmUsb0I7Ozs7Ozs7Ozs7QUNwQmYsTUFBTSxZQUFZLEdBQUc7QUFDakIsRUFBQSxnQkFBZ0IsRUFBRzs7Ozs7Ozs7Ozs7Ozs7OztLQURGO0FBa0JqQixFQUFBLFNBQVMsRUFBRzs7Ozs7Ozs7Ozs7QUFsQkssQ0FBckI7ZUErQmUsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBldmVudHNBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9ldmVudHNBcGlNYW5hZ2VyXCI7XHJcblxyXG5pbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVcIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVGb3Jtc1wiO1xyXG5pbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lRXZlbnRIYW5kbGVyXCJcclxuXHJcbndlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG53ZWxjb21lRXZlbnRIYW5kbGVycy5uZWVkVG9SZWdpc3RlcigpXHJcbndlbGNvbWVFdmVudEhhbmRsZXJzLmFscmVhZHlSZWdpc3RlcmVkKClcclxuXHJcblxyXG4vLyBldmVudHNBcGlNYW5hZ2VyKHIgPT4gY29uc29sZS5sb2cocikpIiwiY29uc3QgcHJpbnRUb0RPTSA9ICh3aGF0LCB3aGVyZSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3aGVyZSkuaW5uZXJIVE1MID0gd2hhdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRE9NIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4vcHJpbnRUb0RPTVwiO1xyXG5pbXBvcnQgd2VsY29tZUZvcm1zIGZyb20gXCIuL3dlbGNvbWVGb3Jtc1wiO1xyXG5pbXBvcnQgd2VsY29tZUFwaU1hbmFnZXIgZnJvbSBcIi4vd2VsY29tZUFwaU1hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHdlbGNvbWVFdmVudEhhbmRsZXJzIGZyb20gXCIuL3dlbGNvbWVFdmVudEhhbmRsZXJcIjtcclxuXHJcbmNvbnN0IHdlbGNvbWUgPSB7XHJcbiAgICB3ZWxjb21lOiAoZm9ybSkgPT4ge1xyXG4gICAgICAgIHByaW50VG9ET00oZm9ybSwgXCIjd2VsY29tZUZvcm1cIilcclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIC8vR0VUIGV4aXN0aW5nIHVzZXJzXHJcbiAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIuZ2V0VXNlcnMoKVxyXG4gICAgICAgICAgICAudGhlbih1c2Vyc0RhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VXNlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9wYXNzd29yZFwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vY29tcGFyZSB0byBtYWtlIHN1cmUgZW1haWwgYW5kIHVzZXJuYW1lIGFyZSB1bmlxdWVcclxuICAgICAgICAgICAgICAgIHVzZXJzRGF0YS5mb3JFYWNoKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLnVzZXJuYW1lID09PSBuZXdVc2VyT2JqZWN0LnVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhpcyB1c2VybmFtZSBhbHJlYWR5IGV4aXN0cy5cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5yZWdpc3RyYXRpb25Gb3JtKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0IGlmIG5vdCB1bmlxdWVcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXIuZW1haWwgPT09IG5ld1VzZXJPYmplY3QuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGFjY291bnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZW1haWwgYWRyZXNzLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLnJlZ2lzdHJhdGlvbkZvcm0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vUE9TVCBuZXcgdXNlciBvYmplY3QgaWYgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIucG9zdFVzZXJzKG5ld1VzZXJPYmplY3QpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9wYXNzIG5ldyB1c2VyIG9iamVjdCBpbnRvIGxvZ2luIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICAvL0dFVCB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xyXG4gICAgICAgICAgICAvL2NhcHR1cmUgdmFsdWVzIGZyb20gaW5wdXRzXHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luVXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3VzZXJuYW1lXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpXHJcblxyXG4gICAgICAgICAgICAvL2NvbXBhcmUgaWQgYW5kIHBhc3N3b3JkXHJcbiAgICAgICAgICAgIHVzZXJEYXRhLmZvckVhY2godXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSAmJiB1c2VyLnBhc3N3b3JkID09PSBsb2dpblBhc3N3b3JkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIG9yIHBhc3N3b3JkIGluY29ycmVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vaWYgdmVyaWZpZWQsIGNhcHR1cmUgdXNlcklkIGluIHNlc3Npb25TdG9yYWdlXHJcbiAgICAgICAgLy9nbyB0byBkYXNoYm9hcmRcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZSIsImNvbnN0IHdlbGNvbWVBcGlNYW5hZ2VyID0ge1xyXG4gICAgZ2V0VXNlcnM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcG9zdFVzZXJzOiAobmV3VXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1VzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUFwaU1hbmFnZXIiLCJpbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcblxyXG5jb25zdCB3ZWxjb21lRXZlbnRIYW5kbGVycyA9IHtcclxuICAgIG5lZWRUb1JlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibmVlZFRvUmVnaXN0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5yZWdpc3RyYXRpb25Gb3JtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhbHJlYWR5UmVnaXN0ZXJlZDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFscmVhZHlSZWdpc3RlcmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUV2ZW50SGFuZGxlcnMiLCJjb25zdCB3ZWxjb21lRm9ybXMgPSB7XHJcbiAgICByZWdpc3RyYXRpb25Gb3JtOiBgXHJcbiAgICAgICAgPGgxPldlbGNvbWUhIENyZWF0ZSBhbiBhY2NvdW50LjwvaDE+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl91c2VybmFtZVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBpZD1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIGlkPVwicmVnaXN0cmF0aW9uX2VtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGlkPVwicmVnaXN0ZXJCdG5cIj5SZWdpc3RlcjwvYnV0dG9uPlxyXG4gICAgICAgIDxhIGlkPVwiYWxyZWFkeVJlZ2lzdGVyZWRcIiBocmVmPVwiI1wiPkFscmVhZHkgSGF2ZSBBbiBBY2NvdW50PzwvYT5cclxuXHJcbiAgICBgLFxyXG4gICAgbG9naW5Gb3JtOiBgXHJcbiAgICAgICAgPGgxPkxvZ2luPC9oMT5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3VzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsb2dpbl91c2VybmFtZVwiIGlkPVwibG9naW5fdXNlcm5hbWVcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW5fcGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxvZ2luX3Bhc3N3b3JkXCIgaWQ9XCJsb2dpbl9wYXNzd29yZFwiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGlkPVwibG9naW5CdG5cIj5Mb2dpbjwvYnV0dG9uPlxyXG4gICAgICAgIDxhIGlkPVwibmVlZFRvUmVnaXN0ZXJcIiBocmVmPVwiI1wiPkRvbid0IEhhdmUgQW4gQWNjb3VudD88L2E+XHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVGb3JtcyJdfQ==
