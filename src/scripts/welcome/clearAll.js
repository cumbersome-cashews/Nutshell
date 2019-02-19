const $ = document.querySelector.bind(document)

const clearChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const clearAll = () => {
    clearChildren($("#eventsList"))
    clearChildren($("#eventsForm"))
    clearChildren($("#taskList-input"))
    clearChildren($("#taskList-items"))
    clearChildren($("#newsFeed-input-container"))
    clearChildren($("#newsFeed-article-container"))
}

export default clearAll