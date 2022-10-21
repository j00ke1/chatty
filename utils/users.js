const users = []

const userJoin = (id, username) => {
  const user = { id, username }

  users.push(user)

  return user
}

const getUsers = () => {
  return users
}

const userLeave = (id) => {
  const index = users.findIndex(user => user.id === id)
  console.log(index)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

module.exports = { userJoin, getUsers, userLeave }