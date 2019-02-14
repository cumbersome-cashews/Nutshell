const welcomeForms = {
    registrationForm: `
        <h1>Welcome! Create an account.</h1>

        <label for="registration_username">Username</label>
        <input type="text" name="registration_username" id="registration_username">

        <label for="registration_password">Password</label>
        <input type="password" name="registration_password" id="registration_password">

        <label for="registration_firstName">First Name</label>
        <input type="text" name="registration_firstName" id="registration_firstName">

        <label for="registration_lastName">Last Name</label>
        <input type="text" name="registration_lastName" id="registration_lastName">

        <label for="registration_email">Email</label>
        <input type="text" name="registration_email" id="registration_email">

        <button id="registerBtn">Register</button>
        <button id="alreadyRegistered">Already Have An Account?</button>
    `,
    loginForm: `
        <h1>Login</h1>

        <label for="login_username">Username</label>
        <input type="text" name="login_username" id="login_username">
        <label for="login_password">Username</label>
        <input type="text" name="login_password" id="login_password">
    `
}

export default welcomeForms