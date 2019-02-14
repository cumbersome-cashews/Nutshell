import apiHandler from "./newsAPIHandler"
import newsPrintToDom from "./newsPrintToDom";

const newsHTMLFactory = () => apiHandler.newsApi().then((parsedNews) => {
    parsedNews.forEach(news => {
        const moment = require('moment');
        const dateTimeString = moment(news.timestamp).format("MM-DD-YYYY hh:mm:ss");
        let newsLinkShortener = news.url.split("/")[2]
        const newsHTML = `
    <input type="hidden" id="${news.id}">
    <h1 class="eventHeader">${news.title}</h1>
    <div class="eventSummary">${news.summary}</div>
    <div class="eventURL"><a href="${news.url}">${newsLinkShortener}</a></div>
    <div class="userName">@${news.user.username}
    <div class="eventTimestamp">${dateTimeString}</div>
    `
        newsPrintToDom(newsHTML)
    })
})


// console.log(newsHTMLFactory())

export default newsHTMLFactory