import APIfunctions from "./api";
import taskToDOM from "./taskToDOM";

let taskListeners = {
 completedTask: () => {
   const completedButton = document.getElementById("taskList")
  completedButton.addEventListener("click", (e) => {
  if (e.target.id.startsWith("completedButton")) {
    console.log("You clicked completed task")
    const idToGetOneTask = e.target.id.split("--")[1]
    //get the id of what was clicked
    //figure out which card has the same id and remove it
    APIfunctions.getSingleTask(idToGetOneTask)
    .then(taskObject => {
      taskObject.completed = true
      APIfunctions.editTask(taskObject.id, taskObject)
    })
  }
 })
},

addTask: () => {
  const addTaskButton = document.querySelector("#addTaskButton")
  addTaskButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(e)
    if (document.getElementById("task_name").checkValidity() && document.getElementById("task_description"))
    console.log("You clicked add task")

    const saveTask = {
      name: document.getElementById("task_name").value,
      description: document.getElementById("task_description").value,
      when: document.getElementById("completion_date").value,
      completed: false
    }
    console.log(saveTask)
    APIfunctions.saveTaskInput(saveTask)
    .then(APIfunctions.getTasks)
  })
}
}

export default taskListeners