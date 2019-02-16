import newsPrintToDom from "./newsPrintToDom";
import newsForms from "./newsInputForm";
import apiHandler from "./newsAPIHandler";
import newsHTMLFactory from "./newsHTMLFactory";

const $ = document.querySelector.bind(document)

const newsEventListener = {
    newsInputButton() {
        $("#newsFeed-input-container").addEventListener("click", (e) => {
            if (e.target.id === "createInputButton") {
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
            }
        })
    },
    postArticleButton() {
        $("#newsFeed-input-container").addEventListener("click", (e) => {
            if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value === "") {
                const title = $("#newsTitleInput").value
                const summary = $("#newsSynopsisInput").value
                const url = $("#newsURLInput").value

                const newsObject = {
                    "userId": 1,
                    "title": title,
                    "summary": summary,
                    "url": url,
                    "timestamp": Date.now()
                }

                apiHandler.postNews(newsObject)
                    .then(() => {
                        newsHTMLFactory()
                    })
            } else if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value !== "") {
                    const title = $("#newsTitleInput").value
                    const summary = $("#newsSynopsisInput").value
                    const url = $("#newsURLInput").value
                    const articleId = $("#newsHiddenInput").value

                    const newsObject = {
                        "userId": 1,
                        "title": title,
                        "summary": summary,
                        "url": url,
                        "timestamp": Date.now()
                    }
                    apiHandler.editNews(articleId, newsObject)
                        .then(() => {
                            $("#newsFeed-article-container").innerHTML = ""
                            newsHTMLFactory()
                        })
                } else if (e.target.id === "cancelPost") {
                    newsPrintToDom.printInputField(newsForms.postNewArticleHTML, "#newsFeed-input-container")
                }
            })
        },
    editArticleButton() {
        $("#newsFeed-article-container").addEventListener("click", (e) => {
            const buttonId = e.target.id
            if (buttonId.includes("editArticle--")) {
                console.log("whoops ")
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
                const articleId = buttonId.split("--")[1]
                $("#newsHiddenInput").value = articleId
                $("#postArticleButton").textContent = "Save"
                apiHandler.getOneArticle(articleId)
                    .then((article) => {
                        $("#newsTitleInput").value = article.title
                        $("#newsSynopsisInput").value = article.summary
                        $("#newsURLInput").value = article.url
                    })
                    //remove card from database
            } else if (buttonId.includes("removeArticle--")) {
                    let deleteConfirmation = confirm("Are you sure?")
                    if (deleteConfirmation === true) {
                        const articleId = buttonId.split("--")[1]
                        apiHandler.deleteNews(articleId)
                            .then(() => {
                                newsHTMLFactory()
                            })
                    } else break
                }
        })
    }
}

export default newsEventListener