import { useState } from 'react'
import Board from '../Board/Board'

const lastChance = 4
const Wordle = () => {
  const [guess, setGuess] = useState('')
  const [accomplishedAttempts, setAccomplishedAttempts] = useState(0)
  const [resetMatrix, setResetMatrix] = useState(false)

  const checkWord = () => {
    const reset = () => {
      setResetMatrix(true)
      return 0
    }
    setGuess('')
    setAccomplishedAttempts(accomplishedAttempts === lastChance ? reset() : accomplishedAttempts + 1)
  }
  return (
    <div className='wordle'>
      <p className="mb-4 mt-3">Minutes: 5:00 | Attemps: {accomplishedAttempts}</p>
      <Board word={guess} attempted={accomplishedAttempts} reset={resetMatrix} setReset={setResetMatrix}/>
      <div className="input-container">
        <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} maxLength={5} />
        <button onClick={checkWord}>Check</button>
      </div>
    </div>
  )
}

export default Wordle
