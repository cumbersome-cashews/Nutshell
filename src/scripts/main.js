// import eventsApiManager from "./events/eventsApiManager";

import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"

welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.needToRegister()
welcomeEventHandlers.alreadyRegistered()


// eventsApiManager(r => console.log(r))