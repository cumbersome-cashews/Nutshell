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
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL2FwaS5qcyIsIi4uL3NjcmlwdHMvVGFza3MvdGFza0Zvcm0uanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tMaXN0ZW5lcnMuanMiLCIuLi9zY3JpcHRzL1Rhc2tzL3Rhc2tUb0RPTS5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sWUFBWSxHQUFHO0FBQ25CLEVBQUEsUUFBUSxHQUFFO0FBQ1QsV0FBTyxLQUFLLENBQUMsNkJBQUQsQ0FBTCxDQUNMLElBREssQ0FDQSxLQUFLLElBQUksS0FBSyxDQUFDLElBQU4sRUFEVCxDQUFQO0FBRUEsR0FKa0I7O0FBTW5CLEVBQUEsYUFBYSxDQUFDLFFBQUQsRUFBVTtBQUNyQixXQUFPLEtBQUssQ0FBQyw2QkFBRCxFQUFnQztBQUMxQyxNQUFBLE1BQU0sRUFBRSxNQURrQztBQUUxQyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRmlDO0FBSzFDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsUUFBZjtBQUxvQyxLQUFoQyxDQUFaO0FBT0QsR0Fka0I7O0FBZ0JuQixFQUFBLGFBQWEsQ0FBQyxFQUFELEVBQUk7QUFDZixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxDQUFMLENBQ0wsSUFESyxDQUNBLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBTixFQURULENBQVA7QUFFQSxHQW5CaUI7O0FBcUJsQixFQUFBLFFBQVEsQ0FBQyxFQUFELEVBQUssVUFBTCxFQUFnQjtBQUN2QixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsRUFBRyxFQUFuQyxFQUFzQztBQUNoRCxNQUFBLE1BQU0sRUFBRSxLQUR3QztBQUVoRCxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRnVDO0FBS2hELE1BQUEsSUFB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LDJCQUFjLGFBQWQ7O0FBQ0EsMkJBQWMsT0FBZDtBQUNELEdBZEg7QUFlRCxDQWpCRDs7ZUFrQmUsUzs7Ozs7O0FDckJmOztBQUNBOzs7O0FBR0Esd0JBQVUsa0JBQVMsYUFBbkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBBUElmdW5jdGlvbnMgPSB7XHJcbiAgZ2V0VGFza3MoKXtcclxuICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzXCIpXHJcbiAgICAudGhlbih0YXNrcyA9PiB0YXNrcy5qc29uKCkpXHJcbiAgfSxcclxuXHJcbiAgc2F2ZVRhc2tJbnB1dChzYXZlVGFzayl7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3NcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2F2ZVRhc2spXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGdldFNpbmdsZVRhc2soaWQpe1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvdGFza3MvJHtpZH1gKVxyXG4gICAgIC50aGVuKHRhc2tzID0+IHRhc2tzLmpzb24oKSlcclxuICAgfSxcclxuXHJcbiAgIGVkaXRUYXNrKGlkLCB0YXNrT2JqZWN0KXtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3Rhc2tzLyR7aWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0YXNrT2JqZWN0KVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQVBJZnVuY3Rpb25zIiwibGV0IHRhc2tGb3JtID0ge1xyXG4gdGFza0Zvcm1JbnB1dDpgXHJcbiAgPGgzPkNyZWF0ZSBhIFRhc2s8L2gzPlxyXG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFza19uYW1lXCIgcGxhY2Vob2xkZXI9XCJUYXNrIE5hbWVcIj5cclxuICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2tfZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCI+XHJcbiAgPGlucHV0IHR5cGU9XCJEYXRlXCIgaWQ9XCJjb21wbGV0aW9uX2RhdGVcIj5cclxuICA8YnV0dG9uIGlkPVwiYWRkVGFza0J1dHRvblwiPkFkZCBUYXNrPC9idXR0b24+XHJcbiBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tGb3JtIiwiaW1wb3J0IEFQSWZ1bmN0aW9ucyBmcm9tIFwiLi9hcGlcIjtcclxuaW1wb3J0IHRhc2tUb0RPTSBmcm9tIFwiLi90YXNrVG9ET01cIjtcclxuXHJcbmxldCB0YXNrTGlzdGVuZXJzID0ge1xyXG4gY29tcGxldGVkVGFzazogKCkgPT4ge1xyXG4gICBjb25zdCBjb21wbGV0ZWRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tMaXN0XCIpXHJcbiAgY29tcGxldGVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gIGlmIChlLnRhcmdldC5pZC5zdGFydHNXaXRoKFwiY29tcGxldGVkQnV0dG9uXCIpKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGNvbXBsZXRlZCB0YXNrXCIpXHJcbiAgICBjb25zdCBpZFRvR2V0T25lVGFzayA9IGUudGFyZ2V0LmlkLnNwbGl0KFwiLS1cIilbMV1cclxuICAgIC8vZ2V0IHRoZSBpZCBvZiB3aGF0IHdhcyBjbGlja2VkXHJcbiAgICAvL2ZpZ3VyZSBvdXQgd2hpY2ggY2FyZCBoYXMgdGhlIHNhbWUgaWQgYW5kIHJlbW92ZSBpdFxyXG4gICAgQVBJZnVuY3Rpb25zLmdldFNpbmdsZVRhc2soaWRUb0dldE9uZVRhc2spXHJcbiAgICAudGhlbih0YXNrT2JqZWN0ID0+IHtcclxuICAgICAgdGFza09iamVjdC5jb21wbGV0ZWQgPSB0cnVlXHJcbiAgICAgIEFQSWZ1bmN0aW9ucy5lZGl0VGFzayh0YXNrT2JqZWN0LmlkLCB0YXNrT2JqZWN0KVxyXG4gICAgfSlcclxuICB9XHJcbiB9KVxyXG59LFxyXG5cclxuYWRkVGFzazogKCkgPT4ge1xyXG4gIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRhc2tCdXR0b25cIilcclxuICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19uYW1lXCIpLmNoZWNrVmFsaWRpdHkoKSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZGVzY3JpcHRpb25cIikpXHJcbiAgICBjb25zb2xlLmxvZyhcIllvdSBjbGlja2VkIGFkZCB0YXNrXCIpXHJcblxyXG4gICAgY29uc3Qgc2F2ZVRhc2sgPSB7XHJcbiAgICAgIG5hbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19uYW1lXCIpLnZhbHVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrX2Rlc2NyaXB0aW9uXCIpLnZhbHVlLFxyXG4gICAgICB3aGVuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXBsZXRpb25fZGF0ZVwiKS52YWx1ZSxcclxuICAgICAgY29tcGxldGVkOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coc2F2ZVRhc2spXHJcbiAgICBBUElmdW5jdGlvbnMuc2F2ZVRhc2tJbnB1dChzYXZlVGFzaylcclxuICAgIC50aGVuKEFQSWZ1bmN0aW9ucy5nZXRUYXNrcylcclxuICB9KVxyXG59XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tMaXN0ZW5lcnMiLCJpbXBvcnQgQVBJZnVuY3Rpb25zIGZyb20gXCIuL2FwaVwiXHJcbmltcG9ydCB0YXNrTGlzdGVuZXJzIGZyb20gXCIuL3Rhc2tMaXN0ZW5lcnNcIlxyXG5cclxubGV0IHRhc2tUb0RPTSA9IChodG1sKSA9PiB7XHJcbiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tMaXN0XCIpLmlubmVySFRNTCArPSBodG1sXHJcbiAgQVBJZnVuY3Rpb25zLmdldFRhc2tzKClcclxuICAgIC50aGVuKHBhcnNlZFRhc2tzID0+IHtcclxuICAgICAgcGFyc2VkVGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBpZiAodGFzay5jb21wbGV0ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrTGlzdFwiKS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgPGgzPiR7dGFzay5uYW1lfTwvaDE+XHJcbiAgICAgICAgPHA+ICR7dGFzay5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgPHA+ICR7dGFzay53aGVufTwvcD5cclxuICAgICAgICA8YnV0dG9uIGlkPVwiY29tcGxldGVkQnV0dG9uLS0ke3Rhc2suaWR9XCI+Q29tcGxldGVkIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICAgIH19KTtcclxuICAgICAgdGFza0xpc3RlbmVycy5jb21wbGV0ZWRUYXNrKClcclxuICAgICAgdGFza0xpc3RlbmVycy5hZGRUYXNrKClcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdGFza1RvRE9NIiwiaW1wb3J0IHRhc2tUb0RPTSBmcm9tIFwiLi9UYXNrcy90YXNrVG9ET01cIlxyXG5pbXBvcnQgdGFza0Zvcm0gZnJvbSBcIi4vVGFza3MvdGFza0Zvcm1cIlxyXG5cclxuXHJcbnRhc2tUb0RPTSh0YXNrRm9ybS50YXNrRm9ybUlucHV0KVxyXG4iXX0=
