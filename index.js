const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.on('chat message', (message) => {
    console.log(message.user, message.text)
    io.emit('chat message', message)
  })

  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected, reason: ${reason}`)
  })
});

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})