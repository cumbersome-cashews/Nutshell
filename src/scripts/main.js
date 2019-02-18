import welcome from "./welcome/welcome";
import welcomeForms from "./welcome/welcomeForms";
import welcomeEventHandlers from "./welcome/welcomeEventHandler"
import navbarBuilder from "./navbar/navbarHTML";

navbarBuilder()
welcome.welcome(welcomeForms.loginForm)
welcomeEventHandlers.all()
