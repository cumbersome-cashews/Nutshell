let taskListeners = {
 completedTask: () => {
   document.getElementById("completedButton").addEventListener("click", () => {
  console.log("You clicked completed task")
 })
}
}

export default taskListeners