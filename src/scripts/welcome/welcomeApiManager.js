const welcomeApiManager = {
    getUsers: () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
    },
    postUsers: (newUserObject) => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserObject)
        })
        .then(res => res.json())
    }
}

export default welcomeApiManager