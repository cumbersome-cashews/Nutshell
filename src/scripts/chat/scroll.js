const scrollToBottom = () => {
  const chatOutput = document.querySelector("#message_output_container")
  chatOutput.scrollTop = chatOutput.scrollHeight
}
export default scrollToBottom