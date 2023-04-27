import { useEffect, useState } from 'react'
import Board from '../Board/Board'
import useTimer from '../../hook/useTimer'

const lastChance = 4
const largeWord = 5
const secondsInFiveMinutes = 300

const Wordle = () => {
  const [guess, setGuess] = useState('')
  const [accomplishedAttempts, setAccomplishedAttempts] = useState(0)
  const [resetMatrix, setResetMatrix] = useState(false)
  const { seconds, resetTimer } = useTimer(secondsInFiveMinutes)

  useEffect(() => {
    if (seconds === 0) {
      // setAccomplishedAttempts(0);
      // resetTimer();
      // setResetMatrix(true);
    }
  }, [seconds])

  const checkWord = () => {
    if (guess.trim().length !== largeWord) return
    const reset = () => {
      setResetMatrix(true)
      return 0
    }
    setGuess('')
    setAccomplishedAttempts(accomplishedAttempts === lastChance ? reset() : accomplishedAttempts + 1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '')
    setGuess(value)
  }

  return (
    <div>
      <p className="mb-4 mt-3">Minutes: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60} | Attemps: {accomplishedAttempts}</p>
      <Board word={guess} attempted={accomplishedAttempts} reset={resetMatrix} setReset={setResetMatrix} />
      <div className="input-container">
        <input type="text" value={guess} onChange={handleChange} maxLength={5} />
        <button onClick={checkWord}>Check</button>
      </div>
    </div>
  )
}

export default Wordle
