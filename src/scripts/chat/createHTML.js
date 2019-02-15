const createHTML = {
  createHTML: (message) => {
    //     return `
    // <article class = "chat_message">
    // <section class = "user">
    // <h3>${message.userId}</h3>
    // </section>
    // <section class = "text">
    // <p>${message.content}</p>
    // </section>
    // <section class = "date">
    // <p>${message.messageDate}</p>
    // </section>
    // <button id ="edit_button">Edit this message</button>
    // `
    const messageDiv = document.createElement("div")
    messageDiv.setAttribute("id", `${message.id}`)
    const name = document.createElement("h3")
    const nameT = document.createTextNode(`${message.userId}`)
    name.appendChild(nameT)
    messageDiv.appendChild(name)
    const content = document.createElement("p")
    const contentT = document.createTextNode(`${message.content}`)
    content.appendChild(contentT)
    messageDiv.appendChild(content)
    const time = document.createElement("p")
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

  }
}
export default createHTML