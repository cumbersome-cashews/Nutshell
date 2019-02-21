import APIfunctions from "./api"

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
        <div class="taskCardContainer">
        <h4>${task.name}</h4>
        <p> ${task.when}</p>
        <button id="completedButton--${task.id}">Completed Task</button>
        <button id="editButton--${task.id}">Edit Task</button>
        </div>`
        }
      });
    })
}
export default taskToDOM