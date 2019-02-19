// import eventApiManager from "./events/eventApiManager";
// import printEvents from "./events/eventPrint";
import taskToDOM from "./Tasks/taskToDOM"
import taskForm from "./Tasks/taskForm"
import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";
import newsEventListener from "./newsFeed/newsEventListenerHandler"
import eventsEventListeners from "./events/eventsEventHandler";
import taskListeners from "./Tasks/taskListeners"

navbarBuilder("")
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()
eventsEventListeners.all()
newsEventListener.inputContainer()
newsEventListener.articleContainer()
taskListeners.completedTask()
taskListeners.addTask()
// taskListeners.editTaskName()
// eventApiManager.getEvents()
    // .then(eventsData => printEvents(eventsData))
