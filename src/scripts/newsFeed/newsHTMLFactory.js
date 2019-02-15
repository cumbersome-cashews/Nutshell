import apiHandler from "./newsAPIHandler"
import newsPrintToDom from "./newsPrintToDom";
import newsForms from "./newsInputForm";
import newsEventListener from "./newsEventListenerHandler"


const newsHTMLFactory = () => apiHandler.getNews().then((parsedNews) => {
    //create and print "post new article" button

    newsPrintToDom.printInputField(newsForms.postNewArticleHTML, "#newsFeed-input-container")
    newsEventListener.newsInputButton()
    newsEventListener.postArticleButton()
    newsEventListener.removeArticleButton()


    //loop through array of articles and make html
    parsedNews.forEach(news => {
        const moment = require('moment');
        const dateTimeString = moment(news.timestamp).format("MM-DD-YYYY hh:mm:ss");
        let newsLinkShortener = news.url.split("/")[2]

        //build article html
        const newsHTML = `
    <input type="hidden" id="${news.id}">
    <h1 class="eventHeader">${news.title}</h1>
    <div class="eventSummary">${news.summary}</div>
    <div class="eventURL"><a href="${news.url}">${newsLinkShortener}</a></div>
    <div class="userName">@${news.user.username}
    <div class="eventTimestamp">${dateTimeString}</div>
    <button id="editArticle--${news.id}">Edit Article</button>
    <button id="removeArticle--${news.id}">Remove Article</button>
`
        //print saved articles to DOM
        newsPrintToDom.printArticles(newsHTML, "#newsFeed-article-container")
        newsEventListener.editArticleButton()
    })
})

export default newsHTMLFactory