import createHTML from "./createHTML"
import addToDOM from "./addToDOM"

const entryManager = {

  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages?_expand=user")
      .then(res => res.json())
  }
  ,
  postMessage: (messageObject) => {
    return fetch("http://127.0.0.1:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageObject)
    })
      .then(res => res.json())
  },

  editMessage: (message, messageId) => {
    return fetch(`http://127.0.0.1:8088/messages/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    }
    )
      .then(res => res.json())

  },

}
export default entryManager

// window.setInterval(() => {
//   const chatOutput = document.querySelector("#message_output_container")
//   chatOutput.scrollTop = chatOutput.scrollHeight
// }, 10000)