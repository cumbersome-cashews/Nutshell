import APIfunctions from "./api"
import taskListeners from "./taskListeners"
let taskToDOM = (html) => {
  document.getElementById("taskList").innerHTML += html
  APIfunctions.getTasks()
    .then(parsedTasks => {
      parsedTasks.forEach(task => {
        document.getElementById("taskList").innerHTML += `
        <div>
        <h1>${task.task_name}</h1>
        <p>Description ${task.task_description}</p>
        <p>When ${task.expected_completion}.</p>
        <button id="completedButton">Completed Task</button>
        </div>`
      });
      taskListeners.completedTask()
      taskListeners.addTask()
    })
}
export default taskToDOM