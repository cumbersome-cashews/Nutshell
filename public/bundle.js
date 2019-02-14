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
      console.log(usersData);
      const allUserNames = usersData.map(user => {
        return user.username.toLowerCase();
      });
      console.log(allUserNames);
      const allEmails = usersData.map(user => {
        return user.email.toLowerCase();
      }); //capture input values

      const newUserObject = {
        first_name: document.querySelector("#registration_firstName").value,
        last_name: document.querySelector("#registration_lastName").value,
        username: document.querySelector("#registration_username").value,
        email: document.querySelector("#registration_email").value,
        password: document.querySelector("#registration_password").value
      };
      console.log(allEmails); //compare to make sure email and username are unique

      if (allUserNames.includes(newUserObject.username.toLowerCase())) {
        window.alert("This username already exists.");
        document.querySelector("#registration_username").focus();
        document.querySelector("#registration_username").select(); //alert if not unique
      } else if (allEmails.includes(newUserObject.email.toLowerCase())) {
        window.alert("There is already an account associated with this email adress.");
        document.querySelector("#registration_email").focus();
        document.querySelector("#registration_email").select(); //POST new user object if unique
      } else {
        alert(`All hail Lord ${newUserObject.first_name}!!!`);

        _welcomeApiManager.default.postUsers(newUserObject); //pass new user object into login function
        // .then(user => login(user))

      }
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

        welcomeEventHandlers.register();
      }
    });
  },
  alreadyRegistered: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "alreadyRegistered") {
        _welcome.default.welcome(_welcomeForms.default.loginForm);
      }
    });
  },
  register: () => {
    document.querySelector("#registerBtn").addEventListener("click", event => {
      _welcome.default.register();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7QUFDQTs7QUFDQTs7OztBQUpBO0FBTUEsaUJBQVEsT0FBUixDQUFnQixzQkFBYSxTQUE3Qjs7QUFDQSw2QkFBcUIsY0FBckI7O0FBQ0EsNkJBQXFCLGlCQUFyQixHLENBR0E7Ozs7Ozs7Ozs7QUNYQSxNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUQsRUFBTyxLQUFQLEtBQWlCO0FBQ2hDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsU0FBOUIsR0FBMEMsSUFBMUM7QUFDSCxDQUZEOztlQUllLFU7Ozs7Ozs7Ozs7O0FDSmY7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTtBQUVBLE1BQU0sT0FBTyxHQUFHO0FBQ1osRUFBQSxPQUFPLEVBQUcsSUFBRCxJQUFVO0FBQ2YsNkJBQVcsSUFBWCxFQUFpQixjQUFqQjtBQUNILEdBSFc7QUFJWixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1o7QUFDQSwrQkFBa0IsUUFBbEIsR0FDSyxJQURMLENBQ1UsU0FBUyxJQUFJO0FBQ2YsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVo7QUFDQSxZQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBVixDQUFjLElBQUksSUFBSTtBQUN2QyxlQUFPLElBQUksQ0FBQyxRQUFMLENBQWMsV0FBZCxFQUFQO0FBQ0gsT0FGb0IsQ0FBckI7QUFHQSxNQUFBLE9BQU8s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Ozs7Ozs7Ozs7Ozs7Ozs7O0tBREY7QUFrQmpCLEVBQUEsU0FBUyxFQUFHOzs7Ozs7Ozs7OztBQWxCSyxDQUFyQjtlQStCZSxZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IGV2ZW50c0FwaU1hbmFnZXIgZnJvbSBcIi4vZXZlbnRzL2V2ZW50c0FwaU1hbmFnZXJcIjtcclxuXHJcbmltcG9ydCB3ZWxjb21lIGZyb20gXCIuL3dlbGNvbWUvd2VsY29tZVwiO1xyXG5pbXBvcnQgd2VsY29tZUZvcm1zIGZyb20gXCIuL3dlbGNvbWUvd2VsY29tZUZvcm1zXCI7XHJcbmltcG9ydCB3ZWxjb21lRXZlbnRIYW5kbGVycyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXJcIlxyXG5cclxud2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbndlbGNvbWVFdmVudEhhbmRsZXJzLm5lZWRUb1JlZ2lzdGVyKClcclxud2VsY29tZUV2ZW50SGFuZGxlcnMuYWxyZWFkeVJlZ2lzdGVyZWQoKVxyXG5cclxuXHJcbi8vIGV2ZW50c0FwaU1hbmFnZXIociA9PiBjb25zb2xlLmxvZyhyKSkiLCJjb25zdCBwcmludFRvRE9NID0gKHdoYXQsIHdoZXJlKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdoZXJlKS5pbm5lckhUTUwgPSB3aGF0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VG9ET00iLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi9wcmludFRvRE9NXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcbmltcG9ydCB3ZWxjb21lQXBpTWFuYWdlciBmcm9tIFwiLi93ZWxjb21lQXBpTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZUV2ZW50SGFuZGxlclwiO1xyXG5cclxuY29uc3Qgd2VsY29tZSA9IHtcclxuICAgIHdlbGNvbWU6IChmb3JtKSA9PiB7XHJcbiAgICAgICAgcHJpbnRUb0RPTShmb3JtLCBcIiN3ZWxjb21lRm9ybVwiKVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgLy9HRVQgZXhpc3RpbmcgdXNlcnNcclxuICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5nZXRVc2VycygpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2Vyc0RhdGEpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxVc2VyTmFtZXMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJuYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhbGxVc2VyTmFtZXMpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxFbWFpbHMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmVtYWlsLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL2NhcHR1cmUgaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VyT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWxsRW1haWxzKVxyXG4gICAgICAgICAgICAgICAgLy9jb21wYXJlIHRvIG1ha2Ugc3VyZSBlbWFpbCBhbmQgdXNlcm5hbWUgYXJlIHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGFsbFVzZXJOYW1lcy5pbmNsdWRlcyhuZXdVc2VyT2JqZWN0LnVzZXJuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhpcyB1c2VybmFtZSBhbHJlYWR5IGV4aXN0cy5cIilcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fdXNlcm5hbWVcIikuc2VsZWN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydCBpZiBub3QgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFsbEVtYWlscy5pbmNsdWRlcyhuZXdVc2VyT2JqZWN0LmVtYWlsLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhlcmUgaXMgYWxyZWFkeSBhbiBhY2NvdW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGVtYWlsIGFkcmVzcy5cIilcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9lbWFpbFwiKS5mb2N1cygpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikuc2VsZWN0KClcclxuXHJcbiAgICAgICAgICAgICAgICAvL1BPU1QgbmV3IHVzZXIgb2JqZWN0IGlmIHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChgQWxsIGhhaWwgTG9yZCAke25ld1VzZXJPYmplY3QuZmlyc3RfbmFtZX0hISFgKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLnBvc3RVc2VycyhuZXdVc2VyT2JqZWN0KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgbmV3IHVzZXIgb2JqZWN0IGludG8gbG9naW4gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICAvL0dFVCB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIHZhbHVlcyBmcm9tIGlucHV0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9naW5Vc2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5fdXNlcm5hbWVcIilcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb21wYXJlIGlkIGFuZCBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgdXNlckRhdGEuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSAmJiB1c2VyLnBhc3N3b3JkID09PSBsb2dpblBhc3N3b3JkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaW5jb3JyZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiB2ZXJpZmllZCwgY2FwdHVyZSB1c2VySWQgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICAvL2dvIHRvIGRhc2hib2FyZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lIiwiY29uc3Qgd2VsY29tZUFwaU1hbmFnZXIgPSB7XHJcbiAgICBnZXRVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0VXNlcnM6IChuZXdVc2VyT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlck9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lQXBpTWFuYWdlciIsImltcG9ydCB3ZWxjb21lIGZyb20gXCIuL3dlbGNvbWVcIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lRm9ybXNcIjtcclxuXHJcbmNvbnN0IHdlbGNvbWVFdmVudEhhbmRsZXJzID0ge1xyXG4gICAgbmVlZFRvUmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJuZWVkVG9SZWdpc3RlclwiKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLnJlZ2lzdHJhdGlvbkZvcm0pXHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5yZWdpc3RlcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFscmVhZHlSZWdpc3RlcmVkOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwiYWxyZWFkeVJlZ2lzdGVyZWRcIikge1xyXG4gICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlckJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHdlbGNvbWUucmVnaXN0ZXIoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVFdmVudEhhbmRsZXJzIiwiY29uc3Qgd2VsY29tZUZvcm1zID0ge1xyXG4gICAgcmVnaXN0cmF0aW9uRm9ybTogYFxyXG4gICAgICAgIDxoMT5XZWxjb21lISBDcmVhdGUgYW4gYWNjb3VudC48L2gxPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIgaWQ9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fbGFzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZW1haWxcIiBpZD1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdGVyQnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj5cclxuICAgICAgICA8YSBpZD1cImFscmVhZHlSZWdpc3RlcmVkXCIgaHJlZj1cIiNcIj5BbHJlYWR5IEhhdmUgQW4gQWNjb3VudD88L2E+XHJcblxyXG4gICAgYCxcclxuICAgIGxvZ2luRm9ybTogYFxyXG4gICAgICAgIDxoMT5Mb2dpbjwvaDE+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJsb2dpbl91c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibG9naW5fdXNlcm5hbWVcIiBpZD1cImxvZ2luX3VzZXJuYW1lXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3Bhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsb2dpbl9wYXNzd29yZFwiIGlkPVwibG9naW5fcGFzc3dvcmRcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImxvZ2luQnRuXCI+TG9naW48L2J1dHRvbj5cclxuICAgICAgICA8YSBpZD1cIm5lZWRUb1JlZ2lzdGVyXCIgaHJlZj1cIiNcIj5Eb24ndCBIYXZlIEFuIEFjY291bnQ/PC9hPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lRm9ybXMiXX0=
