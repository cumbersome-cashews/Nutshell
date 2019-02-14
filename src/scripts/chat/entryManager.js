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
  onLoad: () => {
    entryManager.getMessages()
      .then(messages => {
        // clearDOM()
        messages.forEach(message => {
          console.log(message)
          const html = createHTML.createHTML(message)
          addToDOM(html)
        })
      })
  }

}
export default entryManager