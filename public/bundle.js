(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const APIfunctions = {
  getTasks() {
    return fetch("http://localhost:3000/tasks").then(tasks => tasks.json());
  }

};
var _default = APIfunctions;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let taskForm = {
  taskFormInput: () => {
    let masterDiv = document.getElementById("masterDiv");
    let taskForm = document.createElement("form");
    taskForm.setAttribute("onsubmit", "return false");
    let taskInput = document.createElement("input");
    taskInput.setAttribute("type", "text");
    taskInput.setAttribute("name", "task_name");
    let taskName = document.createElement("label");
    taskName.setAttribute("for", "task_name");
    taskName.textContent = "Task Name";
    taskForm.appendChild(taskName);
    taskForm.appendChild(taskInput);
    masterDiv.appendChild(taskForm);
  }
};
var _default = taskForm;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let taskListeners = {
  completedTask: () => {
    document.getElementById("completedButton").addEventListener("click", () => {
      console.log("You clicked completed task");
    });
  }
};
var _default = taskListeners;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(require("./api"));

var _taskListeners = _interopRequireDefault(require("./taskListeners"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let taskToDOM = () => {
  _api.default.getTasks().then(parsedTasks => {
    parsedTasks.forEach(task => {
      document.getElementById("taskList").innerHTML += `
        <div>
        <h1>${task.task_name}</h1>
        <p>Expected completion ${task.expected_completion}.</p>
        <p>Your task is now ${task.completed}</p>
        <button id="completedButton">Completed Task</button>
        </div>`;
    });

    _taskListeners.default.completedTask();
  });
};

var _default = taskToDOM;
exports.default = _default;

},{"./api":1,"./taskListeners":3}],5:[function(require,module,exports){
"use strict";

var _taskToDOM = _interopRequireDefault(require("./Tasks/taskToDOM"));

var _taskForm = _interopRequireDefault(require("./Tasks/taskForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_taskForm.default.taskFormInput();

(0, _taskToDOM.default)();

},{"./Tasks/taskForm":2,"./Tasks/taskToDOM":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUE7O0FBSmtCLENBQXJCO2VBTWUsWTs7Ozs7Ozs7OztBQ05mLElBQUksUUFBUSxHQUFHO0FBQ2IsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUN0QixRQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFoQjtBQUVELFFBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLENBQWY7QUFDQSxJQUFBLFFBQVEsQ0FBQyxZQUFULENBQXNCLFVBQXRCLEVBQWtDLGNBQWxDO0FBRUEsUUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7QUFDQSxJQUFBLFNBQVMsQ0FBQyxZQUFWLENBQXVCLE1BQXZCLEVBQStCLE1BQS9CO0FBQ0EsSUFBQSxTQUFTLENBQUMsWUFBVixDQUF1QixNQUF2QixFQUErQixXQUEvQjtBQUVBLFFBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLENBQWY7QUFDQSxJQUFBLFFBQVEsQ0FBQyxZQUFULENBQXNCLEtBQXRCLEVBQTRCLFdBQTVCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxHQUF1QixXQUF2QjtBQUVBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsUUFBckI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFNBQXJCO0FBRUEsSUFBQSxTQUFTLENBQUMsV0FBVixDQUFzQixRQUF0QjtBQUNDO0FBbkJjLENBQWY7ZUFxQmUsUTs7Ozs7Ozs7OztBQ3JCZixJQUFJLGFBQWEsR0FBRztBQUNuQixFQUFBLGFBQWEsRUFBRSxNQUFNO0FBQ25CLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLGdCQUEzQyxDQUE0RCxPQUE1RCxFQUFxRSxNQUFNO0FBQzVFLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSw0QkFBWjtBQUNBLEtBRkM7QUFHRjtBQUxtQixDQUFwQjtlQVFlLGE7Ozs7Ozs7Ozs7O0FDUmY7O0FBQ0E7Ozs7QUFDQSxJQUFJLFNBQVMsR0FBRyxNQUFNO0FBQ3BCLGVBQWEsUUFBYixHQUNHLElBREgsQ0FDUSxXQUFXLElBQUk7QUFDbkIsSUFBQSxXQUFXLENBQUMsT0FBWixDQUFvQixJQUFJLElBQUk7QUFDMUIsTUFBQSxRQUFRLENBQUMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxTQUFwQyxJQUFrRDs7Y0FFNUMsSUFBSSxDQUFDLFNBQVU7aUNBQ0ksSUFBSSxDQUFDLG1CQUFvQjs4QkFDNUIsSUFBSSxDQUFDLFNBQVU7O2VBSnJDO0FBT0QsS0FSRDs7QUFTQSwyQkFBYyxhQUFkO0FBQ0QsR0FaSDtBQWFELENBZEQ7O2VBZWUsUzs7Ozs7O0FDakJmOztBQUNBOzs7O0FBRUEsa0JBQVMsYUFBVDs7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSWZ1bmN0aW9ucyA9IHtcclxuICBnZXRUYXNrcygpe1xyXG4gICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvdGFza3NcIilcclxuICAgIC50aGVuKHRhc2tzID0+IHRhc2tzLmpzb24oKSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQVBJZnVuY3Rpb25zIiwibGV0IHRhc2tGb3JtID0ge1xyXG4gIHRhc2tGb3JtSW5wdXQ6ICgpID0+IHtcclxuIGxldCBtYXN0ZXJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hc3RlckRpdlwiKVxyXG5cclxubGV0IHRhc2tGb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIilcclxudGFza0Zvcm0uc2V0QXR0cmlidXRlKFwib25zdWJtaXRcIiwgXCJyZXR1cm4gZmFsc2VcIilcclxuXHJcbmxldCB0YXNrSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxudGFza0lucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbnRhc2tJbnB1dC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwidGFza19uYW1lXCIpXHJcblxyXG5sZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIilcclxudGFza05hbWUuc2V0QXR0cmlidXRlKFwiZm9yXCIsXCJ0YXNrX25hbWVcIilcclxudGFza05hbWUudGV4dENvbnRlbnQgPSBcIlRhc2sgTmFtZVwiXHJcblxyXG50YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrTmFtZSlcclxudGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0lucHV0KVxyXG5cclxubWFzdGVyRGl2LmFwcGVuZENoaWxkKHRhc2tGb3JtKVxyXG59fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0Zvcm0iLCJsZXQgdGFza0xpc3RlbmVycyA9IHtcclxuIGNvbXBsZXRlZFRhc2s6ICgpID0+IHtcclxuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wbGV0ZWRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGNvbXBsZXRlZCB0YXNrXCIpXHJcbiB9KVxyXG59XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tMaXN0ZW5lcnMiLCJpbXBvcnQgQVBJZnVuY3Rpb25zIGZyb20gXCIuL2FwaVwiXHJcbmltcG9ydCB0YXNrTGlzdGVuZXJzIGZyb20gXCIuL3Rhc2tMaXN0ZW5lcnNcIlxyXG5sZXQgdGFza1RvRE9NID0gKCkgPT4ge1xyXG4gIEFQSWZ1bmN0aW9ucy5nZXRUYXNrcygpXHJcbiAgICAudGhlbihwYXJzZWRUYXNrcyA9PiB7XHJcbiAgICAgIHBhcnNlZFRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPiR7dGFzay50YXNrX25hbWV9PC9oMT5cclxuICAgICAgICA8cD5FeHBlY3RlZCBjb21wbGV0aW9uICR7dGFzay5leHBlY3RlZF9jb21wbGV0aW9ufS48L3A+XHJcbiAgICAgICAgPHA+WW91ciB0YXNrIGlzIG5vdyAke3Rhc2suY29tcGxldGVkfTwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiY29tcGxldGVkQnV0dG9uXCI+Q29tcGxldGVkIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgIH0pO1xyXG4gICAgICB0YXNrTGlzdGVuZXJzLmNvbXBsZXRlZFRhc2soKVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCB0YXNrVG9ET00iLCJpbXBvcnQgdGFza1RvRE9NIGZyb20gXCIuL1Rhc2tzL3Rhc2tUb0RPTVwiXHJcbmltcG9ydCB0YXNrRm9ybSBmcm9tIFwiLi9UYXNrcy90YXNrRm9ybVwiXHJcblxyXG50YXNrRm9ybS50YXNrRm9ybUlucHV0KClcclxudGFza1RvRE9NKClcclxuIl19
