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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFDQTs7OztBQUVBLGlCQUFRLE9BQVIsQ0FBZ0Isc0JBQWEsU0FBN0I7O0FBQ0EsNkJBQXFCLEdBQXJCOzs7Ozs7Ozs7O0FDTEEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFELEVBQU8sS0FBUCxLQUFpQjtBQUNoQyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLEVBQThCLFNBQTlCLEdBQTBDLElBQTFDO0FBQ0gsQ0FGRDs7ZUFJZSxVOzs7Ozs7Ozs7OztBQ0pmOztBQUNBOztBQUNBOzs7O0FBQ0E7QUFFQSxNQUFNLE9BQU8sR0FBRztBQUNaLEVBQUEsT0FBTyxFQUFHLElBQUQsSUFBVTtBQUNmLDZCQUFXLElBQVgsRUFBaUIsY0FBakI7QUFDSCxHQUhXO0FBSVosRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaO0FBQ0EsK0JBQWtCLFFBQWxCLEdBQ0ssSUFETCxDQUNVLFNBQVMsSUFBSTtBQUNmLFlBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxHQUFWLENBQWMsSUFBSSxJQUFJO0FBQ3ZDLGVBQU8sSUFBSSxDQUFDLFFBQUwsQ0FBYyxXQUFkLEVBQVA7QUFDSCxPQUZvQixDQUFyQjtBQUdBLFlBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFWLENBQWMsSUFBSSxJQUFJO0FBQ3BDLGVBQU8sSUFBSSxDQUFDLEtBQUwsQ0FBVyxX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LEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixVQUF4QixFQUFvQztBQUNoQyx5QkFBUSxLQUFSO0FBQ0g7QUFDSixLQUpEO0FBS0g7QUFuQ3dCLENBQTdCO2VBc0NlLG9COzs7Ozs7Ozs7O0FDekNmLE1BQU0sWUFBWSxHQUFHO0FBQ2pCLEVBQUEsZ0JBQWdCLEVBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7S0FERjtBQWtCakIsRUFBQSxTQUFTLEVBQUc7Ozs7Ozs7Ozs7O0FBbEJLLENBQXJCO2VBK0JlLFkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVcIjtcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lRm9ybXNcIjtcbmltcG9ydCB3ZWxjb21lRXZlbnRIYW5kbGVycyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXJcIlxuXG53ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcbndlbGNvbWVFdmVudEhhbmRsZXJzLmFsbCgpXG4iLCJjb25zdCBwcmludFRvRE9NID0gKHdoYXQsIHdoZXJlKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3aGVyZSkuaW5uZXJIVE1MID0gd2hhdFxufVxuXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRE9NIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4vcHJpbnRUb0RPTVwiO1xuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lRm9ybXNcIjtcbmltcG9ydCB3ZWxjb21lQXBpTWFuYWdlciBmcm9tIFwiLi93ZWxjb21lQXBpTWFuYWdlclwiO1xuLy8gaW1wb3J0IHdlbGNvbWVFdmVudEhhbmRsZXJzIGZyb20gXCIuL3dlbGNvbWVFdmVudEhhbmRsZXJcIjtcblxuY29uc3Qgd2VsY29tZSA9IHtcbiAgICB3ZWxjb21lOiAoZm9ybSkgPT4ge1xuICAgICAgICBwcmludFRvRE9NKGZvcm0sIFwiI3dlbGNvbWVGb3JtXCIpXG4gICAgfSxcbiAgICByZWdpc3RlcjogKCkgPT4ge1xuICAgICAgICAvL0dFVCBleGlzdGluZyB1c2Vyc1xuICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5nZXRVc2VycygpXG4gICAgICAgICAgICAudGhlbih1c2Vyc0RhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFsbFVzZXJOYW1lcyA9IHVzZXJzRGF0YS5tYXAodXNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJuYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IGFsbEVtYWlscyA9IHVzZXJzRGF0YS5tYXAodXNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmVtYWlsLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vY2FwdHVyZSBpbnB1dCB2YWx1ZXNcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VyT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9maXJzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fbGFzdE5hbWVcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fcGFzc3dvcmRcIikudmFsdWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB1c2VybmFtZSBpcyB1bmlxdWUsIGFsZXJ0IGlmIG5vdCB1bmlxdWVcbiAgICAgICAgICAgICAgICBpZiAoYWxsVXNlck5hbWVzLmluY2x1ZGVzKG5ld1VzZXJPYmplY3QudXNlcm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiVGhpcyB1c2VybmFtZSBhbHJlYWR5IGV4aXN0cy5cIilcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fdXNlcm5hbWVcIikuZm9jdXMoKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS5zZWxlY3QoKVxuXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgZW1haWwgaXMgdW5pcXVlLCBhbGVydCBpZiBub3QgdW5pcXVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxFbWFpbHMuaW5jbHVkZXMobmV3VXNlck9iamVjdC5lbWFpbC50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGFjY291bnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZW1haWwgYWRyZXNzLlwiKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl9lbWFpbFwiKS5mb2N1cygpXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnNlbGVjdCgpXG5cbiAgICAgICAgICAgICAgICAvL1BPU1QgbmV3IHVzZXIgb2JqZWN0IGlmIHVuaXF1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBBbGwgaGFpbCBMb3JkICR7bmV3VXNlck9iamVjdC5maXJzdF9uYW1lfSEhIWApXG4gICAgICAgICAgICAgICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLnBvc3RVc2VycyhuZXdVc2VyT2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwb3N0ZWQhXCIsIHVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZVVzZXJcIiwgdXNlci5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlci5pZCl9KVxuXG4gICAgICAgICAgICAgICAgICAgIC8vcGFzcyBuZXcgdXNlciBvYmplY3QgaW50byBsb2dpbiBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cblxuICAgIH0sXG4gICAgbG9naW46ICgpID0+IHtcbiAgICAgICAgLy9HRVQgdXNlcnNcbiAgICAgICAgd2VsY29tZUFwaU1hbmFnZXIuZ2V0VXNlcnMoKVxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIC8vY2FwdHVyZSB2YWx1ZXMgZnJvbSBpbnB1dHNcbiAgICAgICAgICAgICAgICBjb25zdCBsb2dpblVzZXJuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbl91c2VybmFtZVwiKS52YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbHVlXG5cbiAgICAgICAgICAgICAgICAvL2NvbXBhcmUgaWQgYW5kIHBhc3N3b3JkXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlclRvQ2hlY2sgPSB1c2VyRGF0YS5maW5kKHVzZXIgPT4gdXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSlcbiAgICAgICAgICAgICAgICBpZiAodXNlclRvQ2hlY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlVzZXJuYW1lIG9yIHBhc3N3b3JkIGluY29ycmVjdFwiKVxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXJUb0NoZWNrLnBhc3N3b3JkID09PSBsb2dpblBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIHVzZXJUb0NoZWNrLmlkKVxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlclRvQ2hlY2suaWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIilcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLy9pZiB2ZXJpZmllZCwgY2FwdHVyZSB1c2VySWQgaW4gc2Vzc2lvblN0b3JhZ2VcbiAgICAgICAgLy9nbyB0byBkYXNoYm9hcmRcbiAgICB9LFxuICAgIHNob3dEYXNoYm9hcmQ6IChhY3RpdmVVc2VySWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYWN0aXZlVXNlcklkKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycy8ke2FjdGl2ZVVzZXJJZH1gKVxuICAgICAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSkpXG4gICAgICAgIC8vYWN0aXZhdGUgZWFjaCBjb21wb25lbnRzIFwic2hvdyBvbiBET01cIiBmdW5jdGlvblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZSIsImNvbnN0IHdlbGNvbWVBcGlNYW5hZ2VyID0ge1xuICAgIGdldFVzZXJzOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfSxcbiAgICBwb3N0VXNlcnM6IChuZXdVc2VyT2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlck9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lQXBpTWFuYWdlciIsImltcG9ydCB3ZWxjb21lIGZyb20gXCIuL3dlbGNvbWVcIjtcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XG5cbmNvbnN0IHdlbGNvbWVFdmVudEhhbmRsZXJzID0ge1xuICAgIGFsbDogKCkgPT4ge1xuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5uZWVkVG9SZWdpc3RlcigpXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLmFscmVhZHlSZWdpc3RlcmVkKClcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMucmVnaXN0ZXIoKVxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5sb2dpbigpXG4gICAgfSxcbiAgICBuZWVkVG9SZWdpc3RlcjogKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibmVlZFRvUmVnaXN0ZXJcIikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHJlZ2lzdGVyZWQhIGdvaW5nIHRvIHJlZ2lzdHJhdGlvbiBzY3JlZW4uXCIpXG4gICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5yZWdpc3RyYXRpb25Gb3JtKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYWxyZWFkeVJlZ2lzdGVyZWQ6ICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFscmVhZHlSZWdpc3RlcmVkXCIpIHtcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJyZWdpc3RlckJ0blwiKSB7XG4gICAgICAgICAgICAgICAgd2VsY29tZS5yZWdpc3RlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBsb2dpbjogKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlbGNvbWVGb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW5CdG5cIikge1xuICAgICAgICAgICAgICAgIHdlbGNvbWUubG9naW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUV2ZW50SGFuZGxlcnMiLCJjb25zdCB3ZWxjb21lRm9ybXMgPSB7XG4gICAgcmVnaXN0cmF0aW9uRm9ybTogYFxuICAgICAgICA8aDE+V2VsY29tZSEgQ3JlYXRlIGFuIGFjY291bnQuPC9oMT5cblxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fdXNlcm5hbWVcIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCI+XG5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fcGFzc3dvcmRcIiBpZD1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIj5cblxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPlxuXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJyZWdpc3RyYXRpb25fbGFzdE5hbWVcIiBpZD1cInJlZ2lzdHJhdGlvbl9sYXN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiTGFzdCBOYW1lXCI+XG5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9lbWFpbFwiIGlkPVwicmVnaXN0cmF0aW9uX2VtYWlsXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiPlxuXG4gICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RlckJ0blwiPlJlZ2lzdGVyPC9idXR0b24+XG4gICAgICAgIDxhIGlkPVwiYWxyZWFkeVJlZ2lzdGVyZWRcIiBocmVmPVwiI1wiPkFscmVhZHkgSGF2ZSBBbiBBY2NvdW50PzwvYT5cblxuICAgIGAsXG4gICAgbG9naW5Gb3JtOiBgXG4gICAgICAgIDxoMT5Mb2dpbjwvaDE+XG5cbiAgICAgICAgPGxhYmVsIGZvcj1cImxvZ2luX3VzZXJuYW1lXCI+VXNlcm5hbWU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibG9naW5fdXNlcm5hbWVcIiBpZD1cImxvZ2luX3VzZXJuYW1lXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJsb2dpbl9wYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJsb2dpbl9wYXNzd29yZFwiIGlkPVwibG9naW5fcGFzc3dvcmRcIj5cblxuICAgICAgICA8YnV0dG9uIGlkPVwibG9naW5CdG5cIj5Mb2dpbjwvYnV0dG9uPlxuICAgICAgICA8YSBpZD1cIm5lZWRUb1JlZ2lzdGVyXCIgaHJlZj1cIiNcIj5Eb24ndCBIYXZlIEFuIEFjY291bnQ/PC9hPlxuICAgIGBcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUZvcm1zIl19
