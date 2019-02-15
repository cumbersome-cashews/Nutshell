const $ = document.querySelector.bind(document)

const newsPrintToDom = {
    printArticles: (what, where) => {
        $(where).innerHTML += what
    },
    printInputField: (what, where) => {
        $(where).innerHTML = what
    },
}
export default newsPrintToDom