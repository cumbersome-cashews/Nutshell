const apiHandler = {
    newsApi: () => {
        return fetch(`http://localhost:8088/articles?_expand=user`)
            .then(res => res.json())
    }
}

export default apiHandler