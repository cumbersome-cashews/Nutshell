
const entryManager = {
  getMessages: () => {
    return fetch("http://127.0.0.1:8088/messages")
      .then(res => res.json())
      .then(() => {


      }

      )
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

  }
}
export default entryManager