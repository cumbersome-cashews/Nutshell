(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const addToDOM = element => {
  const output = document.querySelector("#message_output_container");
  console.log(element);
  console.log(output);
  output.innerHTML += element;
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
    return `
<article class = "chat_message">
<section class = "title">
<h3>${message.userId}</h3>
</section>
<section class = "date">
<p>${message.content}</p>
</section>
<section class = "text">
<p>${message.messageDate}</p>
</section>
`;
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
const entryManager = {
  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages").then(res => res.json()).then(() => {});
  },
  postMessage: messageObject => {
    return fetch("http://127.0.0.1:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObject)
    }).then(res => res.json());
  }
};
var _default = entryManager;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createMessageObject = _interopRequireDefault(require("./createMessageObject.js"));

var _entryManager = _interopRequireDefault(require("./entryManager"));

var _createHTML = _interopRequireDefault(require("./createHTML"));

var _addToDOM = _interopRequireDefault(require("./addToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input");
    document.querySelector("#message_input_button").addEventListener("click", () => {
      const userId = 1;
      let messageText = chatInput.value;
      let time = Date.now();
      const newObject = (0, _createMessageObject.default)(userId, messageText, time);
      console.log(newObject);

      const HTML = _createHTML.default.createHTML(newObject); // console.log(HTML)


      (0, _addToDOM.default)(HTML);

      _entryManager.default.postMessage(newObject); // const output = document.querySelector("#message_output_container")

    });
  }
};
var _default = eventHandler;
exports.default = _default;

},{"./addToDOM":1,"./createHTML":2,"./createMessageObject.js":3,"./entryManager":4}],6:[function(require,module,exports){
"use strict";

var _eventHandler = _interopRequireDefault(require("./chat/eventHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventHandler.default.messageListener();

},{"./chat/eventHandler":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvYWRkVG9ET00uanMiLCIuLi9zY3JpcHRzL2NoYXQvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY2hhdC9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L2VudHJ5TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9ldmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsTUFBTSxRQUFRLEdBQUksT0FBRCxJQUFhO0FBQzVCLFFBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLDJCQUF2QixDQUFmO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVo7QUFDQSxFQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtBQUNBLEVBQUEsTUFBTSxDQUFDLFNBQVAsSUFBb0IsT0FBcEI7QUFDRCxDQUxEOztlQU1lLFE7Ozs7Ozs7Ozs7QUNOZixNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLFVBQVUsRUFBRyxPQUFELElBQWE7QUFDdkIsV0FBUTs7O01BR04sT0FBTyxDQUFDLE1BQU87OztLQUdoQixPQUFPLENBQUMsT0FBUTs7O0tBR2hCLE9BQU8sQ0FBQyxXQUFZOztDQVRyQjtBQVlEO0FBZGdCLENBQW5CO2VBa0JlLFU7Ozs7Ozs7Ozs7O0FDbEJmLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxJQUFmLEtBQXdCO0FBQzNDLFNBQU87QUFDTCxJQUFBLE1BQU0sRUFBRSxNQURIO0FBRUwsSUFBQSxPQUFPLEVBQUUsSUFGSjtBQUdMLElBQUEsV0FBVyxFQUFFO0FBSFIsR0FBUDtBQUtELENBTkQ7O2VBT2UsWTs7Ozs7Ozs7OztBQ05mLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDakIsV0FBTyxLQUFLLENBQUMsZ0NBQUQsQ0FBTCxDQUNKLElBREksQ0FDQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFEUixFQUVKLElBRkksQ0FFQyxNQUFNLENBR1gsQ0FMSSxDQUFQO0FBUUQsR0FWa0I7QUFZbkIsRUFBQSxXQUFXLEVBQUcsYUFBRCxJQUFtQjtBQUM5QixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUM3QyxNQUFBLE1BQU0sRUFBRSxNQURxQztBQUU3QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm9DO0FBSzdDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUx1QyxLQUFuQyxDQUFMLENBT0osSUFQSSxDQU9DLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBSLENBQVA7QUFTRDtBQXRCa0IsQ0FBckI7ZUF3QmUsWTs7Ozs7Ozs7Ozs7QUN6QmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLFlBQVksR0FBRztBQUNuQixFQUFBLGVBQWUsRUFBRSxNQUFNO0FBQ3JCLFVBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUFsQjtBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsdUJBQXZCLEVBQWdELGdCQUFoRCxDQUFpRSxPQUFqRSxFQUEwRSxNQUFNO0FBQzlFLFlBQU0sTUFBTSxHQUFHLENBQWY7QUFDQSxVQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBNUI7QUFDQSxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBTCxFQUFYO0FBQ0EsWUFBTSxTQUFTLEdBQUcsa0NBQWEsTUFBYixFQUFxQixXQUFyQixFQUFrQyxJQUFsQyxDQUFsQjtBQUNBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaOztBQUNBLFlBQU0sSUFBSSxHQUFHLG9CQUFXLFVBQVgsQ0FBc0IsU0FBdEIsQ0FBYixDQU44RSxDQU85RTs7O0FBQ0EsNkJBQVMsSUFBVDs7QUFDQSw0QkFBYSxXQUFiLENBQXlCLFNBQXpCLEVBVDhFLENBVTlFOztBQUNELEtBWEQ7QUFhRDtBQWhCa0IsQ0FBckI7ZUFrQmUsWTs7Ozs7O0FDdkJmOzs7O0FBRUEsc0JBQWEsZUFBYiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFkZFRvRE9NID0gKGVsZW1lbnQpID0+IHtcclxuICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2Vfb3V0cHV0X2NvbnRhaW5lclwiKVxyXG4gIGNvbnNvbGUubG9nKGVsZW1lbnQpXHJcbiAgY29uc29sZS5sb2cob3V0cHV0KVxyXG4gIG91dHB1dC5pbm5lckhUTUwgKz0gZWxlbWVudFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGFkZFRvRE9NIiwiY29uc3QgY3JlYXRlSFRNTCA9IHtcclxuICBjcmVhdGVIVE1MOiAobWVzc2FnZSkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuPGFydGljbGUgY2xhc3MgPSBcImNoYXRfbWVzc2FnZVwiPlxyXG48c2VjdGlvbiBjbGFzcyA9IFwidGl0bGVcIj5cclxuPGgzPiR7bWVzc2FnZS51c2VySWR9PC9oMz5cclxuPC9zZWN0aW9uPlxyXG48c2VjdGlvbiBjbGFzcyA9IFwiZGF0ZVwiPlxyXG48cD4ke21lc3NhZ2UuY29udGVudH08L3A+XHJcbjwvc2VjdGlvbj5cclxuPHNlY3Rpb24gY2xhc3MgPSBcInRleHRcIj5cclxuPHA+JHttZXNzYWdlLm1lc3NhZ2VEYXRlfTwvcD5cclxuPC9zZWN0aW9uPlxyXG5gXHJcbiAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSFRNTCIsImNvbnN0IGNyZWF0ZU9iamVjdCA9ICh1c2VySWQsIHRleHQsIHRpbWUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgdXNlcklkOiB1c2VySWQsXHJcbiAgICBjb250ZW50OiB0ZXh0LFxyXG4gICAgbWVzc2FnZURhdGU6IHRpbWVcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlT2JqZWN0IiwiXHJcbmNvbnN0IGVudHJ5TWFuYWdlciA9IHtcclxuICBnZXRNZXNzYWdlczogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDg4L21lc3NhZ2VzXCIpXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcblxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgKVxyXG4gIH1cclxuICAsXHJcbiAgcG9zdE1lc3NhZ2U6IChtZXNzYWdlT2JqZWN0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vMTI3LjAuMC4xOjgwODgvbWVzc2FnZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZU9iamVjdClcclxuICAgIH0pXHJcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG5cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZW50cnlNYW5hZ2VyIiwiaW1wb3J0IGNyZWF0ZU9iamVjdCBmcm9tIFwiLi9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzXCJcclxuaW1wb3J0IGVudHJ5TWFuYWdlciBmcm9tIFwiLi9lbnRyeU1hbmFnZXJcIlxyXG5pbXBvcnQgY3JlYXRlSFRNTCBmcm9tIFwiLi9jcmVhdGVIVE1MXCJcclxuaW1wb3J0IGFkZFRvRE9NIGZyb20gXCIuL2FkZFRvRE9NXCJcclxuXHJcbmNvbnN0IGV2ZW50SGFuZGxlciA9IHtcclxuICBtZXNzYWdlTGlzdGVuZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IGNoYXRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9pbnB1dFwiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlX2lucHV0X2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zdCB1c2VySWQgPSAxXHJcbiAgICAgIGxldCBtZXNzYWdlVGV4dCA9IGNoYXRJbnB1dC52YWx1ZVxyXG4gICAgICBsZXQgdGltZSA9IERhdGUubm93KClcclxuICAgICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlT2JqZWN0KHVzZXJJZCwgbWVzc2FnZVRleHQsIHRpbWUpXHJcbiAgICAgIGNvbnNvbGUubG9nKG5ld09iamVjdClcclxuICAgICAgY29uc3QgSFRNTCA9IGNyZWF0ZUhUTUwuY3JlYXRlSFRNTChuZXdPYmplY3QpXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKEhUTUwpXHJcbiAgICAgIGFkZFRvRE9NKEhUTUwpXHJcbiAgICAgIGVudHJ5TWFuYWdlci5wb3N0TWVzc2FnZShuZXdPYmplY3QpXHJcbiAgICAgIC8vIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIYW5kbGVyIiwiaW1wb3J0IGV2ZW50SGFuZGxlciBmcm9tIFwiLi9jaGF0L2V2ZW50SGFuZGxlclwiXHJcblxyXG5ldmVudEhhbmRsZXIubWVzc2FnZUxpc3RlbmVyKCkiXX0=
