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
        <h1>${task.task_name}</h1>
        <p>Description ${task.task_description}</p>
        <p>When ${task.expected_completion}.</p>
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUEsR0FKa0I7O0FBTW5CLEVBQUEsYUFBYSxDQUFDLFFBQUQsRUFBVTtBQUNyQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUMxQyxNQUFBLE1BQU0sRUFBRSxNQURrQztBQUUxQyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlDO0FBSzFDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZjtBQUxvQyxLQUFoQyxDQUFaO0FBT0Q7O0FBZGtCLENBQXJCO2VBZ0JlLFk7Ozs7Ozs7Ozs7QUNoQmYsSUFBSSxRQUFRLEdBQUc7QUFDZCxFQUFBLGFBQWEsRUFBRTs7Ozs7OztBQURELENBQWY7ZUFVZSxROzs7Ozs7Ozs7OztBQ1ZmOzs7O0FBRUEsSUFBSSxhQUFhLEdBQUc7QUFDbkIsRUFBQSxhQUFhLEVBQUUsTUFBTTtBQUNuQixJQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixFQUEyQyxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTTtBQUM1RSxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksNEJBQVo7QUFDQSxLQUZDO0FBR0YsR0FMbUI7QUFPcEIsRUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNiLFVBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixDQUF0QjtBQUNBLElBQUEsYUFBYSxDQUFDLGdCQUFkLENBQStCLE9BQS9CLEVBQXlDLENBQUQsSUFBTztBQUM3QyxNQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0EsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7QUFDQSxVQUFJLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGFBQXJDLE1BQXdELFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixDQUE1RCxFQUNBLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVo7QUFFQSxZQUFNLFFBQVEsR0FBRztBQUNmLFFBQUEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBRDVCO0FBRWYsUUFBQSxXQUFXLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isa0JBQXhCLEVBQTRDLEtBRjFDO0FBR2YsUUFBQSxJQUFJLEVBQUUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsaUJBQXhCLEVBQTJDLEtBSGxDO0FBSWYsUUFBQSxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUw7QUFKSSxPQUFqQjtBQU1BLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaOztBQUNBLG1CQUFhLGFBQWIsQ0FBMkIsUUFBM0IsRUFDQyxJQURELENBQ00sYUFBYSxRQURuQjtBQUVELEtBZkQ7QUFnQkQ7QUF6Qm1CLENBQXBCO2VBNEJlLGE7Ozs7Ozs7Ozs7O0FDOUJmOztBQUNBOzs7O0FBQ0EsSUFBSSxTQUFTLEdBQUksSUFBRCxJQUFVO0FBQ3hCLEVBQUEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsU0FBcEMsSUFBaUQsSUFBakQ7O0FBQ0EsZUFBYSxRQUFiLEdBQ0csSUFESCxDQUNRLFdBQVcsSUFBSTtBQUNuQixJQUFBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLElBQUksSUFBSTtBQUMxQixNQUFBLFFBQVEsQ0FBQyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLElBQWtEOztjQUU1QyxJQUFJLENBQUMsU0FBVTt5QkFDSixJQUFJLENBQUMsZ0JBQWlCO2tCQUM3QixJQUFJLENBQUMsbUJBQW9COztlQUpuQztBQU9ELEtBUkQ7O0FBU0EsMkJBQWMsYUFBZDs7QUFDQSwyQkFBYyxPQUFkO0FBQ0QsR0FiSDtBQWNELENBaEJEOztlQWlCZSxTOzs7Ozs7QUNuQmY7O0FBQ0E7Ozs7QUFHQSx3QkFBVSxrQkFBUyxhQUFuQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IEFQSWZ1bmN0aW9ucyA9IHtcclxuICBnZXRUYXNrcygpe1xyXG4gICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIilcclxuICAgIC50aGVuKHRhc2tzID0+IHRhc2tzLmpzb24oKSlcclxuICB9LFxyXG5cclxuICBzYXZlVGFza0lucHV0KHNhdmVUYXNrKXtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYXZlVGFzaylcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFQSWZ1bmN0aW9ucyIsImxldCB0YXNrRm9ybSA9IHtcclxuIHRhc2tGb3JtSW5wdXQ6YFxyXG4gIDxoMz5DcmVhdGUgYSBUYXNrPC9oMz5cclxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2tfbmFtZVwiIHBsYWNlaG9sZGVyPVwiVGFzayBOYW1lXCI+XHJcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrX2Rlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiPlxyXG4gIDxpbnB1dCB0eXBlPVwiRGF0ZVwiIGlkPVwiY29tcGxldGlvbl9kYXRlXCI+XHJcbiAgPGJ1dHRvbiBpZD1cImFkZFRhc2tCdXR0b25cIj5BZGQgVGFzazwvYnV0dG9uPlxyXG4gYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrRm9ybSIsImltcG9ydCBBUElmdW5jdGlvbnMgZnJvbSBcIi4vYXBpXCI7XHJcblxyXG5sZXQgdGFza0xpc3RlbmVycyA9IHtcclxuIGNvbXBsZXRlZFRhc2s6ICgpID0+IHtcclxuICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wbGV0ZWRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGNvbXBsZXRlZCB0YXNrXCIpXHJcbiB9KVxyXG59LFxyXG5cclxuYWRkVGFzazogKCkgPT4ge1xyXG4gIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRhc2tCdXR0b25cIilcclxuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19uYW1lXCIpLmNoZWNrVmFsaWRpdHkoKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZGVzY3JpcHRpb25cIikpXHJcbiAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGFkZCB0YXNrXCIpXHJcblxyXG4gICAgY29uc3Qgc2F2ZVRhc2sgPSB7XHJcbiAgICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19uYW1lXCIpLnZhbHVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Rlc2NyaXB0aW9uXCIpLnZhbHVlLFxyXG4gICAgICB3aGVuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBsZXRpb25fZGF0ZVwiKS52YWx1ZSxcclxuICAgICAgY29tcGxldGVkOiBEYXRlLm5vdygpXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhzYXZlVGFzaylcclxuICAgIEFQSWZ1bmN0aW9ucy5zYXZlVGFza0lucHV0KHNhdmVUYXNrKVxyXG4gICAgLnRoZW4oQVBJZnVuY3Rpb25zLmdldFRhc2tzKVxyXG4gIH0pXHJcbn1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0xpc3RlbmVycyIsImltcG9ydCBBUElmdW5jdGlvbnMgZnJvbSBcIi4vYXBpXCJcclxuaW1wb3J0IHRhc2tMaXN0ZW5lcnMgZnJvbSBcIi4vdGFza0xpc3RlbmVyc1wiXHJcbmxldCB0YXNrVG9ET00gPSAoaHRtbCkgPT4ge1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza0xpc3RcIikuaW5uZXJIVE1MICs9IGh0bWxcclxuICBBUElmdW5jdGlvbnMuZ2V0VGFza3MoKVxyXG4gICAgLnRoZW4ocGFyc2VkVGFza3MgPT4ge1xyXG4gICAgICBwYXJzZWRUYXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza0xpc3RcIikuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMT4ke3Rhc2sudGFza19uYW1lfTwvaDE+XHJcbiAgICAgICAgPHA+RGVzY3JpcHRpb24gJHt0YXNrLnRhc2tfZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgIDxwPldoZW4gJHt0YXNrLmV4cGVjdGVkX2NvbXBsZXRpb259LjwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiY29tcGxldGVkQnV0dG9uXCI+Q29tcGxldGVkIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgIH0pO1xyXG4gICAgICB0YXNrTGlzdGVuZXJzLmNvbXBsZXRlZFRhc2soKVxyXG4gICAgICB0YXNrTGlzdGVuZXJzLmFkZFRhc2soKVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCB0YXNrVG9ET00iLCJpbXBvcnQgdGFza1RvRE9NIGZyb20gXCIuL1Rhc2tzL3Rhc2tUb0RPTVwiXHJcbmltcG9ydCB0YXNrRm9ybSBmcm9tIFwiLi9UYXNrcy90YXNrRm9ybVwiXHJcblxyXG5cclxudGFza1RvRE9NKHRhc2tGb3JtLnRhc2tGb3JtSW5wdXQpXHJcbiJdfQ==
