const createMessageObject = (userId, text, time) => {
  return {
    userId: userId,
    content: text,
    messageDate: time
  }
}
export default createMessageObject