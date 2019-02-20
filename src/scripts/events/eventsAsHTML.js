const eventsAsHTML = (eventsArray) => {
    let html = ""
    eventsArray.forEach(event => {
        html += `
            <div class="eventCard articleContainer" id="eventCard--${event.id}">
                <div class="eventHeader">${event.name}</div>
                <div class="eventLocation">${event.location}</div>
                <div class="eventDate">${event.date}</div>
                <button id="editEvent--${event.id}" class="newsCardButton eventCardEdit">Edit</button>
                <button id="deleteEvent--${event.id}" class="newsCardButton eventCardDelete">Delete</button>
            </div>
        `
    });
    return html
}

export default eventsAsHTML