(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const APIfunctions = {
  getTasks() {
    return fetch("http://localhost:8088/tasks").then(tasks => tasks.json());
  },

  saveTaskInput(saveTask) {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(saveTask)
    });
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
  <input type="text" id="task_description" placeholder="Description">
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

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let taskListeners = {
  completedTask: () => {
    document.getElementById("completedButton").addEventListener("click", () => {
      console.log("You clicked completed task");
    });
  },
  addTask: () => {
    const addTaskButton = document.querySelector("#addTaskButton");
    addTaskButton.addEventListener("click", e => {
      e.preventDefault();
      console.log(e);
      if (document.getElementById("task_name").checkValidity() && document.getElementById("task_description")) console.log("You clicked add task");
      const saveTask = {
        name: document.getElementById("task_name").value,
        description: document.getElementById("task_description").value,
        when: document.getElementById("completion_date").value,
        completed: Date.now()
      };
      console.log(saveTask);

      _api.default.saveTaskInput(saveTask).then(_api.default.getTasks);
    });
  }
};
var _default = taskListeners;
exports.default = _default;

},{"./api":1}],4:[function(require,module,exports){
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
        <h1>${task.name}</h1>
        <p>Description ${task.description}</p>
        <p>When ${task.when}.</p>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUEsR0FKa0I7O0FBTW5CLEVBQUEsYUFBYSxDQUFDLFFBQUQsRUFBVTtBQUNyQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUMxQyxNQUFBLE1BQU0sRUFBRSxNQURrQztBQUUxQyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlDO0FBSzFDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZjtBQUxvQyxLQUFoQyxDQUFaO0FBT0Q7O0FBZGtCLENBQXJCO2VBZ0JlLFk7Ozs7Ozs7Ozs7QUNoQmYsSUFBSSxRQUFRLEdBQUc7QUFDZCxFQUFBLGFBQWEsRUFBRTs7Ozs7OztBQURELENBQWY7ZUFVZSxROzs7Ozs7Ozs7OztBQ1ZmOzs7O0FBRUEsSUFBSSxhQUFhLEdBQUc7QUFDbkIsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUM1RSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVo7QUFDQSxLQUZDO0FBR0YsR0FMbUI7QUFPcEIsRUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNiLFVBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUF0QjtBQUNBLElBQUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXlDLENBQUQsSUFBTztBQUM3QyxNQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7QUFDQSxVQUFJLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGFBQXJDLE1BQXdELFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixDQUE1RCxFQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVo7QUFFQSxZQUFNLFFBQVEsR0FBRztBQUNmLFFBQUEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBRDVCO0FBRWYsUUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDLEtBRjFDO0FBR2YsUUFBQSxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBSGxDO0FBSWYsUUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUw7QUFKSSxPQUFqQjtBQU1BLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaOztBQUNBLG1CQUFhLGFBQWIsQ0FBMkIsUUFBM0IsRUFDQyxJQURELENBQ00sYUFBYSxRQURuQjtBQUVELEtBZkQ7QUFnQkQ7QUF6Qm1CLENBQXBCO2VBNEJlLGE7Ozs7Ozs7Ozs7O0FDOUJmOztBQUNBOzs7O0FBQ0EsSUFBSSxTQUFTLEdBQUksSUFBRCxJQUFVO0FBQ3hCLEVBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsU0FBcEMsSUFBaUQsSUFBakQ7O0FBQ0EsZUFBYSxRQUFiLEdBQ0csSUFESCxDQUNRLFdBQVcsSUFBSTtBQUNuQixJQUFBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLElBQUksSUFBSTtBQUMxQixNQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLElBQWtEOztjQUU1QyxJQUFJLENBQUMsSUFBSzt5QkFDQyxJQUFJLENBQUMsV0FBWTtrQkFDeEIsSUFBSSxDQUFDLElBQUs7O2VBSnBCO0FBT0QsS0FSRDs7QUFTQSwyQkFBYyxhQUFkOztBQUNBLDJCQUFjLE9BQWQ7QUFDRCxHQWJIO0FBY0QsQ0FoQkQ7O2VBaUJlLFM7Ozs7OztBQ25CZjs7QUFDQTs7OztBQUdBLHdCQUFVLGtCQUFTLGFBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJZnVuY3Rpb25zID0ge1xyXG4gIGdldFRhc2tzKCl7XHJcbiAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4gICAgLnRoZW4odGFza3MgPT4gdGFza3MuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIHNhdmVUYXNrSW5wdXQoc2F2ZVRhc2spe1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhdmVUYXNrKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQVBJZnVuY3Rpb25zIiwibGV0IHRhc2tGb3JtID0ge1xyXG4gdGFza0Zvcm1JbnB1dDpgXHJcbiAgPGgzPkNyZWF0ZSBhIFRhc2s8L2gzPlxyXG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFza19uYW1lXCIgcGxhY2Vob2xkZXI9XCJUYXNrIE5hbWVcIj5cclxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2tfZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCI+XHJcbiAgPGlucHV0IHR5cGU9XCJEYXRlXCIgaWQ9XCJjb21wbGV0aW9uX2RhdGVcIj5cclxuICA8YnV0dG9uIGlkPVwiYWRkVGFza0J1dHRvblwiPkFkZCBUYXNrPC9idXR0b24+XHJcbiBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tGb3JtIiwiaW1wb3J0IEFQSWZ1bmN0aW9ucyBmcm9tIFwiLi9hcGlcIjtcclxuXHJcbmxldCB0YXNrTGlzdGVuZXJzID0ge1xyXG4gY29tcGxldGVkVGFzazogKCkgPT4ge1xyXG4gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBsZXRlZEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgY29tcGxldGVkIHRhc2tcIilcclxuIH0pXHJcbn0sXHJcblxyXG5hZGRUYXNrOiAoKSA9PiB7XHJcbiAgY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVGFza0J1dHRvblwiKVxyXG4gIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX25hbWVcIikuY2hlY2tWYWxpZGl0eSgpICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19kZXNjcmlwdGlvblwiKSlcclxuICAgIGNvbnNvbGUubG9nKFwiWW91IGNsaWNrZWQgYWRkIHRhc2tcIilcclxuXHJcbiAgICBjb25zdCBzYXZlVGFzayA9IHtcclxuICAgICAgbmFtZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX25hbWVcIikudmFsdWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZGVzY3JpcHRpb25cIikudmFsdWUsXHJcbiAgICAgIHdoZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tcGxldGlvbl9kYXRlXCIpLnZhbHVlLFxyXG4gICAgICBjb21wbGV0ZWQ6IERhdGUubm93KClcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHNhdmVUYXNrKVxyXG4gICAgQVBJZnVuY3Rpb25zLnNhdmVUYXNrSW5wdXQoc2F2ZVRhc2spXHJcbiAgICAudGhlbihBUElmdW5jdGlvbnMuZ2V0VGFza3MpXHJcbiAgfSlcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrTGlzdGVuZXJzIiwiaW1wb3J0IEFQSWZ1bmN0aW9ucyBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgdGFza0xpc3RlbmVycyBmcm9tIFwiLi90YXNrTGlzdGVuZXJzXCJcclxubGV0IHRhc2tUb0RPTSA9IChodG1sKSA9PiB7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gaHRtbFxyXG4gIEFQSWZ1bmN0aW9ucy5nZXRUYXNrcygpXHJcbiAgICAudGhlbihwYXJzZWRUYXNrcyA9PiB7XHJcbiAgICAgIHBhcnNlZFRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgxPiR7dGFzay5uYW1lfTwvaDE+XHJcbiAgICAgICAgPHA+RGVzY3JpcHRpb24gJHt0YXNrLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICA8cD5XaGVuICR7dGFzay53aGVufS48L3A+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImNvbXBsZXRlZEJ1dHRvblwiPkNvbXBsZXRlZCBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+YFxyXG4gICAgICB9KTtcclxuICAgICAgdGFza0xpc3RlbmVycy5jb21wbGV0ZWRUYXNrKClcclxuICAgICAgdGFza0xpc3RlbmVycy5hZGRUYXNrKClcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdGFza1RvRE9NIiwiaW1wb3J0IHRhc2tUb0RPTSBmcm9tIFwiLi9UYXNrcy90YXNrVG9ET01cIlxyXG5pbXBvcnQgdGFza0Zvcm0gZnJvbSBcIi4vVGFza3MvdGFza0Zvcm1cIlxyXG5cclxuXHJcbnRhc2tUb0RPTSh0YXNrRm9ybS50YXNrRm9ybUlucHV0KVxyXG4iXX0=
