import newsPrintToDom from "./newsPrintToDom";
import newsForms from "./newsInputForm";
import apiHandler from "./newsAPIHandler";
import newsHTMLFactory from "./newsHTMLFactory";

const $ = document.querySelector.bind(document)

const newsEventListener = {
    //event listeners for input container
    inputContainer() {
        //show new article form. "post new article"
        $("#newsFeed-input-container").addEventListener("click", (e) => {
            const activeUserId = sessionStorage.getItem("activeUser")
            if (e.target.id === "createInputButton") {
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
                //save new article to database
            } else if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value === "") {
                const title = $("#newsTitleInput").value
                const summary = $("#newsSynopsisInput").value
                const url = $("#newsURLInput").value
                //verify the form is filled
                if (title !== "" && summary !== "" && url !== "") {
                    //build new object
                    const newsObject = {
                        "userId": parseInt(activeUserId),
                        "title": title,
                        "summary": summary,
                        "url": url,
                        "timestamp": Date.now()
                    }
                    //post new object to database
                    apiHandler.postNews(activeUserId, newsObject)
                        .then(() => {
                            newsHTMLFactory(activeUserId)
                        })
                } else if (title === "" && summary === "" && url === "") {
                    alert("Please fill all forms before posting")
                    $("#newsTitleInput").focus()
                    $("#newsTitleInput").className = "redErrorBorder"
                    $("#newsSynopsisInput").className = "redErrorBorder"
                    $("#newsURLInput").className = "redErrorBorder"
                } else if (title === "") {
                    alert("Please add a title")
                    $("#newsTitleInput").focus()
                    $("#newsTitleInput").className = "redErrorBorder"
                } else if (summary === "") {
                    alert("Please add a summary")
                    $("#newsSynopsisInput").focus()
                    $("#newsSynopsisInput").className = "redErrorBorder"
                } else if (url === "") {
                    alert("Please add a url")
                    $("#newsURLInput").focus()
                    $("#newsURLInput").className = "redErrorBorder"
                }
                //edit news article information button
            } else if (e.target.id === "postArticleButton" && $("#newsHiddenInput").value !== "") {
                const title = $("#newsTitleInput").value
                const summary = $("#newsSynopsisInput").value
                const url = $("#newsURLInput").value
                const stringArticleId = $("#newsHiddenInput").value
                const articleId = parseInt(stringArticleId)
                //create new object
                const newsObject = {
                    "userId": parseInt(activeUserId),
                    "title": title,
                    "summary": summary,
                    "url": url,
                    "timestamp": Date.now()
                }
                //replace object in database
                apiHandler.editNews(articleId, newsObject)
                    .then(() => {
                        $("#newsFeed-article-container").innerHTML = ""
                        newsHTMLFactory(activeUserId)
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
            const activeUserId = sessionStorage.getItem("activeUser")
            const buttonId = e.target.id
            if (buttonId.includes("editArticle--")) {
                //open new article form and prefill it with card data
                newsPrintToDom.printInputField(newsForms.newsInputForm, "#newsFeed-input-container")
                const articleId = buttonId.split("--")[1]
                $("#newsHiddenInput").value = parseInt(articleId)
                //change post button text to save
                $("#postArticleButton").textContent = "Save"
                $("#newsInputContainer").classList.add('newsArticleEdit')
                //grab that object from API and prefill form
                apiHandler.getOneArticle(parseInt(articleId))
                    .then((article) => {
                        $("#newsInputContainer").scrollIntoView(true)
                        $("#newsTitleInput").value = article.title
                        $("#newsSynopsisInput").value = article.summary
                        $("#newsURLInput").value = article.url
                        $("#newsTitleInput").focus()
                    })
                //remove card from database
            } else if (buttonId.includes("removeArticle--")) {
                //alert user
                let deleteConfirmation = confirm("Are you sure?")
                if (deleteConfirmation === true) {
                    const stringArticleId = buttonId.split("--")[1]
                    const articleId = parseInt(stringArticleId)
                    apiHandler.deleteNews(articleId)
                        .then(() => {
                            newsHTMLFactory(activeUserId)
                        })
                }
            }
        })
    }
}

export default newsEventListener