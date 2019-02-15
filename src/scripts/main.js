import eventHandler from "./chat/eventHandler"
import onLoad from "./chat/onLoad"

eventHandler.messageListener()
onLoad.outputAllMessages()
eventHandler.editListener()


