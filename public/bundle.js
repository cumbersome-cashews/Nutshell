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
    const nameAndText = document.createElement("p");
    const nameAndTextT = document.createTextNode(`${message.userId}: ${message.content}`);
    nameAndText.appendChild(nameAndTextT);
    messageDiv.appendChild(nameAndText);
    const time = document.createElement("span");
    time.setAttribute("class", "time");
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

const createObject = (userId, text, time) => {
  return {
    userId: userId,
    content: text,
    messageDate: time
  };
};

var _default = createObject;
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
        const HTML = _createHTML.default.createObjectHTML(obj);

        (0, _addToDOM.default)(HTML);
        (0, _scroll.default)();
      });
    });
  },
  editListener: () => {
    const messageOutputContainer = document.querySelector("#message_output_container");
    messageOutputContainer.addEventListener("click", event => {
      const id = event.target.id.split("--")[1];
      const clickedDiv = document.getElementById(id);

      if (event.target.id.startsWith("edit_button")) {
        _entryManager.default.getMessage(id).then(message => {
          if (event.target.textContent === "Edit message") {
            _createHTML.default.createInput(clickedDiv, message.content, id, message.content.length);

            console.log(typeof message.content.length);
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

},{"./addToDOM":1,"./clear.js":2,"./createHTML":3,"./createMessageObject.js":4,"./entryManager":5,"./onLoad.js":7,"./scroll.js":8}],7:[function(require,module,exports){
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

var _eventHandler = _interopRequireDefault(require("./chat/eventHandler"));

var _onLoad = _interopRequireDefault(require("./chat/onLoad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventHandler.default.messageListener();

_onLoad.default.outputAllMessages();

_eventHandler.default.editListener();

},{"./chat/eventHandler":6,"./chat/onLoad":7}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvYWRkVG9ET00uanMiLCIuLi9zY3JpcHRzL2NoYXQvY2xlYXIuanMiLCIuLi9zY3JpcHRzL2NoYXQvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY2hhdC9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L2VudHJ5TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9ldmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL2NoYXQvb25Mb2FkLmpzIiwiLi4vc2NyaXB0cy9jaGF0L3Njcm9sbC5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFFBQVEsR0FBSSxPQUFELElBQWE7QUFDNUIsUUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsMkJBQXZCLENBQWY7QUFDQSxFQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5CO0FBQ0QsQ0FIRDs7ZUFJZSxROzs7Ozs7Ozs7OztBQ0pmLE1BQU0sYUFBYSxHQUFHLE9BQU8sSUFBSTtBQUMvQixTQUFPLE9BQU8sQ0FBQyxVQUFmLEVBQTJCO0FBQ3pCLElBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsT0FBTyxDQUFDLFVBQTVCO0FBQ0Q7QUFDRixDQUpEOztlQUtlLGE7Ozs7Ozs7Ozs7QUNMZixNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLGdCQUFnQixFQUFHLE9BQUQsSUFBYTtBQUM3QixVQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUFuQjtBQUNBLElBQUEsVUFBVSxDQUFDLFlBQVgsQ0FBd0IsSUFBeEIsRUFBK0IsR0FBRSxPQUFPLENBQUMsRUFBRyxFQUE1QztBQUNBLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQXBCO0FBQ0Es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QW9DLEVBQXBDLEVBQXdDLElBQXhDLENBQTZDLE1BQU07QUFDakQsa0NBQWMsc0JBQWQ7O0FBQ0EsOEJBQU8saUJBQVA7QUFDRCxhQUhEO0FBSUQ7QUFDRixTQWJEO0FBY0Q7QUFDRixLQW5CRDtBQXFCRDtBQXZDa0IsQ0FBckI7ZUF5Q2UsWTs7Ozs7Ozs7Ozs7QUNsRGY7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNLE1BQU0sR0FBRztBQUNiLEVBQUEsaUJBQWlCLEVBQUUsTUFBTTtBQUN2QiwwQkFBYSxXQUFiLEdBQ0csSUFESCxDQUNRLFFBQVEsSUFBSTtBQUNoQjtBQUNBLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsT0FBTyxJQUFJO0FBQzFCLGNBQU0sSUFBSSxHQUFHLG9CQUFXLGdCQUFYLENBQTRCLE9BQTVCLENBQWI7O0FBQ0EsK0JBQVMsSUFBVDtBQUNELE9BSEQ7QUFJRCxLQVBIO0FBUUQ7QUFWWSxDQUFmO2VBWWUsTTs7Ozs7Ozs7Ozs7QUNmZixNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQzNCLFFBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLDJCQUF2QixDQUFuQjtBQUNBLEVBQUEsVUFBVSxDQUFDLFNBQVgsR0FBdUIsVUFBVSxDQUFDLFlBQWxDO0FBQ0QsQ0FIRDs7ZUFJZSxjOzs7Ozs7QUNKZjs7QUFDQTs7OztBQUVBLHNCQUFhLGVBQWI7O0FBQ0EsZ0JBQU8saUJBQVA7O0FBQ0Esc0JBQWEsWUFBYiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRE9NID0gKGVsZW1lbnQpID0+IHtcclxuICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4gIG91dHB1dC5hcHBlbmRDaGlsZChlbGVtZW50KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGFkZFRvRE9NIiwiY29uc3QgY2xlYXJDaGlsZHJlbiA9IGVsZW1lbnQgPT4ge1xyXG4gIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGVhckNoaWxkcmVuIiwiY29uc3QgY3JlYXRlSFRNTCA9IHtcclxuICBjcmVhdGVPYmplY3RIVE1MOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIG1lc3NhZ2VEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7bWVzc2FnZS5pZH1gKVxyXG4gICAgY29uc3QgbmFtZUFuZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG4gICAgY29uc3QgbmFtZUFuZFRleHRUID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7bWVzc2FnZS51c2VySWR9OiAke21lc3NhZ2UuY29udGVudH1gKVxyXG4gICAgbmFtZUFuZFRleHQuYXBwZW5kQ2hpbGQobmFtZUFuZFRleHRUKVxyXG4gICAgbWVzc2FnZURpdi5hcHBlbmRDaGlsZChuYW1lQW5kVGV4dClcclxuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG4gICAgdGltZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRpbWVcIilcclxuICAgIGNvbnN0IHRpbWVUID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7bWVzc2FnZS5tZXNzYWdlRGF0ZX1gKVxyXG4gICAgdGltZS5hcHBlbmRDaGlsZCh0aW1lVClcclxuICAgIG1lc3NhZ2VEaXYuYXBwZW5kQ2hpbGQodGltZSlcclxuICAgIGlmIChtZXNzYWdlLnVzZXJJZCA9PT0gMSkge1xyXG4gICAgICBjb25zdCBlZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgICBlZGl0QnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0IG1lc3NhZ2VcIlxyXG4gICAgICBtZXNzYWdlRGl2LmFwcGVuZENoaWxkKGVkaXRCdXR0b24pXHJcbiAgICAgIGVkaXRCdXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgYGVkaXRfYnV0dG9uLS0ke21lc3NhZ2UuaWR9YClcclxuICAgIH1cclxuICAgIHJldHVybiBtZXNzYWdlRGl2XHJcbiAgfSxcclxuICBjcmVhdGVJbnB1dDogKHBhcmVudCwgdmFsdWUsIGlkTnVtYmVyLCBsZW5ndGgpID0+IHtcclxuICAgIGNvbnN0IG5ld0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBuZXdJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgaW5wdXQtLSR7aWROdW1iZXJ9YClcclxuICAgIG5ld0lucHV0LnZhbHVlID0gdmFsdWVcclxuICAgIGNvbnN0IHdpZHRoID0gbGVuZ3RoICogNy4xXHJcbiAgICBuZXdJbnB1dC5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YFxyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0lucHV0KVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIVE1MIiwiY29uc3QgY3JlYXRlT2JqZWN0ID0gKHVzZXJJZCwgdGV4dCwgdGltZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB1c2VySWQ6IHVzZXJJZCxcclxuICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICBtZXNzYWdlRGF0ZTogdGltZVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVPYmplY3QiLCJjb25zdCBlbnRyeU1hbmFnZXIgPSB7XHJcblxyXG4gIGdldE1lc3NhZ2VzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXM/X2V4cGFuZD11c2VyXCIpXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gIH1cclxuICAsXHJcbiAgZ2V0TWVzc2FnZTogKG1lc3NhZ2VJZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXMvJHttZXNzYWdlSWR9YClcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxuXHJcblxyXG4gIHBvc3RNZXNzYWdlOiAobWVzc2FnZU9iamVjdCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2VPYmplY3QpXHJcbiAgICB9KVxyXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBlZGl0TWVzc2FnZTogKG1lc3NhZ2UsIGlkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9tZXNzYWdlcy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSlcclxuICAgIH1cclxuICAgIClcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBlbnRyeU1hbmFnZXJcclxuXHJcbi8vIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcbi8vICAgY29uc3QgY2hhdE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbi8vICAgY2hhdE91dHB1dC5zY3JvbGxUb3AgPSBjaGF0T3V0cHV0LnNjcm9sbEhlaWdodFxyXG4vLyB9LCAxMDAwMCkiLCJpbXBvcnQgY3JlYXRlT2JqZWN0IGZyb20gXCIuL2NyZWF0ZU1lc3NhZ2VPYmplY3QuanNcIlxyXG5pbXBvcnQgZW50cnlNYW5hZ2VyIGZyb20gXCIuL2VudHJ5TWFuYWdlclwiXHJcbmltcG9ydCBjcmVhdGVIVE1MIGZyb20gXCIuL2NyZWF0ZUhUTUxcIlxyXG5pbXBvcnQgYWRkVG9ET00gZnJvbSBcIi4vYWRkVG9ET01cIlxyXG5pbXBvcnQgc2Nyb2xsVG9Cb3R0b20gZnJvbSBcIi4vc2Nyb2xsLmpzXCI7XHJcbmltcG9ydCBjbGVhckNoaWxkcmVuIGZyb20gXCIuL2NsZWFyLmpzXCI7XHJcbmltcG9ydCBvbkxvYWQgZnJvbSBcIi4vb25Mb2FkLmpzXCI7XHJcblxyXG5jb25zdCB1c2VySWQgPSAxXHJcbmNvbnN0IGV2ZW50SGFuZGxlciA9IHtcclxuICBtZXNzYWdlTGlzdGVuZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IGNoYXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9pbnB1dFwiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlX2lucHV0X2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBsZXQgbWVzc2FnZVRleHQgPSBjaGF0SW5wdXQudmFsdWVcclxuICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKClcclxuICAgICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlT2JqZWN0KHVzZXJJZCwgbWVzc2FnZVRleHQsIHRpbWUpXHJcbiAgICAgIGVudHJ5TWFuYWdlci5wb3N0TWVzc2FnZShuZXdPYmplY3QpXHJcbiAgICAgICAgLnRoZW4ob2JqID0+IHtcclxuICAgICAgICAgIGNvbnN0IEhUTUwgPSBjcmVhdGVIVE1MLmNyZWF0ZU9iamVjdEhUTUwob2JqKVxyXG4gICAgICAgICAgYWRkVG9ET00oSFRNTClcclxuICAgICAgICAgIHNjcm9sbFRvQm90dG9tKClcclxuICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxuICB9LFxyXG4gIGVkaXRMaXN0ZW5lcjogKCkgPT4ge1xyXG4gICAgY29uc3QgbWVzc2FnZU91dHB1dENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgICBtZXNzYWdlT3V0cHV0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgICBjb25zdCBjbGlja2VkRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXHJcbiAgICAgIGlmIChldmVudC50YXJnZXQuaWQuc3RhcnRzV2l0aChcImVkaXRfYnV0dG9uXCIpKSB7XHJcbiAgICAgICAgZW50cnlNYW5hZ2VyLmdldE1lc3NhZ2UoaWQpLnRoZW4oKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09IFwiRWRpdCBtZXNzYWdlXCIpIHtcclxuICAgICAgICAgICAgY3JlYXRlSFRNTC5jcmVhdGVJbnB1dChjbGlja2VkRGl2LCBtZXNzYWdlLmNvbnRlbnQsIGlkLCBtZXNzYWdlLmNvbnRlbnQubGVuZ3RoKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgbWVzc2FnZS5jb250ZW50Lmxlbmd0aClcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gXCJVcGRhdGUgbWVzc2FnZVwiXHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gXCJVcGRhdGUgbWVzc2FnZVwiKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UuY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnB1dC0tJHtpZH1gKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCBlZGl0ZWRPYmogPSBjcmVhdGVPYmplY3QobWVzc2FnZS51c2VySWQsIG1lc3NhZ2UuY29udGVudCwgbWVzc2FnZS5tZXNzYWdlRGF0ZSlcclxuICAgICAgICAgICAgZW50cnlNYW5hZ2VyLmVkaXRNZXNzYWdlKGVkaXRlZE9iaiwgaWQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNsZWFyQ2hpbGRyZW4obWVzc2FnZU91dHB1dENvbnRhaW5lcilcclxuICAgICAgICAgICAgICBvbkxvYWQub3V0cHV0QWxsTWVzc2FnZXMoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIYW5kbGVyXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgZW50cnlNYW5hZ2VyIGZyb20gXCIuL2VudHJ5TWFuYWdlclwiXHJcbmltcG9ydCBjcmVhdGVIVE1MIGZyb20gXCIuL2NyZWF0ZUhUTUxcIlxyXG5pbXBvcnQgYWRkVG9ET00gZnJvbSBcIi4vYWRkVG9ET01cIlxyXG5jb25zdCBvbkxvYWQgPSB7XHJcbiAgb3V0cHV0QWxsTWVzc2FnZXM6ICgpID0+IHtcclxuICAgIGVudHJ5TWFuYWdlci5nZXRNZXNzYWdlcygpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VzID0+IHtcclxuICAgICAgICAvLyBjbGVhckRPTSgpXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICAgIGNvbnN0IGh0bWwgPSBjcmVhdGVIVE1MLmNyZWF0ZU9iamVjdEhUTUwobWVzc2FnZSlcclxuICAgICAgICAgIGFkZFRvRE9NKGh0bWwpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgb25Mb2FkIiwiY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgY29uc3QgY2hhdE91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgY2hhdE91dHB1dC5zY3JvbGxUb3AgPSBjaGF0T3V0cHV0LnNjcm9sbEhlaWdodFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHNjcm9sbFRvQm90dG9tIiwiaW1wb3J0IGV2ZW50SGFuZGxlciBmcm9tIFwiLi9jaGF0L2V2ZW50SGFuZGxlclwiXHJcbmltcG9ydCBvbkxvYWQgZnJvbSBcIi4vY2hhdC9vbkxvYWRcIlxyXG5cclxuZXZlbnRIYW5kbGVyLm1lc3NhZ2VMaXN0ZW5lcigpXHJcbm9uTG9hZC5vdXRwdXRBbGxNZXNzYWdlcygpXHJcbmV2ZW50SGFuZGxlci5lZGl0TGlzdGVuZXIoKVxyXG5cclxuXHJcbiJdfQ==
