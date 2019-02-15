import APIfunctions from "./api";

let taskListeners = {
 completedTask: () => {
   document.getElementById("completedButton").addEventListener("click", () => {
  console.log("You clicked completed task")
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
      completed: Date.now()
    }
    console.log(saveTask)
    APIfunctions.saveTaskInput(saveTask)
    .then(APIfunctions.getTasks)
  })
}
}

export default taskListeners