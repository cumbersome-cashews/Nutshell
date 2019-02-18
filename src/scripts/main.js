// import eventApiManager from "./events/eventApiManager";
// import printEvents from "./events/eventPrint";
import taskToDOM from "./Tasks/taskToDOM"
import taskForm from "./Tasks/taskForm"


taskToDOM(taskForm.taskFormInput)
import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";
import newsEventListener from "./newsFeed/newsEventListenerHandler"

navbarBuilder()
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()

// eventApiManager.getEvents()
    // .then(eventsData => printEvents(eventsData))
