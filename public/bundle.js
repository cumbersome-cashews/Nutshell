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
const createHTML = {
  createHTML: message => {
    //     return `
    // <article class = "chat_message">
    // <section class = "user">
    // <h3>${message.userId}</h3>
    // </section>
    // <section class = "text">
    // <p>${message.content}</p>
    // </section>
    // <section class = "date">
    // <p>${message.messageDate}</p>
    // </section>
    // <button id ="edit_button">Edit this message</button>
    // `
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", `${message.id}`);
    const name = document.createElement("h3");
    const nameT = document.createTextNode(`${message.userId}`);
    name.appendChild(nameT);
    messageDiv.appendChild(name);
    const content = document.createElement("p");
    const contentT = document.createTextNode(`${message.content}`);
    content.appendChild(contentT);
    messageDiv.appendChild(content);
    const time = document.createElement("p");
    const timeT = document.createTextNode(`${message.messageDate}`);
    time.appendChild(timeT);
    messageDiv.appendChild(time);

    if (message.userId === 1) {
      const editButton = document.createElement("button");
      editButton.textContent = "Edit message";
      messageDiv.appendChild(editButton);
      editButton.setAttribute("id", `edit_button--${message.id}`);
    }

    return messageDiv;
  }
};
var _default = createHTML;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const createObject = (userId, text, time) => {
  return {
    userId: userId,
    content: text,
    messageDate: time
  };
};

var _default = createObject;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createHTML = _interopRequireDefault(require("./createHTML"));

var _addToDOM = _interopRequireDefault(require("./addToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const entryManager = {
  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages?_expand=user").then(res => res.json());
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
  editMessage: (message, messageId) => {
    return fetch(`http://127.0.0.1:8088/messages/${messageId}`, {
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

},{"./addToDOM":1,"./createHTML":2}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userId = 1;
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input");
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value;
      let time = new Date().toLocaleString();
      const newObject = (0, _createMessageObject.default)(userId, messageText, time);

      _entryManager.default.postMessage(newObject).then(obj => {
        const HTML = _createHTML.default.createHTML(obj);

        (0, _addToDOM.default)(HTML);
        (0, _scroll.default)();
      }); // console.log(HTML)
      // const output = document.querySelector("#message_output_container")

    });
  },
  editListener: () => {
    const messageOutputContainer = document.querySelector("#message_output_container");
    messageOutputContainer.addEventListener("click", event => {
      if (event.target.id.startsWith("edit_button") && event.target.textContent === "Edit message") {
        const id = event.target.id.split("--")[1];
        const div = document.getElementById(id);
        const newInput = document.createElement("input");
        newInput.setAttribute("id", `input--${id}`);
        div.appendChild(newInput);
        event.target.textContent = "Update message";
      } else if (event.target.id.startsWith("edit_button") && event.target.textContent === "Update message") {
        newInput.value = "Hi"; // entryManager.editMessage(newInput.value, id)
      }
    });
  }
};
var _default = eventHandler;
exports.default = _default;

},{"./addToDOM":1,"./createHTML":2,"./createMessageObject.js":3,"./entryManager":4,"./scroll.js":7}],6:[function(require,module,exports){
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
        const html = _createHTML.default.createHTML(message);

        (0, _addToDOM.default)(html);
      });
    });
  }
};
var _default = onLoad;
exports.default = _default;

},{"./addToDOM":1,"./createHTML":2,"./entryManager":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";

var _eventHandler = _interopRequireDefault(require("./chat/eventHandler"));

var _onLoad = _interopRequireDefault(require("./chat/onLoad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventHandler.default.messageListener();

_onLoad.default.outputAllMessages();

_eventHandler.default.editListener();

},{"./chat/eventHandler":5,"./chat/onLoad":6}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvYWRkVG9ET00uanMiLCIuLi9zY3JpcHRzL2NoYXQvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY2hhdC9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L2VudHJ5TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9ldmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL2NoYXQvb25Mb2FkLmpzIiwiLi4vc2NyaXB0cy9jaGF0L3Njcm9sbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFFBQVEsR0FBSSxPQUFELElBQWE7QUFDNUIsUUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsMkJBQXZCLENBQWY7QUFDQSxFQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5CO0FBQ0QsQ0FIRDs7ZUFJZSxROzs7Ozs7Ozs7O0FDSmYsTUFBTSxVQUFVLEdBQUc7QUFDakIsRUFBQSxVQUFVLEVBQUcsT0FBRCxJQUFhO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQSxJQUFBLFVBQVUsQ0FBQyxZQUFYLENBQXdCLElBQXhCLEVBQStCLEdBQUUsT0FBTyxDQUFDLEVBQUcsRUFBNUM7QUFDQSxVQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFiO0FBQ0EsVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBeUIsR0FBRSxPQUFPLENBQUMsTUFBTyxFQUExQyxDQUFkO0FBQ0EsSUFBQSxJQUFJLENBQUMsV0FBTCxDQUFpQixLQUFqQjtBQUNB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QXpDO0FBQ0EsUUFBQSxHQUFHLENBQUMsV0FBSixDQUFnQixRQUFoQjtBQUNBLFFBQUEsS0FBSyxDQUFDLE1BQU4sQ0FBYSxXQUFiLEdBQTJCLGdCQUEzQjtBQUNELE9BUkQsTUFRTyxJQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixVQUFoQixDQUEyQixhQUEzQixLQUNULEtBQUssQ0FBQyxNQUFOLENBQWEsV0FBYixLQUE2QixnQkFEeEIsRUFDMEM7QUFDL0MsUUFBQSxRQUFRLENBQUMsS0FBVCxHQUFpQixJQUFqQixDQUQrQyxDQUUvQztBQUNEO0FBRUYsS0FmRDtBQWlCRDtBQXJDa0IsQ0FBckI7ZUF1Q2UsWTs7Ozs7Ozs7Ozs7QUM5Q2Y7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRztBQUNiLEVBQUEsaUJBQWlCLEVBQUUsTUFBTTtBQUN2QiwwQkFBYSxXQUFiLEdBQ0csSUFESCxDQUNRLFFBQVEsSUFBSTtBQUNoQjtBQUNBLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsT0FBTyxJQUFJO0FBQzFCLGNBQU0sSUFBSSxHQUFHLG9CQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBYjs7QUFDQSwrQkFBUyxJQUFUO0FBQ0QsT0FIRDtBQUlELEtBUEg7QUFRRDtBQVZZLENBQWY7ZUFZZSxNOzs7Ozs7Ozs7OztBQ2ZmLE1BQU0sY0FBYyxHQUFHLE1BQU07QUFDM0IsUUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsMkJBQXZCLENBQW5CO0FBQ0EsRUFBQSxVQUFVLENBQUMsU0FBWCxHQUF1QixVQUFVLENBQUMsWUFBbEM7QUFDRCxDQUhEOztlQUllLGM7Ozs7OztBQ0pmOztBQUNBOzs7O0FBRUEsc0JBQWEsZUFBYjs7QUFDQSxnQkFBTyxpQkFBUDs7QUFDQSxzQkFBYSxZQUFiIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYWRkVG9ET00gPSAoZWxlbWVudCkgPT4ge1xyXG4gIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgb3V0cHV0LmFwcGVuZENoaWxkKGVsZW1lbnQpXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYWRkVG9ET00iLCJjb25zdCBjcmVhdGVIVE1MID0ge1xyXG4gIGNyZWF0ZUhUTUw6IChtZXNzYWdlKSA9PiB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGBcclxuICAgIC8vIDxhcnRpY2xlIGNsYXNzID0gXCJjaGF0X21lc3NhZ2VcIj5cclxuICAgIC8vIDxzZWN0aW9uIGNsYXNzID0gXCJ1c2VyXCI+XHJcbiAgICAvLyA8aDM+JHttZXNzYWdlLnVzZXJJZH08L2gzPlxyXG4gICAgLy8gPC9zZWN0aW9uPlxyXG4gICAgLy8gPHNlY3Rpb24gY2xhc3MgPSBcInRleHRcIj5cclxuICAgIC8vIDxwPiR7bWVzc2FnZS5jb250ZW50fTwvcD5cclxuICAgIC8vIDwvc2VjdGlvbj5cclxuICAgIC8vIDxzZWN0aW9uIGNsYXNzID0gXCJkYXRlXCI+XHJcbiAgICAvLyA8cD4ke21lc3NhZ2UubWVzc2FnZURhdGV9PC9wPlxyXG4gICAgLy8gPC9zZWN0aW9uPlxyXG4gICAgLy8gPGJ1dHRvbiBpZCA9XCJlZGl0X2J1dHRvblwiPkVkaXQgdGhpcyBtZXNzYWdlPC9idXR0b24+XHJcbiAgICAvLyBgXHJcbiAgICBjb25zdCBtZXNzYWdlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgbWVzc2FnZURpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHttZXNzYWdlLmlkfWApXHJcbiAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICBjb25zdCBuYW1lVCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke21lc3NhZ2UudXNlcklkfWApXHJcbiAgICBuYW1lLmFwcGVuZENoaWxkKG5hbWVUKVxyXG4gICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChuYW1lKVxyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICBjb25zdCBjb250ZW50VCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAke21lc3NhZ2UuY29udGVudH1gKVxyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjb250ZW50VClcclxuICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQoY29udGVudClcclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgY29uc3QgdGltZVQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHttZXNzYWdlLm1lc3NhZ2VEYXRlfWApXHJcbiAgICB0aW1lLmFwcGVuZENoaWxkKHRpbWVUKVxyXG4gICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZCh0aW1lKVxyXG4gICAgaWYgKG1lc3NhZ2UudXNlcklkID09PSAxKSB7XHJcbiAgICAgIGNvbnN0IGVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICAgIGVkaXRCdXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXQgbWVzc2FnZVwiXHJcbiAgICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQoZWRpdEJ1dHRvbilcclxuICAgICAgZWRpdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgZWRpdF9idXR0b24tLSR7bWVzc2FnZS5pZH1gKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2VEaXZcclxuXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUhUTUwiLCJjb25zdCBjcmVhdGVPYmplY3QgPSAodXNlcklkLCB0ZXh0LCB0aW1lKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZXJJZDogdXNlcklkLFxyXG4gICAgY29udGVudDogdGV4dCxcclxuICAgIG1lc3NhZ2VEYXRlOiB0aW1lXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU9iamVjdCIsImltcG9ydCBjcmVhdGVIVE1MIGZyb20gXCIuL2NyZWF0ZUhUTUxcIlxyXG5pbXBvcnQgYWRkVG9ET00gZnJvbSBcIi4vYWRkVG9ET01cIlxyXG5cclxuY29uc3QgZW50cnlNYW5hZ2VyID0ge1xyXG5cclxuICBnZXRNZXNzYWdlczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L21lc3NhZ2VzP19leHBhbmQ9dXNlclwiKVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICB9XHJcbiAgLFxyXG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZU9iamVjdCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmplY3QpXHJcbiAgICB9KVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBlZGl0TWVzc2FnZTogKG1lc3NhZ2UsIG1lc3NhZ2VJZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKVxyXG4gICAgfVxyXG4gICAgKVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuXHJcbiAgfSxcclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZW50cnlNYW5hZ2VyXHJcblxyXG4vLyB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGNoYXRPdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4vLyAgIGNoYXRPdXRwdXQuc2Nyb2xsVG9wID0gY2hhdE91dHB1dC5zY3JvbGxIZWlnaHRcclxuLy8gfSwgMTAwMDApIiwiaW1wb3J0IGNyZWF0ZU9iamVjdCBmcm9tIFwiLi9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzXCJcclxuaW1wb3J0IGVudHJ5TWFuYWdlciBmcm9tIFwiLi9lbnRyeU1hbmFnZXJcIlxyXG5pbXBvcnQgY3JlYXRlSFRNTCBmcm9tIFwiLi9jcmVhdGVIVE1MXCJcclxuaW1wb3J0IGFkZFRvRE9NIGZyb20gXCIuL2FkZFRvRE9NXCJcclxuaW1wb3J0IHNjcm9sbFRvQm90dG9tIGZyb20gXCIuL3Njcm9sbC5qc1wiO1xyXG5cclxuY29uc3QgdXNlcklkID0gMVxyXG5jb25zdCBldmVudEhhbmRsZXIgPSB7XHJcbiAgbWVzc2FnZUxpc3RlbmVyOiAoKSA9PiB7XHJcbiAgICBjb25zdCBjaGF0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VfaW5wdXRcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9pbnB1dF9idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gY2hhdElucHV0LnZhbHVlXHJcbiAgICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZU9iamVjdCh1c2VySWQsIG1lc3NhZ2VUZXh0LCB0aW1lKVxyXG4gICAgICBlbnRyeU1hbmFnZXIucG9zdE1lc3NhZ2UobmV3T2JqZWN0KVxyXG4gICAgICAgIC50aGVuKG9iaiA9PiB7XHJcbiAgICAgICAgICBjb25zdCBIVE1MID0gY3JlYXRlSFRNTC5jcmVhdGVIVE1MKG9iailcclxuICAgICAgICAgIGFkZFRvRE9NKEhUTUwpXHJcbiAgICAgICAgICBzY3JvbGxUb0JvdHRvbSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgLy8gY29uc29sZS5sb2coSFRNTClcclxuICAgICAgLy8gY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlX291dHB1dF9jb250YWluZXJcIilcclxuICAgIH0pXHJcbiAgfSxcclxuICBlZGl0TGlzdGVuZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IG1lc3NhZ2VPdXRwdXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4gICAgbWVzc2FnZU91dHB1dENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcImVkaXRfYnV0dG9uXCIpICYmXHJcbiAgICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSBcIkVkaXQgbWVzc2FnZVwiKSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxyXG4gICAgICAgIGNvbnN0IG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICAgICAgbmV3SW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYGlucHV0LS0ke2lkfWApXHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKG5ld0lucHV0KVxyXG4gICAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9IFwiVXBkYXRlIG1lc3NhZ2VcIlxyXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwiZWRpdF9idXR0b25cIikgJiZcclxuICAgICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiVXBkYXRlIG1lc3NhZ2VcIikge1xyXG4gICAgICAgIG5ld0lucHV0LnZhbHVlID0gXCJIaVwiXHJcbiAgICAgICAgLy8gZW50cnlNYW5hZ2VyLmVkaXRNZXNzYWdlKG5ld0lucHV0LnZhbHVlLCBpZClcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIYW5kbGVyXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZW50cnlNYW5hZ2VyIGZyb20gXCIuL2VudHJ5TWFuYWdlclwiXHJcbmltcG9ydCBjcmVhdGVIVE1MIGZyb20gXCIuL2NyZWF0ZUhUTUxcIlxyXG5pbXBvcnQgYWRkVG9ET00gZnJvbSBcIi4vYWRkVG9ET01cIlxyXG5jb25zdCBvbkxvYWQgPSB7XHJcbiAgb3V0cHV0QWxsTWVzc2FnZXM6ICgpID0+IHtcclxuICAgIGVudHJ5TWFuYWdlci5nZXRNZXNzYWdlcygpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VzID0+IHtcclxuICAgICAgICAvLyBjbGVhckRPTSgpXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICAgIGNvbnN0IGh0bWwgPSBjcmVhdGVIVE1MLmNyZWF0ZUhUTUwobWVzc2FnZSlcclxuICAgICAgICAgIGFkZFRvRE9NKGh0bWwpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgb25Mb2FkIiwiY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgY29uc3QgY2hhdE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgY2hhdE91dHB1dC5zY3JvbGxUb3AgPSBjaGF0T3V0cHV0LnNjcm9sbEhlaWdodFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHNjcm9sbFRvQm90dG9tIiwiaW1wb3J0IGV2ZW50SGFuZGxlciBmcm9tIFwiLi9jaGF0L2V2ZW50SGFuZGxlclwiXHJcbmltcG9ydCBvbkxvYWQgZnJvbSBcIi4vY2hhdC9vbkxvYWRcIlxyXG5cclxuZXZlbnRIYW5kbGVyLm1lc3NhZ2VMaXN0ZW5lcigpXHJcbm9uTG9hZC5vdXRwdXRBbGxNZXNzYWdlcygpXHJcbmV2ZW50SGFuZGxlci5lZGl0TGlzdGVuZXIoKVxyXG5cclxuXHJcbiJdfQ==
