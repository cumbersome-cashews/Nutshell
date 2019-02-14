const APIfunctions = {
  getTasks(){
   return fetch("http://localhost:3000/tasks")
    .then(tasks => tasks.json())
  }
}
export default APIfunctions