(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const addToDOM = element => {
  const output = document.querySelector("#message_output_container");
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
<h3>${message.user.first_name}</h3>
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
  onLoad: () => {
    entryManager.getMessages().then(messages => {
      // clearDOM()
      messages.forEach(message => {
        console.log(message);

        const html = _createHTML.default.createHTML(message);

        (0, _addToDOM.default)(html);
      });
    });
  }
};
var _default = entryManager;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userId = 1;
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input");
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value;
      let time = new Date().toLocaleString();
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

var _entryManager = _interopRequireDefault(require("./chat/entryManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_eventHandler.default.messageListener();

_entryManager.default.onLoad();

},{"./chat/entryManager":4,"./chat/eventHandler":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NoYXQvYWRkVG9ET00uanMiLCIuLi9zY3JpcHRzL2NoYXQvY3JlYXRlSFRNTC5qcyIsIi4uL3NjcmlwdHMvY2hhdC9jcmVhdGVNZXNzYWdlT2JqZWN0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L2VudHJ5TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9ldmVudEhhbmRsZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUEsTUFBTSxRQUFRLEdBQUksT0FBRCxJQUFhO0FBQzVCLFFBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLDJCQUF2QixDQUFmO0FBQ0EsRUFBQSxNQUFNLENBQUMsU0FBUCxJQUFvQixPQUFwQjtBQUNELENBSEQ7O2VBSWUsUTs7Ozs7Ozs7OztBQ0pmLE1BQU0sVUFBVSxHQUFHO0FBQ2pCLEVBQUEsVUFBVSxFQUFHLE9BQUQsSUFBYTtBQUN2QixXQUFROzs7TUFHTixPQUFPLENBQUMsSUFBUixDQUFhLFVBQVc7OztLQUd6QixPQUFPLENBQUMsT0FBUTs7O0tBR2hCLE9BQU8sQ0FBQyxXQUFZOztDQVRyQjtBQVlEO0FBZGdCLENBQW5CO2VBZ0JlLFU7Ozs7Ozs7Ozs7O0FDaEJmLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxJQUFmLEtBQXdCO0FBQzNDLFNBQU87QUFDTCxJQUFBLE1BQU0sRUFBRSxNQURIO0FBRUwsSUFBQSxPQUFPLEVBQUUsSUFGSjtBQUdMLElBQUEsV0FBVyxFQUFFO0FBSFIsR0FBUDtBQUtELENBTkQ7O2VBT2UsWTs7Ozs7Ozs7Ozs7QUNQZjs7QUFDQTs7OztBQUVBLE1BQU0sWUFBWSxHQUFHO0FBRW5CLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDakIsV0FBTyxLQUFLLENBQUMsNkNBQUQsQ0FBTCxDQUNKLElBREksQ0FDQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFEUixDQUFQO0FBRUQsR0FMa0I7QUFPbkIsRUFBQSxXQUFXLEVBQUcsYUFBRCxJQUFtQjtBQUM5QixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUM3QyxNQUFBLE1BQU0sRUFBRSxNQURxQztBQUU3QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm9DO0FBSzdDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsYUFBZjtBQUx1QyxLQUFuQyxDQUFMLENBT0osSUFQSSxDQU9DLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBSLENBQVA7QUFRRCxHQWhCa0I7QUFpQm5CLEVBQUEsTUFBTSxFQUFFLE1BQU07QUFDWixJQUFBLFlBQVksQ0FBQyxXQUFiLEdBQ0csSUFESCxDQUNRLFFBQVEsSUFBSTtBQUNoQjtBQUNBLE1BQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsT0FBTyxJQUFJO0FBQzFCLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaOztBQUNBLGNBQU0sSUFBSSxHQUFHLG9CQUFXLFVBQVgsQ0FBc0IsT0FBdEIsQ0FBYjs7QUFDQSwrQkFBUyxJQUFUO0FBQ0QsT0FKRDtBQUtELEtBUkg7QUFTRDtBQTNCa0IsQ0FBckI7ZUE4QmUsWTs7Ozs7Ozs7Ozs7QUNqQ2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLE1BQU0sR0FBRyxDQUFmO0FBQ0EsTUFBTSxZQUFZLEdBQUc7QUFDbkIsRUFBQSxlQUFlLEVBQUUsTUFBTTtBQUNyQixVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBbEI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHVCQUF2QixFQUFnRCxnQkFBaEQsQ0FBaUUsT0FBakUsRUFBMEUsTUFBTTtBQUM5RSxVQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsS0FBNUI7QUFDQSxVQUFJLElBQUksR0FBRyxJQUFJLElBQUosR0FBVyxjQUFYLEVBQVg7QUFDQSxZQUFNLFNBQVMsR0FBRyxrQ0FBYSxNQUFiLEVBQXFCLFdBQXJCLEVBQWtDLElBQWxDLENBQWxCO0FBQ0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVo7O0FBQ0EsWUFBTSxJQUFJLEdBQUcsb0JBQVcsVUFBWCxDQUFzQixTQUF0QixDQUFiLENBTDhFLENBTTlFOzs7QUFDQSw2QkFBUyxJQUFUOztBQUNBLDRCQUFhLFdBQWIsQ0FBeUIsU0FBekIsRUFSOEUsQ0FXOUU7O0FBQ0QsS0FaRDtBQWNEO0FBakJrQixDQUFyQjtlQW1CZSxZOzs7Ozs7QUN6QmY7O0FBQ0E7Ozs7QUFFQSxzQkFBYSxlQUFiOztBQUNBLHNCQUFhLE1BQWIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhZGRUb0RPTSA9IChlbGVtZW50KSA9PiB7XHJcbiAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlX291dHB1dF9jb250YWluZXJcIilcclxuICBvdXRwdXQuaW5uZXJIVE1MICs9IGVsZW1lbnRcclxufVxyXG5leHBvcnQgZGVmYXVsdCBhZGRUb0RPTSIsImNvbnN0IGNyZWF0ZUhUTUwgPSB7XHJcbiAgY3JlYXRlSFRNTDogKG1lc3NhZ2UpID0+IHtcclxuICAgIHJldHVybiBgXHJcbjxhcnRpY2xlIGNsYXNzID0gXCJjaGF0X21lc3NhZ2VcIj5cclxuPHNlY3Rpb24gY2xhc3MgPSBcInRpdGxlXCI+XHJcbjxoMz4ke21lc3NhZ2UudXNlci5maXJzdF9uYW1lfTwvaDM+XHJcbjwvc2VjdGlvbj5cclxuPHNlY3Rpb24gY2xhc3MgPSBcImRhdGVcIj5cclxuPHA+JHttZXNzYWdlLmNvbnRlbnR9PC9wPlxyXG48L3NlY3Rpb24+XHJcbjxzZWN0aW9uIGNsYXNzID0gXCJ0ZXh0XCI+XHJcbjxwPiR7bWVzc2FnZS5tZXNzYWdlRGF0ZX08L3A+XHJcbjwvc2VjdGlvbj5cclxuYFxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIVE1MIiwiY29uc3QgY3JlYXRlT2JqZWN0ID0gKHVzZXJJZCwgdGV4dCwgdGltZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICB1c2VySWQ6IHVzZXJJZCxcclxuICAgIGNvbnRlbnQ6IHRleHQsXHJcbiAgICBtZXNzYWdlRGF0ZTogdGltZVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVPYmplY3QiLCJpbXBvcnQgY3JlYXRlSFRNTCBmcm9tIFwiLi9jcmVhdGVIVE1MXCJcclxuaW1wb3J0IGFkZFRvRE9NIGZyb20gXCIuL2FkZFRvRE9NXCJcclxuXHJcbmNvbnN0IGVudHJ5TWFuYWdlciA9IHtcclxuXHJcbiAgZ2V0TWVzc2FnZXM6ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9tZXNzYWdlcz9fZXhwYW5kPXVzZXJcIilcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfVxyXG4gICxcclxuICBwb3N0TWVzc2FnZTogKG1lc3NhZ2VPYmplY3QpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODA4OC9tZXNzYWdlc1wiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShtZXNzYWdlT2JqZWN0KVxyXG4gICAgfSlcclxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgfSxcclxuICBvbkxvYWQ6ICgpID0+IHtcclxuICAgIGVudHJ5TWFuYWdlci5nZXRNZXNzYWdlcygpXHJcbiAgICAgIC50aGVuKG1lc3NhZ2VzID0+IHtcclxuICAgICAgICAvLyBjbGVhckRPTSgpXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXHJcbiAgICAgICAgICBjb25zdCBodG1sID0gY3JlYXRlSFRNTC5jcmVhdGVIVE1MKG1lc3NhZ2UpXHJcbiAgICAgICAgICBhZGRUb0RPTShodG1sKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxufVxyXG5leHBvcnQgZGVmYXVsdCBlbnRyeU1hbmFnZXIiLCJpbXBvcnQgY3JlYXRlT2JqZWN0IGZyb20gXCIuL2NyZWF0ZU1lc3NhZ2VPYmplY3QuanNcIlxyXG5pbXBvcnQgZW50cnlNYW5hZ2VyIGZyb20gXCIuL2VudHJ5TWFuYWdlclwiXHJcbmltcG9ydCBjcmVhdGVIVE1MIGZyb20gXCIuL2NyZWF0ZUhUTUxcIlxyXG5pbXBvcnQgYWRkVG9ET00gZnJvbSBcIi4vYWRkVG9ET01cIlxyXG5cclxuY29uc3QgdXNlcklkID0gMVxyXG5jb25zdCBldmVudEhhbmRsZXIgPSB7XHJcbiAgbWVzc2FnZUxpc3RlbmVyOiAoKSA9PiB7XHJcbiAgICBjb25zdCBjaGF0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VfaW5wdXRcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9pbnB1dF9idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gY2hhdElucHV0LnZhbHVlXHJcbiAgICAgIGxldCB0aW1lID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpXHJcbiAgICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZU9iamVjdCh1c2VySWQsIG1lc3NhZ2VUZXh0LCB0aW1lKVxyXG4gICAgICBjb25zb2xlLmxvZyhuZXdPYmplY3QpXHJcbiAgICAgIGNvbnN0IEhUTUwgPSBjcmVhdGVIVE1MLmNyZWF0ZUhUTUwobmV3T2JqZWN0KVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhIVE1MKVxyXG4gICAgICBhZGRUb0RPTShIVE1MKVxyXG4gICAgICBlbnRyeU1hbmFnZXIucG9zdE1lc3NhZ2UobmV3T2JqZWN0KVxyXG5cclxuXHJcbiAgICAgIC8vIGNvbnN0IG91dHB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZV9vdXRwdXRfY29udGFpbmVyXCIpXHJcbiAgICB9KVxyXG5cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRIYW5kbGVyXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBldmVudEhhbmRsZXIgZnJvbSBcIi4vY2hhdC9ldmVudEhhbmRsZXJcIlxyXG5pbXBvcnQgZW50cnlNYW5hZ2VyIGZyb20gXCIuL2NoYXQvZW50cnlNYW5hZ2VyXCI7XHJcblxyXG5ldmVudEhhbmRsZXIubWVzc2FnZUxpc3RlbmVyKClcclxuZW50cnlNYW5hZ2VyLm9uTG9hZCgpIl19
