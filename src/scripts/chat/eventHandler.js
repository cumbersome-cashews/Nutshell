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
import isFriend from "../friends/isFriend.js";

const userId = parseInt(sessionStorage.activeUser)
const eventHandler = {
  messageListener: () => {
    const chatInput = document.querySelector("#message_input")
    document.querySelector("#message_input_button").addEventListener("click", () => {
      let messageText = chatInput.value
      let time = new Date().toLocaleString()
      const newObject = createMessageObject(userId, messageText, time)
      entryManager.postMessage(newObject)
        .then(() => {
          clearChildren(messageOutputContainer)
          onLoad.outputAllMessages()
        })
        .then(() => {
          scrollToBottom()
        })
    })
  },
  nameFriendListener: () => {
    document.querySelector("#message_output_container").addEventListener("click", (event) => {
      const span = event.target
      const friendUserId = parseInt(span.className.split("--")[1])
      findFriendIds().then((arrayOfFriends) => {
        const isAlreadyFriends = arrayOfFriends.includes(friendUserId)
        if ((span.className.startsWith("user") && friendUserId !== userId && isAlreadyFriends === false)) {
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
    const addFriendButton = document.querySelector("#add_friend_button")
    addFriendButton.addEventListener("click", () => {
      const friendSearchInput = document.querySelector("#friend_search_input")
      //if friend input exists
      if (friendSearchInput) {
        const searchedName = friendSearchInput.value
        friendsEntryManager.getUsers()
          .then((users) => {
            users.forEach(user => {
              isFriend(user.id).then((boolean) => {
                // for each user, if they are not already your friend
                if (boolean === false) {
                  if (user.first_name.toUpperCase() === searchedName.toUpperCase()
                    || user.last_name.toUpperCase() === searchedName.toUpperCase()
                    || `${user.first_name} ${user.last_name}`.toUpperCase() === searchedName.toUpperCase()) {
                    //if the searched name is equal to the user's name
                    console.log(`${user.first_name} ${user.last_name}`.toUpperCase())
                    const name = `${user.first_name} ${user.last_name}`
                    if (window.confirm(`Do you want to add ${user.first_name} ${user.last_name} as a friend?`)) {
                      const newFriendship = createFriendObject(userId, user.id)
                      friendsEntryManager.addFriendship(newFriendship)
                    }
                  }
                }
              })
            })
          })

      } else {
        addFriendButton.textContent = "Search"
        const friendSearchInput = document.createElement("input")
        friendSearchInput.setAttribute("id", "friend_search_input")
        document.querySelector("#add_friend_container").appendChild(friendSearchInput)
        friendSearchInput.value = "Enter your friend's first name"
      }
    })
  },
  editListener: () => {
    document.querySelector("#message_output_container").addEventListener("click", (event) => {
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


