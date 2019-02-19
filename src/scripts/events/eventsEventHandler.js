import eventApi from "./eventApiManager";
import showEvents from "./events";

const eventsEventListeners = {
    all: () => {
        eventsEventListeners.deleteEvent()
        eventsEventListeners.editEvent()
    },
    deleteEvent: () => {
        document.querySelector("#eventsList").addEventListener("click", (event) => {
            if (event.target.id.startsWith("deleteEvent")) {
                const activeUser = parseInt(sessionStorage.getItem("activeUser"))
                const idToDelete = event.target.id.split("--")[1]
                eventApi.deleteEvent(idToDelete)
                    .then(res => {
                        showEvents(activeUser)
                    })
            }
        })
    },
    editEvent: () => {
        document.querySelector("#eventsList").addEventListener("click", (event) => {
            if (event.target.id.startsWith("editEvent")) {
                console.log("edit!")
            }
        })
    }
}

export default eventsEventListeners