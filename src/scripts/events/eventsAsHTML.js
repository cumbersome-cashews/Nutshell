const eventsAsHTML = (eventsArray) => {
    let html = ""
    eventsArray.forEach(event => {
        html += `
            <div class="eventCard articleContainer" id="eventCard--${event.id}">
                <h2 class="eventHeader">${event.name}</h2>
                <div class="eventLocation">${event.location}</div>
                <div class="eventDate">${event.date}</div>
                <button id="editEvent--${event.id}" class="newsCardButton">Edit</button>
                <button id="deleteEvent--${event.id}" class="newsCardButton">Delete</button>
            </div>
        `
    });
    return html
}

export default eventsAsHTML