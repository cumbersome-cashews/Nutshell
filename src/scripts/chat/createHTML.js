const createHTML = {
  createHTML: (message) => {
    return `
<article class = "chat_message">
<section class = "title">
<h3>${message.user.first_name}</h3>
</section>
<section class = "date">
<p>${message.content}</p>
</section>
<section class = "text">
<p>${message.messageDate}</p>
</section>
`
  }
}
export default createHTML