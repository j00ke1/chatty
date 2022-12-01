import { useState } from 'react'

const IntroScreen = ({ socket, setUsername, setRoom }) => {
  const [usernameInput, setUsernameinput] = useState('')
  const [roomInput, setRoominput] = useState('')

  const joinRoom = () => {
    if (usernameInput && roomInput) {
      const data = {
        username: usernameInput,
        room: roomInput
      }
      socket.emit('join room', data)
      setUsername(usernameInput)
      setRoom(roomInput)
      setUsernameinput('')
      setRoominput('')
    }
  }

  return (
    <div className='intro-container'>
      <h1>Welcome to Chatty</h1>
      <h3>Choose a username and a room to join</h3>
      <label htmlFor='username-input'>Username:</label>
      <input id='username-input' type="text" value={usernameInput} placeholder="Username" onChange={(e) => setUsernameinput(e.target.value)} />
      {/* <input type="text" value={roomInput} placeholder="Room ID" onChange={(e) => setRoominput(e.target.value)} /> */}
      <label htmlFor='room-select'>Room:</label>
      <select name="room" id="room-select" value={roomInput} onChange={(e) => setRoominput(e.target.value)}>
        <option value="">Please select a room</option>
        <option value="Blue">Blue</option>
        <option value="Red">Red</option>
        <option value="Green">Green</option>
        <option value="Yellow">Yellow</option>
        <option value="Gold">Gold</option>
      </select>

      <button onClick={joinRoom}>Join Room</button>
    </div>
  )
}

export default IntroScreen