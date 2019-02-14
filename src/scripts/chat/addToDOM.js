const addToDOM = (element) => {
  const output = document.querySelector("#message_output_container")
  console.log(element)
  console.log(output)
  output.innerHTML += element
}
export default addToDOM