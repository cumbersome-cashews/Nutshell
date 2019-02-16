const createHTML = {
  createObjectHTML: (message) => {
    const messageDiv = document.createElement("div")
    messageDiv.setAttribute("id", `${message.id}`)
    const nameAndText = document.createElement("p")
    const nameAndTextT = document.createTextNode(`${message.userId}: ${message.content}`)
    nameAndText.appendChild(nameAndTextT)
    messageDiv.appendChild(nameAndText)
    const time = document.createElement("span")
    time.setAttribute("class", "time")
    const timeT = document.createTextNode(`${message.messageDate}`)
    time.appendChild(timeT)
    messageDiv.appendChild(time)
    if (message.userId === 1) {
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
    const width = length * 7.1
    newInput.style.width = `${width}px`
    parent.appendChild(newInput)
  }
}
export default createHTML