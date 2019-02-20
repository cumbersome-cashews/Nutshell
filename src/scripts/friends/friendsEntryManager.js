const friendsEntryManager = {

  getFriends: () => {
    return fetch("http://127.0.0.1:8088/friends")
      .then(res => res.json())
  },

  getUsers: () => {
    return fetch("http://127.0.0.1:8088/users")
      .then(res => res.json())
  },
  addFriendship: (friendship) => {
    return fetch("http://127.0.0.1:8088/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friendship)
    })
      .then(res => res.json())

  }
}

export default friendsEntryManager