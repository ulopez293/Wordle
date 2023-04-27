import { useState } from 'react'
import './App.css'
import Board from './components/Board/Board'

function App() {
  const [guess, setGuess] = useState('')
  const [attemps, setAttemps] = useState(0)
  return (
    <div>
      <h3 className="mb-5">Attemps: {attemps}</h3>
      <Board word={guess} attempted={attemps} />
      <div className="input-container">
        <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} maxLength={5} />
        <button onClick={() => setAttemps(attemps === 5 ? 0 : attemps + 1)}>Check</button>
      </div>
    </div>
  )
}

export default App
