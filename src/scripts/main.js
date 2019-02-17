import newsHTMLFactory from "./newsFeed/newsHTMLFactory"
import newsEventListener from "./newsFeed/newsEventListenerHandler"

import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"

welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()

newsHTMLFactory()
newsEventListener.inputContainer()
newsEventListener.articleContainer()