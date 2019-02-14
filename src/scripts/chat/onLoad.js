import entryManager from "./entryManager"
const onLoad = {
  outputAllMessages: () => {
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
export default onLoad