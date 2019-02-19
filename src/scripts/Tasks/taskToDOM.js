import APIfunctions from "./api"

let taskToDOM = (activeUser) => {
 document.getElementById("taskList-items").innerHTML = ""
 APIfunctions.getTasks(activeUser)
 .then(parsedTasks => {
   parsedTasks.forEach(task => {
        if (task.completed === false) {
          document.getElementById("taskList-items").innerHTML += `
        <div>
        <h3>${task.name}</h1>
        <p> ${task.description}</p>
        <p> ${task.when}</p>
        <button id="completedButton--${task.id}">Completed Task</button>
        </div>`
      }});
    })
}
export default taskToDOM