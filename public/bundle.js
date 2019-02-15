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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7OztBQUVBLGlCQUFRLE9BQVIsQ0FBZ0Isc0JBQWEsU0FBN0I7O0FBQ0EsNkJBQXFCLEdBQXJCOzs7Ozs7Ozs7O0FDTEEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFELEVBQU8sS0FBUCxLQUFpQjtBQUNoQyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLEVBQThCLFNBQTlCLEdBQTBDLElBQTFDO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7Ozs7OztBQ0pmOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFFQSxNQUFNLE9BQU8sR0FBRztBQUNaLEVBQUEsT0FBTyxFQUFHLElBQUQsSUFBVTtBQUNmLDZCQUFXLElBQVgsRUFBaUIsY0FBakI7QUFDSCxHQUhXO0FBSVosRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaO0FBQ0EsK0JBQWtCLFFBQWxCLEdBQ0ssSUFETCxDQUNVLFNBQVMsSUFBSTtBQUNmLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsWUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQVYsQ0FBYyxJQUFJLElBQUk7QUFDdkMsZUFBTyxJQUFJLENBQUMsUUFBTCxDQUFjLFdBQWQsRUFBUDtBQUNILE9BRm9CLENBQXJCO0FBR0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFlBQVo7QUFDQSxZQUFNLFNB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QVo7O0FBQ0EseUJBQVEsS0FBUjtBQUNIO0FBQ0osS0FORDtBQU9IO0FBdEN3QixDQUE3QjtlQXlDZSxvQjs7Ozs7Ozs7OztBQzVDZixNQUFNLFlBQVksR0FBRztBQUNqQixFQUFBLGdCQUFnQixFQUFHOzs7Ozs7Ozs7Ozs7Ozs7O0tBREY7QUFrQmpCLEVBQUEsU0FBUyxFQUFHOzs7Ozs7Ozs7OztBQWxCSyxDQUFyQjtlQStCZSxZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHdlbGNvbWUgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lRm9ybXNcIjtcclxuaW1wb3J0IHdlbGNvbWVFdmVudEhhbmRsZXJzIGZyb20gXCIuL3dlbGNvbWUvd2VsY29tZUV2ZW50SGFuZGxlclwiXHJcblxyXG53ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxud2VsY29tZUV2ZW50SGFuZGxlcnMuYWxsKClcclxuIiwiY29uc3QgcHJpbnRUb0RPTSA9ICh3aGF0LCB3aGVyZSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3aGVyZSkuaW5uZXJIVE1MID0gd2hhdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRE9NIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4vcHJpbnRUb0RPTVwiO1xyXG5pbXBvcnQgd2VsY29tZUZvcm1zIGZyb20gXCIuL3dlbGNvbWVGb3Jtc1wiO1xyXG5pbXBvcnQgd2VsY29tZUFwaU1hbmFnZXIgZnJvbSBcIi4vd2VsY29tZUFwaU1hbmFnZXJcIjtcclxuLy8gaW1wb3J0IHdlbGNvbWVFdmVudEhhbmRsZXJzIGZyb20gXCIuL3dlbGNvbWVFdmVudEhhbmRsZXJcIjtcclxuXHJcbmNvbnN0IHdlbGNvbWUgPSB7XHJcbiAgICB3ZWxjb21lOiAoZm9ybSkgPT4ge1xyXG4gICAgICAgIHByaW50VG9ET00oZm9ybSwgXCIjd2VsY29tZUZvcm1cIilcclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIC8vR0VUIGV4aXN0aW5nIHVzZXJzXHJcbiAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIuZ2V0VXNlcnMoKVxyXG4gICAgICAgICAgICAudGhlbih1c2Vyc0RhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlcnNEYXRhKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWxsVXNlck5hbWVzID0gdXNlcnNEYXRhLm1hcCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci51c2VybmFtZS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYWxsVXNlck5hbWVzKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYWxsRW1haWxzID0gdXNlcnNEYXRhLm1hcCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci5lbWFpbC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIGlucHV0IHZhbHVlc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VXNlck9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fdXNlcm5hbWVcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9wYXNzd29yZFwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFsbEVtYWlscylcclxuICAgICAgICAgICAgICAgIC8vY29tcGFyZSB0byBtYWtlIHN1cmUgZW1haWwgYW5kIHVzZXJuYW1lIGFyZSB1bmlxdWVcclxuICAgICAgICAgICAgICAgIGlmIChhbGxVc2VyTmFtZXMuaW5jbHVkZXMobmV3VXNlck9iamVjdC51c2VybmFtZS50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoaXMgdXNlcm5hbWUgYWxyZWFkeSBleGlzdHMuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fdXNlcm5hbWVcIikuZm9jdXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIpLnNlbGVjdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWxlcnQgaWYgbm90IHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxFbWFpbHMuaW5jbHVkZXMobmV3VXNlck9iamVjdC5lbWFpbC50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZXJlIGlzIGFscmVhZHkgYW4gYWNjb3VudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbWFpbCBhZHJlc3MuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikuZm9jdXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnNlbGVjdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vUE9TVCBuZXcgdXNlciBvYmplY3QgaWYgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBBbGwgaGFpbCBMb3JkICR7bmV3VXNlck9iamVjdC5maXJzdF9uYW1lfSEhIWApXHJcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIucG9zdFVzZXJzKG5ld1VzZXJPYmplY3QpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFzcyBuZXcgdXNlciBvYmplY3QgaW50byBsb2dpbiBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC50aGVuKHVzZXIgPT4gbG9naW4odXNlcikpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIC8vR0VUIHVzZXJzXHJcbiAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIuZ2V0VXNlcnMoKVxyXG4gICAgICAgICAgICAudGhlbih1c2VyRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NhcHR1cmUgdmFsdWVzIGZyb20gaW5wdXRzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb2dpblVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbl91c2VybmFtZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9naW5QYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5fcGFzc3dvcmRcIikudmFsdWVcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbXBhcmUgaWQgYW5kIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyVG9DaGVjayA9IHVzZXJEYXRhLmZpbmQodXNlciA9PiB1c2VyLnVzZXJuYW1lID09PSBsb2dpblVzZXJuYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJUb0NoZWNrID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIG9yIHBhc3N3b3JkIGluY29ycmVjdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyVG9DaGVjay5wYXNzd29yZCA9PT0gbG9naW5QYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIHVzZXJUb0NoZWNrLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWUuc2hvd0Rhc2hib2FyZCh1c2VyVG9DaGVjay5pZClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIilcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAvL2lmIHZlcmlmaWVkLCBjYXB0dXJlIHVzZXJJZCBpbiBzZXNzaW9uU3RvcmFnZVxyXG4gICAgICAgIC8vZ28gdG8gZGFzaGJvYXJkXHJcbiAgICB9LFxyXG4gICAgc2hvd0Rhc2hib2FyZDogKGFjdGl2ZVVzZXJJZCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnMvJHthY3RpdmVVc2VySWR9YClcclxuICAgICAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcclxuICAgICAgICAvL2FjdGl2YXRlIGVhY2ggY29tcG9uZW50cyBcInNob3cgb24gRE9NXCIgZnVuY3Rpb25cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZSIsImNvbnN0IHdlbGNvbWVBcGlNYW5hZ2VyID0ge1xyXG4gICAgZ2V0VXNlcnM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgcG9zdFVzZXJzOiAobmV3VXNlck9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld1VzZXJPYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUFwaU1hbmFnZXIiLCJpbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcblxyXG5jb25zdCB3ZWxjb21lRXZlbnRIYW5kbGVycyA9IHtcclxuICAgIGFsbDogKCkgPT4ge1xyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLm5lZWRUb1JlZ2lzdGVyKClcclxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5hbHJlYWR5UmVnaXN0ZXJlZCgpXHJcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMucmVnaXN0ZXIoKVxyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLmxvZ2luKClcclxuICAgIH0sXHJcbiAgICBuZWVkVG9SZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcIm5lZWRUb1JlZ2lzdGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHJlZ2lzdGVyZWQhIGdvaW5nIHRvIHJlZ2lzdHJhdGlvbiBzY3JlZW4uXCIpXHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLnJlZ2lzdHJhdGlvbkZvcm0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFscmVhZHlSZWdpc3RlcmVkOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwiYWxyZWFkeVJlZ2lzdGVyZWRcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IHJlZ2lzdGVyZWQhIGdvaW5nIHRvIGxvZ2luIHNjcmVlbi5cIilcclxuICAgICAgICAgICAgICAgIHdlbGNvbWUud2VsY29tZSh3ZWxjb21lRm9ybXMubG9naW5Gb3JtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInJlZ2lzdGVyQnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXIgYnV0dG9uIGNsaWNrZWQhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2shXCIpXHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW5CdG5cIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBidXR0b24gY2xpY2tlZCFcIilcclxuICAgICAgICAgICAgICAgIHdlbGNvbWUubG9naW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUV2ZW50SGFuZGxlcnMiLCJjb25zdCB3ZWxjb21lRm9ybXMgPSB7XHJcbiAgICByZWdpc3RyYXRpb25Gb3JtOiBgXHJcbiAgICAgICAgPGgxPldlbGNvbWUhIENyZWF0ZSBhbiBhY2NvdW50LjwvaDE+XHJcblxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl91c2VybmFtZVwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBpZD1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIkZpcnN0IE5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIgcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIj5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIGlkPVwicmVnaXN0cmF0aW9uX2VtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGlkPVwicmVnaXN0ZXJCdG5cIj5SZWdpc3RlcjwvYnV0dG9uPlxyXG4gICAgICAgIDxhIGlkPVwiYWxyZWFkeVJlZ2lzdGVyZWRcIiBocmVmPVwiI1wiPkFscmVhZHkgSGF2ZSBBbiBBY2NvdW50PzwvYT5cclxuXHJcbiAgICBgLFxyXG4gICAgbG9naW5Gb3JtOiBgXHJcbiAgICAgICAgPGgxPkxvZ2luPC9oMT5cclxuXHJcbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3VzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJsb2dpbl91c2VybmFtZVwiIGlkPVwibG9naW5fdXNlcm5hbWVcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW5fcGFzc3dvcmRcIj5QYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJsb2dpbl9wYXNzd29yZFwiIGlkPVwibG9naW5fcGFzc3dvcmRcIj5cclxuXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImxvZ2luQnRuXCI+TG9naW48L2J1dHRvbj5cclxuICAgICAgICA8YSBpZD1cIm5lZWRUb1JlZ2lzdGVyXCIgaHJlZj1cIiNcIj5Eb24ndCBIYXZlIEFuIEFjY291bnQ/PC9hPlxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lRm9ybXMiXX0=
