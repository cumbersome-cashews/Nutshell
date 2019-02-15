const APIfunctions = {
  getTasks(){
   return fetch("http://localhost:8088/tasks")
    .then(tasks => tasks.json())
  },

  saveTaskInput(saveTask){
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(saveTask)
    })
  }
}
export default APIfunctions