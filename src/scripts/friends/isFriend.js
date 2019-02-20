import findFriendIds from "./findFriendIds";

//returns true if id is a friend of the active user, otherwise false
const isFriend = (id) => {
  return findFriendIds().then((friendArray) => {
    return friendArray.includes(id)
  })
}

export default isFriend