import createObject from "./createMessageObject.js"
import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import scrollToBottom from "./scroll.js";
import clearChildren from "./clear.js";
import onLoad from "./onLoad.js";

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
          const HTML = createHTML.createObjectHTML(obj)
          addToDOM(HTML)
          scrollToBottom()
        }
        )
    })
  },
  editListener: () => {
    const messageOutputContainer = document.querySelector("#message_output_container")
    messageOutputContainer.addEventListener("click", (event) => {
      const id = event.target.id.split("--")[1]
      const clickedDiv = document.getElementById(id)
      if (event.target.id.startsWith("edit_button")) {
        entryManager.getMessage(id).then((message) => {
          if (event.target.textContent === "Edit message") {
            createHTML.createInput(clickedDiv, message.content, id, message.content.length)
            console.log(typeof message.content.length)
            event.target.textContent = "Update message"
          } else if (event.target.textContent === "Update message") {
            message.content = document.getElementById(`input--${id}`).value
            const editedObj = createObject(message.userId, message.content, message.messageDate)
            entryManager.editMessage(editedObj, id).then(() => {
              clearChildren(messageOutputContainer)
              onLoad.outputAllMessages()
            })
          }
        })
      }
    }
    )
  }
}
export default eventHandler




