let taskListeners = {
 completedTask: () => {
   document.getElementById("completedButton").addEventListener("click", () => {
  console.log("You clicked completed task")
 })
},

addTask: () => {
  document.getElementById("addTaskButton").addEventListener("click", () => {
    console.log("You clicked add task")
  })
}
}

export default taskListeners