import './styles.css';
import io from 'socket.io-client'
import { useState } from 'react'

import IntroScreen from './components/IntroScreen';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className="App">
      {!room
        ? <IntroScreen socket={socket} setUsername={setUsername} setRoom={setRoom} />
        : <Chat socket={socket} room={room} username={username} setUsername={setUsername} setRoom={setRoom} />
      }
      {/* <Chat socket={socket} room={room} username={username} setUsername={setUsername} setRoom={setRoom} /> */}
    </div>
  );
}

export default App;
