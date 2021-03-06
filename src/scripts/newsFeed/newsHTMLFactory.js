import apiHandler from "./newsAPIHandler"
import newsPrintToDom from "./newsPrintToDom";
import newsForms from "./newsInputForm";
import moment from "moment"

const $ = document.querySelector.bind(document)
const articleContainer = $("#newsFeed-article-container")

//create and print "post new article" button
const newsHTMLFactory = (activeUserId) => {
    newsPrintToDom.printInputField(newsForms.postNewArticleHTML, "#newsFeed-input-container")

    //clear the DOM before adding articles
    articleContainer.innerHTML = ""

    //fetch all articles from database
    apiHandler.getNews(activeUserId).then((parsedNews) => {
        const revParsedNews = parsedNews.reverse()
        //loop through array of articles and make html
        revParsedNews.forEach(news => {
            //convert timestamp to legible time format
            const dateTimeString = moment(news.timestamp).format("MM-DD-YYYY hh:mm");
            let newsLinkShortener = news.url.split("/")[2]

            //build article html
            const newsHTML = `
        <section class="articleContainer">
            <input type="hidden" id="${news.id}">
            <div class="userName">@${news.user.username}</div>
            <h1 class="eventHeader">${news.title}</h1>
            <div class="eventSummary">${news.summary}</div>
            <div class="eventURL"><a href="${news.url}" target="_blank" >${newsLinkShortener}</a></div>
            <div class="eventTimestamp">${dateTimeString}</div>
            <div class="card-button-container">
                <button id="editArticle--${news.id}" class="newsCardButton">Edit</button>
                <button id="removeArticle--${news.id}" class="newsCardButton">X</button>
            </div>
        </section>
`

            //print saved articles to DOM
            newsPrintToDom.printArticles(newsHTML, "#newsFeed-article-container")
        })
    })
}

export default newsHTMLFactory