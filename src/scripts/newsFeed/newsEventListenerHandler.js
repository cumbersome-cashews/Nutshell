import newsPrintToDom from "./newsPrintToDom";
import newsForms from "./newsInputForm";
import apiHandler from "./newsAPIHandler";
import newsHTMLFactory from "./newsHTMLFactory";

const $ = document.querySelector.bind(document)

const newsEventListener = {
    //event listeners for input container
    inputContainer() {
        //post new article button
        $("#newsFeed-input-container").addEventListener("click", (e) => {
            if (e.target.id === "createInputButton") {
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
            //save new article to database
            } else if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value === "") {
                const title = $("#newsTitleInput").value
                const summary = $("#newsSynopsisInput").value
                const url = $("#newsURLInput").value
                //build new object
                const newsObject = {
                    "userId": 1,
                    "title": title,
                    "summary": summary,
                    "url": url,
                    "timestamp": Date.now()
                }
                //post new object to database
                apiHandler.postNews(newsObject)
                    .then(() => {
                        newsHTMLFactory()
                    })
            //edit news article information button
            } else if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value !== "") {
                const title = $("#newsTitleInput").value
                const summary = $("#newsSynopsisInput").value
                const url = $("#newsURLInput").value
                const articleId = $("#newsHiddenInput").value
                //create new object
                const newsObject = {
                    "userId": 1,
                    "title": title,
                    "summary": summary,
                    "url": url,
                    "timestamp": Date.now()
                }
                //replace object in database
                apiHandler.editNews(articleId, newsObject)
                    .then(() => {
                        $("#newsFeed-article-container").innerHTML = ""
                        newsHTMLFactory()
                    })
            //cancel new post
            } else if (e.target.id === "cancelPost") {
                newsPrintToDom.printInputField(newsForms.postNewArticleHTML, "#newsFeed-input-container")
            }
        })
    },
    //event listeners for articles container
    articleContainer() {
        //edit single article
        $("#newsFeed-article-container").addEventListener("click", (e) => {
            const buttonId = e.target.id
            if (buttonId.includes("editArticle--")) {
                //open new article form and prefill it with card data
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
                const articleId = buttonId.split("--")[1]
                $("#newsHiddenInput").value = articleId
                //change post button text to save
                $("#postArticleButton").textContent = "Save"
                //grab that object from API and prefill form
                apiHandler.getOneArticle(articleId)
                    .then((article) => {
                        $("#newsTitleInput").value = article.title
                        $("#newsSynopsisInput").value = article.summary
                        $("#newsURLInput").value = article.url
                    })
                //remove card from database
            } else if (buttonId.includes("removeArticle--")) {
                //alert user
                let deleteConfirmation = confirm("Are you sure?")
                if (deleteConfirmation === true) {
                    const articleId = buttonId.split("--")[1]
                    apiHandler.deleteNews(articleId)
                        .then(() => {
                            newsHTMLFactory()
                        })
                }
            }
        })
    }
}

export default newsEventListener