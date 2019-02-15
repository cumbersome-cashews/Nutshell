import APIfunctions from "./api"
import taskListeners from "./taskListeners"
let taskToDOM = (html) => {
  document.getElementById("taskList").innerHTML += html
  APIfunctions.getTasks()
    .then(parsedTasks => {
      parsedTasks.forEach(task => {
        document.getElementById("taskList").innerHTML += `
        <div>
        <h1>${task.name}</h1>
        <p>Description ${task.description}</p>
        <p>When ${task.when}.</p>
        <button id="completedButton">Completed Task</button>
        </div>`
      });
      taskListeners.completedTask()
      taskListeners.addTask()
    })
}
export default taskToDOM