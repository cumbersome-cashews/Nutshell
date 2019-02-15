const eventsHTML = (eventsArray) => {
    eventsArray.forEach(event => {
        return `
        <div id="eventCard--${event.id}">
            <h2 class="eventHeader">${event.name}</h2>
            <div class="eventDate">${event.date}</div>
            <div class="eventLocation">${event.location}</div>
        </div>
        `
    });
}

export default eventsHTML