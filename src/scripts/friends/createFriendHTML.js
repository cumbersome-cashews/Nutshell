const createFriendHTML = userObj => {
  let name = document.createElement("span")
  const nameT = document.createTextNode(`${user.first_name} ${user.last_name}`)
  name.appendChild(nameT)
  name.setAttribute("class", `friend--${user.id}`)
  document.querySelector("#friendListContainer").appendChild(name)

}
export default createFriendHTML