import createObject from "./createMessageObject.js"
import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"

const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input")
    document.querySelector("#message_input_button").addEventListener("click", () => {
      const userId = 1
      let messageText = chatInput.value
      let time = Date.now()
      const newObject = createObject(userId, messageText, time)
      console.log(newObject)
      const HTML = createHTML.createHTML(newObject)
      // console.log(HTML)
      addToDOM(HTML)
      entryManager.postMessage(newObject)
      // const output = document.querySelector("#message_output_container")
    })

  }
}
export default eventHandler