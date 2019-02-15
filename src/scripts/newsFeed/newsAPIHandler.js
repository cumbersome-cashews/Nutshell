const apiHandler = {
    getNews: () => {
        return fetch(`http://localhost:8088/articles?_expand=user`)
            .then(res => res.json())
    },
    getOneArticle: (id) => {
        return fetch(`http://localhost:8088/articles/${id}`)
            .then(res => res.json())
    },
    postNews: (obj) => {
        return fetch(`http://localhost:8088/articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    },
    editNews: (id, obj) => {
        return fetch(`http://localhost:8088/articles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
    },
    deleteNews: (id) => {
        return fetch(`http://localhost:8088/articles/${id}`, {
            method: "DELETE",
        })
    }

}

export default apiHandler