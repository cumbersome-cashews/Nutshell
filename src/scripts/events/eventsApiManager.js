const eventsApiManager = {
    getEvents() {
        return fetch("http://localhost:8088/events")
            .then(r = r.json())
    }
}

const eventsManager = {
    addEvent: ()=> {
        document.querySelector("#events-container")
    }
}

export default eventsApiManager