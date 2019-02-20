const eventsForm = {
    inputForm: `
        <section id="eventsInputContainer">
            <input type="hidden" id=eventsHiddenInput value="">
            <input type="text" id="eventTitleInput" class="inputField" placeholder="Event Name">
            <input type="text" id="eventLocationInput" class="inputField" placeholder="Event Location">
            <input type="date" id="eventDateInput" class="inputField">
            <div class="postButtonContainer">
                <button id="postEventBtn" class="postButton">Save</button>
                <button id="cancelEventPost" class="postButton">Cancel</button>
            </div>
        </section>`,
    formButton: `
        <button id="createEventBtn">Create A New Event</button>
        `
}

export default eventsForm