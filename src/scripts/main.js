import eventHandler from "./chat/eventHandler"
import onLoad from "./chat/onLoad"
import findFriendIds from "./friends/findFriendIds";

eventHandler.messageListener()
onLoad.outputAllMessages()
eventHandler.editListener()
eventHandler.nameFriendListener()
findFriendIds()
eventHandler.addFriendListener()

import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"


welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()


