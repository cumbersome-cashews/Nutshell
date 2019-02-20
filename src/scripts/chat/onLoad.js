import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
import scrollToBottom from "./scroll";
import isFriend from "../friends/isFriend";
import addFriendClass from "../friends/addFriendClass";
import findFriendIds from "../friends/findFriendIds";
import friendsEntryManager from "../friends/friendsEntryManager"

const onLoad = {
  outputAllMessages: () => {
    entryManager.getMessages()
      .then(messages => {
        // clearDOM()
        messages.forEach(message => {
          const html = createHTML.createObjectHTML(message)
          addToDOM(html)

        })
        scrollToBottom()
      })
  },

  loadInitialHTML: () => {
    const friendContainer = document.createElement("section")
    const outputContainer = document.createElement("section")
    outputContainer.setAttribute("id", "message_output_container")
    document.querySelector("#message_article").appendChild(outputContainer)
    friendContainer.setAttribute("id", "add_friend_container")
    document.querySelector("#message_article").appendChild(friendContainer)
    const inputContainer = document.createElement("section")
    inputContainer.setAttribute("id", "message_input_container")
    document.querySelector("body").appendChild(inputContainer)
    const messageInput = document.createElement("input")
    messageInput.setAttribute("id", "message_input")
    inputContainer.appendChild(messageInput)
    const inputButton = document.createElement("button")
    inputButton.setAttribute("id", "message_input_button")
    inputButton.textContent = "Post message"
    inputContainer.appendChild(inputButton)
    const addFriendButton = document.createElement("button")
    addFriendButton.setAttribute("id", "add_friend_button")
    addFriendButton.textContent = "Add a friend"
    document.querySelector("#message_article").appendChild(inputContainer)
    document.querySelector("#add_friend_container").appendChild(addFriendButton)
    const friendListContainer = document.createElement("section")
    friendListContainer.setAttribute("id", "friendListContainer")
    document.querySelector("#message_article").appendChild(friendListContainer)
  },

  loadUserFriendships: () => {
    findFriendIds().then((array) => {
      console.log(array)
      friendsEntryManager.getUsers().then((users) => {

        const userIdArray = users.map((user) => user.id)
        const userId = user.id
        const friendList = users.filter(userId => array.includes(userId))
        console.log(friendList)


      })

    })
  }
}


export default onLoad


