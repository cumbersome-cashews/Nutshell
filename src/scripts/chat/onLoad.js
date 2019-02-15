import entryManager from "./entryManager"
import createHTML from "./createHTML"
import addToDOM from "./addToDOM"
const onLoad = {
  outputAllMessages: () => {
    entryManager.getMessages()
      .then(messages => {
        // clearDOM()
        messages.forEach(message => {
          const html = createHTML.createHTML(message)
          addToDOM(html)
        })
      })
  }
}
export default onLoad