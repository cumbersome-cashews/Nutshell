const addToDOM = (element) => {
  const output = document.querySelector("#message_output_container")
  output.innerHTML += element
}
export default addToDOM