const createObject = (userId, text, time) => {
  return {
    userId: userId,
    content: text,
    messageDate: time
  }
}
export default createObject