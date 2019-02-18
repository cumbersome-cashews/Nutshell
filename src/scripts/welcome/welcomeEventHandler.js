import welcome from "./welcome";
import welcomeForms from "./welcomeForms";
import clearAll from "./clearAll";

const welcomeEventHandlers = {
    all: () => {
        welcomeEventHandlers.needToRegister()
        welcomeEventHandlers.alreadyRegistered()
        welcomeEventHandlers.register()
        welcomeEventHandlers.login()
        welcomeEventHandlers.logout()
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
                welcome.welcome(welcomeForms.loginForm)
            }
        })
    },
    register: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "registerBtn") {
                welcome.register()
            }
        })
    },
    login: () => {
        document.querySelector("#welcomeForm").addEventListener("click", (event) => {
            if (event.target.id === "loginBtn") {
                welcome.login()
            }
        })
    },
    logout: () => {
        document.querySelector("#navbarContainer").addEventListener("click", (event) => {
            if (event.target.id === "logoutButton") {
                sessionStorage.clear()
                clearAll()
                welcome.welcome(welcomeForms.loginForm)
            }
        })
    }
}

export default welcomeEventHandlers