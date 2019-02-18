const newsForms = {
    //build initial post button
    createNewEvent: `
    <button id="createEventBtn">Create A New Event</button>
    `,
    //build post new article form
    newsInputForm: `
    <section id="eventsInputContainer">
        <input type="hidden" id=eventsHiddenInput value="">
        <input type="text" id="eventTitleInput" class="inputField" placeholder="Event Name">
        <textarea id="eventDescriptionInput" class="inputField" placeholder="Event Description"></textarea>
        <input type="date" id="eventDateInput" class="inputField">
        <div class="postButtonContainer">
            <button id="postEventBtn" class="postButton">Save</button>
            <button id="cancelEventPost" class="postButton">Cancel</button>
        </div>
    </section>
`
}

export default newsForms