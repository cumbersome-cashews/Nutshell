const $ = document.querySelector.bind(document)

const clearChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const clearAll = () => {
    clearChildren($("#events-container"))
    clearChildren($("#newsFeed-input-container"))
    clearChildren($("#newsFeed-article-container"))
    clearChildren($("#message_article"))
}

export default clearAll