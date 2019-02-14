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
        <p>Expected completion ${task.expected_completion}.</p>
        <p>Your task is now ${task.completed}</p>
        <button id="completedButton">Completed Task</button>
        </div>`
      });
      taskListeners.completedTask()
      taskListeners.addTask()
    })
}
export default taskToDOM