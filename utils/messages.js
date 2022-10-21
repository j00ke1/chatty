const formatMessage = (user, text) => {
  return {
    user,
    text,
    timestamp: new Date().getTime()
  }
}

module.exports = { formatMessage }