import APIfunctions from "./api"
import taskListeners from "./taskListeners"

let taskToDOM = (html) => {
 document.getElementById("taskList").innerHTML += html
  APIfunctions.getTasks()
    .then(parsedTasks => {
      parsedTasks.forEach(task => {
        if (task.completed === false) {
        document.getElementById("taskList").innerHTML += `
        <div>
        <h3>${task.name}</h1>
        <p> ${task.description}</p>
        <p> ${task.when}</p>
        <button id="completedButton--${task.id}">Completed Task</button>
        </div>`
      }});
      taskListeners.completedTask()
      taskListeners.addTask()
    })
}
export default taskToDOM