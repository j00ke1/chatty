import { useState, useEffect } from 'react'
import { ImCross } from "react-icons/im"
import { IoSend } from "react-icons/io5"
import { HiOutlineUsers } from "react-icons/hi2"
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message'

const Chat = ({ socket, room, setRoom, username }) => {
  const [messageInput, setMessageinput] = useState('')
  const [messages, setMessages] = useState([])
  const [usersInRoom, setUsersInRoom] = useState([])

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages(prev => [...prev, message])
    })
    socket.on('room users', (roomUsers) => {
      setUsersInRoom(roomUsers)
    })
  }, [socket])

  const leaveRoom = () => {
    if (room) {
      socket.emit('leave room')
      setRoom('')
    }
  }

  const sendMessage = (e) => {
    e.preventDefault()
    if (username && room && messageInput) {
      const message = {
        text: messageInput
      }
      socket.emit('chat message', message)
      setMessageinput('')
    }
  }

  const messageElements = messages.map((m, i) => {
    return <Message key={i} username={username} messageAuthor={m.username} text={m.text} timestamp={m.timestamp} />
  })

  return (
    <div className='chat-container'>
      <div className='room-info'>
        <div className='room-name'>
          {room}
        </div>
        <div className='user-details'>
          <HiOutlineUsers />
          {` ${usersInRoom.length}`}
        </div>
        <button onClick={leaveRoom}><ImCross /></button>
      </div>
      <ScrollToBottom className='message-container'>
        {messageElements}
      </ScrollToBottom>
      <div className='message-actions'>
        <form onSubmit={sendMessage}>
          <input type="text" value={messageInput} placeholder="Message..." onChange={(e) => setMessageinput(e.target.value)} />
          <button><IoSend /></button>
        </form>
      </div>
    </div>
  )
}

export default Chat