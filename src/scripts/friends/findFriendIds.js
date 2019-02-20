import friendsEntryManager from "./entryManager"
const findFriendIds = () => {
  return friendsEntryManager.getFriends()
    .then((friends) => {
      const friendArray = []
      const activeUserInt = parseInt(sessionStorage.activeUser)
      const filtered = friends.filter(element => element.userId === activeUserInt || element.friendId === activeUserInt)
      filtered.forEach(element => {
        const userAndFriendIds = []
        userAndFriendIds.push(element.userId)
        userAndFriendIds.push(element.friendId)
        const friendIds = userAndFriendIds.filter(id => id !== activeUserInt)
        friendArray.push(...friendIds)
      })
      const uniqueFriendArray = [...new Set(friendArray)]
      //array of unique friends of the active user
      return uniqueFriendArray
    })
}
export default findFriendIds
