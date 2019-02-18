import friendsEntryManager from "./entryManager"
const findFriendIds = () => {
  return friendsEntryManager.getFriends()
    .then((friends) => {
      const friendArray = []
      const activeUserInt = parseInt(sessionStorage.activeUser)
      const filtered = friends.filter(element => element.userId === activeUserInt || element.friendId === activeUserInt)
      filtered.forEach(element => {
        const userIds = (Object.values(element))
        const friendIds = userIds.filter(id => id !== activeUserInt)
        friendArray.push(...friendIds)
      })
      const uniqueFriendArray = [...new Set(friendArray)]
      console.log(uniqueFriendArray)
      return uniqueFriendArray
    })
}

export default findFriendIds
