const clearChildren = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
export default clearChildren