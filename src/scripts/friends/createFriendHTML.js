const createFriendHTML = userObj => {
  console.log("hi")
  let name = document.createElement("p")
  const nameT = document.createTextNode(`${userObj.first_name} ${userObj.last_name}`)
  name.appendChild(nameT)
  name.setAttribute("class", `friend--${userObj.id}`)
  document.querySelector("#friendListContainer").appendChild(name)
  const removeButton = document.createElement("button")
  name.appendChild(removeButton)
  removeButton.textContent = "Remove friend"

}
export default createFriendHTML