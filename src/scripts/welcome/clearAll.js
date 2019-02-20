const $ = document.querySelector.bind(document)

const clearChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const clearAll = () => {
    clearChildren($("#events-container"))
    clearChildren($("#eventsList"))
    clearChildren($("#eventsForm"))
    clearChildren($("#taskList-input"))
    clearChildren($("#taskList-items"))
    clearChildren($("#newsFeed-input-container"))
    clearChildren($("#newsFeed-article-container"))
    clearChildren($("#message_article"))
}

export default clearAll