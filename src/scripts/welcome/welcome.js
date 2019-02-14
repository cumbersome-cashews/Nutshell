import printToDOM from "./printToDOM";
import welcomeForms from "./welcomeForms";
import welcomeApiManager from "./welcomeApiManager";
// import welcomeEventHandlers from "./welcomeEventHandler";

const welcome = {
    welcome: (form) => {
        printToDOM(form, "#welcomeForm")
    },
    register: () => {
        //GET existing users
        welcomeApiManager.getUsers()
            .then(usersData => {
                //capture input values
                const newUserObject = {
                    first_name: document.querySelector("#registration_firstName"),
                    last_name: document.querySelector("#registration_lastName"),
                    username: document.querySelector("#registration_username"),
                    email: document.querySelector("#registration_email"),
                    password: document.querySelector("#registration_password")
                }

                //compare to make sure email and username are unique
                usersData.forEach(user => {
                    if (user.username === newUserObject.username) {
                        alert("This username already exists.")
                        welcome.welcome(welcomeForms.registrationForm)

                    //alert if not unique
                    } else if (user.email === newUserObject.email) {
                        alert("There is already an account associated with this email adress.")
                        welcome.welcome(welcomeForms.registrationForm)

                    //POST new user object if unique
                    } else {
                        welcomeApiManager.postUsers(newUserObject)

                            //pass new user object into login function
                            .then(user => login(user))
                    }
                });
            })


    },
    login: () => {
        //GET users
        welcomeApiManager.getUsers()
            .then(userData => {
            //capture values from inputs
            const loginUsername = document.querySelector("#login_username")
            const loginPassword = document.querySelector("#login_password")

            //compare id and password
            userData.forEach(user => {
                if (user.username === loginUsername && user.password === loginPassword) {

                } else {
                    alert("Username or password incorrect")
                    welcome.welcome(welcomeForms.loginForm)
                }
            });


            })
        //if verified, capture userId in sessionStorage
        //go to dashboard
    }
}

export default welcome