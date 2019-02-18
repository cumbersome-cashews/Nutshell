import createMessageObject from "./createMessageObject.js"
import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import scrollToBottom from "./scroll.js";
import clearChildren from "./clear.js";
import onLoad from "./onLoad.js";
import createFriendObject from "../friends/createFriendObject.js"
import friendsEntryManager from "../friends/entryManager"
import findFriendIds from "../friends/findFriendIds.js"

const messageOutputContainer = document.querySelector("#message_output_container")
const userId = parseInt(sessionStorage.activeUser)
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input")
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value
      let time = new Date().toLocaleString()
      const newObject = createMessageObject(userId, messageText, time)
      entryManager.postMessage(newObject)
        .then(obj => {
          const HTML = createHTML.createObjectHTML(obj)
          addToDOM(HTML)
          scrollToBottom()
        }
        )
    })
  },

  nameFriendListener: () => {
    messageOutputContainer.addEventListener("click", (event) => {
      const span = event.target
      const friendUserId = parseInt(span.className.split("--")[1])
      findFriendIds().then((arrayOfFriends) => {
        const isAlreadyFriends = arrayOfFriends.includes(friendUserId)
        console.log(isAlreadyFriends)
        if (span.className.startsWith("user") && friendUserId !== userId && isAlreadyFriends === "false") {
          if (window.confirm(`Do you want to add ${event.target.textContent} as a friend?`)) {
            const newFriendship = createFriendObject(userId, friendUserId)
            friendsEntryManager.addFriendship(newFriendship)
          }
        }
      })
    })
  }
  ,
  addFriendListener: () => {
    findFriendIds().then((arrayOfFriends) => {
      const friendSearchInput = document.createElement("input")
      friendSearchInput.value = ""



    })
  },

  editListener: () => {
    messageOutputContainer.addEventListener("click", (event) => {
      const id = event.target.id.split("--")[1]
      const clickedDiv = document.getElementById(id)
      if (event.target.id.startsWith("edit_button")) {
        entryManager.getMessage(id).then((message) => {
          if (event.target.textContent === "Edit message") {
            createHTML.createInput(clickedDiv, message.content, id, message.content.length)
            event.target.textContent = "Update message"
          } else if (event.target.textContent === "Update message") {
            message.content = document.getElementById(`input--${id}`).value
            const editedObj = createMessageObject(message.userId, message.content, message.messageDate)
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



