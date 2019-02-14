let taskForm = {
  taskFormInput: () => {
 let masterDiv = document.getElementById("masterDiv")

let taskForm = document.createElement("form")
taskForm.setAttribute("onsubmit", "return false")

let taskInput = document.createElement("input")
taskInput.setAttribute("type", "text")
taskInput.setAttribute("name", "task_name")

let taskName = document.createElement("label")
taskName.setAttribute("for","task_name")
taskName.textContent = "Task Name"

taskForm.appendChild(taskName)
taskForm.appendChild(taskInput)

masterDiv.appendChild(taskForm)
}}

export default taskForm