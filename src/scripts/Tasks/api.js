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
  },

  getSingleTask(id){
    return fetch(`http://localhost:8088/tasks/${id}`)
     .then(tasks => tasks.json())
   },

   editTask(id, taskObject){
    return fetch(`http://localhost:8088/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObject)
    })
  }
}
export default APIfunctions