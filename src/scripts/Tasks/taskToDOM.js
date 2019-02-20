import APIfunctions from "./api"
import taskListeners from "./taskListeners"

let taskToDOM = (activeUser) => {
  const taskItems = document.getElementById("taskList-items")
  taskItems.innerHTML = ""
  APIfunctions.getTasks(activeUser)
    .then(parsedTasks => {
      console.log(parsedTasks)
      parsedTasks.forEach(task => {
        if (task.completed === false) {
          console.log(task)
          taskItems.innerHTML += `
        <div>
        <h3>${task.name}</h1>
        <p> ${task.when}</p>
        <button id="completedButton--${task.id}">Completed Task</button>
        <button id="editButton--${task.id}">Edit Task</button>
        </div>`
        }
      });
      parsedTasks.forEach(task => {
        if (task.completed === false) {
          const editBTN = document.getElementById(`editButton--${task.id}`)
          editBTN.addEventListener("click", () => {
            taskListeners.showEditTaskForm(task)
          })
        }
      })
    })
}
export default taskToDOM