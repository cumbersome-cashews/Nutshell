const entryManager = {

  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages?_expand=user")
      .then(res => res.json())
  }
  ,
  getMessage: (messageId) => {
    return fetch(`http://127.0.0.1:8088/messages/${messageId}`)
      .then(res => res.json())
  },


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

  editMessage: (message, id) => {
    return fetch(`http://127.0.0.1:8088/messages/${id}`, {
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