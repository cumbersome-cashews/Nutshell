import eventApi from "./eventApiManager";
import showEvents from "./events";
import eventsForm from "./eventsForm";

const eventsEventListeners = {
    all: () => {
        eventsEventListeners.deleteEvent()
        eventsEventListeners.editEvent()
        eventsEventListeners.createEvent()
        eventsEventListeners.cancel()
        eventsEventListeners.saveEvent()
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
                //show form
                document.querySelector("#eventsForm").innerHTML = eventsForm.inputForm
                //focus the screen on the form
                document.querySelector("#eventsForm").scrollIntoView(true)
                //get id
                const idToEdit = event.target.id.split("--")[1]
                //save the id in hidden input for later
                document.querySelector("#eventsHiddenInput").value = idToEdit
                //get this object
                eventApi.getOneEvent(idToEdit)
                    //insert the values in the inputs
                    .then(event => {
                        document.querySelector("#eventTitleInput").value = event.name
                        document.querySelector("#eventDateInput").value = event.date
                        document.querySelector("#eventLocationInput").value = event.location
                        //change the save button to Update
                        document.querySelector("#postEventBtn").textContent = "Update"
                    })
            }
        })
    },
    createEvent: () => {
        document.querySelector("#eventsForm").addEventListener("click", (event) => {
            if (event.target.id === "createEventBtn") {
                document.querySelector("#eventsForm").innerHTML = eventsForm.inputForm
            }

        })
    },
    cancel: () => {
        document.querySelector("#eventsForm").addEventListener("click", (event) => {
            if (event.target.id === "cancelEventPost") {
                document.querySelector("#eventsForm").innerHTML = eventsForm.formButton
            }
        })
    },
    saveEvent: () => {
        document.querySelector("#eventsForm").addEventListener("click", (event) => {

            //if saving a new event
            if (event.target.textContent === "Save") {
                const userId = parseInt(sessionStorage.getItem("activeUser"))
                const name = document.querySelector("#eventTitleInput").value
                const date = document.querySelector("#eventDateInput").value
                const location = document.querySelector("#eventLocationInput").value
                if (name === "" || date === "" || location === "") {
                    alert("Please fill in all fields")
                } else {
                    const newEvent = {
                        userId,
                        name,
                        date,
                        location,
                    }

                    console.log(newEvent)
                    eventApi.postEvent(newEvent)
                        .then(res => {
                            showEvents(userId)
                        })

                    document.querySelector("#eventsForm").innerHTML = eventsForm.formButton
                }

            // if updating an existing event
            } else if (event.target.textContent === "Update") {
                const userId = parseInt(sessionStorage.getItem("activeUser"))
                const eventId = document.querySelector("#eventsHiddenInput").value
                const name = document.querySelector("#eventTitleInput").value
                const date = document.querySelector("#eventDateInput").value
                const location = document.querySelector("#eventLocationInput").value
                if (name === "" || date === "" || location === "") {
                    alert("Please fill in all fields")
                } else {
                    //update the values and PUT
                    const editedEvent = {
                        userId,
                        name,
                        date,
                        location,
                    }
                    eventApi.editEvent(editedEvent, eventId)
                        .then(res => {
                            showEvents(userId)
                        })

                    //change Update back to Save
                    document.querySelector("#postEventBtn").textContent = "Save"
                    document.querySelector("#eventsForm").innerHTML = eventsForm.formButton
                }
            }
        })
    }
}

export default eventsEventListeners