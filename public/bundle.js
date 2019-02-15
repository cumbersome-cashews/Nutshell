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
        password: document.querySelector("#registration_password").value //compare to make sure email and username are unique

      };

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

        _welcomeApiManager.default.postUsers(newUserObject).then(user => {
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
        console.log("already registered! going to login screen.");

        _welcome.default.welcome(_welcomeForms.default.loginForm);
      }
    });
  },
  register: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      if (event.target.id === "registerBtn") {
        console.log("register button clicked!");
      }
    });
  },
  login: () => {
    document.querySelector("#welcomeForm").addEventListener("click", event => {
      console.log("click!");

      if (event.target.id === "loginBtn") {
        console.log("login button clicked!");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7OztBQUVBLGlCQUFRLE9BQVIsQ0FBZ0Isc0JBQWEsU0FBN0I7O0FBQ0EsNkJBQXFCLEdBQXJCOzs7Ozs7Ozs7O0FDTEEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFELEVBQU8sS0FBUCxLQUFpQjtBQUNoQyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLEVBQThCLFNBQTlCLEdBQTBDLElBQTFDO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7Ozs7OztBQ0pmOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFFQSxNQUFNLE9BQU8sR0FBRztBQUNaLEVBQUEsT0FBTyxFQUFHLElBQUQsSUFBVTtBQUNmLDZCQUFXLElBQVgsRUFBaUIsY0FBakI7QUFDSCxHQUhXO0FBSVosRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaO0FBQ0EsK0JBQWtCLFFBQWxCLEdBQ0ssSUFETCxDQUNVLFNBQVMsSUFBSTtBQUNmLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsWUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQVYsQ0FBYyxJQUFJLElBQUk7QUFDdkMsZUFBTyxJQUFJLENBQUMsUUFBTCxDQUFjLFdBQWQsRUFBUDtBQUNILE9BRm9CLENBQXJCO0FBR0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVo7QUFDQSxZQUFNLFNB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LENBQUMsR0FBUixDQUFZLFFBQVo7O0FBQ0EsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsVUFBeEIsRUFBb0M7QUFDaEMsUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHVCQUFaOztBQUNBLHlCQUFRLEtBQVI7QUFDSDtBQUNKLEtBTkQ7QUFPSDtBQXRDd0IsQ0FBN0I7ZUF5Q2Usb0I7Ozs7Ozs7Ozs7QUM1Q2YsTUFBTSxZQUFZLEdBQUc7QUFDakIsRUFBQSxnQkFBZ0IsRUFBRzs7Ozs7Ozs7Ozs7Ozs7OztLQURGO0FBa0JqQixFQUFBLFNBQVMsRUFBRzs7Ozs7Ozs7Ozs7QUFsQkssQ0FBckI7ZUErQmUsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB3ZWxjb21lIGZyb20gXCIuL3dlbGNvbWUvd2VsY29tZVwiO1xyXG5pbXBvcnQgd2VsY29tZUZvcm1zIGZyb20gXCIuL3dlbGNvbWUvd2VsY29tZUZvcm1zXCI7XHJcbmltcG9ydCB3ZWxjb21lRXZlbnRIYW5kbGVycyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXJcIlxyXG5cclxud2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbndlbGNvbWVFdmVudEhhbmRsZXJzLmFsbCgpXHJcbiIsImNvbnN0IHByaW50VG9ET00gPSAod2hhdCwgd2hlcmUpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod2hlcmUpLmlubmVySFRNTCA9IHdoYXRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RPTSIsImltcG9ydCBwcmludFRvRE9NIGZyb20gXCIuL3ByaW50VG9ET01cIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lRm9ybXNcIjtcclxuaW1wb3J0IHdlbGNvbWVBcGlNYW5hZ2VyIGZyb20gXCIuL3dlbGNvbWVBcGlNYW5hZ2VyXCI7XHJcbi8vIGltcG9ydCB3ZWxjb21lRXZlbnRIYW5kbGVycyBmcm9tIFwiLi93ZWxjb21lRXZlbnRIYW5kbGVyXCI7XHJcblxyXG5jb25zdCB3ZWxjb21lID0ge1xyXG4gICAgd2VsY29tZTogKGZvcm0pID0+IHtcclxuICAgICAgICBwcmludFRvRE9NKGZvcm0sIFwiI3dlbGNvbWVGb3JtXCIpXHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICAvL0dFVCBleGlzdGluZyB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlcnNEYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXJzRGF0YSlcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbFVzZXJOYW1lcyA9IHVzZXJzRGF0YS5tYXAodXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIudXNlcm5hbWUudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbFVzZXJOYW1lcylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbEVtYWlscyA9IHVzZXJzRGF0YS5tYXAodXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIuZW1haWwudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vY2FwdHVyZSBpbnB1dCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1VzZXJPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fbGFzdE5hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9lbWFpbFwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fcGFzc3dvcmRcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbXBhcmUgdG8gbWFrZSBzdXJlIGVtYWlsIGFuZCB1c2VybmFtZSBhcmUgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsVXNlck5hbWVzLmluY2x1ZGVzKG5ld1VzZXJPYmplY3QudXNlcm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGlzIHVzZXJuYW1lIGFscmVhZHkgZXhpc3RzLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIpLmZvY3VzKClcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS5zZWxlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0IGlmIG5vdCB1bmlxdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYWxsRW1haWxzLmluY2x1ZGVzKG5ld1VzZXJPYmplY3QuZW1haWwudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGFjY291bnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZW1haWwgYWRyZXNzLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLmZvY3VzKClcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9lbWFpbFwiKS5zZWxlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL1BPU1QgbmV3IHVzZXIgb2JqZWN0IGlmIHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChgQWxsIGhhaWwgTG9yZCAke25ld1VzZXJPYmplY3QuZmlyc3RfbmFtZX0hISFgKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLnBvc3RVc2VycyhuZXdVc2VyT2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlci5pZCl9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgbmV3IHVzZXIgb2JqZWN0IGludG8gbG9naW4gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICAvL0dFVCB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIHZhbHVlcyBmcm9tIGlucHV0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9naW5Vc2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5fdXNlcm5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb21wYXJlIGlkIGFuZCBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlclRvQ2hlY2sgPSB1c2VyRGF0YS5maW5kKHVzZXIgPT4gdXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSlcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyVG9DaGVjayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIilcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlclRvQ2hlY2sucGFzc3dvcmQgPT09IGxvZ2luUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCB1c2VyVG9DaGVjay5pZClcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlclRvQ2hlY2suaWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaW5jb3JyZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiB2ZXJpZmllZCwgY2FwdHVyZSB1c2VySWQgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICAvL2dvIHRvIGRhc2hib2FyZFxyXG4gICAgfSxcclxuICAgIHNob3dEYXNoYm9hcmQ6IChhY3RpdmVVc2VySWQpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzLyR7YWN0aXZlVXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSkpXHJcbiAgICAgICAgLy9hY3RpdmF0ZSBlYWNoIGNvbXBvbmVudHMgXCJzaG93IG9uIERPTVwiIGZ1bmN0aW9uXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWUiLCJjb25zdCB3ZWxjb21lQXBpTWFuYWdlciA9IHtcclxuICAgIGdldFVzZXJzOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHBvc3RVc2VyczogKG5ld1VzZXJPYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShuZXdVc2VyT2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVBcGlNYW5hZ2VyIiwiaW1wb3J0IHdlbGNvbWUgZnJvbSBcIi4vd2VsY29tZVwiO1xyXG5pbXBvcnQgd2VsY29tZUZvcm1zIGZyb20gXCIuL3dlbGNvbWVGb3Jtc1wiO1xyXG5cclxuY29uc3Qgd2VsY29tZUV2ZW50SGFuZGxlcnMgPSB7XHJcbiAgICBhbGw6ICgpID0+IHtcclxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5uZWVkVG9SZWdpc3RlcigpXHJcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMuYWxyZWFkeVJlZ2lzdGVyZWQoKVxyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLnJlZ2lzdGVyKClcclxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5sb2dpbigpXHJcbiAgICB9LFxyXG4gICAgbmVlZFRvUmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJuZWVkVG9SZWdpc3RlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCByZWdpc3RlcmVkISBnb2luZyB0byByZWdpc3RyYXRpb24gc2NyZWVuLlwiKVxyXG4gICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5yZWdpc3RyYXRpb25Gb3JtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhbHJlYWR5UmVnaXN0ZXJlZDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFscmVhZHlSZWdpc3RlcmVkXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSByZWdpc3RlcmVkISBnb2luZyB0byBsb2dpbiBzY3JlZW4uXCIpXHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWdpc3RlckJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyIGJ1dHRvbiBjbGlja2VkIVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrIVwiKVxyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImxvZ2luQnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gYnV0dG9uIGNsaWNrZWQhXCIpXHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLmxvZ2luKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVFdmVudEhhbmRsZXJzIiwiY29uc3Qgd2VsY29tZUZvcm1zID0ge1xyXG4gICAgcmVnaXN0cmF0aW9uRm9ybTogYFxyXG4gICAgICAgIDxoMT5XZWxjb21lISBDcmVhdGUgYW4gYWNjb3VudC48L2gxPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIgaWQ9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fZmlyc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJGaXJzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fbGFzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fZW1haWxcIiBpZD1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInJlZ2lzdGVyQnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj5cclxuICAgICAgICA8YSBpZD1cImFscmVhZHlSZWdpc3RlcmVkXCIgaHJlZj1cIiNcIj5BbHJlYWR5IEhhdmUgQW4gQWNjb3VudD88L2E+XHJcblxyXG4gICAgYCxcclxuICAgIGxvZ2luRm9ybTogYFxyXG4gICAgICAgIDxoMT5Mb2dpbjwvaDE+XHJcblxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJsb2dpbl91c2VybmFtZVwiPlVzZXJuYW1lPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibG9naW5fdXNlcm5hbWVcIiBpZD1cImxvZ2luX3VzZXJuYW1lXCI+XHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3Bhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwibG9naW5fcGFzc3dvcmRcIiBpZD1cImxvZ2luX3Bhc3N3b3JkXCI+XHJcblxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJsb2dpbkJ0blwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPGEgaWQ9XCJuZWVkVG9SZWdpc3RlclwiIGhyZWY9XCIjXCI+RG9uJ3QgSGF2ZSBBbiBBY2NvdW50PzwvYT5cclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUZvcm1zIl19
