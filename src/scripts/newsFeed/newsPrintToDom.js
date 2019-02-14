import newsHTMLFactory from "./newsHTMLFactory"
const $ = document.querySelector.bind(document)

const newsPrintToDom = (newsHTMLFactory) => {
    $("#newsFeed").innerHTML += newsHTMLFactory
}

export default newsPrintToDom