import { LAST_ATTEMP_CHANGE, MAX_LARGE_WORDS, TIMER_SECONDS } from '../../constants/Constants'
import { useEffect, useState } from 'react'
import Board from '../Board/Board'
import useTimer from '../../hooks/useTimer'
import { useAtom } from 'jotai'
import { userDataAtom } from '../../state/atoms'
import words from 'an-array-of-spanish-words'
import { useNavigate } from 'react-router-dom'

import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface SpanishWords extends Array<string> { includes: (searchValue: string, fromIndex?: number) => boolean }
const spanishWords = words as SpanishWords

const Wordle = () => {
  const navigate = useNavigate()
  const [userData] = useAtom(userDataAtom)
  const [guess, setGuess] = useState('')
  const [accomplishedAttempts, setAccomplishedAttempts] = useState(0)
  const [resetMatrix, setResetMatrix] = useState(false)
  const { seconds, resetTimer } = useTimer(TIMER_SECONDS)

  const [wordToGuess, setWordToGuess] = useState(`Perro`)

  useEffect(() => { if (userData.name === ``) navigate('/') }, [userData])

  useEffect(() => {
    if (seconds === 0) {
      // setAccomplishedAttempts(0);
      // resetTimer();
      // setResetMatrix(true);
    }
  }, [seconds])

  const reset = () => {
    setResetMatrix(true)
  }

  const checkWord = () => {
    if (guess.trim().length !== MAX_LARGE_WORDS) return
    if (!spanishWords.includes(guess.trim())) { alert(`Palabra Inexistente`); return }


    if (accomplishedAttempts > LAST_ATTEMP_CHANGE) {
      console.log(`lanzar modal`)
      console.log(`posicion`, accomplishedAttempts)
    } else {
      setGuess('')
      setAccomplishedAttempts(accomplishedAttempts + 1)
    }
    //setAccomplishedAttempts(accomplishedAttempts === LAST_ATTEMP_CHANGE ? reset() : accomplishedAttempts + 1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '')
    setGuess(value)
  }

  return (
    <div>
      <p className="mb-4 mt-3">
        <small>
          User: {userData.name} | wins:  | losses: <br />
          Next Word Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60} |
          Attemps: {accomplishedAttempts}
        </small>
      </p>
      <Board word={guess} wordToGuess={wordToGuess} attempted={accomplishedAttempts} reset={resetMatrix} setReset={setResetMatrix} />
      <div className="input-container">
        <input type="text" value={guess} onChange={handleChange} maxLength={5} />
        <button onClick={checkWord}>Check</button>
      </div>
      {/* teclado opcional */}
      {/* <Keyboard style={{ position: `absolute`, width: `100%`, left: `0`, right: `0`, bottom: `auto` }}/> */}
    </div>
  )
}

export default Wordle
