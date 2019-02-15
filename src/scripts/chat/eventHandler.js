import createObject from "./createMessageObject.js"
import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import scrollToBottom from "./scroll.js";

const userId = 1
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input")
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value
      let time = new Date().toLocaleString()
      const newObject = createObject(userId, messageText, time)
      entryManager.postMessage(newObject)
        .then(obj => {
          const HTML = createHTML.createHTML(obj)
          addToDOM(HTML)
          scrollToBottom()
        }
        )
      // console.log(HTML)
      // const output = document.querySelector("#message_output_container")
    })
  },
  editListener: () => {
    const messageOutputContainer = document.querySelector("#message_output_container")
    messageOutputContainer.addEventListener("click", (event) => {
      if (event.target.id.startsWith("edit_button") &&
        event.target.textContent === "Edit message") {
        const id = event.target.id.split("--")[1]
        const div = document.getElementById(id)
        const newInput = document.createElement("input")
        newInput.setAttribute("id", `input--${id}`)
        div.appendChild(newInput)
        event.target.textContent = "Update message"
      } else if (event.target.id.startsWith("edit_button") &&
        event.target.textContent === "Update message") {
        newInput.value = "Hi"
        // entryManager.editMessage(newInput.value, id)
      }

    }
    )
  }
}
export default eventHandler




