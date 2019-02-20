import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";
import welcome from "./welcome/welcome";

navbarBuilder()
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()


