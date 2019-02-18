import eventHandler from "./chat/eventHandler"
import onLoad from "./chat/onLoad"

eventHandler.messageListener()
onLoad.outputAllMessages()
eventHandler.editListener()


import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"

welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()

