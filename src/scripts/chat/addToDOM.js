const addToDOM = (element) => {
  const output = document.querySelector("#message_output_container")
  output.appendChild(element)
}
export default addToDOM