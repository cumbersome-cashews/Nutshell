(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const addToDOM = element => {
  const output = document.querySelector("#message_output_container");
  output.appendChild(element);
};

var _default = addToDOM;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const clearChildren = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

var _default = clearChildren;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const createHTML = {
  createObjectHTML: message => {
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", `${message.id}`);
    const name = document.createElement("span");
    name.setAttribute("class", `user--${message.user.id}`);
    const nameT = document.createTextNode(`${message.user.first_name} ${message.user.last_name}`);
    name.appendChild(nameT);
    messageDiv.appendChild(name);
    const text = document.createElement("span");
    const textT = document.createTextNode(`: ${message.content}`);
    text.appendChild(textT);
    messageDiv.appendChild(text);
    const time = document.createElement("span");
    time.setAttribute("class", "time");
    const timeT = document.createTextNode(`${message.messageDate}`);
    time.appendChild(timeT);
    messageDiv.appendChild(time);

    if (message.userId === parseInt(sessionStorage.activeUser)) {
      const editButton = document.createElement("button");
      editButton.textContent = "Edit message";
      messageDiv.appendChild(editButton);
      editButton.setAttribute("id", `edit_button--${message.id}`);
    }

    return messageDiv;
  },
  createInput: (parent, value, idNumber, length) => {
    const newInput = document.createElement("input");
    newInput.setAttribute("id", `input--${idNumber}`);
    newInput.value = value;
    const width = length * 7.1;
    newInput.style.width = `${width}px`;
    parent.appendChild(newInput);
  }
};
var _default = createHTML;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createMessageObject = (userId, text, time) => {
  return {
    userId: userId,
    content: text,
    messageDate: time
  };
};

var _default = createMessageObject;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const entryManager = {
  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages?_expand=user").then(res => res.json());
  },
  getMessage: messageId => {
    return fetch(`http://127.0.0.1:8088/messages/${messageId}`).then(res => res.json());
  },
  postMessage: messageObject => {
    return fetch("http://127.0.0.1:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObject)
    }).then(res => res.json());
  },
  editMessage: (message, id) => {
    return fetch(`http://127.0.0.1:8088/messages/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    }).then(res => res.json());
  }
};
var _default = entryManager; // window.setInterval(() => {
//   const chatOutput = document.querySelector("#message_output_container")
//   chatOutput.scrollTop = chatOutput.scrollHeight
// }, 10000)

exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createMessageObject = _interopRequireDefault(require("./createMessageObject.js"));

var _entryManager = _interopRequireDefault(require("./entryManager"));

var _createHTML = _interopRequireDefault(require("./createHTML"));

var _addToDOM = _interopRequireDefault(require("./addToDOM"));

var _scroll = _interopRequireDefault(require("./scroll.js"));

var _clear = _interopRequireDefault(require("./clear.js"));

var _onLoad = _interopRequireDefault(require("./onLoad.js"));

var _createFriendObject = _interopRequireDefault(require("../friends/createFriendObject.js"));

var _entryManager2 = _interopRequireDefault(require("../friends/entryManager"));

var _findFriendIds = _interopRequireDefault(require("../friends/findFriendIds.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const messageOutputContainer = document.querySelector("#message_output_container");
const userId = parseInt(sessionStorage.activeUser);
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input");
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value;
      let time = new Date().toLocaleString();
      const newObject = (0, _createMessageObject.default)(userId, messageText, time);

      _entryManager.default.postMessage(newObject).then(obj => {
        const HTML = _createHTML.default.createObjectHTML(obj);

        (0, _addToDOM.default)(HTML);
        (0, _scroll.default)();
      });
    });
  },
  nameFriendListener: () => {
    messageOutputContainer.addEventListener("click", event => {
      const span = event.target;
      const friendUserId = parseInt(span.className.split("--")[1]);
      (0, _findFriendIds.default)().then(arrayOfFriends => {
        const isAlreadyFriends = arrayOfFriends.includes(friendUserId);
        console.log(isAlreadyFriends);

        if (span.className.startsWith("user") && friendUserId !== userId && isAlreadyFriends === "false") {
          if (window.confirm(`Do you want to add ${event.target.textContent} as a friend?`)) {
            const newFriendship = (0, _createFriendObject.default)(userId, friendUserId);

            _entryManager2.default.addFriendship(newFriendship);
          }
        }
      });
    });
  },
  addFriendListener: () => {
    (0, _findFriendIds.default)().then(arrayOfFriends => {
      const friendSearchInput = document.createElement("input");
      friendSearchInput.value = "";
    });
  },
  editListener: () => {
    messageOutputContainer.addEventListener("click", event => {
      const id = event.target.id.split("--")[1];
      const clickedDiv = document.getElementById(id);

      if (event.target.id.startsWith("edit_button")) {
        _entryManager.default.getMessage(id).then(message => {
          if (event.target.textContent === "Edit message") {
            _createHTML.default.createInput(clickedDiv, message.content, id, message.content.length);

            event.target.textContent = "Update message";
          } else if (event.target.textContent === "Update message") {
            message.content = document.getElementById(`input--${id}`).value;
            const editedObj = (0, _createMessageObject.default)(message.userId, message.content, message.messageDate);

            _entryManager.default.editMessage(editedObj, id).then(() => {
              (0, _clear.default)(messageOutputContainer);

              _onLoad.default.outputAllMessages();
            });
          }
        });
      }
    });
  }
};
var _default = eventHandler;
exports.default = _default;

},{"../friends/createFriendObject.js":9,"../friends/entryManager":10,"../friends/findFriendIds.js":11,"./addToDOM":1,"./clear.js":2,"./createHTML":3,"./createMessageObject.js":4,"./entryManager":5,"./onLoad.js":7,"./scroll.js":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryManager = _interopRequireDefault(require("./entryManager"));

var _createHTML = _interopRequireDefault(require("./createHTML"));

var _addToDOM = _interopRequireDefault(require("./addToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onLoad = {
  outputAllMessages: () => {
    _entryManager.default.getMessages().then(messages => {
      // clearDOM()
      messages.forEach(message => {
        const html = _createHTML.default.createObjectHTML(message);

        (0, _addToDOM.default)(html);
      });
      console.log(sessionStorage.activeUser);
    });
  }
};
var _default = onLoad;
exports.default = _default;

},{"./addToDOM":1,"./createHTML":3,"./entryManager":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const scrollToBottom = () => {
  const chatOutput = document.querySelector("#message_output_container");
  chatOutput.scrollTop = chatOutput.scrollHeight;
};

var _default = scrollToBottom;
exports.default = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createFriendObject = (userId, friendId) => {
  return {
    userId: userId,
    friendId: friendId
  };
};

var _default = createFriendObject;
exports.default = _default;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const friendsEntryManager = {
  getFriends: () => {
    return fetch("http://127.0.0.1:8088/friends").then(res => res.json());
  },
  getUsers: () => {
    return fetch("http://127.0.0.1:8088/users").then(res => res.json());
  },
  addFriendship: friendship => {
    return fetch("http://127.0.0.1:8088/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friendship)
    }).then(res => res.json());
  }
};
var _default = friendsEntryManager;
exports.default = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryManager = _interopRequireDefault(require("./entryManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findFriendIds = () => {
  return _entryManager.default.getFriends().then(friends => {
    const friendArray = [];
    const activeUserInt = parseInt(sessionStorage.activeUser);
    const filtered = friends.filter(element => element.userId === activeUserInt || element.friendId === activeUserInt);
    filtered.forEach(element => {
      const userIds = Object.values(element);
      const friendIds = userIds.filter(id => id !== activeUserInt);
      friendArray.push(...friendIds);
    });
    const uniqueFriendArray = [...new Set(friendArray)];
    console.log(uniqueFriendArray);
    return uniqueFriendArray;
  });
};

var _default = findFriendIds;
exports.default = _default;

},{"./entryManager":10}],12:[function(require,module,exports){
"use strict";

var _eventHandler = _interopRequireDefault(require("./chat/eventHandler"));

var _onLoad = _interopRequireDefault(require("./chat/onLoad"));

var _findFriendIds = _interopRequireDefault(require("./friends/findFriendIds"));

var _welcome = _interopRequireDefault(require("./welcome/welcome"));

var _welcomeForms = _interopRequireDefault(require("./welcome/welcomeForms"));

var _welcomeEventHandler = _interopRequireDefault(require("./welcome/welcomeEventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventHandler.default.messageListener();

_onLoad.default.outputAllMessages();

_eventHandler.default.editListener();

_eventHandler.default.nameFriendListener();

(0, _findFriendIds.default)();

_welcome.default.welcome(_welcomeForms.default.loginForm);

_welcomeEventHandler.default.all();

},{"./chat/eventHandler":6,"./chat/onLoad":7,"./friends/findFriendIds":11,"./welcome/welcome":14,"./welcome/welcomeEventHandler":16,"./welcome/welcomeForms":17}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./printToDOM":13,"./welcomeApiManager":15,"./welcomeForms":17}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./welcome":14,"./welcomeForms":17}],17:[function(require,module,exports){
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

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvYWRkVG9ET00uanMiLCIuLi9zY3JpcHRzL2NoYXQvY2xlYXIuanMiLCIuLi9zY3JpcHRzL2NoYXQvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY2hhdC9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L2VudHJ5TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9ldmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL2NoYXQvb25Mb2FkLmpzIiwiLi4vc2NyaXB0cy9jaGF0L3Njcm9sbC5qcyIsIi4uL3NjcmlwdHMvZnJpZW5kcy9jcmVhdGVGcmllbmRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2ZyaWVuZHMvZW50cnlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9mcmllbmRzL2ZpbmRGcmllbmRJZHMuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvcHJpbnRUb0RPTS5qcyIsIi4uL3NjcmlwdHMvd2VsY29tZS93ZWxjb21lLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVBcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy93ZWxjb21lL3dlbGNvbWVFdmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL3dlbGNvbWUvd2VsY29tZUZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBLE1BQU0sUUFBUSxHQUFJLE9BQUQsSUFBYTtBQUM1QixRQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QiwyQkFBdkIsQ0FBZjtBQUNBLEVBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsT0FBbkI7QUFDRCxDQUhEOztlQUllLFE7Ozs7Ozs7Ozs7O0FDSmYsTUFBTSxhQUFhLEdBQUcsT0FBTyxJQUFJO0FBQy9CLFNBQU8sT0FBTyxDQUFDLFVBQWYsRUFBMkI7QUFDekIs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USxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWtFLEtBQUQsSUFBVztBQUN4RSxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixtQkFBeEIsRUFBNkM7QUFDekMseUJBQVEsT0FBUixDQUFnQixzQkFBYSxTQUE3QjtBQUNIO0FBQ0osS0FKRDtBQUtILEdBckJ3QjtBQXNCekIsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWtFLEtBQUQsSUFBVztBQUN4RSxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixhQUF4QixFQUF1QztBQUNuQyx5QkFBUSxRQUFSO0FBQ0g7QUFDSixLQUpEO0FBS0gsR0E1QndCO0FBNkJ6QixFQUFBLEtBQUssRUFBRSxNQUFNO0FBQ1QsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBa0UsS0FBRCxJQUFXO0FBQ3hFLFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDLHlCQUFRLEtBQVI7QUFDSDtBQUNKLEtBSkQ7QUFLSDtBQW5Dd0IsQ0FBN0I7ZUFzQ2Usb0I7Ozs7Ozs7Ozs7QUN6Q2YsTUFBTSxZQUFZLEdBQUc7QUFDakIsRUFBQSxnQkFBZ0IsRUFBRzs7Ozs7Ozs7Ozs7Ozs7OztLQURGO0FBa0JqQixFQUFBLFNBQVMsRUFBRzs7Ozs7Ozs7Ozs7QUFsQkssQ0FBckI7ZUErQmUsWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRE9NID0gKGVsZW1lbnQpID0+IHtcclxuICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4gIG91dHB1dC5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGFkZFRvRE9NIiwiY29uc3QgY2xlYXJDaGlsZHJlbiA9IGVsZW1lbnQgPT4ge1xyXG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckNoaWxkcmVuIiwiY29uc3QgY3JlYXRlSFRNTCA9IHtcclxuICBjcmVhdGVPYmplY3RIVE1MOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIG1lc3NhZ2VEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7bWVzc2FnZS5pZH1gKVxyXG4gICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcbiAgICBuYW1lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGB1c2VyLS0ke21lc3NhZ2UudXNlci5pZH1gKVxyXG4gICAgY29uc3QgbmFtZVQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHttZXNzYWdlLnVzZXIuZmlyc3RfbmFtZX0gJHttZXNzYWdlLnVzZXIubGFzdF9uYW1lfWApXHJcbiAgICBuYW1lLmFwcGVuZENoaWxkKG5hbWVUKVxyXG4gICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChuYW1lKVxyXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcbiAgICBjb25zdCB0ZXh0VCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGA6ICR7bWVzc2FnZS5jb250ZW50fWApXHJcbiAgICB0ZXh0LmFwcGVuZENoaWxkKHRleHRUKVxyXG4gICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZCh0ZXh0KVxyXG5cclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG4gICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRpbWVcIilcclxuICAgIGNvbnN0IHRpbWVUID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7bWVzc2FnZS5tZXNzYWdlRGF0ZX1gKVxyXG4gICAgdGltZS5hcHBlbmRDaGlsZCh0aW1lVClcclxuICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQodGltZSlcclxuICAgIGlmIChtZXNzYWdlLnVzZXJJZCA9PT0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuYWN0aXZlVXNlcikpIHtcclxuICAgICAgY29uc3QgZWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuICAgICAgZWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdCBtZXNzYWdlXCJcclxuICAgICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChlZGl0QnV0dG9uKVxyXG4gICAgICBlZGl0QnV0dG9uLnNldEF0dHJpYnV0ZShcImlkXCIsIGBlZGl0X2J1dHRvbi0tJHttZXNzYWdlLmlkfWApXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVzc2FnZURpdlxyXG4gIH0sXHJcbiAgY3JlYXRlSW5wdXQ6IChwYXJlbnQsIHZhbHVlLCBpZE51bWJlciwgbGVuZ3RoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgbmV3SW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGlucHV0LS0ke2lkTnVtYmVyfWApXHJcbiAgICBuZXdJbnB1dC52YWx1ZSA9IHZhbHVlXHJcbiAgICBjb25zdCB3aWR0aCA9IGxlbmd0aCAqIDcuMVxyXG4gICAgbmV3SW5wdXQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGBcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdJbnB1dClcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSFRNTCIsImNvbnN0IGNyZWF0ZU1lc3NhZ2VPYmplY3QgPSAodXNlcklkLCB0ZXh0LCB0aW1lKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZXJJZDogdXNlcklkLFxyXG4gICAgY29udGVudDogdGV4dCxcclxuICAgIG1lc3NhZ2VEYXRlOiB0aW1lXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU1lc3NhZ2VPYmplY3QiLCJjb25zdCBlbnRyeU1hbmFnZXIgPSB7XHJcblxyXG4gIGdldE1lc3NhZ2VzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXM/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gIH1cclxuICAsXHJcbiAgZ2V0TWVzc2FnZTogKG1lc3NhZ2VJZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YClcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxuXHJcblxyXG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZU9iamVjdCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmplY3QpXHJcbiAgICB9KVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBlZGl0TWVzc2FnZTogKG1lc3NhZ2UsIGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9tZXNzYWdlcy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSlcclxuICAgIH1cclxuICAgIClcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBlbnRyeU1hbmFnZXJcclxuXHJcbi8vIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbi8vICAgY29uc3QgY2hhdE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbi8vICAgY2hhdE91dHB1dC5zY3JvbGxUb3AgPSBjaGF0T3V0cHV0LnNjcm9sbEhlaWdodFxyXG4vLyB9LCAxMDAwMCkiLCJpbXBvcnQgY3JlYXRlTWVzc2FnZU9iamVjdCBmcm9tIFwiLi9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzXCJcclxuaW1wb3J0IGVudHJ5TWFuYWdlciBmcm9tIFwiLi9lbnRyeU1hbmFnZXJcIlxyXG5pbXBvcnQgY3JlYXRlSFRNTCBmcm9tIFwiLi9jcmVhdGVIVE1MXCJcclxuaW1wb3J0IGFkZFRvRE9NIGZyb20gXCIuL2FkZFRvRE9NXCJcclxuaW1wb3J0IHNjcm9sbFRvQm90dG9tIGZyb20gXCIuL3Njcm9sbC5qc1wiO1xyXG5pbXBvcnQgY2xlYXJDaGlsZHJlbiBmcm9tIFwiLi9jbGVhci5qc1wiO1xyXG5pbXBvcnQgb25Mb2FkIGZyb20gXCIuL29uTG9hZC5qc1wiO1xyXG5pbXBvcnQgY3JlYXRlRnJpZW5kT2JqZWN0IGZyb20gXCIuLi9mcmllbmRzL2NyZWF0ZUZyaWVuZE9iamVjdC5qc1wiXHJcbmltcG9ydCBmcmllbmRzRW50cnlNYW5hZ2VyIGZyb20gXCIuLi9mcmllbmRzL2VudHJ5TWFuYWdlclwiXHJcbmltcG9ydCBmaW5kRnJpZW5kSWRzIGZyb20gXCIuLi9mcmllbmRzL2ZpbmRGcmllbmRJZHMuanNcIlxyXG5cclxuY29uc3QgbWVzc2FnZU91dHB1dENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbmNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmFjdGl2ZVVzZXIpXHJcbmNvbnN0IGV2ZW50SGFuZGxlciA9IHtcclxuICBtZXNzYWdlTGlzdGVuZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IGNoYXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9pbnB1dFwiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlX2lucHV0X2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBjaGF0SW5wdXQudmFsdWVcclxuICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlTWVzc2FnZU9iamVjdCh1c2VySWQsIG1lc3NhZ2VUZXh0LCB0aW1lKVxyXG4gICAgICBlbnRyeU1hbmFnZXIucG9zdE1lc3NhZ2UobmV3T2JqZWN0KVxyXG4gICAgICAgIC50aGVuKG9iaiA9PiB7XHJcbiAgICAgICAgICBjb25zdCBIVE1MID0gY3JlYXRlSFRNTC5jcmVhdGVPYmplY3RIVE1MKG9iailcclxuICAgICAgICAgIGFkZFRvRE9NKEhUTUwpXHJcbiAgICAgICAgICBzY3JvbGxUb0JvdHRvbSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgbmFtZUZyaWVuZExpc3RlbmVyOiAoKSA9PiB7XHJcbiAgICBtZXNzYWdlT3V0cHV0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3Qgc3BhbiA9IGV2ZW50LnRhcmdldFxyXG4gICAgICBjb25zdCBmcmllbmRVc2VySWQgPSBwYXJzZUludChzcGFuLmNsYXNzTmFtZS5zcGxpdChcIi0tXCIpWzFdKVxyXG4gICAgICBmaW5kRnJpZW5kSWRzKCkudGhlbigoYXJyYXlPZkZyaWVuZHMpID0+IHtcclxuICAgICAgICBjb25zdCBpc0FscmVhZHlGcmllbmRzID0gYXJyYXlPZkZyaWVuZHMuaW5jbHVkZXMoZnJpZW5kVXNlcklkKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGlzQWxyZWFkeUZyaWVuZHMpXHJcbiAgICAgICAgaWYgKHNwYW4uY2xhc3NOYW1lLnN0YXJ0c1dpdGgoXCJ1c2VyXCIpICYmIGZyaWVuZFVzZXJJZCAhPT0gdXNlcklkICYmIGlzQWxyZWFkeUZyaWVuZHMgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgaWYgKHdpbmRvdy5jb25maXJtKGBEbyB5b3Ugd2FudCB0byBhZGQgJHtldmVudC50YXJnZXQudGV4dENvbnRlbnR9IGFzIGEgZnJpZW5kP2ApKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZyaWVuZHNoaXAgPSBjcmVhdGVGcmllbmRPYmplY3QodXNlcklkLCBmcmllbmRVc2VySWQpXHJcbiAgICAgICAgICAgIGZyaWVuZHNFbnRyeU1hbmFnZXIuYWRkRnJpZW5kc2hpcChuZXdGcmllbmRzaGlwKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG4gICxcclxuICBhZGRGcmllbmRMaXN0ZW5lcjogKCkgPT4ge1xyXG4gICAgZmluZEZyaWVuZElkcygpLnRoZW4oKGFycmF5T2ZGcmllbmRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZyaWVuZFNlYXJjaElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICAgIGZyaWVuZFNlYXJjaElucHV0LnZhbHVlID0gXCJcIlxyXG5cclxuXHJcblxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBlZGl0TGlzdGVuZXI6ICgpID0+IHtcclxuICAgIG1lc3NhZ2VPdXRwdXRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBpZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAgIGNvbnN0IGNsaWNrZWREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZWRpdF9idXR0b25cIikpIHtcclxuICAgICAgICBlbnRyeU1hbmFnZXIuZ2V0TWVzc2FnZShpZCkudGhlbigobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJFZGl0IG1lc3NhZ2VcIikge1xyXG4gICAgICAgICAgICBjcmVhdGVIVE1MLmNyZWF0ZUlucHV0KGNsaWNrZWREaXYsIG1lc3NhZ2UuY29udGVudCwgaWQsIG1lc3NhZ2UuY29udGVudC5sZW5ndGgpXHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9IFwiVXBkYXRlIG1lc3NhZ2VcIlxyXG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiVXBkYXRlIG1lc3NhZ2VcIikge1xyXG4gICAgICAgICAgICBtZXNzYWdlLmNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW5wdXQtLSR7aWR9YCkudmFsdWVcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkT2JqID0gY3JlYXRlTWVzc2FnZU9iamVjdChtZXNzYWdlLnVzZXJJZCwgbWVzc2FnZS5jb250ZW50LCBtZXNzYWdlLm1lc3NhZ2VEYXRlKVxyXG4gICAgICAgICAgICBlbnRyeU1hbmFnZXIuZWRpdE1lc3NhZ2UoZWRpdGVkT2JqLCBpZCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY2xlYXJDaGlsZHJlbihtZXNzYWdlT3V0cHV0Q29udGFpbmVyKVxyXG4gICAgICAgICAgICAgIG9uTG9hZC5vdXRwdXRBbGxNZXNzYWdlcygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBldmVudEhhbmRsZXJcclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBlbnRyeU1hbmFnZXIgZnJvbSBcIi4vZW50cnlNYW5hZ2VyXCJcclxuaW1wb3J0IGNyZWF0ZUhUTUwgZnJvbSBcIi4vY3JlYXRlSFRNTFwiXHJcbmltcG9ydCBhZGRUb0RPTSBmcm9tIFwiLi9hZGRUb0RPTVwiXHJcbmNvbnN0IG9uTG9hZCA9IHtcclxuICBvdXRwdXRBbGxNZXNzYWdlczogKCkgPT4ge1xyXG4gICAgZW50cnlNYW5hZ2VyLmdldE1lc3NhZ2VzKClcclxuICAgICAgLnRoZW4obWVzc2FnZXMgPT4ge1xyXG4gICAgICAgIC8vIGNsZWFyRE9NKClcclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgY29uc3QgaHRtbCA9IGNyZWF0ZUhUTUwuY3JlYXRlT2JqZWN0SFRNTChtZXNzYWdlKVxyXG4gICAgICAgICAgYWRkVG9ET00oaHRtbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb25TdG9yYWdlLmFjdGl2ZVVzZXIpXHJcbiAgICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IG9uTG9hZCIsImNvbnN0IHNjcm9sbFRvQm90dG9tID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNoYXRPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4gIGNoYXRPdXRwdXQuc2Nyb2xsVG9wID0gY2hhdE91dHB1dC5zY3JvbGxIZWlnaHRcclxufVxyXG5leHBvcnQgZGVmYXVsdCBzY3JvbGxUb0JvdHRvbSIsImNvbnN0IGNyZWF0ZUZyaWVuZE9iamVjdCA9ICh1c2VySWQsIGZyaWVuZElkKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZXJJZDogdXNlcklkLFxyXG4gICAgZnJpZW5kSWQ6IGZyaWVuZElkXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZyaWVuZE9iamVjdCIsImNvbnN0IGZyaWVuZHNFbnRyeU1hbmFnZXIgPSB7XHJcblxyXG4gIGdldEZyaWVuZHM6ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9mcmllbmRzXCIpXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIGdldFVzZXJzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvdXNlcnNcIilcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxuICBhZGRGcmllbmRzaGlwOiAoZnJpZW5kc2hpcCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L2ZyaWVuZHNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZnJpZW5kc2hpcClcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG5cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZyaWVuZHNFbnRyeU1hbmFnZXIiLCJpbXBvcnQgZnJpZW5kc0VudHJ5TWFuYWdlciBmcm9tIFwiLi9lbnRyeU1hbmFnZXJcIlxyXG5jb25zdCBmaW5kRnJpZW5kSWRzID0gKCkgPT4ge1xyXG4gIHJldHVybiBmcmllbmRzRW50cnlNYW5hZ2VyLmdldEZyaWVuZHMoKVxyXG4gICAgLnRoZW4oKGZyaWVuZHMpID0+IHtcclxuICAgICAgY29uc3QgZnJpZW5kQXJyYXkgPSBbXVxyXG4gICAgICBjb25zdCBhY3RpdmVVc2VySW50ID0gcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuYWN0aXZlVXNlcilcclxuICAgICAgY29uc3QgZmlsdGVyZWQgPSBmcmllbmRzLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQudXNlcklkID09PSBhY3RpdmVVc2VySW50IHx8IGVsZW1lbnQuZnJpZW5kSWQgPT09IGFjdGl2ZVVzZXJJbnQpXHJcbiAgICAgIGZpbHRlcmVkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgdXNlcklkcyA9IChPYmplY3QudmFsdWVzKGVsZW1lbnQpKVxyXG4gICAgICAgIGNvbnN0IGZyaWVuZElkcyA9IHVzZXJJZHMuZmlsdGVyKGlkID0+IGlkICE9PSBhY3RpdmVVc2VySW50KVxyXG4gICAgICAgIGZyaWVuZEFycmF5LnB1c2goLi4uZnJpZW5kSWRzKVxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCB1bmlxdWVGcmllbmRBcnJheSA9IFsuLi5uZXcgU2V0KGZyaWVuZEFycmF5KV1cclxuICAgICAgY29uc29sZS5sb2codW5pcXVlRnJpZW5kQXJyYXkpXHJcbiAgICAgIHJldHVybiB1bmlxdWVGcmllbmRBcnJheVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZmluZEZyaWVuZElkc1xyXG4iLCJpbXBvcnQgZXZlbnRIYW5kbGVyIGZyb20gXCIuL2NoYXQvZXZlbnRIYW5kbGVyXCJcclxuaW1wb3J0IG9uTG9hZCBmcm9tIFwiLi9jaGF0L29uTG9hZFwiXHJcbmltcG9ydCBmaW5kRnJpZW5kSWRzIGZyb20gXCIuL2ZyaWVuZHMvZmluZEZyaWVuZElkc1wiO1xyXG5cclxuZXZlbnRIYW5kbGVyLm1lc3NhZ2VMaXN0ZW5lcigpXHJcbm9uTG9hZC5vdXRwdXRBbGxNZXNzYWdlcygpXHJcbmV2ZW50SGFuZGxlci5lZGl0TGlzdGVuZXIoKVxyXG5ldmVudEhhbmRsZXIubmFtZUZyaWVuZExpc3RlbmVyKClcclxuZmluZEZyaWVuZElkcygpXHJcblxyXG5pbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVcIjtcclxuaW1wb3J0IHdlbGNvbWVGb3JtcyBmcm9tIFwiLi93ZWxjb21lL3dlbGNvbWVGb3Jtc1wiO1xyXG5pbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZS93ZWxjb21lRXZlbnRIYW5kbGVyXCJcclxuXHJcblxyXG53ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxud2VsY29tZUV2ZW50SGFuZGxlcnMuYWxsKClcclxuXHJcblxyXG4iLCJjb25zdCBwcmludFRvRE9NID0gKHdoYXQsIHdoZXJlKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdoZXJlKS5pbm5lckhUTUwgPSB3aGF0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VG9ET00iLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi9wcmludFRvRE9NXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcbmltcG9ydCB3ZWxjb21lQXBpTWFuYWdlciBmcm9tIFwiLi93ZWxjb21lQXBpTWFuYWdlclwiO1xyXG4vLyBpbXBvcnQgd2VsY29tZUV2ZW50SGFuZGxlcnMgZnJvbSBcIi4vd2VsY29tZUV2ZW50SGFuZGxlclwiO1xyXG5cclxuY29uc3Qgd2VsY29tZSA9IHtcclxuICAgIHdlbGNvbWU6IChmb3JtKSA9PiB7XHJcbiAgICAgICAgcHJpbnRUb0RPTShmb3JtLCBcIiN3ZWxjb21lRm9ybVwiKVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgLy9HRVQgZXhpc3RpbmcgdXNlcnNcclxuICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5nZXRVc2VycygpXHJcbiAgICAgICAgICAgIC50aGVuKHVzZXJzRGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxVc2VyTmFtZXMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJuYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxFbWFpbHMgPSB1c2Vyc0RhdGEubWFwKHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLmVtYWlsLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL2NhcHR1cmUgaW5wdXQgdmFsdWVzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdVc2VyT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0X25hbWU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikudmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdXNlcm5hbWUgaXMgdW5pcXVlLCBhbGVydCBpZiBub3QgdW5pcXVlXHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsVXNlck5hbWVzLmluY2x1ZGVzKG5ld1VzZXJPYmplY3QudXNlcm5hbWUudG9Mb3dlckNhc2UoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJUaGlzIHVzZXJuYW1lIGFscmVhZHkgZXhpc3RzLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIpLmZvY3VzKClcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdHJhdGlvbl91c2VybmFtZVwiKS5zZWxlY3QoKVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGVtYWlsIGlzIHVuaXF1ZSwgYWxlcnQgaWYgbm90IHVuaXF1ZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxFbWFpbHMuaW5jbHVkZXMobmV3VXNlck9iamVjdC5lbWFpbC50b0xvd2VyQ2FzZSgpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIlRoZXJlIGlzIGFscmVhZHkgYW4gYWNjb3VudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbWFpbCBhZHJlc3MuXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RyYXRpb25fZW1haWxcIikuZm9jdXMoKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0cmF0aW9uX2VtYWlsXCIpLnNlbGVjdCgpXHJcblxyXG4gICAgICAgICAgICAgICAgLy9QT1NUIG5ldyB1c2VyIG9iamVjdCBpZiB1bmlxdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoYEFsbCBoYWlsIExvcmQgJHtuZXdVc2VyT2JqZWN0LmZpcnN0X25hbWV9ISEhYClcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lQXBpTWFuYWdlci5wb3N0VXNlcnMobmV3VXNlck9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvc3RlZCFcIiwgdXNlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJhY3RpdmVVc2VyXCIsIHVzZXIuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlci5pZCl9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3Bhc3MgbmV3IHVzZXIgb2JqZWN0IGludG8gbG9naW4gZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAvLyAudGhlbih1c2VyID0+IGxvZ2luKHVzZXIpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICAvL0dFVCB1c2Vyc1xyXG4gICAgICAgIHdlbGNvbWVBcGlNYW5hZ2VyLmdldFVzZXJzKClcclxuICAgICAgICAgICAgLnRoZW4odXNlckRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jYXB0dXJlIHZhbHVlcyBmcm9tIGlucHV0c1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9naW5Vc2VybmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5fdXNlcm5hbWVcIikudmFsdWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2luUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbHVlXHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb21wYXJlIGlkIGFuZCBwYXNzd29yZFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlclRvQ2hlY2sgPSB1c2VyRGF0YS5maW5kKHVzZXIgPT4gdXNlci51c2VybmFtZSA9PT0gbG9naW5Vc2VybmFtZSlcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyVG9DaGVjayA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIilcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLmxvZ2luRm9ybSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlclRvQ2hlY2sucGFzc3dvcmQgPT09IGxvZ2luUGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlVXNlclwiLCB1c2VyVG9DaGVjay5pZClcclxuICAgICAgICAgICAgICAgICAgICB3ZWxjb21lLnNob3dEYXNoYm9hcmQodXNlclRvQ2hlY2suaWQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXNlcm5hbWUgb3IgcGFzc3dvcmQgaW5jb3JyZWN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy9pZiB2ZXJpZmllZCwgY2FwdHVyZSB1c2VySWQgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAgICAvL2dvIHRvIGRhc2hib2FyZFxyXG4gICAgfSxcclxuICAgIHNob3dEYXNoYm9hcmQ6IChhY3RpdmVVc2VySWQpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVVc2VySWQpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vycy8ke2FjdGl2ZVVzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpKVxyXG4gICAgICAgIC8vYWN0aXZhdGUgZWFjaCBjb21wb25lbnRzIFwic2hvdyBvbiBET01cIiBmdW5jdGlvblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lIiwiY29uc3Qgd2VsY29tZUFwaU1hbmFnZXIgPSB7XHJcbiAgICBnZXRVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBwb3N0VXNlcnM6IChuZXdVc2VyT2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3VXNlck9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VsY29tZUFwaU1hbmFnZXIiLCJpbXBvcnQgd2VsY29tZSBmcm9tIFwiLi93ZWxjb21lXCI7XHJcbmltcG9ydCB3ZWxjb21lRm9ybXMgZnJvbSBcIi4vd2VsY29tZUZvcm1zXCI7XHJcblxyXG5jb25zdCB3ZWxjb21lRXZlbnRIYW5kbGVycyA9IHtcclxuICAgIGFsbDogKCkgPT4ge1xyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLm5lZWRUb1JlZ2lzdGVyKClcclxuICAgICAgICB3ZWxjb21lRXZlbnRIYW5kbGVycy5hbHJlYWR5UmVnaXN0ZXJlZCgpXHJcbiAgICAgICAgd2VsY29tZUV2ZW50SGFuZGxlcnMucmVnaXN0ZXIoKVxyXG4gICAgICAgIHdlbGNvbWVFdmVudEhhbmRsZXJzLmxvZ2luKClcclxuICAgIH0sXHJcbiAgICBuZWVkVG9SZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VsY29tZUZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcIm5lZWRUb1JlZ2lzdGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHJlZ2lzdGVyZWQhIGdvaW5nIHRvIHJlZ2lzdHJhdGlvbiBzY3JlZW4uXCIpXHJcbiAgICAgICAgICAgICAgICB3ZWxjb21lLndlbGNvbWUod2VsY29tZUZvcm1zLnJlZ2lzdHJhdGlvbkZvcm0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFscmVhZHlSZWdpc3RlcmVkOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwiYWxyZWFkeVJlZ2lzdGVyZWRcIikge1xyXG4gICAgICAgICAgICAgICAgd2VsY29tZS53ZWxjb21lKHdlbGNvbWVGb3Jtcy5sb2dpbkZvcm0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwicmVnaXN0ZXJCdG5cIikge1xyXG4gICAgICAgICAgICAgICAgd2VsY29tZS5yZWdpc3RlcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWxjb21lRm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwibG9naW5CdG5cIikge1xyXG4gICAgICAgICAgICAgICAgd2VsY29tZS5sb2dpbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWxjb21lRXZlbnRIYW5kbGVycyIsImNvbnN0IHdlbGNvbWVGb3JtcyA9IHtcclxuICAgIHJlZ2lzdHJhdGlvbkZvcm06IGBcclxuICAgICAgICA8aDE+V2VsY29tZSEgQ3JlYXRlIGFuIGFjY291bnQuPC9oMT5cclxuXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInJlZ2lzdHJhdGlvbl91c2VybmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX3VzZXJuYW1lXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInJlZ2lzdHJhdGlvbl9wYXNzd29yZFwiIGlkPVwicmVnaXN0cmF0aW9uX3Bhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiIGlkPVwicmVnaXN0cmF0aW9uX2ZpcnN0TmFtZVwiIHBsYWNlaG9sZGVyPVwiRmlyc3QgTmFtZVwiPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX2xhc3ROYW1lXCIgaWQ9XCJyZWdpc3RyYXRpb25fbGFzdE5hbWVcIiBwbGFjZWhvbGRlcj1cIkxhc3QgTmFtZVwiPlxyXG5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicmVnaXN0cmF0aW9uX2VtYWlsXCIgaWQ9XCJyZWdpc3RyYXRpb25fZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCI+XHJcblxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJyZWdpc3RlckJ0blwiPlJlZ2lzdGVyPC9idXR0b24+XHJcbiAgICAgICAgPGEgaWQ9XCJhbHJlYWR5UmVnaXN0ZXJlZFwiIGhyZWY9XCIjXCI+QWxyZWFkeSBIYXZlIEFuIEFjY291bnQ/PC9hPlxyXG5cclxuICAgIGAsXHJcbiAgICBsb2dpbkZvcm06IGBcclxuICAgICAgICA8aDE+TG9naW48L2gxPlxyXG5cclxuICAgICAgICA8bGFiZWwgZm9yPVwibG9naW5fdXNlcm5hbWVcIj5Vc2VybmFtZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImxvZ2luX3VzZXJuYW1lXCIgaWQ9XCJsb2dpbl91c2VybmFtZVwiPlxyXG4gICAgICAgIDxsYWJlbCBmb3I9XCJsb2dpbl9wYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cImxvZ2luX3Bhc3N3b3JkXCIgaWQ9XCJsb2dpbl9wYXNzd29yZFwiPlxyXG5cclxuICAgICAgICA8YnV0dG9uIGlkPVwibG9naW5CdG5cIj5Mb2dpbjwvYnV0dG9uPlxyXG4gICAgICAgIDxhIGlkPVwibmVlZFRvUmVnaXN0ZXJcIiBocmVmPVwiI1wiPkRvbid0IEhhdmUgQW4gQWNjb3VudD88L2E+XHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlbGNvbWVGb3JtcyJdfQ==
