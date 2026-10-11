import { useState, useRef } from 'react'
import Scene from './components/Scene'
import './styles/app.css'

function App() {
  const [started, setStarted] = useState(false)
  const audioRef = useRef(null)

  const handleStart = () => {
    setStarted(true)
    audioRef.current?.play()
  }

  return (
    <div className="app">
      <Scene />

      <audio ref={audioRef} src="/say_yes.mp3" loop />

      {!started && (
        <div className="start-overlay" onClick={handleStart}>
          <div className="start-content">
            <div className="start-heart">💗</div>
            <p className="start-text">Nhấn để bắt đầu</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
