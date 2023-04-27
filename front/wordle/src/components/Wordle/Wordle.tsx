import { useEffect, useState } from 'react'
import Board from '../Board/Board'
import useTimer from '../../hooks/useTimer'
import words from 'an-array-of-spanish-words'
interface SpanishWords extends Array<string> { includes: (searchValue: string, fromIndex?: number) => boolean }
const spanishWords = words as SpanishWords

const LAST_ATTEMP_CHANGE = 4 as const
const MAX_LARGE_WORDS = 5 as const
const TIMER_SECONDS = 300 as const

const Wordle = () => {
  const [guess, setGuess] = useState('')
  const [accomplishedAttempts, setAccomplishedAttempts] = useState(0)
  const [resetMatrix, setResetMatrix] = useState(false)
  const { seconds, resetTimer } = useTimer(TIMER_SECONDS)

  useEffect(() => {
    if (seconds === 0) {
      // setAccomplishedAttempts(0);
      // resetTimer();
      // setResetMatrix(true);
    }
  }, [seconds])

  const checkWord = () => {
    if (guess.trim().length !== MAX_LARGE_WORDS) return
    if (!spanishWords.includes(guess.trim())) return
    const reset = () => {
      setResetMatrix(true)
      return 0
    }
    setGuess('')
    setAccomplishedAttempts(accomplishedAttempts === LAST_ATTEMP_CHANGE ? reset() : accomplishedAttempts + 1)
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
