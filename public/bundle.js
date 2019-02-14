(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const APIfunctions = {
  getTasks() {
    return fetch("http://localhost:8088/tasks").then(tasks => tasks.json());
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
  taskFormInput: `
  <h3>Create a Task</h3>
  <input type="text" id="task_name" placeholder="Task Name">
  <input type="Date" id="completion_date">
  <button id="addTaskButton">Add Task</button>
 `
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
  },
  addTask: () => {
    document.getElementById("addTaskButton").addEventListener("click", () => {
      console.log("You clicked add task");
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

let taskToDOM = html => {
  document.getElementById("taskList").innerHTML += html;

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

    _taskListeners.default.addTask();
  });
};

var _default = taskToDOM;
exports.default = _default;

},{"./api":1,"./taskListeners":3}],5:[function(require,module,exports){
"use strict";

var _taskToDOM = _interopRequireDefault(require("./Tasks/taskToDOM"));

var _taskForm = _interopRequireDefault(require("./Tasks/taskForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _taskToDOM.default)(_taskForm.default.taskFormInput);

},{"./Tasks/taskForm":2,"./Tasks/taskToDOM":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUE7O0FBSmtCLENBQXJCO2VBTWUsWTs7Ozs7Ozs7OztBQ05mLElBQUksUUFBUSxHQUFHO0FBQ2QsRUFBQSxhQUFhLEVBQUU7Ozs7OztBQURELENBQWY7ZUFTZSxROzs7Ozs7Ozs7O0FDVGYsSUFBSSxhQUFhLEdBQUc7QUFDbkIsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUM1RSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVo7QUFDQSxLQUZDO0FBR0YsR0FMbUI7QUFPcEIsRUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNiLElBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLE1BQU07QUFDdkUsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHNCQUFaO0FBQ0QsS0FGRDtBQUdEO0FBWG1CLENBQXBCO2VBY2UsYTs7Ozs7Ozs7Ozs7QUNkZjs7QUFDQTs7OztBQUNBLElBQUksU0FBUyxHQUFJLElBQUQsSUFBVTtBQUN4QixFQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLElBQWlELElBQWpEOztBQUNBLGVBQWEsUUFBYixHQUNHLElBREgsQ0FDUSxXQUFXLElBQUk7QUFDbkIsSUFBQSxXQUFXLENBQUMsT0FBWixDQUFvQixJQUFJLElBQUk7QUFDMUIsTUFBQSxRQUFRLENBQUMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxTQUFwQyxJQUFrRDs7Y0FFNUMsSUFBSSxDQUFDLFNBQVU7aUNBQ0ksSUFBSSxDQUFDLG1CQUFvQjs4QkFDNUIsSUFBSSxDQUFDLFNBQVU7O2VBSnJDO0FBT0QsS0FSRDs7QUFTQSwyQkFBYyxhQUFkOztBQUNBLDJCQUFjLE9BQWQ7QUFDRCxHQWJIO0FBY0QsQ0FoQkQ7O2VBaUJlLFM7Ozs7OztBQ25CZjs7QUFDQTs7OztBQUdBLHdCQUFVLGtCQUFTLGFBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJZnVuY3Rpb25zID0ge1xyXG4gIGdldFRhc2tzKCl7XHJcbiAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4gICAgLnRoZW4odGFza3MgPT4gdGFza3MuanNvbigpKVxyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBBUElmdW5jdGlvbnMiLCJsZXQgdGFza0Zvcm0gPSB7XHJcbiB0YXNrRm9ybUlucHV0OmBcclxuICA8aDM+Q3JlYXRlIGEgVGFzazwvaDM+XHJcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrX25hbWVcIiBwbGFjZWhvbGRlcj1cIlRhc2sgTmFtZVwiPlxyXG4gIDxpbnB1dCB0eXBlPVwiRGF0ZVwiIGlkPVwiY29tcGxldGlvbl9kYXRlXCI+XHJcbiAgPGJ1dHRvbiBpZD1cImFkZFRhc2tCdXR0b25cIj5BZGQgVGFzazwvYnV0dG9uPlxyXG4gYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrRm9ybSIsImxldCB0YXNrTGlzdGVuZXJzID0ge1xyXG4gY29tcGxldGVkVGFzazogKCkgPT4ge1xyXG4gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBsZXRlZEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgY29tcGxldGVkIHRhc2tcIilcclxuIH0pXHJcbn0sXHJcblxyXG5hZGRUYXNrOiAoKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRUYXNrQnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGFkZCB0YXNrXCIpXHJcbiAgfSlcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrTGlzdGVuZXJzIiwiaW1wb3J0IEFQSWZ1bmN0aW9ucyBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgdGFza0xpc3RlbmVycyBmcm9tIFwiLi90YXNrTGlzdGVuZXJzXCJcclxubGV0IHRhc2tUb0RPTSA9IChodG1sKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gaHRtbFxyXG4gIEFQSWZ1bmN0aW9ucy5nZXRUYXNrcygpXHJcbiAgICAudGhlbihwYXJzZWRUYXNrcyA9PiB7XHJcbiAgICAgIHBhcnNlZFRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPiR7dGFzay50YXNrX25hbWV9PC9oMT5cclxuICAgICAgICA8cD5FeHBlY3RlZCBjb21wbGV0aW9uICR7dGFzay5leHBlY3RlZF9jb21wbGV0aW9ufS48L3A+XHJcbiAgICAgICAgPHA+WW91ciB0YXNrIGlzIG5vdyAke3Rhc2suY29tcGxldGVkfTwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiY29tcGxldGVkQnV0dG9uXCI+Q29tcGxldGVkIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgIH0pO1xyXG4gICAgICB0YXNrTGlzdGVuZXJzLmNvbXBsZXRlZFRhc2soKVxyXG4gICAgICB0YXNrTGlzdGVuZXJzLmFkZFRhc2soKVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCB0YXNrVG9ET00iLCJpbXBvcnQgdGFza1RvRE9NIGZyb20gXCIuL1Rhc2tzL3Rhc2tUb0RPTVwiXHJcbmltcG9ydCB0YXNrRm9ybSBmcm9tIFwiLi9UYXNrcy90YXNrRm9ybVwiXHJcblxyXG5cclxudGFza1RvRE9NKHRhc2tGb3JtLnRhc2tGb3JtSW5wdXQpXHJcbiJdfQ==
