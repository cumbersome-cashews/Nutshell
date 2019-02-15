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
  },

  getSingleTask(id) {
    return fetch(`http://localhost:8088/tasks/${id}`).then(tasks => tasks.json());
  },

  editTask(id, taskObject) {
    return fetch(`http://localhost:8088/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObject)
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

var _taskToDOM = _interopRequireDefault(require("./taskToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let taskListeners = {
  completedTask: () => {
    const completedButton = document.getElementById("taskList");
    completedButton.addEventListener("click", e => {
      if (e.target.id.startsWith("completedButton")) {
        console.log("You clicked completed task");
        const idToGetOneTask = e.target.id.split("--")[1]; //get the id of what was clicked
        //figure out which card has the same id and remove it

        _api.default.getSingleTask(idToGetOneTask).then(taskObject => {
          taskObject.completed = true;

          _api.default.editTask(taskObject.id, taskObject);
        }).then();
      }
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
        completed: false
      };
      console.log(saveTask);

      _api.default.saveTaskInput(saveTask).then(_api.default.getTasks);
    });
  }
};
var _default = taskListeners;
exports.default = _default;

},{"./api":1,"./taskToDOM":4}],4:[function(require,module,exports){
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
      if (task.completed === false) {
        document.getElementById("taskList").innerHTML += `
        <div>
        <h3>${task.name}</h1>
        <p> ${task.description}</p>
        <p> ${task.when}</p>
        <button id="completedButton--${task.id}">Completed Task</button>
        </div>`;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUEsR0FKa0I7O0FBTW5CLEVBQUEsYUFBYSxDQUFDLFFBQUQsRUFBVTtBQUNyQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUMxQyxNQUFBLE1BQU0sRUFBRSxNQURrQztBQUUxQyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlDO0FBSzFDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZjtBQUxvQyxLQUFoQyxDQUFaO0FBT0QsR0Fka0I7O0FBZ0JuQixFQUFBLGFBQWEsQ0FBQyxFQUFELEVBQUk7QUFDZixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxDQUFMLENBQ0wsSUFESyxDQUNBLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBTixFQURULENBQVA7QUFFQSxHQW5CaUI7O0FBcUJsQixFQUFBLFFBQVEsQ0FBQyxFQUFELEVBQUssVUFBTCxFQUFnQjtBQUN2QixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxFQUFzQztBQUNoRCxNQUFBLE1BQU0sRUFBRSxLQUR3QztBQUVoRCxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRnVDO0FBS2hELE1BQUEsSUFB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S0FURjs7QUFVQSwyQkFBYyxhQUFkOztBQUNBLDJCQUFjLE9BQWQ7QUFDRCxHQWRIO0FBZUQsQ0FqQkQ7O2VBa0JlLFM7Ozs7OztBQ3JCZjs7QUFDQTs7OztBQUdBLHdCQUFVLGtCQUFTLGFBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgQVBJZnVuY3Rpb25zID0ge1xyXG4gIGdldFRhc2tzKCl7XHJcbiAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrc1wiKVxyXG4gICAgLnRoZW4odGFza3MgPT4gdGFza3MuanNvbigpKVxyXG4gIH0sXHJcblxyXG4gIHNhdmVUYXNrSW5wdXQoc2F2ZVRhc2spe1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhdmVUYXNrKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRTaW5nbGVUYXNrKGlkKXtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzLyR7aWR9YClcclxuICAgICAudGhlbih0YXNrcyA9PiB0YXNrcy5qc29uKCkpXHJcbiAgIH0sXHJcblxyXG4gICBlZGl0VGFzayhpZCwgdGFza09iamVjdCl7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC90YXNrcy8ke2lkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGFza09iamVjdClcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFQSWZ1bmN0aW9ucyIsImxldCB0YXNrRm9ybSA9IHtcclxuIHRhc2tGb3JtSW5wdXQ6YFxyXG4gIDxoMz5DcmVhdGUgYSBUYXNrPC9oMz5cclxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2tfbmFtZVwiIHBsYWNlaG9sZGVyPVwiVGFzayBOYW1lXCI+XHJcbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrX2Rlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiPlxyXG4gIDxpbnB1dCB0eXBlPVwiRGF0ZVwiIGlkPVwiY29tcGxldGlvbl9kYXRlXCI+XHJcbiAgPGJ1dHRvbiBpZD1cImFkZFRhc2tCdXR0b25cIj5BZGQgVGFzazwvYnV0dG9uPlxyXG4gYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrRm9ybSIsImltcG9ydCBBUElmdW5jdGlvbnMgZnJvbSBcIi4vYXBpXCI7XHJcbmltcG9ydCB0YXNrVG9ET00gZnJvbSBcIi4vdGFza1RvRE9NXCI7XHJcblxyXG5sZXQgdGFza0xpc3RlbmVycyA9IHtcclxuIGNvbXBsZXRlZFRhc2s6ICgpID0+IHtcclxuICAgY29uc3QgY29tcGxldGVkQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKVxyXG4gIGNvbXBsZXRlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICBpZiAoZS50YXJnZXQuaWQuc3RhcnRzV2l0aChcImNvbXBsZXRlZEJ1dHRvblwiKSkge1xyXG4gICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCBjb21wbGV0ZWQgdGFza1wiKVxyXG4gICAgY29uc3QgaWRUb0dldE9uZVRhc2sgPSBlLnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdXHJcbiAgICAvL2dldCB0aGUgaWQgb2Ygd2hhdCB3YXMgY2xpY2tlZFxyXG4gICAgLy9maWd1cmUgb3V0IHdoaWNoIGNhcmQgaGFzIHRoZSBzYW1lIGlkIGFuZCByZW1vdmUgaXRcclxuICAgIEFQSWZ1bmN0aW9ucy5nZXRTaW5nbGVUYXNrKGlkVG9HZXRPbmVUYXNrKVxyXG4gICAgLnRoZW4odGFza09iamVjdCA9PiB7XHJcbiAgICAgIHRhc2tPYmplY3QuY29tcGxldGVkID0gdHJ1ZVxyXG4gICAgICBBUElmdW5jdGlvbnMuZWRpdFRhc2sodGFza09iamVjdC5pZCwgdGFza09iamVjdClcclxuICAgIH0pXHJcbiAgICAudGhlbigpXHJcbiAgfVxyXG4gfSlcclxufSxcclxuXHJcbmFkZFRhc2s6ICgpID0+IHtcclxuICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRUYXNrQnV0dG9uXCIpXHJcbiAgYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc29sZS5sb2coZSlcclxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfbmFtZVwiKS5jaGVja1ZhbGlkaXR5KCkgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Rlc2NyaXB0aW9uXCIpKVxyXG4gICAgY29uc29sZS5sb2coXCJZb3UgY2xpY2tlZCBhZGQgdGFza1wiKVxyXG5cclxuICAgIGNvbnN0IHNhdmVUYXNrID0ge1xyXG4gICAgICBuYW1lOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfbmFtZVwiKS52YWx1ZSxcclxuICAgICAgZGVzY3JpcHRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19kZXNjcmlwdGlvblwiKS52YWx1ZSxcclxuICAgICAgd2hlbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wbGV0aW9uX2RhdGVcIikudmFsdWUsXHJcbiAgICAgIGNvbXBsZXRlZDogZmFsc2VcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKHNhdmVUYXNrKVxyXG4gICAgQVBJZnVuY3Rpb25zLnNhdmVUYXNrSW5wdXQoc2F2ZVRhc2spXHJcbiAgICAudGhlbihBUElmdW5jdGlvbnMuZ2V0VGFza3MpXHJcbiAgfSlcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrTGlzdGVuZXJzIiwiaW1wb3J0IEFQSWZ1bmN0aW9ucyBmcm9tIFwiLi9hcGlcIlxyXG5pbXBvcnQgdGFza0xpc3RlbmVycyBmcm9tIFwiLi90YXNrTGlzdGVuZXJzXCJcclxuXHJcbmxldCB0YXNrVG9ET00gPSAoaHRtbCkgPT4ge1xyXG4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gaHRtbFxyXG4gIEFQSWZ1bmN0aW9ucy5nZXRUYXNrcygpXHJcbiAgICAudGhlbihwYXJzZWRUYXNrcyA9PiB7XHJcbiAgICAgIHBhcnNlZFRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgaWYgKHRhc2suY29tcGxldGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza0xpc3RcIikuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMz4ke3Rhc2submFtZX08L2gxPlxyXG4gICAgICAgIDxwPiAke3Rhc2suZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgIDxwPiAke3Rhc2sud2hlbn08L3A+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImNvbXBsZXRlZEJ1dHRvbi0tJHt0YXNrLmlkfVwiPkNvbXBsZXRlZCBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+YFxyXG4gICAgICB9fSk7XHJcbiAgICAgIHRhc2tMaXN0ZW5lcnMuY29tcGxldGVkVGFzaygpXHJcbiAgICAgIHRhc2tMaXN0ZW5lcnMuYWRkVGFzaygpXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tUb0RPTSIsImltcG9ydCB0YXNrVG9ET00gZnJvbSBcIi4vVGFza3MvdGFza1RvRE9NXCJcclxuaW1wb3J0IHRhc2tGb3JtIGZyb20gXCIuL1Rhc2tzL3Rhc2tGb3JtXCJcclxuXHJcblxyXG50YXNrVG9ET00odGFza0Zvcm0udGFza0Zvcm1JbnB1dClcclxuIl19
