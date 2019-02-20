const eventApi = {
    getEvents: (userId) => {
        return fetch(`http://localhost:8088/events?userId=${userId}&_sort=date&_order=asc`)
            .then(res => res.json())
    },
    getOneEvent: (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`)
            .then(res => res.json())
    },
    postEvent: (eventObject) => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObject)
        }).then(res => res.json())
    },
    editEvent: (eventObject, eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObject)
        }).then(res => res.json())
    },
    deleteEvent: (eventId) => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
    }
}

export default eventApi