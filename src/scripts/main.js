import eventApiManager from "./events/eventApiManager";
import printEvents from "./events/eventPrint";


eventApiManager.getEvents()
    .then(eventsData => printEvents(eventsData))