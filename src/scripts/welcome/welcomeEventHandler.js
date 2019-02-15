import welcome from "./welcome";
import welcomeForms from "./welcomeForms";

const welcomeEventHandlers = {
    all: () => {
        welcomeEventHandlers.needToRegister()
        welcomeEventHandlers.alreadyRegistered()
        welcomeEventHandlers.register()
        welcomeEventHandlers.login()
    },
    needToRegister: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "needToRegister") {
                console.log("not registered! going to registration screen.")
                welcome.welcome(welcomeForms.registrationForm)
            }
        })
    },
    alreadyRegistered: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "alreadyRegistered") {
                console.log("already registered! going to login screen.")
                welcome.welcome(welcomeForms.loginForm)
            }
        })
    },
    register: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "registerBtn") {
                console.log("register button clicked!")
            }
        })
    },
    login: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            console.log("click!")
            if (event.target.id === "loginBtn") {
                console.log("login button clicked!")
                welcome.login()
            }
        })
    }
}

export default welcomeEventHandlers