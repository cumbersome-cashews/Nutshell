import welcome from "./welcome";
import welcomeForms from "./welcomeForms";

const welcomeEventHandlers = {
    needToRegister: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "needToRegister") {
                welcome.welcome(welcomeForms.registrationForm)
            }
        })
    },
    alreadyRegistered: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "alreadyRegistered") {
                welcome.welcome(welcomeForms.loginForm)
            }
        })
    }
}

export default welcomeEventHandlers