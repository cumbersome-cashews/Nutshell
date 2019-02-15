const eventApiManager = {
    getEvents: () => {
        return fetch("http://localhost:8088/events")
            .then(res => res.json())
    }
}

export default eventApiManager