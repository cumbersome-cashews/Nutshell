import APIfunctions from "./api";
import taskToDOM from "./taskToDOM";

let taskListeners = {
  completedTask: () => {
    const completedButton = document.getElementById("taskList-items")
    completedButton.addEventListener("click", (e) => {
      if (e.target.id.startsWith("completedButton")) {
        const activeUser = sessionStorage.getItem("activeUser")
        console.log("You clicked completed task")
        const idToGetOneTask = e.target.id.split("--")[1]
        //get the id of what was clicked
        //figure out which card has the same id and remove it
        APIfunctions.getSingleTask(idToGetOneTask)
          .then(taskObject => {
            taskObject.completed = true
            APIfunctions.editTask(taskObject.id, taskObject).then(taskToDOM(activeUser))
          })
      }
    })
  },

  addTask: () => {
    const addTaskButton = document.getElementById("taskList-input")
    addTaskButton.addEventListener("click", (e) => {
      if (e.target.id.startsWith("addTaskButton")) {
        console.log("You clicked add task")
        console.log(e)
        if (document.getElementById("task_name").checkValidity() && document.getElementById("task_description")) {
          const activeUser = sessionStorage.getItem("activeUser")
          let saveTask = {
            userId: parseInt(activeUser),
            name: document.getElementById("task_name").value,
            description: document.getElementById("task_description").value,
            when: document.getElementById("completion_date").value,
            completed: false
          }
          console.log(saveTask)
          APIfunctions.saveTaskInput(activeUser, saveTask)
            .then(() => {
              (taskToDOM(activeUser))
            })
        }
      }
    })
  }
}

export default taskListeners