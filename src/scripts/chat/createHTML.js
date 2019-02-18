const createHTML = {
  createObjectHTML: (message) => {
    const messageDiv = document.createElement("div")
    messageDiv.setAttribute("id", `${message.id}`)
    const name = document.createElement("span")
    name.setAttribute("class", `user--${message.user.id}`)
    const nameT = document.createTextNode(`${message.user.first_name} ${message.user.last_name}`)
    name.appendChild(nameT)
    messageDiv.appendChild(name)
    const text = document.createElement("span")
    const textT = document.createTextNode(`: ${message.content}`)
    text.appendChild(textT)
    messageDiv.appendChild(text)

    const time = document.createElement("span")
    time.setAttribute("class", "time")
    const timeT = document.createTextNode(`${message.messageDate}`)
    time.appendChild(timeT)
    messageDiv.appendChild(time)
    if (message.userId === parseInt(sessionStorage.activeUser)) {
      const editButton = document.createElement("button")
      editButton.textContent = "Edit message"
      messageDiv.appendChild(editButton)
      editButton.setAttribute("id", `edit_button--${message.id}`)
    }
    return messageDiv
  },
  createInput: (parent, value, idNumber, length) => {
    const newInput = document.createElement("input")
    newInput.setAttribute("id", `input--${idNumber}`)
    newInput.value = value
    const width = length * 7.8
    newInput.style.width = `${width}px`
    parent.appendChild(newInput)
  },


}


export default createHTML