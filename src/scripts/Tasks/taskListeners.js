import APIfunctions from "./api";
import taskToDOM from "./taskToDOM";

let taskListeners = {
  completedTask: () => {
    const completedButton = document.getElementById("taskList-items")
    completedButton.addEventListener("click", (e) => {
      if (e.target.id.startsWith("completedButton")) {
        const activeUser = sessionStorage.getItem("activeUser")
        const idToGetOneTask = e.target.id.split("--")[1]
        APIfunctions.getSingleTask(idToGetOneTask)
          .then(taskObject => {
            taskObject.completed = true
            APIfunctions.editTask(taskObject.id, taskObject)
              .then(() => {
                taskToDOM(activeUser)
              })
          })
      }
    })
  },

  addTask: () => {
    const addTaskButton = document.getElementById("taskList-input")
    addTaskButton.addEventListener("click", (e) => {
        if (e.target.textContent === "Add Task" && document.getElementById("task_name").value !== "" && document.getElementById("completion_date").value !== "" ) {
          const activeUser = sessionStorage.getItem("activeUser")
          let saveTask = {
            userId: parseInt(activeUser),
            name: document.getElementById("task_name").value,
            when: document.getElementById("completion_date").value,
            completed: false
          }
          APIfunctions.saveTaskInput(activeUser, saveTask)
            .then(() => {
              (taskToDOM(activeUser))
            })
        }
        else if(e.target.textContent === "Update Task" && document.getElementById("task_name").value !== "" && document.getElementById("completion_date").value !== "" ) {
          const activeUser = sessionStorage.getItem("activeUser")
          let id = document.getElementById("tasksHidden").value
          let saveTask = {
            userId: parseInt(activeUser),
            name: document.getElementById("task_name").value,
            when: document.getElementById("completion_date").value,
            completed: false
          }
          APIfunctions.editTask(id, saveTask)
          .then( () => {
            const activeUser = sessionStorage.getItem("activeUser")
            document.getElementById("tasksHidden").value = ""
            taskToDOM(activeUser)
          })
          document.getElementById("addTaskButton").textContent = "Add Task"

        }
    })
  },

  showEditTaskForm: () => {
    const changeButtonToEdit = document.getElementById("taskList-items")
    changeButtonToEdit.addEventListener("click", (e) => {
      if(e.target.id.startsWith("editButton") ){
        const idToGetOneTask = e.target.id.split("--")[1]
        APIfunctions.getSingleTask(idToGetOneTask)
          .then(task => {
            document.getElementById("tasksHidden").value = idToGetOneTask
            document.getElementById("addTaskButton").textContent = "Update Task"
            document.getElementById("task_name").value = task.name
            document.getElementById("completion_date").value = task.date
          })
      }
    })
  }
}
export default taskListeners