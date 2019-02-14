const APIfunctions = {
  getTasks(){
   return fetch("http://localhost:8088/tasks")
    .then(tasks => tasks.json())
  }
}
export default APIfunctions