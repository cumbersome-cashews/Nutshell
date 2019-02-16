const newsForms = {
    //build initial post button
    postNewArticleHTML: `
    <button id="createInputButton">Post New Article</button>
    `,
    //build post new article form
    newsInputForm: `
    <section id="newsInputContainer">
        <input type="hidden" id=newsHiddenInput value="">
        <input type="text" id="newsTitleInput" placeholder="Title">
        <textarea id="newsSynopsisInput" placeholder="Summary"></textarea>
        <input type="url" id="newsURLInput" placeholder="URL">
        <div class="postButtonContainer">
            <button id="postArticleButton" class="postButton">Post</button>
            <button id="cancelPost" class="postButton">Cancel</button>
        </div>
    </section>
`
}

export default newsForms