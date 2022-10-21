const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const { formatMessage } = require('./utils/messages')
const { userJoin, getUsers, userLeave } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {

  socket.on('join', (username) => {
    console.log(`${username} joined`)
    userJoin(socket.id, username)
    console.log('users:', getUsers())
    io.emit('chat message', formatMessage('Bot', `${username} joined`))
  })

  socket.on('chat message', (message) => {
    io.emit('chat message', formatMessage(message.user, message.text))
  })

  socket.on('disconnect', () => {
    const user = userLeave(socket.id)
    console.log(user)
    io.emit('chat message', formatMessage('Bot', `${user.username} left`))
    console.log('users:', getUsers())
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})