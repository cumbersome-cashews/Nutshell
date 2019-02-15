const newsForms = {

    postNewArticleHTML: `
    <button id="createInputButton">Post New Article</button>
    `,
    newsInputForm: `
    <section id="newsInputContainer">
        <input type="hidden" id=hiddenInput value="">
        <input type="text" id="newsTitleInput" placeholder="Title">
        <textarea id="newsSynopsisInput" placeholder="Write article summary here"></textarea>
        <input type="url" id="newsURLInput" placeholder="URL">
        <button id="postArticleButton">Post</button>
    </section>
`
}

export default newsForms