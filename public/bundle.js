(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _welcome = _interopRequireDefault(require("./welcome/welcome"));

var _welcomeForms = _interopRequireDefault(require("./welcome/welcomeForms"));

var _welcomeEventHandler = _interopRequireDefault(require("./welcome/welcomeEventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_welcome.default.welcome(_welcomeForms.default.loginForm);

_welcomeEventHandler.default.all();

},{"./welcome/welcome":3,"./welcome/welcomeEventHandler":5,"./welcome/welcomeForms":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
<<<<<<< HEAD
const eventApiManager = {
  getEvents: () => {
    return fetch("http://localhost:8088/events").then(res => res.json());
  }
};
var _default = eventApiManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
=======

const printToDOM = (what, where) => {
  document.querySelector(where).innerHTML = what;
};

var _default = printToDOM;
exports.default = _default;

},{}],3:[function(require,module,exports){
>>>>>>> master
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

<<<<<<< HEAD
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
=======
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
      const allUserNames = usersData.map(user => {
        return user.username.toLowerCase();
      });
      const allEmails = usersData.map(user => {
        return user.email.toLowerCase();
      }); //capture input values

      const newUserObject = {
        first_name: document.querySelector("#registration_firstName").value,
        last_name: document.querySelector("#registration_lastName").value,
        username: document.querySelector("#registration_username").value,
        email: document.querySelector("#registration_email").value,
        password: document.querySelector("#registration_password").value // check if username is unique, alert if not unique

      };

      if (allUserNames.includes(newUserObject.username.toLowerCase())) {
        window.alert("This username already exists.");
        document.querySelector("#registration_username").focus();
        document.querySelector("#registration_username").select(); // check if email is unique, alert if not unique
      } else if (allEmails.includes(newUserObject.email.toLowerCase())) {
        window.alert("There is already an account associated with this email adress.");
        document.querySelector("#registration_email").focus();
        document.querySelector("#registration_email").select(); //POST new user object if unique
      } else {
        alert(`All hail Lord ${newUserObject.first_name}!!!`);

        _welcomeApiManager.default.postUsers(newUserObject).then(user => {
          console.log("posted!", user);
          sessionStorage.setItem("activeUser", user.id);
          welcome.showDashboard(user.id);
        }); //pass new user object into login function
        // .then(user => login(user))

      }
    });
  },
  login: () => {
    //GET users
    _welcomeApiManager.default.getUsers().then(userData => {
      //capture values from inputs
      const loginUsername = document.querySelector("#login_username").value;
      const loginPassword = document.querySelector("#login_password").value; //compare id and password

      const userToCheck = userData.find(user => user.username === loginUsername);

      if (userToCheck === undefined) {
        alert("Username or password incorrect");
        welcome.welcome(_welcomeForms.default.loginForm);
      } else if (userToCheck.password === loginPassword) {
        sessionStorage.setItem("activeUser", userToCheck.id);
        welcome.showDashboard(userToCheck.id);
      } else {
        alert("Username or password incorrect");
        welcome.welcome(_welcomeForms.default.loginForm);
      }
    }); //if verified, capture userId in sessionStorage
    //go to dashboard

  },
  showDashboard: activeUserId => {
    console.log(activeUserId);
    document.querySelector("#welcomeForm").innerHTML = "";
    fetch(`http://localhost:8088/users/${activeUserId}`).then(r => r.json()).then(data => console.log(data)); //activate each components "show on DOM" function
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
    }).then(res => res.json());
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
  all: () => {
    welcomeEventHandlers.needToRegister();
    welcomeEventHandlers.alreadyRegistered();
    welcomeEventHandlers.register();
    welcomeEventHandlers.login();
  },
  needToRegister: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "needToRegister") {
        console.log("not registered! going to registration screen.");

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
  },
  register: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "registerBtn") {
        _welcome.default.register();
      }
    });
  },
  login: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "loginBtn") {
        _welcome.default.login();
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
        <input type="password" name="login_password" id="login_password">

        <button id="loginBtn">Login</button>
        <a id="needToRegister" href="#">Don't Have An Account?</a>
    `
};
var _default = welcomeForms;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7OztBQUVBLGlCQUFRLE9BQVIsQ0FBZ0Isc0JBQWEsU0FBN0I7O0FBQ0EsNkJBQXFCLEdBQXJCOzs7Ozs7Ozs7O0FDTEEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFELEVBQU8sS0FBUCxLQUFpQjtBQUNoQyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLEVBQThCLFNBQTlCLEdBQTBDLElBQTFDO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7Ozs7OztBQ0pmOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFFQSxNQUFNLE9BQU8sR0FBRztBQUNaLEVBQUEsT0FBTyxFQUFHLElBQUQsSUFBVTtBQUNmLDZCQUFXLElBQVgsRUFBaUIsY0FBakI7QUFDSCxHQUhXO0FBSVosRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaO0FBQ0EsK0JBQWtCLFFBQWxCLEdBQ0ssSUFETCxDQUNVLFNBQVMsSUFBSTtBQUNmLFlBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFWLENBQWMsSUFBSSxJQUFJO0FBQ3ZDLGVBQU8sSUFBSSxDQUFDLFFBQUwsQ0FBYyxXQUFkLEVBQVA7QUFDSCxPQUZvQixDQUFyQjtBQUdBLFlBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFWLENBQWMsSUFBSSxJQUFJO0FBQ3BDLGVBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxX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LEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixVQUF4QixFQUFvQztBQUNoQyx5QkFBUSxLQUFSO0FBQ0g7QUFDSixLQUpEO0FBS0g7QUFuQ3dCLENBQTdCO2VBc0NlLG9COzs7Ozs7Ozs7O0FDekNmLE1BQU0sWUFBWSxHQUFHO0FBQ2pCLEVBQUEsZ0JBQWdCLEVBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7S0FERjtBQWtCakIsRUFBQSxTQUFTLEVBQUc7Ozs7Ozs7Ozs7O0FBbEJLLENBQXJCO2VBK0JlLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVcIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVGb3Jtc1wiO1xyXG5pbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lRXZlbnRIYW5kbGVyXCJcclxuXHJcbndlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG53ZWxjb21lRXZlbnRIYW5kbGVycy5hbGwoKVxyXG4iLCJjb25zdCBwcmludFRvRE9NID0gKHdoYXQsIHdoZXJlKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdoZXJlKS5pbm5lckhUTUwgPSB3aGF0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VG9ET00iLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi9wcmludFRvRE9NXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcbmltcG9ydCB3ZWxjb21lQXBpTWFuYWdlciBmcm9tIFwiLi93ZWxjb21lQXBpTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZUV2ZW50SGFuZGxlclwiO1xyXG5cclxuY29uc3Qgd2VsY29tZSA9IHtcclxuICAgIHdlbGNvbWU6IChmb3JtKSA9PiB7XHJcbiAgICAgICAgcHJpbnRUb0RPTShmb3JtLCBcIiN3ZWxjb21lRm9ybVwiKVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgLy9HRVQgZXhpc3RpbmcgdXNlcnNcclxuICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5nZXRVc2VycygpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxVc2VyTmFtZXMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJuYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxFbWFpbHMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmVtYWlsLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL2NhcHR1cmUgaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VyT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdXNlcm5hbWUgaXMgdW5pcXVlLCBhbGVydCBpZiBub3QgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsVXNlck5hbWVzLmluY2x1ZGVzKG5ld1VzZXJPYmplY3QudXNlcm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGlzIHVzZXJuYW1lIGFscmVhZHkgZXhpc3RzLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIpLmZvY3VzKClcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS5zZWxlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGVtYWlsIGlzIHVuaXF1ZSwgYWxlcnQgaWYgbm90IHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxFbWFpbHMuaW5jbHVkZXMobmV3VXNlck9iamVjdC5lbWFpbC50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZXJlIGlzIGFscmVhZHkgYW4gYWNjb3VudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbWFpbCBhZHJlc3MuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikuZm9jdXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnNlbGVjdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLy9QT1NUIG5ldyB1c2VyIG9iamVjdCBpZiB1bmlxdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoYEFsbCBoYWlsIExvcmQgJHtuZXdVc2VyT2JqZWN0LmZpcnN0X25hbWV9ISEhYClcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5wb3N0VXNlcnMobmV3VXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvc3RlZCFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlci5pZCl9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgbmV3IHVzZXIgb2JqZWN0IGludG8gbG9naW4gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICAvL0dFVCB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIHZhbHVlcyBmcm9tIGlucHV0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9naW5Vc2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5fdXNlcm5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb21wYXJlIGlkIGFuZCBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlclRvQ2hlY2sgPSB1c2VyRGF0YS5maW5kKHVzZXIgPT4gdXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSlcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyVG9DaGVjayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIilcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlclRvQ2hlY2sucGFzc3dvcmQgPT09IGxvZ2luUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCB1c2VyVG9DaGVjay5pZClcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlclRvQ2hlY2suaWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaW5jb3JyZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiB2ZXJpZmllZCwgY2FwdHVyZSB1c2VySWQgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICAvL2dvIHRvIGRhc2hib2FyZFxyXG4gICAgfSxcclxuICAgIHNob3dEYXNoYm9hcmQ6IChhY3RpdmVVc2VySWQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVVc2VySWQpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycy8ke2FjdGl2ZVVzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpKVxyXG4gICAgICAgIC8vYWN0aXZhdGUgZWFjaCBjb21wb25lbnRzIFwic2hvdyBvbiBET01cIiBmdW5jdGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lIiwiY29uc3Qgd2VsY29tZUFwaU1hbmFnZXIgPSB7XHJcbiAgICBnZXRVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0VXNlcnM6IChuZXdVc2VyT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlck9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lQXBpTWFuYWdlciIsImltcG9ydCB3ZWxjb21lIGZyb20gXCIuL3dlbGNvbWVcIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lRm9ybXNcIjtcclxuXHJcbmNvbnN0IHdlbGNvbWVFdmVudEhhbmRsZXJzID0ge1xyXG4gICAgYWxsOiAoKSA9PiB7XHJcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMubmVlZFRvUmVnaXN0ZXIoKVxyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLmFscmVhZHlSZWdpc3RlcmVkKClcclxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5yZWdpc3RlcigpXHJcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMubG9naW4oKVxyXG4gICAgfSxcclxuICAgIG5lZWRUb1JlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibmVlZFRvUmVnaXN0ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgcmVnaXN0ZXJlZCEgZ29pbmcgdG8gcmVnaXN0cmF0aW9uIHNjcmVlbi5cIilcclxuICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMucmVnaXN0cmF0aW9uRm9ybSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWxyZWFkeVJlZ2lzdGVyZWQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJhbHJlYWR5UmVnaXN0ZXJlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWdpc3RlckJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLnJlZ2lzdGVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJsb2dpbkJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLmxvZ2luKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVFdmVudEhhbmRsZXJzIiwiY29uc3Qgd2VsY29tZUZvcm1zID0ge1xyXG4gICAgcmVnaXN0cmF0aW9uRm9ybTogYFxyXG4gICAgICAgIDxoMT5XZWxjb21lISBDcmVhdGUgYW4gYWNjb3VudC48L2gxPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIgaWQ9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fbGFzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZW1haWxcIiBpZD1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdGVyQnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj5cclxuICAgICAgICA8YSBpZD1cImFscmVhZHlSZWdpc3RlcmVkXCIgaHJlZj1cIiNcIj5BbHJlYWR5IEhhdmUgQW4gQWNjb3VudD88L2E+XHJcblxyXG4gICAgYCxcclxuICAgIGxvZ2luRm9ybTogYFxyXG4gICAgICAgIDxoMT5Mb2dpbjwvaDE+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJsb2dpbl91c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibG9naW5fdXNlcm5hbWVcIiBpZD1cImxvZ2luX3VzZXJuYW1lXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3Bhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwibG9naW5fcGFzc3dvcmRcIiBpZD1cImxvZ2luX3Bhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJsb2dpbkJ0blwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPGEgaWQ9XCJuZWVkVG9SZWdpc3RlclwiIGhyZWY9XCIjXCI+RG9uJ3QgSGF2ZSBBbiBBY2NvdW50PzwvYT5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUZvcm1zIl19
>>>>>>> master
